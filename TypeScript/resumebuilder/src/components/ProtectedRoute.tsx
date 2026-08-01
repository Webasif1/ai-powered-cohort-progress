"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageLoader } from "@/components/ui/Skeleton";

/**
 * Gate for signed-in pages. The session cookie is httpOnly, so the only way
 * to know whether it is valid is to ask the server.
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
  const [status, setStatus] = useState<"checking" | "allowed">("checking");

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (cancelled) return;

        if (response.ok) {
          setStatus("allowed");
          return;
        }

        const query = searchParams.toString();
        const next = `${pathname}${query ? `?${query}` : ""}`;
        router.replace(`/auth/login?next=${encodeURIComponent(next)}`);
      } catch {
        if (!cancelled) router.replace("/auth/login");
      }
    };

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router, pathname, searchParams]);

  if (status === "checking") return <PageLoader label="Checking your session" />;

  return <>{children}</>;
}
