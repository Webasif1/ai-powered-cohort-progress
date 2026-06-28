"use client";

import { generateSummary } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function AISummaryButton({
  resume,
  setResume,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const summary = await generateSummary({
        jobTitle: resume.personalInfo.profile || "Frontend Developer",
        experienceLevel: "Mid-level",
        skills: resume.skills || [],
      });

      setResume({
        ...resume,
        summery: summary,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
    >
      {loading ? "Generating..." : "✨ Generate Summary"}
    </button>
  );
}
