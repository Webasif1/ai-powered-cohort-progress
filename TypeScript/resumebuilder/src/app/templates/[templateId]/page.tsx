import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, TriangleAlert } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TEMPLATES } from "@/components/resume/templates/registry";
import { SAMPLE_RESUME } from "@/lib/sampleResume";

interface Params {
  params: Promise<{ templateId: string }>;
}

export function generateStaticParams() {
  return TEMPLATES.map((template) => ({ templateId: template.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) return { title: "Template not found" };

  return {
    title: `${template.name} resume template`,
    description: template.description,
  };
}

export default async function TemplateDetailPage({ params }: Params) {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) notFound();

  const Template = template.component;
  const isPremium = template.tier === "premium";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 bg-surface pb-20">
        <Container className="py-10">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 rounded-md text-[13px] font-medium text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            All templates
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
            {/* Details */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-wrap items-center gap-2">
                {isPremium ? (
                  <Badge tone="accent" className="gap-1">
                    <Lock aria-hidden className="h-3 w-3" />
                    Premium
                  </Badge>
                ) : (
                  <Badge tone="success">Free</Badge>
                )}

                <Badge tone={template.ats === "check" ? "warning" : "neutral"}>
                  {template.ats === "check" && (
                    <TriangleAlert aria-hidden className="h-3 w-3" />
                  )}
                  {template.ats === "check"
                    ? "Test before sending"
                    : "ATS-safe"}
                </Badge>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-fg">
                {template.name}
              </h1>
              <p className="mt-1.5 text-[13px] text-fg-muted">
                {template.tagline}
              </p>

              <p className="mt-5 text-[13px] leading-relaxed text-fg-muted">
                {template.description}
              </p>

              <dl className="mt-6 space-y-4 border-t border-line pt-5">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.09em] text-fg-subtle">
                    Best for
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                    {template.bestFor}
                  </dd>
                </div>

                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.09em] text-fg-subtle">
                    How it parses
                  </dt>
                  <dd className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                    {template.atsNote}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                {isPremium ? (
                  <div className="rounded-lg border border-line bg-elevated p-4">
                    <p className="text-[13px] font-medium text-fg">
                      Paid plans are not available yet
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                      There is no checkout on this build, so this layout cannot
                      be selected in the editor. The free templates are fully
                      usable today.
                    </p>
                    <ButtonLink
                      href="/templates"
                      variant="secondary"
                      size="sm"
                      className="mt-3 w-full"
                    >
                      See the free templates
                    </ButtonLink>
                  </div>
                ) : (
                  <ButtonLink
                    href="/auth/register"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Use this template
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
                Previewed with a fictional sample resume. Amara Okafor and
                Northwind Analytics are not real.
              </p>
            </div>

            {/* Live template */}
            <div>
              <Template data={SAMPLE_RESUME} />
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
