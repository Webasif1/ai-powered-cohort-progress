import { z } from "zod";
import { DEFAULT_TEMPLATE, FREE_TEMPLATE_IDS } from "@/components/resume/templates/registry";

/**
 * The allowlist for writes.
 *
 * PATCH used to be `$set: body` with the raw request. `user_id` is a writable
 * schema path, so a caller could move their own document into someone else's
 * dashboard; `template` could be set to a premium id, bypassing the check the
 * create route enforces; and every string field was unbounded up to Mongo's
 * 16 MB document limit.
 *
 * Anything not named here is dropped rather than rejected, so an older client
 * sending an extra field still saves.
 */

const text = (max: number) => z.string().max(max);

const personalInfoSchema = z
  .object({
    fullName: text(120),
    email: text(254),
    phone: text(40),
    location: text(120),
    github: text(300),
    linkedin: text(300),
    portfolio: text(300),
  })
  .partial();

const experienceSchema = z.object({
  id: text(64).optional(),
  company: text(160).optional(),
  position: text(160).optional(),
  startDate: text(40).optional(),
  endDate: text(40).optional(),
  current: z.boolean().optional(),
  description: text(4_000).optional(),
});

const projectSchema = z.object({
  id: text(64).optional(),
  title: text(160).optional(),
  description: text(4_000).optional(),
  githubUrl: text(300).optional(),
  liveUrl: text(300).optional(),
  techStack: z.array(text(80)).max(40).optional(),
});

const educationSchema = z.object({
  id: text(64).optional(),
  degree: text(160).optional(),
  institution: text(160).optional(),
  startYear: text(20).optional(),
  endYear: text(20).optional(),
});

/** Premium layouts are not purchasable yet, so only free ids are accepted. */
export const templateSchema = z
  .string()
  .refine((id): id is string => FREE_TEMPLATE_IDS.includes(id), {
    message: "That template is not available",
  });

export const resumeUpdateSchema = z
  .object({
    title: text(120),
    template: templateSchema,
    summary: text(4_000),
    personalInfo: personalInfoSchema,
    experience: z.array(experienceSchema).max(30),
    projects: z.array(projectSchema).max(30),
    skills: z.array(text(80)).max(100),
    education: z.array(educationSchema).max(20),
    certifications: z.array(text(200)).max(40),
  })
  .partial()
  .strip();

export const resumeCreateSchema = z
  .object({
    template: templateSchema.optional(),
    /** Present means "duplicate this one" rather than "create a blank". */
    from: z.string().max(64).optional(),
  })
  .strip();

/** Unrecognised or premium ids fall back rather than failing the request. */
export function resolveTemplate(id: unknown): string {
  return typeof id === "string" && FREE_TEMPLATE_IDS.includes(id)
    ? id
    : DEFAULT_TEMPLATE;
}
