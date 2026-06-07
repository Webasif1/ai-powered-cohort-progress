import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-card text-card-foreground border rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Image */}
            <div className="h-64 p-5 bg-muted">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category */}
              <Skeleton className="h-6 w-24 rounded-full" />

              {/* Title */}
              <div className="mt-3 space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>

              {/* Description */}
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Price + Button */}
              <div className="flex items-center justify-between mt-5">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
