import { Type, type Schema } from "@google/genai";
import { z } from "zod";

/**
 * Input bounds for the AI routes.
 *
 * These caps are the cost control. Everything here is interpolated straight
 * into a prompt, and previously the only check was `if (!content)` — so a
 * 5 MB string was a valid request. The numbers are set well above what the
 * editor's own fields can produce and well below anything worth paying for.
 */

const shortText = z.string().trim().min(1).max(120);
const stringList = z.array(z.string().trim().min(1).max(80)).max(50);

/** A skill/tech list arrives as an array from the editor, a string by hand. */
const listOrText = z.union([stringList, shortText]);

export const generateSummarySchema = z.object({
  jobTitle: shortText,
  experienceLevel: shortText,
  skills: listOrText,
});

export const generateSkillsSchema = z.object({
  jobTitle: shortText,
  experienceLevel: shortText,
});

export const generateExperienceSchema = z.object({
  jobRole: shortText,
  experienceLevel: shortText,
  yearsOfExperience: z.coerce.number().min(0).max(70),
  techStack: listOrText,
});

export const generateProjectSchema = z.object({
  jobTitle: shortText,
  experienceLevel: shortText,
  techStack: listOrText,
});

export const improveContentSchema = z.object({
  // A resume bullet or paragraph. Comfortably above the longest thing the
  // editor's textareas produce.
  content: z.string().trim().min(1).max(8_000),
});

export const atsScoreSchema = z.object({
  // A whole resume serialized to plain text — the largest legitimate input.
  resumeText: z.string().trim().min(1).max(20_000),
});

/** The shape the ATS route promises the UI, validated before it is returned. */
export const atsResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categoryScores: z.object({
    keywordOptimization: z.number().min(0).max(100),
    formattingStructure: z.number().min(0).max(100),
    actionVerbsImpact: z.number().min(0).max(100),
    contactEssentialInfo: z.number().min(0).max(100),
    clarityConciseness: z.number().min(0).max(100),
  }),
  strengths: z.array(z.string()).max(10),
  weaknesses: z.array(z.string()).max(10),
  suggestions: z.array(z.string()).max(10),
});

export type AtsResult = z.infer<typeof atsResultSchema>;

/**
 * The same shape again, in the form Gemini accepts, so the model is
 * constrained rather than merely asked. `propertyOrdering` matters: without
 * it the model may emit keys in an order that reads oddly in a stream.
 */
export const atsResponseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: { type: Type.NUMBER },
    categoryScores: {
      type: Type.OBJECT,
      properties: {
        keywordOptimization: { type: Type.NUMBER },
        formattingStructure: { type: Type.NUMBER },
        actionVerbsImpact: { type: Type.NUMBER },
        contactEssentialInfo: { type: Type.NUMBER },
        clarityConciseness: { type: Type.NUMBER },
      },
      required: [
        "keywordOptimization",
        "formattingStructure",
        "actionVerbsImpact",
        "contactEssentialInfo",
        "clarityConciseness",
      ],
    },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    "overallScore",
    "categoryScores",
    "strengths",
    "weaknesses",
    "suggestions",
  ],
} satisfies Schema;

/** Renders either accepted list shape for a prompt. */
export function asList(value: string[] | string): string {
  return Array.isArray(value) ? value.join(", ") : value;
}
