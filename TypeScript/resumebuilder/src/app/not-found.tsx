import { FileQuestion } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Page not found",
};

/**
 * `notFound()` is already called for an unknown template id; without this it
 * rendered Next's unstyled default, outside the site shell.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <SiteHeader solid />

      <main className="flex flex-1 items-center justify-center">
        <Container className="flex flex-col items-center gap-5 py-24 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2">
            <FileQuestion aria-hidden className="h-5 w-5 text-fg-muted" />
          </span>

          <div>
            <p className="font-mono text-xs text-fg-subtle">404</p>
            <h1 className="mt-2 text-xl font-semibold text-fg">
              We couldn&rsquo;t find that page
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-fg-muted">
              The link may be out of date, or the page may have moved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <ButtonLink href="/" variant="primary">
              Go home
            </ButtonLink>
            <ButtonLink href="/templates" variant="secondary">
              Browse templates
            </ButtonLink>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
