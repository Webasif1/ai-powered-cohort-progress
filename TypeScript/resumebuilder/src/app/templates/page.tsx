import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { GuideRule } from "@/components/marketing/GuideFrame";
import { TemplateBrowser } from "@/components/marketing/TemplateBrowser";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Resume templates",
  description:
    "Six resume layouts previewed with a complete sample resume, with an honest note on how each one holds up against an applicant tracking system.",
};

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-surface py-16 sm:py-20">
          <Container>
            <div className="max-w-2xl">
              <Badge tone="neutral" className="bg-elevated shadow-xs">
                Templates
              </Badge>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">
                Six layouts, one sample resume
              </h1>

              <p className="mt-5 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                Every preview on this page is the real template rendered from
                the same demo content, so what you see is what the builder
                produces. Each one carries a note on how it holds up when an
                applicant tracking system parses it.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/auth/register" variant="primary" size="lg">
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/#faq" variant="secondary" size="lg">
                  How export works
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <GuideRule />

        <section className="py-14 sm:py-16">
          <Container>
            <TemplateBrowser />
          </Container>
        </section>

        <GuideRule />

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
              <div>
                <p className="text-[13px] font-medium text-accent">
                  Choosing one
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg">
                  Boring parses best
                </h2>
              </div>

              <div className="space-y-4 text-[13px] leading-relaxed text-fg-muted">
                <p>
                  A resume is read twice: once by software that turns it back
                  into plain text, and once by a person skimming for about ten
                  seconds. The first reader is the one that eliminates you, and
                  it does not care how the page looks.
                </p>
                <p>
                  That is why the free templates are all single-column. Real
                  headings, selectable text and one reading order survive
                  parsing intact. The premium layouts add presence at the top or
                  a stronger sense of sequence without giving that up — except{" "}
                  <strong className="font-medium text-fg">Sidebar</strong>,
                  which is genuinely two-column and can be interleaved by older
                  parsers. It is flagged on its own card for that reason.
                </p>
                <p>
                  Export goes through your browser&apos;s print-to-PDF either
                  way, so the file you send is real text rather than a picture
                  of a resume.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
