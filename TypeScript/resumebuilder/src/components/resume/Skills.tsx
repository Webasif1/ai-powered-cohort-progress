"use client";

import { useState } from "react";
import { Wrench, X } from "lucide-react";
import toast from "react-hot-toast";
import { SectionShell } from "./SectionShell";
import { AIActionButton, useAIStatus } from "./AIActionButton";
import { generateSkills } from "@/apis/ai.api";
import { toList } from "@/lib/aiText";

interface SkillsProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  /** Used to target the AI suggestions. */
  jobTitle: string;
}

export default function Skills({ skills, onChange, jobTitle }: SkillsProps) {
  const [draft, setDraft] = useState("");
  const generate = useAIStatus();

  const addSkill = (value: string) => {
    const skill = value.trim();
    if (skill && !skills.includes(skill)) onChange([...skills, skill]);
    setDraft("");
  };

  const removeSkill = (skill: string) =>
    onChange(skills.filter((s) => s !== skill));

  const handleGenerate = async () => {
    generate.setStatus("loading");

    try {
      const response = await generateSkills({
        experienceLevel: "mid",
        jobTitle: jobTitle || "Software Engineer",
      });

      const suggested = toList(response, "skills");
      if (!suggested.length) throw new Error("Empty response");

      // Merge in one update — the old code called onChange inside an interval
      // with a stale `skills` closure, so most suggestions were dropped.
      const merged = [...skills];
      for (const skill of suggested) {
        if (!merged.includes(skill)) merged.push(skill);
      }

      onChange(merged);
      generate.succeed();
    } catch {
      generate.setStatus("idle");
      toast.error("Could not suggest skills");
    }
  };

  return (
    <SectionShell
      icon={Wrench}
      title="Skills"
      count={skills.length}
      description="The keywords the filter is looking for"
    >
      {skills.length > 0 && (
        <ul className="mb-3 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <li key={skill}>
              <span className="inline-flex items-center gap-1 rounded-full border border-line bg-elevated py-1 pl-3 pr-1.5 text-[13px] text-fg">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addSkill(draft);
          }
          if (e.key === "Backspace" && !draft && skills.length) {
            removeSkill(skills[skills.length - 1]);
          }
        }}
        onBlur={() => addSkill(draft)}
        placeholder="Type a skill and press Enter"
        aria-label="Add a skill"
        className="h-9.5 w-full rounded-md border border-line bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] hover:border-line-strong focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-[var(--accent-ring)]"
      />

      <div className="mt-3">
        <AIActionButton
          status={generate.status}
          onClick={handleGenerate}
          label="Suggest skills"
          loadingLabel="Thinking"
          successLabel="Added"
        />
      </div>
    </SectionShell>
  );
}
