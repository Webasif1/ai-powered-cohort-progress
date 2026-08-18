"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/components/providers/SessionProvider";
import { PageLoader } from "@/components/ui/Skeleton";

/**
 * Gate for signed-in pages. The session cookie is httpOnly, so the only way
 * to know whether it is valid is to ask the server — but the asking now
 * happens once, in `SessionProvider`, rather than on every protected page.
 *
 * When the check fails it hands the current location to the login page as
 * `next`, so signing in returns the user to where they were headed instead
 * of dropping them on the dashboard.
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // `useSearchParams` opts the tree into client rendering and needs a
  // boundary above it, so it lives here rather than in every calling page.
  return (
    <Suspense fallback={<PageLoader label="Checking your session" />}>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "unauthenticated") return;

    const query = searchParams.toString();
    const next = `${pathname}${query ? `?${query}` : ""}`;
    router.replace(`/auth/login?next=${encodeURIComponent(next)}`);
  }, [status, router, pathname, searchParams]);

  if (status !== "authenticated") {
    return <PageLoader label="Checking your session" />;
  }

  return <>{children}</>;
}
