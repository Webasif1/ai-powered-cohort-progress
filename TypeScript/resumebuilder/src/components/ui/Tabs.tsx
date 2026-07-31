"use client";

import { cn } from "@/lib/cn";

interface TabsProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<{ value: T; label: string; icon?: React.ElementType }>;
  className?: string;
  "aria-label"?: string;
}

/**
 * Segmented control. Uses roving-tabindex semantics so arrow keys move
 * between tabs the way a native tablist does.
 */
export function Tabs<T extends string>({
  value,
  onChange,
  options,
  className,
  "aria-label": ariaLabel,
}: TabsProps<T>) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();

    const i = options.findIndex((o) => o.value === value);
    const next = (i + dir + options.length) % options.length;
    onChange(options[next].value);
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              active
                ? "bg-elevated text-fg shadow-xs"
                : "text-fg-muted hover:text-fg",
            )}
          >
            {Icon && <Icon aria-hidden className="h-3.5 w-3.5" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
