"use client";

import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Certifications({
  resume,
  setResume,
}: Props) {
  const [certInput, setCertInput] = useState("");

  const addCertification = () => {
    if (!certInput.trim()) return;

    setResume({
      ...resume,
      certifications: [
        ...resume.certifications,
        certInput.trim(),
      ],
    });

    setCertInput("");
  };

  const removeCertification = (index: number) => {
    const updated = resume.certifications.filter(
      (_: string, i: number) => i !== index
    );

    setResume({
      ...resume,
      certifications: updated,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Certifications</h2>
        <p className="text-gray-500 text-sm">
          Add your certifications
        </p>
      </div>

      {/* Add Certification */}
      <div className="flex gap-3">
        <input
          type="text"
          value={certInput}
          onChange={(e) => setCertInput(e.target.value)}
          placeholder="AWS Certified Developer"
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={addCertification}
          className="bg-orange-500 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Certification List */}
      <div className="space-y-3">
        {resume.certifications.map(
          (cert: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-lg p-3"
            >
              <span>{cert}</span>

              <button
                onClick={() => removeCertification(index)}
                className="text-red-500 font-bold"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
