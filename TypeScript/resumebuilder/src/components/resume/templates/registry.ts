import type { ComponentType } from "react";
import { ClassicTemplate } from "./ClassicTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { BannerTemplate } from "./BannerTemplate";
import { SidebarTemplate } from "./SidebarTemplate";
import { TimelineTemplate } from "./TimelineTemplate";
import type { TemplateProps } from "./shared";

export type TemplateId =
  | "classic"
  | "minimal"
  | "compact"
  | "banner"
  | "sidebar"
  | "timeline";

export type TemplateTier = "free" | "premium";

/** How safely a layout survives an applicant tracking system's parser. */
export type AtsRating = "excellent" | "good" | "check";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tier: TemplateTier;
  tagline: string;
  description: string;
  bestFor: string;
  ats: AtsRating;
  atsNote: string;
  component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    name: "Classic",
    tier: "free",
    tagline: "Centred header, ruled sections",
    description:
      "The layout most recruiters expect and every parser handles. Name and contact details centred at the top, then a single column of ruled sections in a conventional order.",
    bestFor: "Almost any role, and the safest default for a first application.",
    ats: "excellent",
    atsNote:
      "Single column, real headings, no graphics. Nothing here confuses a parser.",
    component: ClassicTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    tier: "free",
    tagline: "No rules, space does the work",
    description:
      "Left-aligned and quiet. Section breaks come from whitespace and letter-spacing rather than lines, and the summary sits as an opening paragraph.",
    bestFor: "Design, product and writing roles where restraint reads well.",
    ats: "excellent",
    atsNote: "Single column with plain headings. Parses as cleanly as Classic.",
    component: MinimalTemplate,
  },
  {
    id: "compact",
    name: "Compact",
    tier: "free",
    tagline: "Section labels in a left gutter",
    description:
      "Smaller type, tighter leading, and labels moved into a narrow left gutter so the content column runs wider. Fits a long history on one page.",
    bestFor: "Ten-plus years of history that needs to stay on a single page.",
    ats: "good",
    atsNote:
      "Still one content column. The gutter is a grid label, not a second column of content.",
    component: CompactTemplate,
  },
  {
    id: "banner",
    name: "Banner",
    tier: "premium",
    tagline: "Dark header band",
    description:
      "A full-bleed dark band carries the name and contact row, with skills rendered as chips further down. More presence at the top without giving up the single-column body.",
    bestFor: "Senior and lead roles where the header should land first.",
    ats: "good",
    atsNote:
      "The band is a background colour, not an image, so the name underneath stays selectable text.",
    component: BannerTemplate,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    tier: "premium",
    tagline: "Contact and skills in a tinted rail",
    description:
      "Contact details, skills, education and certifications live in a tinted left rail; experience and projects fill the main column.",
    bestFor: "Skill-dense roles where the stack should be visible immediately.",
    ats: "check",
    atsNote:
      "Two columns. Some older parsers read a page in visual order and interleave the two, scrambling the result. Worth testing before you send it somewhere that matters.",
    component: SidebarTemplate,
  },
  {
    id: "timeline",
    name: "Timeline",
    tier: "premium",
    tagline: "Dated rail down the left",
    description:
      "Dates sit in a left rail joined by a rule, so a career reads as a sequence rather than a stack of blocks.",
    bestFor: "Steady progression you want to be read in order.",
    ats: "good",
    atsNote:
      "The rail is drawn with borders rather than graphics, and dates remain real text.",
    component: TimelineTemplate,
  },
];

export const DEFAULT_TEMPLATE: TemplateId = "classic";

export function getTemplate(id: string | undefined): TemplateMeta {
  return (
    TEMPLATES.find((template) => template.id === id) ??
    TEMPLATES.find((template) => template.id === DEFAULT_TEMPLATE)!
  );
}

export const ATS_LABEL: Record<AtsRating, string> = {
  excellent: "ATS-safe",
  good: "ATS-safe",
  check: "Test before sending",
};
