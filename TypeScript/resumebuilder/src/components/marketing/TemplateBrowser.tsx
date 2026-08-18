"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Lock, TriangleAlert } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ResumeThumbnail } from "@/components/resume/ResumeThumbnail";
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
      {/*
        The preview link is an overlay rather than a wrapper: templates render
        real anchors for GitHub/LinkedIn, and `<a>` inside `<a>` is invalid
        HTML. Keeping it a sibling of the thumbnail avoids the nesting.
      */}
      <div className="relative border-b border-line bg-surface">
        <ResumeThumbnail
          data={SAMPLE_RESUME}
          templateId={template.id}
          height={400}
          scale={0.42}
          className="bg-transparent"
        />

        <Link
          href={`/templates/${template.id}`}
          aria-label={`Preview the ${template.name} template`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
        />

        <span className="pointer-events-none absolute left-3 top-3 z-20 flex gap-1.5">
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
      </div>

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
