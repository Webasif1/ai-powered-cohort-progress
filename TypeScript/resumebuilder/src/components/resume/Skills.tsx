"use client";

import { useState } from "react";

export default function Skills({ resume, setResume }: any) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setResume({
      ...resume,
      skills: [...resume.skills, skillInput],
    });

    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    setResume({
      ...resume,
      skills: resume.skills.filter(
        (_: string, i: number) => i !== index
      ),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add skill"
          className="flex-1 border rounded-lg p-3"
        />
        <button
          onClick={addSkill}
          className="bg-orange-500 text-white px-4 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resume.skills.map((skill: string, index: number) => (
          <div
            key={index}
            className="bg-orange-100 text-orange-600 px-3 py-2 rounded-full flex gap-2"
          >
            {skill}
            <button onClick={() => removeSkill(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
