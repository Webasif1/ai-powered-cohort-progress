import { Skeleton } from "@/components/ui/Skeleton";

/** Placeholder for one card in the dashboard grid. */
export function ResumeCardSkeleton() {
  return (
    <div className="rounded-lg border border-line bg-elevated p-5 shadow-xs">
      <Skeleton className="h-[104px] w-full rounded-md" />
      <Skeleton className="mt-4 h-4 w-3/5" />
      <Skeleton className="mt-2.5 h-3 w-2/5" />
    </div>
  );
}

/** Placeholder for the two-pane editor while the resume loads. */
export function ResumeEditorSkeleton() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="flex h-14 items-center justify-between border-b border-line px-5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-3 p-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
          ))}
        </div>
        <div className="hidden bg-surface p-5 lg:block">
          <Skeleton className="mx-auto h-[640px] w-full max-w-[680px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}
