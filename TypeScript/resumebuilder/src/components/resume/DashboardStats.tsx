"use client";

import { CompletionBar } from "./SaveStatus";
import { formatUpdated, type ResumeSummary } from "./ResumeCard";
import { completionPercent, missingSections } from "@/lib/completion";

/**
 * A thin summary above the grid.
 *
 * Hidden below two resumes on purpose: with a single card right underneath,
 * three tiles restating "1 resume, edited today, 40% done" is filler — the
 * empty state carries that case better on its own.
 */
export function DashboardStats({ resumes }: { resumes: ResumeSummary[] }) {
  if (resumes.length < 2) return null;

  // The API already sorts by `updatedAt` descending, so index 0 is the most
  // recently touched resume without any client-side sorting.
  const latest = resumes[0];
  const percent = completionPercent(latest);
  const nextUp = missingSections(latest)[0];

  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      <Tile label="Resumes">
        <span className="text-xl font-semibold tabular-nums text-fg">
          {resumes.length}
        </span>
      </Tile>

      <Tile label="Last edited">
        <span className="text-[15px] font-medium text-fg">
          {formatUpdated(latest?.updatedAt).replace(/^Edited /, "")}
        </span>
        <span className="mt-0.5 block truncate text-xs text-fg-subtle">
          {latest?.title?.trim() || "Untitled Resume"}
        </span>
      </Tile>

      <Tile label="Most recent completeness">
        <CompletionBar percent={percent} />
        <span className="mt-1.5 block text-xs text-fg-subtle">
          {nextUp ? `Next: add ${nextUp}` : "Every section filled in."}
        </span>
      </Tile>
    </dl>
  );
}

function Tile({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-elevated px-4 py-3.5">
      <dt className="text-[11px] font-medium uppercase tracking-[0.06em] text-fg-subtle">
        {label}
      </dt>
      <dd className="mt-1.5">{children}</dd>
    </div>
  );
}
