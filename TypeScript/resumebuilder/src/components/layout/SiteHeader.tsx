"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { useSession } from "@/components/providers/SessionProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";

interface NavLink {
  href: string;
  label: string;
  /** Matched as a prefix, so `/resume/abc` still lights up "Dashboard". */
  match?: string;
}

const PUBLIC_LINKS: NavLink[] = [
  { href: "/#features", label: "Features" },
  { href: "/templates", label: "Templates", match: "/templates" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#ats", label: "ATS score" },
];

const APP_LINKS: NavLink[] = [
  { href: "/resume", label: "Dashboard", match: "/resume" },
  { href: "/templates", label: "Templates", match: "/templates" },
  { href: "/#ats", label: "ATS score" },
];

/**
 * The only header the app has.
 *
 * There used to be two — a marketing one and a link-less dashboard one —
 * which is why a signed-in user browsing the template gallery was still
 * being offered "Sign in" and "Get started". Now the same bar renders
 * everywhere and simply swaps its links once someone is signed in.
 *
 * Auth state comes from `SessionProvider`, which is optimistic: on a repeat
 * visit the signed-in links are painted on the first frame from a stored
 * hint, then confirmed against the server. Until anything is known it renders
 * the signed-out set, so the prerendered marketing HTML stays correct for the
 * common visitor and for anyone without JavaScript.
 */
export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const { status, signOut } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthed = status === "authenticated";
  const links = isAuthed ? APP_LINKS : PUBLIC_LINKS;

  // The header is transparent over the hero and gains a hairline once the
  // page moves, so the top of the site stays completely uninterrupted.
  // Signed-in surfaces have no hero, so they opt out with `solid`.
  useEffect(() => {
    if (solid) return;

    const onScroll = () => setScrolled(window.scrollY > 8);

    // The page can already be scrolled on arrival (a restored position, or a
    // hash link), and no scroll event fires for that — so seed the state once,
    // after paint rather than synchronously inside the effect.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [solid]);

  // Close the mobile panel when the route changes under it — including on a
  // back/forward navigation, which no click handler would catch. Adjusted
  // during render rather than in an effect, so the panel never paints once
  // more on the new route before disappearing.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  const isActive = (link: NavLink) =>
    Boolean(link.match && pathname.startsWith(link.match));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        solid || scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo href={isAuthed ? "/resume" : "/"} />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavItem key={link.label} link={link} active={isActive(link)} />
          ))}
        </nav>

        {/*
          Fixed minimum width: when an optimistic signed-in header is
          corrected to signed-out, the swap must not reflow the nav next to it.
        */}
        <div className="flex min-w-33 items-center justify-end gap-2 sm:min-w-46.5">
          <ThemeToggle />

          {isAuthed ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <ButtonLink
                href="/auth/login"
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Sign in
              </ButtonLink>
              <ButtonLink href="/auth/register" variant="primary" size="sm">
                Get started
              </ButtonLink>
            </>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-bg md:hidden animate-fade-in-fast"
        >
          <Container className="flex flex-col py-2">
            {links.map((link) => (
              <NavItem
                key={link.label}
                link={link}
                active={isActive(link)}
                mobile
                onNavigate={() => setMenuOpen(false)}
              />
            ))}

            {isAuthed ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                }}
                className="rounded-md px-2 py-2.5 text-left text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                Sign out
              </button>
            ) : (
              <a
                href="/auth/login"
                className="rounded-md px-2 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg sm:hidden"
              >
                Sign in
              </a>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}

function NavItem({
  link,
  active,
  mobile = false,
  onNavigate,
}: {
  link: NavLink;
  active: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const className = cn(
    "rounded-md font-medium transition-colors",
    mobile ? "px-2 py-2.5 text-sm" : "px-3 py-1.5 text-[13px]",
    active
      ? "bg-surface-2 text-fg"
      : "text-fg-muted hover:bg-surface-2 hover:text-fg",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  );

  // Hash targets stay plain anchors so they still jump correctly when the
  // user is on a different route.
  if (link.href.startsWith("/#")) {
    return (
      <a href={link.href} onClick={onNavigate} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {link.label}
    </Link>
  );
}
