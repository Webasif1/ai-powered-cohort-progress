"use client";

import Link from "next/link";
import { Check, Lock, TriangleAlert } from "lucide-react";
import { ResumeThumbnail } from "./ResumeThumbnail";
import {
  ATS_LABEL,
  TEMPLATES,
  type TemplateId,
  type TemplateMeta,
} from "./templates/registry";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SAMPLE_RESUME } from "@/lib/sampleResume";
import { cn } from "@/lib/cn";

interface TemplatePickerDialogProps {
  open: boolean;
  onClose: () => void;
  /** Only ever called with a free template id. */
  onSelect: (templateId: TemplateId) => void;
  isCreating?: boolean;
  /** Marks the current layout when the dialog is used to switch, not create. */
  selectedId?: TemplateId;
}

/**
 * The layout choice, moved into the signed-in flow.
 *
 * "New resume" on the dashboard used to create a resume with no template
 * argument at all, so every resume made from there was silently Classic —
 * picking a layout was only possible from the public gallery.
 */
export function TemplatePickerDialog({
  open,
  onClose,
  onSelect,
  isCreating = false,
  selectedId,
}: TemplatePickerDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      title="Choose a layout"
      description="Every preview is the real template. You can change this at any time while editing."
      footer={
        <>
          <Link
            href="/templates"
            className="text-[13px] font-medium text-fg-muted underline-offset-2 hover:text-fg hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Compare all templates in detail
          </Link>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => (
          <li key={template.id}>
            <TemplateTile
              template={template}
              selected={template.id === selectedId}
              disabled={isCreating}
              onSelect={() => onSelect(template.id)}
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
}

function TemplateTile({
  template,
  selected,
  disabled,
  onSelect,
}: {
  template: TemplateMeta;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  // There is no billing, so a premium layout cannot honestly be offered — and
  // the create endpoint rejects one anyway.
  const isPremium = template.tier === "premium";

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isPremium || disabled}
      aria-pressed={selected}
      title={isPremium ? "Paid plans are not available yet" : template.tagline}
      className={cn(
        "group relative block w-full overflow-hidden rounded-lg border text-left transition-[border-color,box-shadow,transform] duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isPremium
          ? "cursor-not-allowed border-line opacity-55"
          : "border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md",
        selected && "border-accent ring-2 ring-accent/25",
      )}
    >
      <ResumeThumbnail
        data={SAMPLE_RESUME}
        templateId={template.id}
        height={210}
        scale={0.31}
      />

      <span className="absolute left-2.5 top-2.5">
        {isPremium ? (
          <Badge tone="accent" className="gap-1 bg-elevated shadow-xs">
            <Lock aria-hidden className="h-3 w-3" />
            Premium
          </Badge>
        ) : (
          <Badge tone="success" className="gap-1 bg-elevated shadow-xs">
            <Check aria-hidden className="h-3 w-3" />
            Free
          </Badge>
        )}
      </span>

      <span className="flex items-baseline justify-between gap-2 border-t border-line bg-elevated px-3 py-2.5">
        <span className="text-[13px] font-semibold text-fg">
          {template.name}
        </span>
        <span
          title={template.atsNote}
          className={cn(
            "flex shrink-0 items-center gap-1 text-[11px] font-medium",
            template.ats === "check" ? "text-warning" : "text-success",
          )}
        >
          {template.ats === "check" && (
            <TriangleAlert aria-hidden className="h-3 w-3" />
          )}
          {ATS_LABEL[template.ats]}
        </span>
      </span>

      {isPremium && (
        <span className="block border-t border-line bg-surface px-3 py-1.5 text-center text-[11px] font-medium text-fg-subtle">
          Not yet available
        </span>
      )}
    </button>
  );
}
