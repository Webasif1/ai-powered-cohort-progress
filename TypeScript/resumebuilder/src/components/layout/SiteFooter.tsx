import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/**
 * Only routes that exist are linked. Anchors point at real sections on this
 * page; anything not built yet renders as plain text rather than a link to
 * a 404, so the footer never advertises a page that isn't there.
 */
const columns: {
  heading: string;
  links: { label: string; href?: string }[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Resume builder", href: "/resume" },
      { label: "AI writing tools", href: "/#features" },
      { label: "ATS score", href: "/#ats" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    heading: "Get started",
    links: [
      { label: "Create an account", href: "/auth/register" },
      { label: "Sign in", href: "/auth/login" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    // TODO: none of these exist yet — build the pages, then add hrefs.
    heading: "Resources",
    links: [
      { label: "Resume examples" },
      { label: "Writing guide" },
      { label: "ATS checklist" },
      { label: "Changelog" },
    ],
  },
  {
    heading: "Company",
    links: [{ label: "About" }, { label: "Contact" }, { label: "Careers" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-elevated">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2.6fr)]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-fg-muted">
              An AI resume builder that writes the wording, scores the result,
              and exports a PDF an applicant tracking system can actually read.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <span className="text-xs text-fg-subtle">
                Light and dark, remembered per device
              </span>
            </div>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.09em] text-fg-subtle">
                  {column.heading}
                </h2>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="text-[13px] text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span
                          className="text-[13px] text-fg-subtle/70"
                          title="Coming soon"
                        >
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} ResumeAI. Built for people who would
            rather be interviewing.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <li key={item}>
                <span className="text-xs text-fg-subtle/70" title="Coming soon">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
