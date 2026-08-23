import type { NextRequest } from "next/server";
import RateLimitModel from "@/models/RateLimit.model";
import { logError } from "./logger";

/**
 * Fixed-window rate limiting backed by a Mongo TTL collection.
 *
 * Fixed windows allow a burst of up to 2x the limit across a window boundary.
 * That is an acceptable trade for the AI routes — the point is to stop a
 * scripted loop from draining the Gemini quota, not to smooth traffic — and it
 * costs one atomic upsert instead of the sorted set a sliding window needs.
 */

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the current window ends. For the Retry-After header. */
  retryAfter: number;
}

/**
 * Best-effort client address. `x-forwarded-for` is trivially spoofed when the
 * app is exposed directly, so this is only ever a secondary key — every
 * limited route also keys on the authenticated user id where it has one.
 */
export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function rateLimit(
  scope: string,
  identifier: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const windowMs = windowSeconds * 1000;
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const expiresAt = new Date(windowStart + windowMs);
  const retryAfter = Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));

  try {
    // One round trip: create the window if absent, increment either way, and
    // read back the resulting count.
    const doc = await RateLimitModel.findOneAndUpdate(
      { key: `${scope}:${identifier}:${windowStart}` },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
      { upsert: true, new: true },
    ).lean<{ count: number }>();

    return { ok: (doc?.count ?? 1) <= limit, retryAfter };
  } catch (error) {
    // Fail open. A limiter outage must not take down login and the editor —
    // the limits here protect cost and guess-rate, not correctness.
    logError("rateLimit", error);
    return { ok: true, retryAfter };
  }
}
