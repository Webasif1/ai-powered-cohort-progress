"use client";

import { generateSkills } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Skills({ resume, setResume }: Props) {
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setResume({
      ...resume,
      skills: [...resume.skills, skillInput.trim()],
    });

    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    const updatedSkills = resume.skills.filter(
      (_: string, i: number) => i !== index
    );

    setResume({
      ...resume,
      skills: updatedSkills,
    });
  };

  const handleGenerateSkills = async () => {
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
    } catch (error) {
      console.log("Skills AI error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-black">Skills</h2>
        <p className="text-gray-500 text-sm">
          Add your technical skills
        </p>
      </div>

      {/* Add Skill */}
      <div className="flex gap-3">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="React"
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={addSkill}
          className="bg-orange-500 text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* AI Generate */}
      <button
        onClick={handleGenerateSkills}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "✨ Generate Skills"}
      </button>

      {/* Skills List */}
      <div className="flex flex-wrap gap-3">
        {resume.skills.map((skill: string, index: number) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-2 rounded-full"
          >
            <span>{skill}</span>

            <button
              onClick={() => removeSkill(index)}
              className="font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
