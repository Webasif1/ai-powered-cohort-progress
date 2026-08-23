"use client";

import { useState } from "react";
import { Gauge, RefreshCw, Sparkles, TriangleAlert } from "lucide-react";
import toast from "react-hot-toast";
import { SectionShell } from "./SectionShell";
import { Button } from "@/components/ui/Button";
import { getATSScore } from "@/apis/ai.api";
import { resumeToPlainText } from "@/lib/resumeText";
import { cn } from "@/lib/cn";
import type { ResumeData } from "@/types/resume.types";

interface AtsResult {
  overallScore: number;
  categoryScores: {
    keywordOptimization: number;
    formattingStructure: number;
    actionVerbsImpact: number;
    contactEssentialInfo: number;
    clarityConciseness: number;
  };
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}

const CATEGORY_LABELS: Record<keyof AtsResult["categoryScores"], string> = {
  keywordOptimization: "Keywords",
  formattingStructure: "Formatting",
  actionVerbsImpact: "Action verbs",
  contactEssentialInfo: "Contact info",
  clarityConciseness: "Clarity",
};

/**
 * The ATS score, in the editor.
 *
 * The route existed but nothing called it, and its prompt interpolated the
 * resume with single braces — so it scored a literal `{resumeText}` and every
 * number it returned was about nothing. Both are fixed; this is the UI that
 * finally shows the result.
 *
 * Scoring is on demand rather than on every keystroke: it is the most
 * expensive call in the app and the answer barely moves between edits.
 */
export function AtsPanel({ data }: { data: ResumeData }) {
  const [result, setResult] = useState<AtsResult | null>(null);
  const [isScoring, setIsScoring] = useState(false);

  const resumeText = resumeToPlainText(data);
  const tooEmpty = resumeText.length < 80;

  const handleScore = async () => {
    try {
      setIsScoring(true);
      const response = await getATSScore({ resumeText });
      const score = response?.data?.atsScore as AtsResult | undefined;

      if (!score) {
        toast.error("Could not read the score. Try again.");
        return;
      }

      setResult(score);
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Could not score this resume";
      toast.error(message);
    } finally {
      setIsScoring(false);
    }
  };

  return (
    <SectionShell
      icon={Gauge}
      title="ATS score"
      description="How this resume reads to the software that screens it first."
      defaultOpen={false}
    >
      {tooEmpty ? (
        <p className="text-[13px] leading-relaxed text-fg-muted">
          Add your contact details and at least one section, then score it.
        </p>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={result ? "secondary" : "primary"}
              size="sm"
              onClick={handleScore}
              isLoading={isScoring}
              loadingText="Scoring"
            >
              {result ? (
                <RefreshCw className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {result ? "Score again" : "Score this resume"}
            </Button>

            {result && <ScoreRing value={result.overallScore} />}
          </div>

          {result && (
            <div className="space-y-5 animate-fade-in">
              <dl className="space-y-3">
                {(
                  Object.keys(CATEGORY_LABELS) as (keyof AtsResult["categoryScores"])[]
                ).map((key) => (
                  <ScoreBar
                    key={key}
                    label={CATEGORY_LABELS[key]}
                    value={result.categoryScores[key]}
                  />
                ))}
              </dl>

              <Findings
                title="Working well"
                items={result.strengths}
                tone="success"
              />
              <Findings
                title="Holding it back"
                items={result.weaknesses}
                tone="warning"
              />
              <Findings title="Do this next" items={result.suggestions} tone="accent" />
            </div>
          )}
        </div>
      )}
    </SectionShell>
  );
}

function toneFor(value: number) {
  if (value >= 90) return "bg-success";
  if (value >= 78) return "bg-accent";
  return "bg-warning";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <dt className="text-[13px] text-fg-muted">{label}</dt>
        <dd className="text-[13px] font-medium tabular-nums text-fg">{value}</dd>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            toneFor(value),
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/** Same ring as the marketing panel, driven by a real score. */
function ScoreRing({ value }: { value: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 68 68" className="h-full w-full -rotate-90">
        <circle cx="34" cy="34" r={radius} fill="none" strokeWidth="6" className="stroke-surface-2" />
        <circle
          cx="34"
          cy="34"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          className={cn(
            "transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            value >= 78 ? "stroke-accent" : "stroke-warning",
          )}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tabular-nums text-fg">
        {value}
      </span>
    </div>
  );
}

function Findings({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "success" | "warning" | "accent";
}) {
  if (!items?.length) return null;

  return (
    <div>
      <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-fg">
        {tone === "warning" && (
          <TriangleAlert aria-hidden className="h-3.5 w-3.5 text-warning" />
        )}
        {title}
      </h3>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-[13px] leading-relaxed text-fg-muted"
          >
            <span
              aria-hidden
              className={cn(
                "mt-[7px] h-1 w-1 shrink-0 rounded-full",
                tone === "success" && "bg-success",
                tone === "warning" && "bg-warning",
                tone === "accent" && "bg-accent",
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
