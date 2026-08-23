import { toText } from "./aiText";
import type { ResumeData } from "@/types/resume.types";

/**
 * Flattens a resume into the plain text an ATS would extract from the PDF.
 *
 * Scoring the structured object would measure the wrong thing — an applicant
 * tracking system sees a text dump, so that is what the model should judge.
 * Section headings are included because "does it use standard headers" is one
 * of the five things being scored.
 */
export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];
  const section = (heading: string, body: string[]) => {
    if (body.length === 0) return;
    lines.push("", heading.toUpperCase(), ...body);
  };

  const { personalInfo: info } = data;

  if (info.fullName) lines.push(info.fullName);

  const contact = [info.email, info.phone, info.location].filter(Boolean);
  if (contact.length) lines.push(contact.join(" | "));

  const links = [info.github, info.linkedin, info.portfolio].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  section("Summary", toText(data.summary) ? [toText(data.summary)] : []);

  section(
    "Experience",
    data.experience.flatMap((item) => {
      const dates = [item.startDate, item.current ? "Present" : item.endDate]
        .filter(Boolean)
        .join(" - ");
      return [
        [item.position, item.company].filter(Boolean).join(" — ") +
          (dates ? ` (${dates})` : ""),
        toText(item.description),
      ].filter(Boolean);
    }),
  );

  section(
    "Projects",
    data.projects.flatMap((item) =>
      [
        item.title,
        toText(item.description),
        item.techStack?.length ? `Tech: ${item.techStack.join(", ")}` : "",
      ].filter(Boolean),
    ),
  );

  section("Skills", data.skills.length ? [data.skills.join(", ")] : []);

  section(
    "Education",
    data.education.map((item) =>
      [
        [item.degree, item.institution].filter(Boolean).join(" — "),
        [item.startYear, item.endYear].filter(Boolean).join(" - "),
      ]
        .filter(Boolean)
        .join(" "),
    ),
  );

  const certifications = data.certifications.filter(Boolean);
  section("Certifications", certifications);

  // The route caps input at 20 000 characters; trimming here means a very
  // long resume is scored on what fits rather than rejected outright.
  return lines.join("\n").trim().slice(0, 20_000);
}
