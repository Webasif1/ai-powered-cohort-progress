"use client";

import { Award, X } from "lucide-react";
import { AddItemButton, SectionShell } from "./SectionShell";

interface CertificationsProps {
  certifications: string[];
  onChange: (certifications: string[]) => void;
}

export default function Certifications({
  certifications,
  onChange,
}: CertificationsProps) {
  const addItem = () => onChange([...certifications, ""]);

  const removeItem = (index: number) =>
    onChange(certifications.filter((_, i) => i !== index));

  const updateItem = (index: number, value: string) =>
    onChange(certifications.map((cert, i) => (i === index ? value : cert)));

  return (
    <SectionShell
      icon={Award}
      title="Certifications"
      count={certifications.length}
    >
      <div className="space-y-2.5">
        {certifications.map((cert, index) => (
          // Index keys are safe here: the list is a flat array of strings with
          // no identity of its own, and edits never reorder it.
          <div key={index} className="flex items-center gap-2">
            <input
              value={cert}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder="AWS Certified Solutions Architect — 2024"
              aria-label={`Certification ${index + 1}`}
              className="h-9.5 w-full rounded-md border border-line bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] hover:border-line-strong focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-[var(--accent-ring)]"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              aria-label={`Remove certification ${index + 1}`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <AddItemButton onClick={addItem} label="Add a certification" />
      </div>
    </SectionShell>
  );
}
