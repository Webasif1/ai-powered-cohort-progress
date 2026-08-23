"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  /** Focused on open. Defaults to the first tabbable element in the panel. */
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const TABBABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Scroll lock is refcounted rather than saved-and-restored per dialog.
 * Two dialogs each capturing `body.style.overflow` and restoring what they
 * saw would leave the page permanently unscrollable: whichever unmounts
 * second restores the *hidden* value the first one had already set.
 */
let openCount = 0;
let previousOverflow = "";

function lockScroll() {
  if (openCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  openCount += 1;
}

function unlockScroll() {
  openCount = Math.max(0, openCount - 1);
  if (openCount === 0) document.body.style.overflow = previousOverflow;
}

/**
 * `document` does not exist during the server render, so the portal can only
 * be created once hydrated. Reading that as an external store rather than an
 * effect avoids a second render pass on every mount.
 */
const noopSubscribe = () => () => {};

/**
 * The generic dialog the app was missing. Portalled to `body`, so it escapes
 * any `overflow: hidden` or stacking context of whatever rendered it — the
 * theme class lives on <html>, so tokens still resolve inside the portal.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  initialFocusRef,
  footer,
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const bodyId = useId();

  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;

    // Where focus came from, so it can be handed back on close.
    const opener = document.activeElement as HTMLElement | null;

    lockScroll();

    const focusFirst = () => {
      const target =
        initialFocusRef?.current ??
        panelRef.current?.querySelector<HTMLElement>(TABBABLE) ??
        panelRef.current;
      target?.focus();
    };

    // One frame later, so the panel is in the DOM and its animation has begun.
    const raf = requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(TABBABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Wrap at both ends so focus can never reach the page behind.
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown, true);
      unlockScroll();
      opener?.focus?.();
    };
  }, [open, onClose, initialFocusRef]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-fade-in-fast"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? bodyId : undefined}
        className={cn(
          "relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-xl border border-line bg-elevated shadow-lg",
          "animate-pop-in",
          sizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id={titleId} className="text-[15px] font-semibold text-fg">
              {title}
            </h2>
            {description && (
              <p id={bodyId} className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
