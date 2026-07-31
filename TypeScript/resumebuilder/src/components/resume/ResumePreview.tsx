"use client";

import { memo } from "react";
import { toText } from "@/lib/aiText";
import { cn } from "@/lib/cn";
import type { ResumeData } from "@/types/resume.types";

/**
 * The rendered document.
 *
 * Deliberately *not* theme-aware: a resume is a printed artefact, so the
 * sheet stays white paper with black ink in both light and dark mode, and
 * what you see is exactly what lands in the PDF. Only the surface it sits on
 * follows the theme.
 */

function formatDate(value: string): string {
  if (!value) return "";
  if (value.toLowerCase() === "present") return "Present";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function cleanUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

function href(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

const ResumePreview = memo(function ResumePreview({
  data,
  className,
}: {
  data: ResumeData;
  className?: string;
}) {
  const {
    personalInfo,
    summary,
    experience,
    projects,
    skills,
    education,
    certifications,
  } = data;

  const summaryText = toText(summary);

  const hasHeader = Boolean(
    personalInfo.fullName ||
      personalInfo.email ||
      personalInfo.phone ||
      personalInfo.location,
  );

  const isEmpty =
    !hasHeader &&
    !summaryText &&
    !experience.length &&
    !projects.length &&
    !skills.length &&
    !education.length &&
    !certifications.length;

  if (isEmpty) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-lg border border-dashed border-line bg-surface px-6 text-center print-hide">
        <p className="max-w-xs text-[13px] leading-relaxed text-fg-muted">
          Your resume renders here as you type. Start with your name and
          contact details.
        </p>
      </div>
    );
  }

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ].filter(Boolean);

  const links = [
    personalInfo.github,
    personalInfo.linkedin,
    personalInfo.portfolio,
  ].filter(Boolean);

  return (
    <article
      className={cn(
        "print-sheet mx-auto w-full max-w-[760px] rounded-lg border border-line bg-white px-10 py-11 text-[#111] shadow-md",
        "text-[13px] leading-[1.65]",
        className,
      )}
    >
      {/* ---------- Header ---------- */}
      {hasHeader && (
        <header className="print-block border-b border-[#e5e5e5] pb-4 text-center">
          {personalInfo.fullName && (
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#111]">
              {personalInfo.fullName}
            </h1>
          )}

          {contacts.length > 0 && (
            <p className="mt-2 text-[12.5px] text-[#444]">
              {contacts.join("  ·  ")}
            </p>
          )}

          {links.length > 0 && (
            <p className="mt-1.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px]">
              {links.map((link) => (
                <a
                  key={link}
                  href={href(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] underline-offset-2 hover:underline"
                >
                  {cleanUrl(link)}
                </a>
              ))}
            </p>
          )}
        </header>
      )}

      {/* ---------- Summary ---------- */}
      {summaryText && (
        <Section title="Summary">
          <p className="whitespace-pre-line text-[#333]">{summaryText}</p>
        </Section>
      )}

      {/* ---------- Experience ---------- */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-4">
            {experience.map((item, i) => (
              <div key={item.id || i} className="print-block">
                <EntryHead
                  primary={item.position}
                  secondary={item.company}
                  meta={`${formatDate(item.startDate)}${
                    item.startDate ? " — " : ""
                  }${item.current ? "Present" : formatDate(item.endDate)}`}
                />
                {item.description && (
                  <p className="mt-1.5 whitespace-pre-line text-[#444]">
                    {toText(item.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------- Projects ---------- */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-4">
            {projects.map((item, i) => (
              <div key={item.id || i} className="print-block">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[14px] font-semibold text-[#111]">
                    {item.title}
                  </h3>
                  <span className="flex shrink-0 gap-3 text-[11.5px]">
                    {item.githubUrl && (
                      <a
                        href={href(item.githubUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563eb] underline-offset-2 hover:underline"
                      >
                        Code
                      </a>
                    )}
                    {item.liveUrl && (
                      <a
                        href={href(item.liveUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2563eb] underline-offset-2 hover:underline"
                      >
                        Live
                      </a>
                    )}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-1.5 whitespace-pre-line text-[#444]">
                    {toText(item.description)}
                  </p>
                )}

                {item.techStack.length > 0 && (
                  <p className="mt-1.5 text-[11.5px] text-[#666]">
                    {item.techStack.join(" · ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------- Skills ---------- */}
      {skills.length > 0 && (
        <Section title="Skills">
          <p className="text-[#333]">{skills.join("  ·  ")}</p>
        </Section>
      )}

      {/* ---------- Education ---------- */}
      {education.length > 0 && (
        <Section title="Education">
          <div className="space-y-3">
            {education.map((item, i) => (
              <div key={item.id || i} className="print-block">
                <EntryHead
                  primary={item.degree}
                  secondary={item.institution}
                  meta={[item.startYear, item.endYear]
                    .filter(Boolean)
                    .join(" — ")}
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ---------- Certifications ---------- */}
      {certifications.filter(Boolean).length > 0 && (
        <Section title="Certifications">
          <ul className="list-disc space-y-1 pl-5 text-[#444]">
            {certifications.filter(Boolean).map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
});

export default ResumePreview;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 border-b border-[#e5e5e5] pb-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-[#111]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EntryHead({
  primary,
  secondary,
  meta,
}: {
  primary: string;
  secondary: string;
  meta: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-[14px] font-semibold text-[#111]">{primary}</h3>
        {secondary && <p className="text-[12.5px] text-[#666]">{secondary}</p>}
      </div>
      {meta.trim() && (
        <p className="shrink-0 whitespace-nowrap text-[11.5px] text-[#888]">
          {meta}
        </p>
      )}
    </div>
  );
}
