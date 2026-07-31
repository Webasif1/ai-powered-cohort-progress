"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Shared control surface                                              */
/* ------------------------------------------------------------------ */
const control =
  "w-full rounded-md border border-line bg-elevated text-fg placeholder:text-fg-subtle " +
  "transition-[border-color,box-shadow,background-color] duration-150 " +
  "hover:border-line-strong " +
  "focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-[var(--accent-ring)] " +
  "disabled:cursor-not-allowed disabled:opacity-55";

/* ------------------------------------------------------------------ */
/* Label                                                               */
/* ------------------------------------------------------------------ */
export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-[13px] font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Input                                                               */
/* ------------------------------------------------------------------ */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Rendered inside the field, on the left. */
  icon?: React.ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon: Icon, className, id, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="w-full">
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            control,
            "h-9.5 px-3 text-sm",
            Icon && "pl-9.5",
            error && "border-danger focus:border-danger focus:ring-danger/25",
            className,
          )}
          {...props}
        />
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Textarea                                                            */
/* ------------------------------------------------------------------ */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, className, id, ...props }, ref) {
    const autoId = useId();
    const areaId = id ?? autoId;

    return (
      <div className="w-full">
        {label && <Label htmlFor={areaId}>{label}</Label>}
        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            control,
            "min-h-28 resize-y px-3 py-2.5 text-sm leading-relaxed",
            className,
          )}
          {...props}
        />
        {hint && <p className="mt-1.5 text-xs text-fg-subtle">{hint}</p>}
      </div>
    );
  },
);

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const boxId = id ?? autoId;

  return (
    <label
      htmlFor={boxId}
      className={cn(
        "inline-flex cursor-pointer select-none items-center gap-2 text-[13px] text-fg-muted transition-colors hover:text-fg",
        className,
      )}
    >
      <input
        id={boxId}
        type="checkbox"
        className="h-4 w-4 cursor-pointer rounded-sm border-line accent-[var(--accent)]"
        {...props}
      />
      {label}
    </label>
  );
}
