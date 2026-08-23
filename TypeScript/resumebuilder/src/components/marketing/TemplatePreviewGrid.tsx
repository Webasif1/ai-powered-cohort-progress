import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ResumeThumbnail } from "@/components/resume/ResumeThumbnail";
import { TEMPLATES } from "@/components/resume/templates/registry";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { SAMPLE_RESUME } from "@/lib/sampleResume";

/**
 * The three free layouts, rendered from the registry.
 *
 * This replaces a hand-written list that claimed the app shipped one template
 * with two "coming soon" — while `/templates` was already showing six real
 * ones, three of them selectable. The landing page was the last place still
 * describing a much older version of the product.
 */
export function TemplatePreviewGrid() {
  const free = TEMPLATES.filter((template) => template.tier === "free");
  const premiumCount = TEMPLATES.length - free.length;

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {free.map((template) => (
          <li key={template.id}>
            {/*
              The link is an overlay rather than a wrapper: the thumbnail
              renders a real template, and templates contain real anchors.
            */}
            <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-elevated shadow-xs transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
              <div className="relative border-b border-line bg-surface">
                <ResumeThumbnail
                  data={SAMPLE_RESUME}
                  templateId={template.id}
                  height={280}
                  scale={0.36}
                  className="bg-transparent"
                />
                <span className="pointer-events-none absolute left-3 top-3 z-20">
                  <Badge tone="success" className="gap-1 bg-elevated shadow-xs">
                    <Check aria-hidden className="h-3 w-3" />
                    Free
                  </Badge>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-semibold text-fg">{template.name}</h3>
                <p className="mt-1 text-[13px] text-fg-muted">{template.tagline}</p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-fg-subtle">
                  {template.bestFor}
                </p>
              </div>

              <Link
                href={`/templates/${template.id}`}
                className="absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                <span className="sr-only">Preview the {template.name} template</span>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <ButtonLink href="/templates" variant="secondary">
          See all {TEMPLATES.length} templates
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
        <p className="text-[13px] text-fg-muted">
          {free.length} free to use now
          {premiumCount > 0 && `, ${premiumCount} premium in progress`}.
        </p>
      </div>
    </>
  );
}
