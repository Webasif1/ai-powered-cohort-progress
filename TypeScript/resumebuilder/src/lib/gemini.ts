import { GoogleGenAI, type Schema } from "@google/genai";
import { env } from "./env";

/**
 * Verified against the live model list for this key — `gemini-3.5-flash`
 * exists and is served. Change it only after checking the models endpoint;
 * a wrong id fails at the provider and surfaces as a generic 500.
 */
const MODEL = "gemini-3.5-flash";

/**
 * This is a thinking model, and reasoning tokens are billed against
 * `maxOutputTokens`. A 1024 cap was spent almost entirely on thinking — 981
 * tokens for one scoring call — leaving too few to emit the answer, and the
 * request came back as "An error occurred during generation".
 *
 * None of these tasks need extended reasoning: rewriting a bullet, listing
 * skills for a job title, scoring against five fixed criteria. Turning it off
 * roughly halves latency and makes the ceiling below mean what it says.
 */
const THINKING_BUDGET = 0;
const MAX_OUTPUT_TOKENS = 2048;

/** Past this the user is waiting on a request that will not get better. */
const TIMEOUT_MS = 25_000;

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export class AiTimeoutError extends Error {
  constructor() {
    super("The AI request timed out");
    this.name = "AiTimeoutError";
  }
}

interface GenerateOptions {
  /**
   * Constrains the reply to JSON matching this shape. The model then cannot
   * wrap it in a markdown fence or preface it with prose, which is what made
   * parsing the scoring response unreliable.
   */
  jsonSchema?: Schema;
}

export async function generateAiContent(
  prompt: string,
  options: GenerateOptions = {},
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        thinkingConfig: { thinkingBudget: THINKING_BUDGET },
        abortSignal: AbortSignal.timeout(TIMEOUT_MS),
        ...(options.jsonSchema && {
          responseMimeType: "application/json",
          responseSchema: options.jsonSchema,
        }),
      },
    });

    return response.text ?? "";
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "AbortError" || error.name === "TimeoutError")
    ) {
      throw new AiTimeoutError();
    }
    throw error;
  }
}
