"use client";

import { useState } from "react";

export default function Certifications({ resume, setResume }: any) {
  const [certInput, setCertInput] = useState("");

  const addCert = () => {
    if (!certInput.trim()) return;

    setResume({
      ...resume,
      certifications: [...resume.certifications, certInput],
    });

    setCertInput("");
  };

  const removeCert = (index: number) => {
    setResume({
      ...resume,
      certifications: resume.certifications.filter(
        (_: string, i: number) => i !== index
      ),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Certifications</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={certInput}
          onChange={(e) => setCertInput(e.target.value)}
          placeholder="Certification name"
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={addCert}
          className="bg-orange-500 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {resume.certifications.map((cert: string, index: number) => (
          <div
            key={index}
            className="bg-gray-100 p-3 rounded-lg flex justify-between"
          >
            {cert}
            <button onClick={() => removeCert(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
