import { aiRoute } from "../_lib/aiRoute";
import { improvePrompt } from "../_lib/prompts";
import { improveContentSchema } from "../_lib/schemas";
import { toText } from "@/lib/aiText";

export const POST = aiRoute({
  name: "improve-content",
  schema: improveContentSchema,
  prompt: improvePrompt,
  responseKey: "improvedContent",
  message: "Improved content created",
  transform: (raw) => toText(raw, "improvedContent", "content"),
});
