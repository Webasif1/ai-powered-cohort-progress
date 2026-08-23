import type { NextRequest } from "next/server";
import { AiTimeoutError, generateAiContent } from "@/lib/gemini";
import { connectDB } from "@/lib/mongodb";
import { logExpected } from "@/lib/logger";
import {
  enforceLimit,
  fail,
  guard,
  ok,
  parseBody,
  requireUser,
} from "../../_lib/respond";
import { atsPrompt } from "../_lib/prompts";
import { atsResponseSchema, atsResultSchema, atsScoreSchema } from "../_lib/schemas";

/**
 * Scoring is the most expensive call in the app — a whole resume in, a
 * structured object out — so it gets its own tighter limit rather than
 * sharing the general AI budget.
 */
const LIMIT = 6;
const WINDOW_SECONDS = 60;

/** Strips a ```json fence the model sometimes adds despite being told not to. */
function unfence(raw: string): string {
  const fenced = raw.trim().match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/i);
  return fenced ? fenced[1].trim() : raw.trim();
}

export async function POST(req: NextRequest) {
  return guard("ai/ats-score", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    const limited = await enforceLimit(req, "ats", auth.userId, LIMIT, WINDOW_SECONDS);
    if (limited) return limited;

    const parsed = await parseBody(req, atsScoreSchema);
    if ("response" in parsed) return parsed.response;

    let raw: string;
    try {
      raw = await generateAiContent(atsPrompt(parsed.data), {
        jsonSchema: atsResponseSchema,
      });
    } catch (error) {
      if (error instanceof AiTimeoutError) {
        return fail("Scoring took too long. Try again.", 504);
      }
      throw error;
    }

    // The old route did `JSON.parse` and passed whatever came out straight to
    // the UI — including, on a parse failure, the raw string. Validate the
    // shape so the client can rely on it.
    let candidate: unknown;
    try {
      candidate = JSON.parse(unfence(raw));
    } catch (error) {
      logExpected("ai/ats-score", error);
      return fail("The AI returned an unreadable score. Try again.", 502);
    }

    const result = atsResultSchema.safeParse(candidate);
    if (!result.success) {
      logExpected("ai/ats-score", result.error);
      return fail("The AI returned an unexpected score format. Try again.", 502);
    }

    return ok("ATS score created", { atsScore: result.data });
  });
}
