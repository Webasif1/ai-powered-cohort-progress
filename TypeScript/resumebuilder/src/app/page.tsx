import {
  ArrowRight,
  FileText,
  FolderGit2,
  Gauge,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { GuideFrame, GuideRule } from "@/components/marketing/GuideFrame";
import { HeroShowcase } from "@/components/marketing/HeroShowcase";
import { ScorePanel } from "@/components/marketing/ScorePanel";
import { StatsBand } from "@/components/marketing/StatsBand";
import { TemplateGallery } from "@/components/marketing/TemplateGallery";
import { FAQ } from "@/components/marketing/FAQ";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: Sparkles,
    title: "Summary generator",
    description:
      "A professional summary tailored to the role you are actually applying for, in one click.",
  },
  {
    icon: Gauge,
    title: "ATS score",
    description:
      "See what the filter sees. Get a score plus the specific lines holding it down.",
  },
  {
    icon: Wrench,
    title: "Skills optimiser",
    description:
      "Suggests the keywords a recruiter's search is built around, without keyword stuffing.",
  },
  {
    icon: FileText,
    title: "Experience writer",
    description:
      "Turns responsibilities into achievements with strong verbs and measurable outcomes.",
  },
  {
    icon: FolderGit2,
    title: "Project descriptions",
    description:
      "Rough notes and a tech stack in, recruiter-ready project write-ups out.",
  },
  {
    icon: Zap,
    title: "Live preview",
    description:
      "The page renders as you type, and exports to a clean PDF at any moment.",
  },
];

const steps = [
  {
    number: "01",
    title: "Fill in the facts",
    description:
      "Guided sections for experience, projects, skills and education. Everything autosaves.",
  },
  {
    number: "02",
    title: "Let AI do the phrasing",
    description:
      "Generate or improve any block. You keep the facts; the model handles the wording.",
  },
  {
    number: "03",
    title: "Score, export, apply",
    description:
      "Check the ATS readout, fix what it flags, download the PDF and send it.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* ==================== HERO ==================== */}
        <section className="relative overflow-hidden bg-surface pt-16 sm:pt-24">
          <GuideFrame />

          <Container className="relative">
            <Reveal as="div" className="mx-auto max-w-3xl text-center" stagger>
              <Badge
                tone="neutral"
                className="gap-2 bg-elevated py-1 pl-1 pr-3 shadow-xs"
              >
                <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-fg">
                  New
                </span>
                Real-time ATS scoring
              </Badge>

              <h1 className="mt-6 text-display text-fg">
                Resumes that get read.
                <br />
                Not filtered out.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fg-muted sm:text-base">
                Draft, score and export an ATS-ready resume in minutes. The AI
                handles the phrasing — you keep every fact.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/auth/register" variant="primary" size="lg">
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                  See how it works
                </ButtonLink>
              </div>

              <p className="mt-5 text-xs text-fg-subtle">
                Free to start · No card required · Export as PDF
              </p>
            </Reveal>
          </Container>

          <div className="relative mt-16 sm:mt-20">
            <GuideRule />
            <Container className="pt-10">
              <Reveal delay={0.1}>
                <HeroShowcase />
              </Reveal>
            </Container>
          </div>
        </section>

        {/* ==================== STATS ==================== */}
        <Reveal>
          <StatsBand />
        </Reveal>

        {/* ==================== FEATURES ==================== */}
        <section id="features" className="scroll-mt-20 py-20 sm:py-28">
          <Container>
            <Reveal as="div" className="max-w-2xl">
              <p className="text-[13px] font-medium text-accent">Features</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                Every part of the page, handled
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                Six tools that each remove one of the jobs that makes writing a
                resume take an entire weekend.
              </p>
            </Reveal>

            {/*
              Fade only — these tiles sit on a `gap-px` parent whose background
              draws the hairline grid, so moving them would tear the seams.
            */}
            <Reveal
              as="ul"
              className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
              stagger
              y={0}
            >
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="group bg-elevated p-6 transition-colors duration-200 hover:bg-surface"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent-soft">
                    <feature.icon
                      aria-hidden
                      className="h-4 w-4 text-fg-muted transition-colors duration-200 group-hover:text-accent"
                    />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-fg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                    {feature.description}
                  </p>
                </li>
              ))}
            </Reveal>
          </Container>
        </section>

        <GuideRule />

        {/* ==================== HOW IT WORKS ==================== */}
        <section
          id="how-it-works"
          className="scroll-mt-20 bg-surface py-20 sm:py-28"
        >
          <Container>
            <Reveal as="div" className="max-w-2xl">
              <p className="text-[13px] font-medium text-accent">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                Three steps, one sitting
              </h2>
            </Reveal>

            <Reveal as="ol" className="mt-12 grid gap-8 sm:grid-cols-3" stagger>
              {steps.map((step) => (
                <li key={step.number} className="relative">
                  <span className="block font-mono text-xs text-fg-subtle">
                    {step.number}
                  </span>
                  <span className="mt-4 block border-t border-line pt-4">
                    <h3 className="text-[15px] font-semibold text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                      {step.description}
                    </p>
                  </span>
                </li>
              ))}
            </Reveal>
          </Container>
        </section>

        <GuideRule />

        {/* ==================== TEMPLATES ==================== */}
        <section id="templates" className="scroll-mt-20 py-20 sm:py-28">
          <Container>
            <Reveal as="div" className="max-w-2xl">
              <p className="text-[13px] font-medium text-accent">Templates</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                Layouts a parser can read
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                Single-column structure, real headings and selectable text.
                The decorative two-column layouts other builders push are
                exactly what applicant tracking systems garble.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <TemplateGallery />
            </Reveal>
          </Container>
        </section>

        <GuideRule />

        {/* ==================== ATS ==================== */}
        <section id="ats" className="scroll-mt-20 py-20 sm:py-28">
          <Container>
            <Reveal
              as="div"
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              stagger
            >
              <div>
                <p className="text-[13px] font-medium text-accent">
                  ATS scoring
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                  Know why you were filtered
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  Most resumes are rejected by software, not people. The score
                  breaks down exactly which signal is weak — keywords,
                  formatting, verbs, contact details, clarity — so you fix the
                  cause instead of guessing.
                </p>

                <ul className="mt-6 space-y-2.5">
                  {[
                    "Scored the moment you stop typing",
                    "Per-category breakdown, not one vague number",
                    "Suggestions you can apply in a single click",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] text-fg-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/auth/register"
                  variant="secondary"
                  size="md"
                  className="mt-8"
                >
                  Score my resume
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>

              <ScorePanel />
            </Reveal>
          </Container>
        </section>

        <GuideRule />

        {/* ==================== FAQ ==================== */}
        <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
          <Container>
            <Reveal
              as="div"
              className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16"
              stagger
            >
              <div>
                <p className="text-[13px] font-medium text-accent">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
                  Questions worth asking
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  What the AI does and does not touch, how export works, and
                  what happens to your data.
                </p>
              </div>

              <FAQ />
            </Reveal>
          </Container>
        </section>

        {/* ==================== CTA ==================== */}
        <section className="border-t border-line bg-surface py-20 sm:py-24">
          <Container className="text-center">
            <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
              Your next resume is about twenty minutes away
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-fg-muted">
              Start with a blank page and let the AI fill in the hard parts.
            </p>
            <ButtonLink
              href="/auth/register"
              variant="primary"
              size="lg"
              className="mt-8"
            >
              Create your resume
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            </Reveal>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
