"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Lock, TriangleAlert } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  ATS_LABEL,
  TEMPLATES,
  type TemplateMeta,
} from "@/components/resume/templates/registry";
import { SAMPLE_RESUME } from "@/lib/sampleResume";
import { cn } from "@/lib/cn";

type Filter = "all" | "free" | "premium";

export function TemplateBrowser() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () =>
      filter === "all"
        ? TEMPLATES
        : TEMPLATES.filter((template) => template.tier === filter),
    [filter],
  );

  const freeCount = TEMPLATES.filter((t) => t.tier === "free").length;
  const premiumCount = TEMPLATES.length - freeCount;

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          aria-label="Filter templates"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: `All ${TEMPLATES.length}` },
            { value: "free", label: `Free ${freeCount}` },
            { value: "premium", label: `Premium ${premiumCount}` },
          ]}
        />
        <p className="text-[13px] text-fg-muted">
          Every preview below is the real template, rendered from the same
          sample resume.
        </p>
      </div>

      <ul className="mt-8 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((template) => (
          <li key={template.id} className="w-full max-w-[360px]">
            <TemplateCard template={template} />
          </li>
        ))}
      </ul>
    </>
  );
}

function TemplateCard({ template }: { template: TemplateMeta }) {
  const isPremium = template.tier === "premium";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-elevated shadow-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
      <Link
        href={`/templates/${template.id}`}
        aria-label={`Preview the ${template.name} template`}
        className="relative block border-b border-line bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        <TemplateThumbnail template={template} />

        <span className="absolute left-3 top-3 flex gap-1.5">
          {isPremium ? (
            <Badge tone="accent" className="gap-1 bg-elevated shadow-xs">
              <Lock aria-hidden className="h-3 w-3" />
              Premium
            </Badge>
          ) : (
            <Badge tone="success" className="gap-1 bg-elevated shadow-xs">
              <Check aria-hidden className="h-3 w-3" />
              Free
            </Badge>
          )}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-sm font-semibold text-fg">{template.name}</h3>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 text-[11px] font-medium",
              template.ats === "check" ? "text-warning" : "text-success",
            )}
            title={template.atsNote}
          >
            {template.ats === "check" && (
              <TriangleAlert aria-hidden className="h-3 w-3" />
            )}
            {ATS_LABEL[template.ats]}
          </span>
        </div>

        <p className="mt-1 text-[13px] text-fg-muted">{template.tagline}</p>

        <p className="mt-3 flex-1 text-xs leading-relaxed text-fg-subtle">
          {template.bestFor}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <ButtonLink
            href={`/templates/${template.id}`}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            Preview
          </ButtonLink>

          {isPremium ? (
            // No billing exists yet, so this cannot claim to be purchasable.
            <span
              className="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-line bg-surface px-3 text-[13px] font-medium text-fg-subtle"
              title="Paid plans are not available yet"
            >
              Not yet available
            </span>
          ) : (
            <ButtonLink
              href={`/resume/new?template=${template.id}`}
              variant="primary"
              size="sm"
              className="flex-1"
            >
              Use it
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Renders the actual template scaled down, rather than a mock-up, so the
 * card cannot drift out of sync with what the template really produces.
 * The sheet is 760px wide; the frame is a fixed 320x400 window onto it.
 */
export function TemplateThumbnail({ template }: { template: TemplateMeta }) {
  const Template = template.component;

  return (
    <div
      aria-hidden
      className="relative h-[400px] w-full overflow-hidden"
      // The sheet renders at its natural width and is then scaled, so the
      // preview shows real type sizes and spacing rather than a re-layout.
    >
      <div className="absolute left-1/2 top-5 w-[760px] -translate-x-1/2">
        <div className="origin-top scale-[0.42]">
          <Template data={SAMPLE_RESUME} className="shadow-none" />
        </div>
      </div>

      {/* Fades the cut-off bottom edge instead of slicing mid-line. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}
