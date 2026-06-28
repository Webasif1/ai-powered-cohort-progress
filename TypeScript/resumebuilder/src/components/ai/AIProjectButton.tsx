"use client";

import { generateProjectDescription } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
  index: number;
};

export default function AIProjectButton({
  resume,
  setResume,
  index,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const description = await generateProjectDescription({
        jobTitle: resume.personalInfo.profile || "Developer",
        experienceLevel: "Mid-level",
        techStack: resume.skills || [],
      });

      const updated = [...resume.projects];
      updated[index].description = description;

      setResume({
        ...resume,
        projects: updated,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGenerate}>
      {loading ? "Generating..." : "✨ Generate Project"}
    </button>
  );
}
