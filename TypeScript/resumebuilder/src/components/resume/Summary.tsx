"use client";

import { generateSummary, improveContent } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Summary({ resume, setResume }: Props) {
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);

  const handleGenerateSummary = async () => {
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
      console.log("Summary error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImproveSummary = async () => {
    if (!resume.summery) return;

    try {
      setImproving(true);

      const improved = await improveContent({
        content: resume.summery,
      });

      setResume({
        ...resume,
        summery: improved,
      });
    } catch (error) {
      console.log("Improve error:", error);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-black">
          Professional Summary
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Write or generate an ATS-friendly summary
        </p>
      </div>

      <textarea
        rows={8}
        value={resume.summery}
        onChange={(e) =>
          setResume({
            ...resume,
            summery: e.target.value,
          })
        }
        placeholder="Write your professional summary..."
        className="w-full border rounded-xl p-4 resize-none"
      />

      <div className="flex gap-3">
        <button
          onClick={handleGenerateSummary}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? "Generating..." : "✨ Generate AI Summary"}
        </button>

        <button
          onClick={handleImproveSummary}
          className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg"
        >
          {improving ? "Improving..." : "✨ Improve Content"}
        </button>
      </div>
    </div>
  );
}
