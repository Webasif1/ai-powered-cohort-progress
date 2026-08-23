"use client";

import { AlertCircle, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";

export type SaveState = "idle" | "saving" | "saved" | "error";

/**
 * Autosave indicator. `aria-live="polite"` means a screen reader hears
 * "Saved" without the focus ever moving.
 */
export function SaveStatus({
  state,
  onRetry,
}: {
  state: SaveState;
  onRetry: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className="flex min-w-[86px] items-center gap-1.5 text-xs"
    >
      {state === "saving" && (
        <>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
          />
          <span className="text-fg-subtle">Saving…</span>
        </>
      )}

      {state === "saved" && (
        <span className="flex items-center gap-1.5 text-success animate-fade-in">
          <Check aria-hidden className="h-3.5 w-3.5" />
          Saved
        </span>
      )}

      {state === "error" && (
        <span className="flex items-center gap-1.5 text-danger">
          <AlertCircle aria-hidden className="h-3.5 w-3.5" />
          Not saved
          <button
            type="button"
            onClick={onRetry}
            className={cn(
              "inline-flex items-center gap-1 rounded px-1.5 py-0.5 font-medium underline-offset-2",
              "hover:bg-danger-soft hover:underline",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
            )}
          >
            <RefreshCw aria-hidden className="h-3 w-3" />
            Retry
          </button>
        </span>
      )}
    </div>
  );
}

/** Thin completion bar shown under the editor header. */
export function CompletionBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="h-1 w-24 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Resume completeness"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-fg-subtle">{percent}%</span>
    </div>
  );
}
