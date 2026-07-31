import { Logo } from "./Logo";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <Logo />
        <p className="text-xs text-fg-subtle">
          © {new Date().getFullYear()} ResumeAI. Built for people who would
          rather be interviewing.
        </p>
      </Container>
    </footer>
  );
}
