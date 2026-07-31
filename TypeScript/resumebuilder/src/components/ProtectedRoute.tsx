"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/ui/Skeleton";

/**
 * Gate for signed-in pages. The session cookie is httpOnly, so the only way
 * to know whether it is valid is to ask the server.
 */
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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

        if (response.ok) setStatus("allowed");
        else router.replace("/auth/login");
      } catch {
        if (!cancelled) router.replace("/auth/login");
      }
    };

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (status === "checking") return <PageLoader label="Checking your session" />;

  return <>{children}</>;
}
