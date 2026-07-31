"use client";

import { FileText, RefreshCw, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { SectionShell } from "./SectionShell";
import { AIActionButton, useAIStatus, useTypewriter } from "./AIActionButton";
import { Textarea } from "@/components/ui/Field";
import { generateSummary, improveContent } from "@/apis/ai.api";
import { toText } from "@/lib/aiText";

interface ProfessionalSummaryProps {
  summary: string;
  onChange: (summary: string) => void;
  /** Used to give the model a role to write for. */
  jobTitle: string;
  skills: string[];
}

export default function ProfessionalSummary({
  summary,
  onChange,
  jobTitle,
  skills,
}: ProfessionalSummaryProps) {
  const generate = useAIStatus();
  const improve = useAIStatus();
  const { type } = useTypewriter();

  const handleGenerate = async () => {
    generate.setStatus("loading");
    try {
      const response = await generateSummary({
        experienceLevel: "mid",
        jobTitle: jobTitle || "Software Engineer",
        skills: skills.length ? skills : ["JavaScript", "React", "Node.js"],
      });

      const text = toText(response, "summery", "summary");
      if (!text) throw new Error("Empty response");

      type(text, onChange, generate.succeed);
    } catch {
      generate.setStatus("idle");
      toast.error("Could not generate a summary");
    }
  };

  const handleImprove = async () => {
    if (!summary.trim()) {
      toast("Write something first, then let the AI sharpen it");
      return;
    }

    improve.setStatus("loading");
    try {
      const response = await improveContent({ content: summary });
      const text = toText(response, "improvedContent");
      if (!text) throw new Error("Empty response");

      type(text, onChange, improve.succeed);
    } catch {
      improve.setStatus("idle");
      toast.error("Could not improve that text");
    }
  };

  const words = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <SectionShell
      icon={FileText}
      title="Professional summary"
      description="Three or four lines at the top of the page"
    >
      <Textarea
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="A short paragraph covering who you are, what you have shipped, and what you are looking for next."
        rows={5}
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <AIActionButton
          status={generate.status}
          onClick={handleGenerate}
          label="Generate"
          icon={Sparkles}
          successLabel="Generated"
        />
        <AIActionButton
          status={improve.status}
          onClick={handleImprove}
          label="Improve"
          icon={RefreshCw}
          loadingLabel="Improving"
          successLabel="Improved"
        />

        <span className="ml-auto text-xs tabular-nums text-fg-subtle">
          {words} {words === 1 ? "word" : "words"}
          {words > 0 && words < 30 && " · aim for 40–60"}
        </span>
      </div>
    </SectionShell>
  );
}
