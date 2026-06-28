"use client";

import { generateProjectDescription } from "@/apis/ai.api";
import { useState } from "react";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Projects({ resume, setResume }: Props) {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          title: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
          techStack: [],
        },
      ],
    });
  };

  const removeProject = (index: number) => {
    const updated = resume.projects.filter(
      (_: any, i: number) => i !== index
    );

    setResume({
      ...resume,
      projects: updated,
    });
  };

  const handleChange = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...resume.projects];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResume({
      ...resume,
      projects: updated,
    });
  };

  const addTech = (index: number, tech: string) => {
    if (!tech.trim()) return;

    const updated = [...resume.projects];
    updated[index].techStack.push(tech);

    setResume({
      ...resume,
      projects: updated,
    });
  };

  const removeTech = (projectIndex: number, techIndex: number) => {
    const updated = [...resume.projects];

    updated[projectIndex].techStack =
      updated[projectIndex].techStack.filter(
        (_: string, i: number) => i !== techIndex
      );

    setResume({
      ...resume,
      projects: updated,
    });
  };

  const generateDescription = async (index: number) => {
    try {
      setLoadingIndex(index);

      const description = await generateProjectDescription({
        jobTitle:
          resume.personalInfo.profile || "Frontend Developer",
        experienceLevel: "Mid-level",
        techStack:
          resume.projects[index].techStack.length > 0
            ? resume.projects[index].techStack
            : resume.skills,
      });

      const updated = [...resume.projects];
      updated[index].description = description;

      setResume({
        ...resume,
        projects: updated,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-gray-500 text-sm">
            Add your projects
          </p>
        </div>

        <button
          onClick={addProject}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add
        </button>
      </div>

      {resume.projects.map((project: any, index: number) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          handleChange={handleChange}
          removeProject={removeProject}
          addTech={addTech}
          removeTech={removeTech}
          generateDescription={generateDescription}
          loadingIndex={loadingIndex}
        />
      ))}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  handleChange,
  removeProject,
  addTech,
  removeTech,
  generateDescription,
  loadingIndex,
}: any) {
  const [techInput, setTechInput] = useState("");

  return (
    <div className="border rounded-xl p-5 space-y-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">
          Project {index + 1}
        </h3>

        <button
          onClick={() => removeProject(index)}
          className="text-red-500"
        >
          Remove
        </button>
      </div>

      <input
        placeholder="Project Title"
        value={project.title}
        onChange={(e) =>
          handleChange(index, "title", e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        placeholder="Github URL"
        value={project.githubUrl}
        onChange={(e) =>
          handleChange(index, "githubUrl", e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        placeholder="Live URL"
        value={project.liveUrl}
        onChange={(e) =>
          handleChange(index, "liveUrl", e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      <textarea
        rows={5}
        placeholder="Project Description"
        value={project.description}
        onChange={(e) =>
          handleChange(index, "description", e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      {/* Tech Stack */}
      <div className="flex gap-3">
        <input
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React"
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={() => {
            addTech(index, techInput);
            setTechInput("");
          }}
          className="bg-orange-500 text-white px-4 rounded-lg"
        >
          Add Tech
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech: string, techIndex: number) => (
          <div
            key={techIndex}
            className="bg-orange-100 px-3 py-1 rounded-full flex gap-2"
          >
            <span>{tech}</span>
            <button
              onClick={() => removeTech(index, techIndex)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => generateDescription(index)}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg"
      >
        {loadingIndex === index
          ? "Generating..."
          : "✨ Generate Description"}
      </button>
    </div>
  );
}
