import { Container } from "@/components/layout/Container";
import { ResumeCardSkeleton } from "@/components/SkeletonLoader";
import { Skeleton } from "@/components/ui/Skeleton";

/** Shown while the dashboard segment streams in. */
export default function Loading() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="h-14 border-b border-line" />

      <Container className="py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Skeleton className="h-7 w-44" />
            <Skeleton className="mt-2.5 h-3.5 w-28" />
          </div>
          <Skeleton className="h-9.5 w-36 rounded-md" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ResumeCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
