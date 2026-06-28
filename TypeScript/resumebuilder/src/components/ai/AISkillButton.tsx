"use client";

import { generateSkills } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function AISkillButton({
  resume,
  setResume,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const skills = await generateSkills({
        jobTitle: resume.personalInfo.profile || "Frontend Developer",
        experienceLevel: "Mid-level",
      });

      setResume({
        ...resume,
        skills,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
    >
      {loading ? "Generating..." : "✨ Generate Skills"}
    </button>
  );
}
