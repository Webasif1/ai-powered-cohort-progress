"use client";

export default function Projects({ resume, setResume }: any) {
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

  const updateProject = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...resume.projects];
    updated[index][field] = value;

    setResume({
      ...resume,
      projects: updated,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>

        <button
          onClick={addProject}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {resume.projects.map((project: any, index: number) => (
        <div key={index} className="border rounded-xl p-4 mb-4 space-y-3">
          <input
            value={project.title}
            onChange={(e) =>
              updateProject(index, "title", e.target.value)
            }
            placeholder="Project Title"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            value={project.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
            placeholder="Description"
            className="w-full border p-3 rounded-lg h-24"
          />

          <input
            value={project.githubUrl}
            onChange={(e) =>
              updateProject(index, "githubUrl", e.target.value)
            }
            placeholder="Github URL"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={project.liveUrl}
            onChange={(e) =>
              updateProject(index, "liveUrl", e.target.value)
            }
            placeholder="Live URL"
            className="w-full border p-3 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
