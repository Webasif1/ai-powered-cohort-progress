import { aiRoute } from "../_lib/aiRoute";
import { skillsPrompt } from "../_lib/prompts";
import { generateSkillsSchema } from "../_lib/schemas";
import { toList } from "@/lib/aiText";

// This route used to be typed with `GenerateSummeryBody`. The two interfaces
// overlapped, so TypeScript never complained and `skills` was silently
// required on a request that does not send it.
export const POST = aiRoute({
  name: "generate-skills",
  schema: generateSkillsSchema,
  prompt: skillsPrompt,
  responseKey: "skills",
  message: "Skills created",
  transform: (raw) => toList(raw),
});
