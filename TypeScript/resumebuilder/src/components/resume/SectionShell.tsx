"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CountBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

interface SectionShellProps {
  icon: React.ElementType;
  title: string;
  /** Shown as a pill next to the title. Omit for single-value sections. */
  count?: number;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * The collapsible card every editor section sits in.
 *
 * Replaces seven hand-rolled copies of the same accordion markup, and adds
 * the `aria-expanded` / `aria-controls` wiring none of them had.
 */
export function SectionShell({
  icon: Icon,
  title,
  count,
  description,
  defaultOpen = true,
  children,
}: SectionShellProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className="overflow-hidden rounded-lg border border-line bg-elevated shadow-xs transition-shadow duration-200 hover:shadow-sm">
      <h2>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={cn(
            "flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left",
            "transition-colors duration-150 hover:bg-surface",
            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
          )}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface">
              <Icon aria-hidden className="h-4 w-4 text-fg-muted" />
            </span>

            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-fg">
                  {title}
                </span>
                {count !== undefined && <CountBadge count={count} />}
              </span>
              {description && (
                <span className="mt-0.5 block truncate text-xs text-fg-subtle">
                  {description}
                </span>
              )}
            </span>
          </span>

          <ChevronDown
            aria-hidden
            className={cn(
              "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h2>

      {/*
        Auto-height collapse with no JavaScript: a grid row animated from
        `0fr` to `1fr` resolves to the child's natural height, which is the
        one thing a plain `height` transition cannot do. Replaces the
        framer-motion version — see the perf note in this component's commit.
      */}
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line p-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Dashed "add another" row shared by Experience / Projects / Education. */
export function AddItemButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-line px-4 py-3",
        "text-[13px] font-medium text-fg-muted transition-colors duration-150",
        "hover:border-accent/50 hover:bg-accent-soft hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
      )}
    >
      <span aria-hidden className="text-base leading-none">
        +
      </span>
      {label}
    </button>
  );
}

/** Card wrapping one repeatable entry, with its own remove control. */
export function ItemCard({
  index,
  label,
  onRemove,
  children,
}: {
  index: number;
  label: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-[rise_0.24s_cubic-bezier(0.22,1,0.36,1)_both] rounded-md border border-line bg-surface p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
          {label} {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium text-fg-subtle transition-colors duration-150",
            "hover:bg-danger-soft hover:text-danger",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          )}
        >
          Remove
        </button>
      </div>
      {children}
    </div>
  );
}
