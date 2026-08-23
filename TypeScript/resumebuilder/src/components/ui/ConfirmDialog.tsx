"use client";

import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "accent";
  isBusy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Replaces `window.confirm()`, which could not be themed, could not be
 * styled, and blocked the main thread.
 *
 * Focus moves to the confirm button on open and Escape always cancels.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  isBusy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    confirmRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", onKeyDown);
    // Stop the page behind the dialog from scrolling.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        onClick={onCancel}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-fade-in-fast"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby={description ? "confirm-body" : undefined}
        className="relative w-full max-w-sm rounded-xl border border-line bg-elevated p-5 shadow-lg animate-pop-in"
      >
        <h2 id="confirm-title" className="text-[15px] font-semibold text-fg">
          {title}
        </h2>

        {description && (
          <p
            id="confirm-body"
            className="mt-2 text-[13px] leading-relaxed text-fg-muted"
          >
            {description}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            variant={tone === "danger" ? "danger" : "primary"}
            size="sm"
            isLoading={isBusy}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
