import { toText } from "@/lib/aiText";
import { cn } from "@/lib/cn";
import type { ResumeData } from "@/types/resume.types";

/**
 * Pieces every template reuses.
 *
 * Templates are intentionally not theme-aware: a resume is a printed
 * artefact, so the sheet stays white paper with black ink in both themes
 * and what is on screen is exactly what lands in the PDF.
 */

export interface TemplateProps {
  data: ResumeData;
  className?: string;
}

export function formatDate(value: string): string {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function dateRange(
  start: string,
  end: string,
  current: boolean,
): string {
  const from = formatDate(start);
  const to = current ? "Present" : formatDate(end);
  if (!from && !to) return "";
  return [from, to].filter(Boolean).join(" — ");
}

export function cleanUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export function href(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

/** Splits a description into bullet lines, ignoring blank rows. */
export function toBullets(value: string): string[] {
  return toText(value)
    .split("\n")
    .map((line) => line.replace(/^[-•*\s]+/, "").trim())
    .filter(Boolean);
}

export function hasHeader(data: ResumeData): boolean {
  const { personalInfo } = data;
  return Boolean(
    personalInfo.fullName ||
      personalInfo.email ||
      personalInfo.phone ||
      personalInfo.location,
  );
}

export function isEmpty(data: ResumeData): boolean {
  return (
    !hasHeader(data) &&
    !toText(data.summary) &&
    !data.experience.length &&
    !data.projects.length &&
    !data.skills.length &&
    !data.education.length &&
    !data.certifications.filter(Boolean).length
  );
}

export function contactList(data: ResumeData): string[] {
  const { personalInfo } = data;
  return [personalInfo.email, personalInfo.phone, personalInfo.location].filter(
    Boolean,
  );
}

export function linkList(data: ResumeData): string[] {
  const { personalInfo } = data;
  return [
    personalInfo.github,
    personalInfo.linkedin,
    personalInfo.portfolio,
  ].filter(Boolean);
}

/** The white A4-ish page every template renders onto. */
export function Sheet({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "print-sheet mx-auto w-full max-w-[760px] overflow-hidden rounded-lg border border-line bg-white text-[#111] shadow-md",
        "text-[13px] leading-[1.6]",
        className,
      )}
    >
      {children}
    </article>
  );
}

export function EmptyNotice() {
  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 text-center print-hide">
      <p className="max-w-xs text-[13px] leading-relaxed text-fg-muted">
        Your resume renders here as you type. Start with your name and contact
        details.
      </p>
    </div>
  );
}

export function Bullets({ text }: { text: string }) {
  const bullets = toBullets(text);
  if (!bullets.length) return null;

  // A single line reads better as a paragraph than as a lone bullet.
  if (bullets.length === 1) {
    return <p className="mt-1.5 text-[#444]">{bullets[0]}</p>;
  }

  return (
    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[#444] marker:text-[#999]">
      {bullets.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}

export function LinkText({ url }: { url: string }) {
  return (
    <a
      href={href(url)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#2563eb] underline-offset-2 hover:underline"
    >
      {cleanUrl(url)}
    </a>
  );
}
