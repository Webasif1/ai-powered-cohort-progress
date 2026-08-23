"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/providers/SessionProvider";

/**
 * Sends an already-signed-in visitor away from the login and register pages.
 *
 * The CTA fix covers the buttons, but nothing stopped someone arriving here
 * from the footer's "Create an account" link, a bookmark or the back button
 * and being shown a signup form for an account they already have.
 *
 * `isOptimistic` is the load-bearing part. Session state starts optimistically
 * `authenticated` from the stored hint before the server has confirmed
 * anything, and redirecting on that would put an expired cookie into an
 * endless loop:
 *
 *   /auth/login -> guard sees optimistic "authenticated" -> /resume
 *               -> ProtectedRoute sees confirmed "unauthenticated" -> /auth/login
 *
 * Waiting for the server-confirmed answer breaks it: a stale hint resolves to
 * `unauthenticated` and this never fires.
 */
export function RedirectIfSignedIn({ next }: { next: string }) {
  const router = useRouter();
  const { status, isOptimistic } = useSession();

  useEffect(() => {
    if (isOptimistic || status !== "authenticated") return;
    router.replace(next);
  }, [status, isOptimistic, next, router]);

  return null;
}
