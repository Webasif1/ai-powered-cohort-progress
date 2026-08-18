import type { IResume } from "@/types/resume.types";

/**
 * How finished a resume is, as six equally-weighted sections.
 *
 * The editor header and the dashboard cards both show this number, so it
 * lives here rather than inline in either — two copies would drift and the
 * same resume would read 60% in one place and 50% in the other.
 *
 * Accepts a raw API row, not a normalised `ResumeData`: the dashboard renders
 * documents straight off `GET /api/resumes`, where older records may be
 * missing `personalInfo` entirely or still carry the legacy `summery` and
 * `workExperience` names.
 */

export type CompletionSource = Partial<IResume> | null | undefined;

interface Section {
  key: string;
  label: string;
  done: (resume: NonNullable<CompletionSource>) => boolean;
}

const SECTIONS: Section[] = [
  {
    key: "personalInfo",
    label: "your name and email",
    done: (r) => Boolean(r.personalInfo?.fullName && r.personalInfo?.email),
  },
  {
    key: "summary",
    label: "a professional summary",
    done: (r) => Boolean((r.summary ?? r.summery ?? "").trim()),
  },
  {
    key: "experience",
    label: "your work experience",
    done: (r) => (r.experience ?? r.workExperience ?? []).length > 0,
  },
  { key: "projects", label: "a project", done: (r) => (r.projects ?? []).length > 0 },
  { key: "skills", label: "your skills", done: (r) => (r.skills ?? []).length > 0 },
  {
    key: "education",
    label: "your education",
    done: (r) => (r.education ?? []).length > 0,
  },
];

/** 0–100. */
export function completionPercent(resume: CompletionSource): number {
  if (!resume) return 0;

  const done = SECTIONS.filter((section) => section.done(resume)).length;
  return Math.round((done / SECTIONS.length) * 100);
}

/** Human labels for what is still missing, in the order they should be added. */
export function missingSections(resume: CompletionSource): string[] {
  if (!resume) return SECTIONS.map((section) => section.label);

  return SECTIONS.filter((section) => !section.done(resume)).map(
    (section) => section.label,
  );
}
