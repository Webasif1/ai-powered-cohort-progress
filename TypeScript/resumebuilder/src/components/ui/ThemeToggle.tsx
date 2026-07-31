"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/cn";

/**
 * Both icons are always mounted and cross-faded, so the button never changes
 * size and there is nothing to hold back until hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-elevated text-fg-muted",
        "transition-colors duration-150 hover:border-line-strong hover:bg-surface-2 hover:text-fg",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <span className="relative block h-4 w-4">
        <Sun
          aria-hidden
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-200",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        />
        <Moon
          aria-hidden
          className={cn(
            "absolute inset-0 h-4 w-4 transition-all duration-200",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
    </button>
  );
}
