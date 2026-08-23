import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center",
        "animate-fade-in",
        className,
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-elevated shadow-xs">
        <Icon aria-hidden className="h-5 w-5 text-fg-subtle" />
      </div>

      <h3 className="text-[15px] font-semibold text-fg">{title}</h3>

      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-fg-muted">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
