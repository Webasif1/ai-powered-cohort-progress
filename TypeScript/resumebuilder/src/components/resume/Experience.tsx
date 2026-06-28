"use client";

import { generateExperience } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Experience({ resume, setResume }: Props) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addExperience = () => {
    setResume({
      ...resume,
      workExperience: [
        ...resume.workExperience,
        {
          company: "",
          position: "",
          statDate: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const updated = resume.workExperience.filter(
      (_: any, i: number) => i !== index
    );

    setResume({
      ...resume,
      workExperience: updated,
    });
  };

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...resume.workExperience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResume({
      ...resume,
      workExperience: updated,
    });
  };

  const handleGenerateDescription = async (index: number) => {
    try {
      setLoadingIndex(index);

      const description = await generateExperience({
        jobRole:
          resume.workExperience[index].position ||
          resume.personalInfo.profile ||
          "Frontend Developer",
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
    } catch (error) {
      console.log("Experience AI Error:", error);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-gray-500 text-sm">
            Add your work experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add
        </button>
      </div>

      {resume.workExperience.map((exp: any, index: number) => (
        <div
          key={index}
          className="border rounded-xl p-5 space-y-4"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">
              Experience {index + 1}
            </h3>

            <button
              onClick={() => removeExperience(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) =>
              handleChange(index, "company", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) =>
              handleChange(index, "position", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Start Date (2023)"
            value={exp.statDate}
            onChange={(e) =>
              handleChange(index, "statDate", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows={5}
            placeholder="Experience Description"
            value={exp.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={() => handleGenerateDescription(index)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            {loadingIndex === index
              ? "Generating..."
              : "✨ Generate Description"}
          </button>
        </div>
      ))}
    </div>
  );
}
