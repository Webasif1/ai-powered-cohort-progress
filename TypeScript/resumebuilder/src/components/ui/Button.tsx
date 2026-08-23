"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "subtle"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.2,0,0,1)] " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-xs hover:bg-accent-hover hover:shadow-sm",
  secondary:
    "border border-line bg-elevated text-fg shadow-xs hover:border-line-strong hover:bg-surface-2",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
  subtle: "bg-surface-2 text-fg hover:bg-line",
  danger:
    "border border-transparent bg-danger-soft text-danger hover:border-danger/30",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-9.5 px-4 text-sm",
  lg: "h-11 px-6 text-[15px]",
  icon: "h-9 w-9 p-0",
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  /** Replaces children while loading. Falls back to a bare spinner. */
  loadingText?: string;
  className?: string;
  children?: React.ReactNode;
}

export type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "secondary",
      size = "md",
      isLoading = false,
      loadingText,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 shrink-0 animate-spin-slow" />
            {loadingText ?? children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

export type ButtonLinkProps = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "children" | "className">;

/** Same visual language as Button, but renders a real anchor for navigation. */
export function ButtonLink({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
