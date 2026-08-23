"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";

/**
 * Catches a render or data throw anywhere under `app/`.
 *
 * There was no boundary at any level before this, and the four heaviest pages
 * are client-rendered, so a single throw painted a blank white page with no
 * way back.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Next has already logged this server-side; the digest is what ties the
    // page the user is looking at to that log line.
    console.error("[app/error]", error.digest ?? error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-6 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-danger-soft">
        <AlertTriangle aria-hidden className="h-5 w-5 text-danger" />
      </span>

      <div>
        <h1 className="text-lg font-semibold text-fg">Something went wrong</h1>
        <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-fg-muted">
          This page hit an unexpected error. Your saved work is not affected —
          the editor autosaves as you type.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="primary" onClick={reset}>
          Try again
        </Button>
        <ButtonLink href="/resume" variant="secondary">
          Back to your resumes
        </ButtonLink>
      </div>

      {error.digest && (
        <p className="text-xs text-fg-subtle">
          Reference: <span className="font-mono">{error.digest}</span>
        </p>
      )}
    </main>
  );
}
