"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export interface MenuItem {
  label: string;
  icon?: React.ElementType;
  /** Renders a real anchor, so middle-click and open-in-new-tab work. */
  href?: string;
  onSelect?: () => void;
  tone?: "default" | "danger";
  disabled?: boolean;
}

interface MenuProps {
  /** Accessible name for the trigger, e.g. "Actions for Frontend Developer". */
  label: string;
  items: MenuItem[];
  align?: "start" | "end";
  className?: string;
  triggerClassName?: string;
}

/**
 * A small dropdown, data-driven the same way `Tabs` is.
 *
 * Rendered inline rather than portalled — it only ever opens next to the
 * element that owns it, and staying in the DOM flow keeps it positioned
 * without a measuring pass. That does mean an ancestor with `overflow:
 * hidden` will clip it, so the card that uses this puts its clipping on the
 * thumbnail frame instead of the card root.
 */
export function Menu({
  label,
  items,
  align = "end",
  className,
  triggerClassName,
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false);
      if (returnFocus) triggerRef.current?.focus();
    },
    [],
  );

  useEffect(() => {
    if (!open) return;

    // The first enabled item takes focus, so the menu is usable from the
    // keyboard the moment it opens.
    const first = items.findIndex((item) => !item.disabled);
    itemRefs.current[first]?.focus();

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, items]);

  const focusAt = (index: number) => {
    const enabled = items
      .map((item, i) => (item.disabled ? -1 : i))
      .filter((i) => i >= 0);
    if (enabled.length === 0) return;

    // Wraps at both ends.
    const wrapped = ((index % enabled.length) + enabled.length) % enabled.length;
    itemRefs.current[enabled[wrapped]]?.focus();
  };

  const currentIndex = () => {
    const enabled = items
      .map((item, i) => (item.disabled ? -1 : i))
      .filter((i) => i >= 0);
    return enabled.indexOf(
      itemRefs.current.findIndex((el) => el === document.activeElement),
    );
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        focusAt(currentIndex() + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusAt(currentIndex() - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(items.filter((i) => !i.disabled).length - 1);
        break;
      case "Tab":
        // Tabbing away is a dismissal, not a way out of the list.
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-md border border-line bg-elevated/90 text-fg-subtle shadow-xs backdrop-blur-sm",
          "transition-colors duration-150 hover:bg-surface-2 hover:text-fg",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          triggerClassName,
        )}
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute top-full z-20 mt-1.5 min-w-44 overflow-hidden rounded-lg border border-line bg-elevated p-1 shadow-lg",
            "animate-[pop-in_0.14s_cubic-bezier(0.22,1,0.36,1)_both]",
            align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left",
          )}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const classes = cn(
              "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors duration-100",
              item.disabled && "pointer-events-none opacity-45",
              item.tone === "danger"
                ? "text-danger hover:bg-danger-soft"
                : "text-fg-muted hover:bg-surface-2 hover:text-fg",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
            );

            const content = (
              <>
                {Icon && <Icon aria-hidden className="h-3.5 w-3.5 shrink-0" />}
                {item.label}
              </>
            );

            if (item.href && !item.disabled) {
              return (
                <Link
                  key={item.label}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setOpen(false)}
                  className={classes}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitem"
                tabIndex={-1}
                disabled={item.disabled}
                onClick={() => {
                  close(false);
                  item.onSelect?.();
                }}
                className={classes}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
