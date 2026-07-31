"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ResumeSummary {
  _id: string;
  title?: string;
  updatedAt?: string;
  personalInfo?: { fullName?: string };
  skills?: string[];
}

interface ResumeCardProps {
  resume: ResumeSummary;
  onDelete: (id: string) => void;
}

function formatUpdated(value?: string) {
  if (!value) return "Never opened";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Never opened";

  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days === 0) return "Edited today";
  if (days === 1) return "Edited yesterday";
  if (days < 7) return `Edited ${days} days ago`;

  return `Edited ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
}

/**
 * The whole card is a single link, with the delete control layered on top —
 * so the card is reachable in one Tab and the destructive action stays a
 * separate, clearly-labelled target instead of a nested click handler that
 * has to call `stopPropagation`.
 */
export function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const title = resume.title?.trim() || "Untitled Resume";

  return (
    <div className="group relative">
      <Link
        href={`/resume/${resume._id}`}
        className={cn(
          "block overflow-hidden rounded-lg border border-line bg-elevated shadow-xs",
          "transition-[border-color,box-shadow,transform] duration-200",
          "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      >
        {/* Abstract page thumbnail — cheap, and it recolours with the theme. */}
        <div
          aria-hidden
          className="relative h-[124px] overflow-hidden border-b border-line bg-surface px-5 pt-5"
        >
          <div className="mx-auto h-full w-full max-w-[150px] rounded-t-sm border border-line bg-elevated p-2.5 shadow-xs">
            <div className="h-1.5 w-2/5 rounded-full bg-line-strong" />
            <div className="mt-1 h-1 w-1/4 rounded-full bg-line" />
            <div className="mt-3 space-y-1">
              {[92, 80, 88, 62].map((w, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full bg-line"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex gap-1">
              {[16, 22, 13].map((w, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full bg-accent-soft"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="truncate pr-8 text-sm font-semibold text-fg">
            {title}
          </h3>
          <p className="mt-1 text-xs text-fg-subtle">
            {formatUpdated(resume.updatedAt)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onDelete(resume._id)}
        aria-label={`Delete ${title}`}
        className={cn(
          "absolute bottom-3.5 right-3 inline-flex h-7 w-7 items-center justify-center rounded-md",
          "text-fg-subtle transition-colors duration-150",
          "hover:bg-danger-soft hover:text-danger",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          // Hidden until hover on pointer devices, but always present for
          // touch and keyboard so the action is never unreachable.
          "md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
        )}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
