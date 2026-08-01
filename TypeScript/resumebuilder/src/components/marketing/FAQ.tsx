"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Answers describe what this app actually does. Nothing here claims a
 * feature that is not built.
 */
const faqs = [
  {
    q: "What does the AI actually write?",
    a: "It drafts and rewrites the wording of a section you have already filled in — your summary, a role description, a project write-up, or a list of skills for a given title. It works from the facts you enter. It does not invent employers, dates, or achievements, and every generated block stays editable.",
  },
  {
    q: "Will the PDF pass an ATS?",
    a: "Export goes through your browser's print-to-PDF, so the output is real selectable text in a single-column layout rather than a flattened image. That is the format applicant tracking systems parse most reliably. Graphics-heavy, multi-column resumes are where parsing usually breaks.",
  },
  {
    q: "Do I have to finish in one sitting?",
    a: "No. Every change autosaves about a second after you stop typing, and the header tells you when it last saved. You can close the tab and pick the same resume back up from your dashboard.",
  },
  {
    q: "Can I build more than one resume?",
    a: "Yes. The dashboard holds as many as you want, each with its own title, so you can keep a separate version tailored to different roles.",
  },
  {
    q: "What does it cost?",
    a: "Nothing to start, and no card is required to create an account or build and export a resume.",
  },
  {
    q: "Is my data private?",
    a: "Your resumes are tied to your account and are only readable by you — every API route checks the session before returning or changing anything. Deleting a resume removes it from the database rather than hiding it.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-elevated">
      {faqs.map((faq, i) => {
        const isOpen = open === i;

        return (
          <li key={faq.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
                  "transition-colors duration-150 hover:bg-surface",
                  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
                )}
              >
                <span className="text-sm font-medium text-fg">{faq.q}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "h-4 w-4 shrink-0 text-fg-subtle transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>

            {/* Same 0fr -> 1fr collapse used by the editor sections. */}
            <div
              id={`faq-panel-${i}`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 pr-12 text-[13px] leading-relaxed text-fg-muted">
                  {faq.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
