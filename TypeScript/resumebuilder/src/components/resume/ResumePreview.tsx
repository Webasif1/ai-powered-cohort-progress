"use client";

import { memo } from "react";
import { getTemplate } from "./templates/registry";
import type { ResumeData } from "@/types/resume.types";

/**
 * The rendered document.
 *
 * This used to hold the Classic layout inline. It now resolves the resume's
 * `template` through the registry and delegates, so the editor preview, the
 * print/export page and the marketing gallery all render through exactly the
 * same components — there is no second implementation to drift.
 *
 * Templates are deliberately not theme-aware: a resume is a printed
 * artefact, so the sheet stays white paper with black ink in both themes and
 * what is on screen is what lands in the PDF. Only the surface behind it
 * follows the theme.
 */
const ResumePreview = memo(function ResumePreview({
  data,
  className,
}: {
  data: ResumeData;
  className?: string;
}) {
  const Template = getTemplate(data.template).component;

  return <Template data={data} className={className} />;
});

export default ResumePreview;
