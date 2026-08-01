"use client";

import { Lock } from "lucide-react";
import { TEMPLATES } from "./templates/registry";
import { cn } from "@/lib/cn";

/**
 * Switches the layout of the resume being edited.
 *
 * Premium entries are rendered but disabled, and say why. The API also
 * rejects them, so this is a hint rather than the actual gate.
 */
export function TemplatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (templateId: string) => void;
}) {
  return (
    <div className="rounded-lg border border-line bg-elevated p-3 shadow-xs">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.09em] text-fg-subtle">
          Layout
        </h2>
        <a
          href="/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-fg-subtle underline-offset-2 hover:text-fg hover:underline"
        >
          Compare all
        </a>
      </div>

      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {TEMPLATES.map((template) => {
          const isPremium = template.tier === "premium";
          const active = template.id === value;

          return (
            <li key={template.id}>
              <button
                type="button"
                disabled={isPremium}
                onClick={() => onChange(template.id)}
                aria-pressed={active}
                title={
                  isPremium
                    ? "Paid plans are not available yet"
                    : template.tagline
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[13px] font-medium",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line bg-elevated text-fg-muted hover:border-line-strong hover:text-fg",
                  isPremium && "cursor-not-allowed opacity-55 hover:border-line",
                )}
              >
                {isPremium && <Lock aria-hidden className="h-3 w-3" />}
                {template.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
