import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { z } from "zod";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { logError } from "@/lib/logger";
import type { ApiResponse } from "@/types/api.types";

/**
 * The shapes every route returns.
 *
 * `success: false` appeared 38 times across `src/app/api/` in near-identical
 * eight-line blocks, with two different messages for the same 401. Routes now
 * say what happened; the envelope is decided here.
 */

export function ok(message: string, data?: object, status = 200) {
  return NextResponse.json<ApiResponse>({ success: true, message, data }, { status });
}

export function fail(message: string, status: number, headers?: HeadersInit) {
  // Never carries an `error` payload. Login and register used to return
  // `error: { error }`, which published Atlas hostnames and duplicate-key
  // values to anonymous callers whenever Mongo hiccuped.
  return NextResponse.json<ApiResponse>({ success: false, message }, { status, headers });
}

export const unauthorized = () => fail("Unauthorized", 401);

export function tooManyRequests(retryAfter: number) {
  return fail("Too many requests. Try again shortly.", 429, {
    "Retry-After": String(retryAfter),
  });
}

/** Wraps a handler so an unexpected throw is logged and answered generically. */
export function guard(
  context: string,
  handler: () => Promise<NextResponse>,
): Promise<NextResponse> {
  return handler().catch((error) => {
    logError(context, error);
    return fail("Something went wrong", 500);
  });
}

/** The auth check that was copy-pasted into five handlers. */
export async function requireUser(): Promise<
  { userId: string } | { response: NextResponse }
> {
  const userId = await getCurrentUser();
  if (!userId) return { response: unauthorized() };
  return { userId };
}

/**
 * Parses and validates a JSON body.
 *
 * The old `const body: LoginBody = await req.json()` was a compile-time
 * assertion with no runtime effect, which is how `{"email":{"$ne":null}}`
 * reached a Mongo filter.
 */
export async function parseBody<T extends z.ZodType>(
  req: NextRequest,
  schema: T,
): Promise<{ data: z.infer<T> } | { response: NextResponse }> {
  const raw = await req.json().catch(() => null);
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    // The first issue is enough for the client to correct itself, and it
    // describes the request rather than the server.
    const issue = parsed.error.issues[0];
    const path = issue.path.join(".");
    return { response: fail(path ? `${path}: ${issue.message}` : issue.message, 400) };
  }

  return { data: parsed.data };
}

/** Applies a limit and returns a 429 response when it is exceeded. */
export async function enforceLimit(
  req: NextRequest,
  scope: string,
  identifier: string | null,
  limit: number,
  windowSeconds: number,
): Promise<NextResponse | null> {
  // Authenticated routes key on the user id; anonymous ones fall back to the
  // address, which is spoofable but still raises the cost of a naive script.
  const key = identifier ?? clientIp(req);
  const { ok: allowed, retryAfter } = await rateLimit(scope, key, limit, windowSeconds);
  return allowed ? null : tooManyRequests(retryAfter);
}
