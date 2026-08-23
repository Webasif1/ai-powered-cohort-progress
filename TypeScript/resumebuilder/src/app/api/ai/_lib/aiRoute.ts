import type { NextRequest, NextResponse } from "next/server";
import type { z } from "zod";
import { AiTimeoutError, generateAiContent } from "@/lib/gemini";
import { connectDB } from "@/lib/mongodb";
import {
  enforceLimit,
  fail,
  guard,
  ok,
  parseBody,
  requireUser,
} from "../../_lib/respond";

/**
 * Every AI route was the same forty lines with a different prompt: same
 * imports, same truthy guard, same catch, same envelope. Worse, all six were
 * missing the same thing — an auth check — so anyone on the internet could
 * bill the Gemini key, unthrottled and with unbounded input.
 *
 * Building them from one factory means the gate, the limit and the input cap
 * are written once and cannot be forgotten by the seventh route.
 */

/** Requests per user per window. Generous for a person, useless for a script. */
const LIMIT = 20;
const WINDOW_SECONDS = 60;

interface AiRouteOptions<T extends z.ZodType> {
  /** Used for the rate-limit key and the log line. */
  name: string;
  schema: T;
  prompt: (input: z.infer<T>) => string;
  /** Key the generated value is returned under, e.g. `skills`. */
  responseKey: string;
  message: string;
  /** Post-processes the raw model output. Defaults to the trimmed string. */
  transform?: (raw: string) => unknown;
}

export function aiRoute<T extends z.ZodType>({
  name,
  schema,
  prompt,
  responseKey,
  message,
  transform,
}: AiRouteOptions<T>) {
  return async function POST(req: NextRequest): Promise<NextResponse> {
    return guard(`ai/${name}`, async () => {
      // The rate limiter lives in Mongo, so the connection has to exist
      // before the gate rather than after it.
      await connectDB();

      const auth = await requireUser();
      if ("response" in auth) return auth.response;

      const limited = await enforceLimit(req, "ai", auth.userId, LIMIT, WINDOW_SECONDS);
      if (limited) return limited;

      // Validation happens before the model call, so oversized input costs a
      // parse rather than a generation.
      const parsed = await parseBody(req, schema);
      if ("response" in parsed) return parsed.response;

      let raw: string;
      try {
        raw = await generateAiContent(prompt(parsed.data));
      } catch (error) {
        if (error instanceof AiTimeoutError) {
          return fail("The AI took too long to respond. Try again.", 504);
        }
        throw error;
      }

      if (!raw.trim()) return fail("AI failed to generate a response", 502);

      return ok(message, { [responseKey]: transform ? transform(raw) : raw.trim() });
    });
  };
}
