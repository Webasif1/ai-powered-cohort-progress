"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Copy, Eye, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { ResumeThumbnail } from "./ResumeThumbnail";
import { CompletionBar } from "./SaveStatus";
import { ATS_LABEL, getTemplate } from "./templates/registry";
import { Badge } from "@/components/ui/Badge";
import { Menu } from "@/components/ui/Menu";
import { completionPercent } from "@/lib/completion";
import { normalizeResume } from "@/lib/resumeData";
import { cn } from "@/lib/cn";
import type { IResume } from "@/types/resume.types";

/**
 * `GET /api/resumes` returns whole documents — no projection — so the card
 * can render the real template and compute completeness without a second
 * request. This used to declare only four fields, which is why every card
 * looked identical no matter which layout its resume actually used.
 */
export type ResumeSummary = Partial<IResume> & { _id: string };

interface ResumeCardProps {
  resume: ResumeSummary;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  isDuplicating?: boolean;
}

export function formatUpdated(value?: string | Date) {
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
 * The card body is a stretched overlay link rather than a wrapper, because
 * the thumbnail renders a real template and templates contain real anchors —
 * `<a>` inside `<a>` is invalid HTML. Keeping the link a *sibling* of the
 * preview means the card is still reachable in one Tab, while the action menu
 * layers cleanly on top.
 */
export function ResumeCard({
  resume,
  onDelete,
  onDuplicate,
  isDuplicating = false,
}: ResumeCardProps) {
  const title = resume.title?.trim() || "Untitled Resume";
  const template = getTemplate(resume.template);
  const percent = completionPercent(resume);

  // The thumbnail needs the editor's shape, and the raw row may still be
  // carrying legacy field names.
  const data = useMemo(() => normalizeResume(resume, resume._id), [resume]);

  return (
    <article
      className={cn(
        // No `overflow-hidden` here — it would clip the action menu. The
        // thumbnail frame does its own clipping instead.
        "group relative flex h-full flex-col rounded-lg border border-line bg-elevated shadow-xs",
        "transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md",
        "focus-within:border-line-strong focus-within:shadow-md",
      )}
    >
      <div className="overflow-hidden rounded-t-lg border-b border-line">
        <ResumeThumbnail data={data} height={176} scale={0.34} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate pr-8 text-sm font-semibold text-fg">{title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <Badge tone="neutral">{template.name}</Badge>
          <Badge
            tone={template.ats === "check" ? "warning" : "success"}
            title={template.atsNote}
          >
            {template.ats === "check" && (
              <TriangleAlert aria-hidden className="h-3 w-3" />
            )}
            {ATS_LABEL[template.ats]}
          </Badge>
        </div>

        <p className="mt-2.5 text-xs text-fg-subtle">
          {formatUpdated(resume.updatedAt)}
        </p>

        <div className="mt-3">
          <CompletionBar percent={percent} />
        </div>
      </div>

      <Link
        href={`/resume/${resume._id}`}
        className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">Open {title}</span>
      </Link>

      {/* Above the overlay, so the menu stays clickable. */}
      <div className="absolute right-2.5 top-2.5 z-10">
        <Menu
          label={`Actions for ${title}`}
          items={[
            { label: "Open", icon: Pencil, href: `/resume/${resume._id}` },
            {
              label: "Preview",
              icon: Eye,
              href: `/resume/${resume._id}/preview`,
            },
            {
              label: "Duplicate",
              icon: Copy,
              onSelect: () => onDuplicate(resume._id),
              disabled: isDuplicating,
            },
            {
              label: "Delete",
              icon: Trash2,
              tone: "danger",
              onSelect: () => onDelete(resume._id),
            },
          ]}
        />
      </div>
    </article>
  );
}
