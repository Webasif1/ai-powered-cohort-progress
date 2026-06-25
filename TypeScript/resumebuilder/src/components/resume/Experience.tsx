"use client";

export default function Experience({ resume, setResume }: any) {
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

  const updateField = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...resume.workExperience];
    updated[index][field] = value;

    setResume({
      ...resume,
      workExperience: updated,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Experience</h2>

        <button
          onClick={addExperience}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {resume.workExperience.map((exp: any, index: number) => (
        <div key={index} className="border rounded-xl p-4 mb-4 space-y-3">
          <input
            value={exp.company}
            onChange={(e) =>
              updateField(index, "company", e.target.value)
            }
            placeholder="Company"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={exp.position}
            onChange={(e) =>
              updateField(index, "position", e.target.value)
            }
            placeholder="Position"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={exp.statDate}
            onChange={(e) =>
              updateField(index, "statDate", e.target.value)
            }
            placeholder="Start Date"
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            value={exp.description}
            onChange={(e) =>
              updateField(index, "description", e.target.value)
            }
            placeholder="Description"
            className="w-full border p-3 rounded-lg h-32"
          />
        </div>
      ))}
    </div>
  );
}
