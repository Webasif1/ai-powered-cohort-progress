"use client";

import { useCallback, useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export type AIStatus = "idle" | "loading" | "success";

interface AIActionButtonProps {
  status: AIStatus;
  onClick: () => void;
  label: string;
  icon?: React.ElementType;
  loadingLabel?: string;
  successLabel?: string;
  disabled?: boolean;
}

/**
 * One button for every AI action in the editor.
 *
 * Previously this markup was pasted into four section components with
 * slightly different colours and no aria-live, so screen readers never
 * announced that generation had finished.
 */
export function AIActionButton({
  status,
  onClick,
  label,
  icon: Icon = Sparkles,
  loadingLabel = "Generating",
  successLabel = "Done",
  disabled,
}: AIActionButtonProps) {
  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-[13px] font-medium",
        "transition-[color,background-color,border-color] duration-150",
        "disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isSuccess
          ? "border-transparent bg-success-soft text-success"
          : "border-line bg-elevated text-fg-muted hover:border-accent/40 hover:bg-accent-soft hover:text-accent",
      )}
    >
      {isLoading ? (
        <>
          <span
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-line border-t-accent animate-[spin_0.7s_linear_infinite]"
          />
          <ThinkingDots label={loadingLabel} />
        </>
      ) : isSuccess ? (
        <>
          <Check aria-hidden className="h-3.5 w-3.5 shrink-0" />
          {successLabel}
        </>
      ) : (
        <>
          <Icon aria-hidden className="h-3.5 w-3.5 shrink-0" />
          {label}
        </>
      )}

      {/* Announced to assistive tech without being visible. */}
      <span aria-live="polite" className="sr-only">
        {isLoading ? `${loadingLabel}…` : isSuccess ? successLabel : ""}
      </span>
    </button>
  );
}

function ThinkingDots({ label }: { label: string }) {
  return (
    <span>
      {label}
      <span className="inline-flex w-3 justify-start">
        <span className="animate-pulse">…</span>
      </span>
    </span>
  );
}

/**
 * Streams `text` into a setter one character at a time.
 *
 * Extracted from three separate copies in Summary / Experience / Projects.
 * The interval is tracked in a ref so an unmount or a second run cancels the
 * previous one instead of leaking a timer that writes to a dead component.
 */
export function useTypewriter() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const type = useCallback(
    (text: string, write: (partial: string) => void, onDone?: () => void) => {
      cancel();
      write("");

      // Long AI output at 15ms/char takes many seconds; scale the step so the
      // animation stays under roughly two seconds regardless of length.
      const step = Math.max(1, Math.ceil(text.length / 130));
      let i = 0;

      timerRef.current = setInterval(() => {
        i += step;
        if (i >= text.length) {
          write(text);
          cancel();
          onDone?.();
        } else {
          write(text.slice(0, i));
        }
      }, 15);
    },
    [cancel],
  );

  return { type, cancel };
}

/** Small helper so sections don't each re-declare the same status state. */
export function useAIStatus() {
  const [status, setStatus] = useState<AIStatus>("idle");

  const succeed = useCallback(() => {
    setStatus("success");
    setTimeout(() => setStatus("idle"), 1800);
  }, []);

  return { status, setStatus, succeed };
}
