"use client";

import { generateExperience } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
  index: number;
};

export default function AIExperienceButton({
  resume,
  setResume,
  index,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const description = await generateExperience({
        jobRole: resume.personalInfo.profile || "Developer",
        experienceLevel: "Mid-level",
        yearsOfExperience: "2",
        techStack: resume.skills || [],
      });

      const updated = [...resume.workExperience];
      updated[index].description = description;

      setResume({
        ...resume,
        workExperience: updated,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGenerate}>
      {loading ? "Generating..." : "✨ AI Generate"}
    </button>
  );
}
