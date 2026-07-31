"use client";

import { AnimatePresence } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { AddItemButton, ItemCard, SectionShell } from "./SectionShell";
import { Input } from "@/components/ui/Field";
import { makeId } from "@/lib/cn";
import type { IEducation } from "@/types/resume.types";

interface EducationProps {
  education: IEducation[];
  onChange: (education: IEducation[]) => void;
}

export default function Education({ education, onChange }: EducationProps) {
  const addItem = () =>
    onChange([
      ...education,
      {
        id: makeId(),
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
      },
    ]);

  const removeItem = (id: string) =>
    onChange(education.filter((item) => item.id !== id));

  const updateItem = (id: string, field: keyof IEducation, value: string) =>
    onChange(
      education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  return (
    <SectionShell
      icon={GraduationCap}
      title="Education"
      count={education.length}
    >
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {education.map((item, index) => (
            <ItemCard
              key={item.id}
              index={index}
              label="Entry"
              onRemove={() => removeItem(item.id)}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Degree"
                  placeholder="BSc Computer Science"
                  value={item.degree}
                  onChange={(e) => updateItem(item.id, "degree", e.target.value)}
                />
                <Input
                  label="Institution"
                  placeholder="University of Somewhere"
                  value={item.institution}
                  onChange={(e) =>
                    updateItem(item.id, "institution", e.target.value)
                  }
                />
                <Input
                  label="Start year"
                  inputMode="numeric"
                  placeholder="2019"
                  value={item.startYear}
                  onChange={(e) =>
                    updateItem(item.id, "startYear", e.target.value)
                  }
                />
                <Input
                  label="End year"
                  inputMode="numeric"
                  placeholder="2023"
                  value={item.endYear}
                  onChange={(e) =>
                    updateItem(item.id, "endYear", e.target.value)
                  }
                />
              </div>
            </ItemCard>
          ))}
        </AnimatePresence>

        <AddItemButton onClick={addItem} label="Add education" />
      </div>
    </SectionShell>
  );
}
