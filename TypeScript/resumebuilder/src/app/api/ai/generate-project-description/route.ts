import { aiRoute } from "../_lib/aiRoute";
import { projectPrompt } from "../_lib/prompts";
import { generateProjectSchema } from "../_lib/schemas";
import { toText } from "@/lib/aiText";

export const POST = aiRoute({
  name: "generate-project-description",
  schema: generateProjectSchema,
  prompt: projectPrompt,
  responseKey: "projectDescription",
  message: "Project description created",
  transform: (raw) => toText(raw, "projectDescription", "description"),
});
