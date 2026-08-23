import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface AuthShellProps {
  title: string;
  subtitle: string;
  /** Rendered under the form: "Already have an account?" and friends. */
  footer: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared frame for login and register. Split layout on desktop — quiet
 * marketing panel on the left, form on the right — collapsing to a single
 * centred column on small screens.
 */
export function AuthShell({
  title,
  subtitle,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Marketing panel */}
      <aside className="relative hidden flex-col justify-between border-r border-line bg-surface p-10 lg:flex">
        <Logo />

        <div className="max-w-sm">
          <p className="text-2xl font-semibold leading-snug tracking-[-0.025em] text-fg">
            Most resumes are rejected by software before a person ever opens
            them.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            ResumeAI writes, scores and exports yours so it clears the filter
            and still sounds like you.
          </p>
        </div>

        <ul className="space-y-2.5">
          {[
            "AI drafting for every section",
            "Live ATS score with a per-category breakdown",
            "Clean, single-column PDF export",
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
      </aside>

      {/* Form panel */}
      <main className="flex flex-col px-5 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:invisible">
            <Logo />
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm animate-rise">
            <h1 className="text-2xl font-semibold tracking-[-0.025em] text-fg">
              {title}
            </h1>
            <p className="mt-2 text-[13px] text-fg-muted">{subtitle}</p>

            <div className="mt-7">{children}</div>

            <p className="mt-6 text-center text-[13px] text-fg-muted">
              {footer}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthShell;
