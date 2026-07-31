"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** Header for signed-in surfaces (dashboard). */
export function AppHeader({ actions }: { actions?: React.ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // The session lives in an httpOnly cookie; expiring it client-side is
      // not possible, so fall back to bouncing through the login screen.
      await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    } finally {
      toast.success("Signed out");
      router.push("/auth/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Logo href="/resume" />

        <div className="flex items-center gap-2">
          {actions}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
