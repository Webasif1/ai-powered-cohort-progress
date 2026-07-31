import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-md bg-surface-2 bg-[linear-gradient(90deg,transparent_0%,var(--border)_50%,transparent_100%)] bg-[length:200%_100%]",
        "animate-[shimmer_1.6s_linear_infinite]",
        className,
      )}
      {...props}
    />
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block h-4 w-4 shrink-0 rounded-full border-2 border-line border-t-accent",
        "animate-[spin_0.7s_linear_infinite]",
        className,
      )}
    />
  );
}

/** Full-viewport loading state used while auth is being verified. */
export function PageLoader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg">
      <Spinner className="h-7 w-7 border-[2.5px]" />
      <p className="text-sm text-fg-muted">{label}</p>
    </div>
  );
}
