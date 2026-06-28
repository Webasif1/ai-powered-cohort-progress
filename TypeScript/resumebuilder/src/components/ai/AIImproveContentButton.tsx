"use client";

import { improveContent } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  content: string;
  onUpdate: (value: string) => void;
};

export default function AIImproveContentButton({
  content,
  onUpdate,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    try {
      setLoading(true);

      const improved = await improveContent({
        content,
      });

      onUpdate(improved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleImprove}>
      {loading ? "Improving..." : "✨ Improve"}
    </button>
  );
}
