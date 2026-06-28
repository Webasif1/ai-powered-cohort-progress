"use client";

import { getATSScore } from "@/apis/ai.api";
import { useState } from "react";

export default function ATSScore({ resume }: any) {
  const [atsResult, setAtsResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleATS = async () => {
    try {
      setLoading(true);

      const result = await getATSScore({
        resumeText: JSON.stringify(resume),
      });

      setAtsResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleATS}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze ATS"}
      </button>

      {atsResult && (
        <div className="mt-4 border rounded-lg p-4">
          <h2 className="font-bold text-xl">
            ATS Score: {atsResult.overallScore}/100
          </h2>

          <ul className="list-disc ml-5 mt-3">
            {atsResult.suggestions.map(
              (item: string, i: number) => (
                <li key={i}>{item}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
