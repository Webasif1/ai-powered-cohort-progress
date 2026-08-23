"use client";

import { ArrowRight } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { ButtonLink, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

interface AuthAwareCtaProps {
  signedOutHref: string;
  signedOutLabel: string;
  signedInHref: string;
  signedInLabel: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * A marketing call to action that knows whether anyone is signed in.
 *
 * The landing page's CTAs were all hardcoded to `/auth/register`, so clicking
 * "Score my resume" while already signed in dropped you on a signup form.
 *
 * `/` and `/templates` are statically prerendered server components and cannot
 * read the session cookie without becoming dynamic, so the state comes from
 * `SessionProvider` on the client — the same arrangement `SiteHeader` uses.
 *
 * Anything other than a confirmed signed-in state renders the signed-out pair,
 * `"loading"` included. That keeps the prerendered HTML correct for the common
 * visitor and for anyone without JavaScript.
 *
 * Optimistic session state is fine here, unlike in `RedirectIfSignedIn`: the
 * worst case is one wasted navigation to `/resume`, which `ProtectedRoute`
 * then corrects.
 */
export function AuthAwareCta({
  signedOutHref,
  signedOutLabel,
  signedInHref,
  signedInLabel,
  variant = "primary",
  size = "lg",
  className,
}: AuthAwareCtaProps) {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  return (
    <ButtonLink
      href={isAuthed ? signedInHref : signedOutHref}
      variant={variant}
      size={size}
      className={className}
    >
      {isAuthed ? signedInLabel : signedOutLabel}
      <ArrowRight className="h-4 w-4" />
    </ButtonLink>
  );
}
