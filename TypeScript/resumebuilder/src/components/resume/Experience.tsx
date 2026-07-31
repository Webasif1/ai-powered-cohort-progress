"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { AddItemButton, ItemCard, SectionShell } from "./SectionShell";
import { AIActionButton, useTypewriter, type AIStatus } from "./AIActionButton";
import { Checkbox, Input, Textarea } from "@/components/ui/Field";
import { generateExperience } from "@/apis/ai.api";
import { toText } from "@/lib/aiText";
import { makeId } from "@/lib/cn";
import type { IExperience } from "@/types/resume.types";

interface ExperienceProps {
  experience: IExperience[];
  onChange: (experience: IExperience[]) => void;
  skills: string[];
}

export default function Experience({
  experience,
  onChange,
  skills,
}: ExperienceProps) {
  // Status is keyed by item id so two entries can generate independently.
  const [status, setStatus] = useState<Record<string, AIStatus>>({});
  const { type } = useTypewriter();

  const setItemStatus = (id: string, next: AIStatus) =>
    setStatus((prev) => ({ ...prev, [id]: next }));

  const addItem = () =>
    onChange([
      ...experience,
      {
        id: makeId(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);

  const removeItem = (id: string) =>
    onChange(experience.filter((item) => item.id !== id));

  const updateItem = <K extends keyof IExperience>(
    id: string,
    field: K,
    value: IExperience[K],
  ) =>
    onChange(
      experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const handleGenerate = async (item: IExperience) => {
    setItemStatus(item.id, "loading");

    try {
      const response = await generateExperience({
        experienceLevel: "mid",
        yearsOfExperience: "3",
        jobRole: item.position || "Software Engineer",
        techStack: skills.length ? skills : ["JavaScript", "React"],
      });

      const text = toText(response, "experienceDescription", "description");
      if (!text) throw new Error("Empty response");

      type(
        text,
        (partial) => updateItem(item.id, "description", partial),
        () => {
          setItemStatus(item.id, "success");
          setTimeout(() => setItemStatus(item.id, "idle"), 1800);
        },
      );
    } catch {
      setItemStatus(item.id, "idle");
      toast.error("Could not generate that description");
    }
  };

  return (
    <SectionShell
      icon={Briefcase}
      title="Work experience"
      count={experience.length}
      description="Most recent role first"
    >
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {experience.map((item, index) => (
            <ItemCard
              key={item.id}
              index={index}
              label="Role"
              onRemove={() => removeItem(item.id)}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Company"
                  placeholder="Acme Inc."
                  value={item.company}
                  onChange={(e) =>
                    updateItem(item.id, "company", e.target.value)
                  }
                />
                <Input
                  label="Position"
                  placeholder="Senior Frontend Engineer"
                  value={item.position}
                  onChange={(e) =>
                    updateItem(item.id, "position", e.target.value)
                  }
                />
                <Input
                  label="Start date"
                  type="month"
                  value={item.startDate}
                  onChange={(e) =>
                    updateItem(item.id, "startDate", e.target.value)
                  }
                />
                <Input
                  label="End date"
                  type="month"
                  value={item.current ? "" : item.endDate}
                  disabled={item.current}
                  onChange={(e) =>
                    updateItem(item.id, "endDate", e.target.value)
                  }
                />
              </div>

              <div className="mt-3">
                <Checkbox
                  label="I currently work here"
                  checked={item.current}
                  onChange={(e) =>
                    updateItem(item.id, "current", e.target.checked)
                  }
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="What you did"
                  rows={4}
                  placeholder="Led the rebuild of the checkout flow, cutting drop-off by 18%…"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                />
              </div>

              <div className="mt-3">
                <AIActionButton
                  status={status[item.id] ?? "idle"}
                  onClick={() => handleGenerate(item)}
                  label="Write this for me"
                  successLabel="Written"
                />
              </div>
            </ItemCard>
          ))}
        </AnimatePresence>

        <AddItemButton onClick={addItem} label="Add a role" />
      </div>
    </SectionShell>
  );
}
