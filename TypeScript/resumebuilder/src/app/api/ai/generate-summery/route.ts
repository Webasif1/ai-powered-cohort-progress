import { aiRoute } from "../_lib/aiRoute";
import { summaryPrompt } from "../_lib/prompts";
import { generateSummarySchema } from "../_lib/schemas";
import { toText } from "@/lib/aiText";

// The `summery` spelling is the live wire protocol — the client, the legacy
// schema field and this path all use it. Renaming needs a coordinated change,
// not a quiet one.
export const POST = aiRoute({
  name: "generate-summery",
  schema: generateSummarySchema,
  prompt: summaryPrompt,
  responseKey: "summery",
  message: "Summery created",
  transform: (raw) => toText(raw, "summery", "summary"),
});
