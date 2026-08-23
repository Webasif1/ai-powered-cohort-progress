import { aiRoute } from "../_lib/aiRoute";
import { experiencePrompt } from "../_lib/prompts";
import { generateExperienceSchema } from "../_lib/schemas";
import { toText } from "@/lib/aiText";

export const POST = aiRoute({
  name: "generate-experience-description",
  schema: generateExperienceSchema,
  prompt: experiencePrompt,
  responseKey: "experienceDescription",
  message: "Experience description created",
  transform: (raw) => toText(raw, "experienceDescription", "description"),
});
