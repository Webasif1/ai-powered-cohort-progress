import { cn } from "@/lib/cn";

/**
 * Single source of truth for page gutters, so every section lines up on the
 * same edges at every breakpoint.
 */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}
