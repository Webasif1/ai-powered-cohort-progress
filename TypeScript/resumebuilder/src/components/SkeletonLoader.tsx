import { Skeleton } from "@/components/ui/Skeleton";

/** Placeholder for one card in the dashboard grid. */
export function ResumeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-elevated shadow-xs">
      {/* Same 176px window the real thumbnail renders into. */}
      <Skeleton className="h-44 w-full rounded-none" />

      <div className="p-4">
        <Skeleton className="h-4 w-3/5" />
        <div className="mt-2.5 flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="mt-3 h-3 w-2/5" />
        <Skeleton className="mt-3.5 h-3 w-28" />
      </div>
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
