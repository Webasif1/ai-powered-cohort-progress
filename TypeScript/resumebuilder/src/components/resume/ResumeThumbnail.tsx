"use client";

import { memo } from "react";
import { FileText } from "lucide-react";
import { getTemplate } from "./templates/registry";
import { isEmpty } from "./templates/shared";
import { cn } from "@/lib/cn";
import type { ResumeData } from "@/types/resume.types";

interface ResumeThumbnailProps {
  data: ResumeData;
  /** Overrides `data.template` — lets the picker preview a layout against sample data. */
  templateId?: string;
  /** Height of the visible window, in pixels. */
  height?: number;
  /** How far down the 760px sheet is scaled. Defaults to a card-sized 0.34. */
  scale?: number;
  className?: string;
}

/**
 * Renders the actual template, scaled down, rather than a mock-up — so a
 * preview cannot drift out of sync with what the template really produces,
 * and a card visibly tells you which layout its resume uses.
 *
 * The sheet renders at its natural 760px width and is then transform-scaled,
 * so the preview shows real type sizes and spacing instead of a re-layout.
 *
 * Two things callers must respect:
 *   - Templates contain real `<a>` elements. This wrapper is `inert`, which
 *     takes the whole subtree out of the tab order and the accessibility
 *     tree, but a thumbnail must still never be a *descendant* of a link —
 *     `<a>` inside `<a>` is invalid HTML however inert it is. Use a stretched
 *     overlay link as a sibling instead.
 *   - The frame is a fixed-size window. Give it a height that matches the
 *     scale, or the sheet will be cropped mid-line.
 */
export const ResumeThumbnail = memo(function ResumeThumbnail({
  data,
  templateId,
  height = 176,
  scale = 0.34,
  className,
}: ResumeThumbnailProps) {
  const Template = getTemplate(templateId ?? data.template).component;

  return (
    <div
      // `inert` is what actually removes the template's links from the tab
      // order; `pointer-events-none` alone would leave them focusable.
      inert
      aria-hidden
      className={cn(
        "relative w-full select-none overflow-hidden bg-surface pointer-events-none",
        // Off-screen cards skip layout and paint entirely.
        "[contain:layout_paint] [content-visibility:auto]",
        className,
      )}
      style={{ height, containIntrinsicSize: `100% ${height}px` }}
    >
      {isEmpty(data) ? (
        <NotStarted />
      ) : (
        <>
          <div className="absolute left-1/2 top-0 w-[760px] -translate-x-1/2">
            <div className="origin-top" style={{ transform: `scale(${scale})` }}>
              <Template data={data} className="shadow-none" />
            </div>
          </div>

          {/* Fades the cut-off bottom edge instead of slicing mid-line. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface to-transparent" />
        </>
      )}
    </div>
  );
});

/**
 * The templates' own `EmptyNotice` is a 420px-tall block meant for the
 * editor's preview pane; at card size it would burst the frame.
 */
function NotStarted() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
      <FileText className="h-5 w-5 text-fg-subtle" />
      <p className="text-[11px] font-medium text-fg-subtle">Not started yet</p>
    </div>
  );
}
