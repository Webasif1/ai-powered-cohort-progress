import { EMPTY_RESUME, type IResume, type ResumeData } from "@/types/resume.types";

/**
 * Turns a raw API row into the shape the editor, preview and templates all
 * expect.
 *
 * Two things have to be absorbed here: documents written before the schema
 * was aligned still carry the legacy `summery` / `workExperience` names, and
 * documents created before templates existed have no `template` at all. This
 * merge used to be copy-pasted into every page that loaded a resume.
 */
export function normalizeResume(
  raw: Partial<IResume> | null | undefined,
  fallbackId = "",
): ResumeData {
  const source = raw ?? {};

  return {
    ...EMPTY_RESUME,
    _id: (source._id as string | undefined) || fallbackId,
    title: source.title || EMPTY_RESUME.title,
    template: source.template || EMPTY_RESUME.template,
    personalInfo: { ...EMPTY_RESUME.personalInfo, ...source.personalInfo },
    summary: source.summary ?? source.summery ?? "",
    experience: source.experience ?? source.workExperience ?? [],
    projects: source.projects ?? [],
    skills: source.skills ?? [],
    education: source.education ?? [],
    certifications: source.certifications ?? [],
  };
}
