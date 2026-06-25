"use client";

export default function Education({ resume, setResume }: any) {
  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateEducation = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...resume.education];
    updated[index][field] = value;

    setResume({
      ...resume,
      education: updated,
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Education</h2>

        <button
          onClick={addEducation}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {resume.education.map((edu: any, index: number) => (
        <div key={index} className="border rounded-xl p-4 mb-4 space-y-3">
          <input
            value={edu.institute}
            onChange={(e) =>
              updateEducation(index, "institute", e.target.value)
            }
            placeholder="Institute"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={edu.degree}
            onChange={(e) =>
              updateEducation(index, "degree", e.target.value)
            }
            placeholder="Degree"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={edu.startDate}
            onChange={(e) =>
              updateEducation(index, "startDate", e.target.value)
            }
            placeholder="Start Date"
            className="w-full border p-3 rounded-lg"
          />

          <input
            value={edu.endDate}
            onChange={(e) =>
              updateEducation(index, "endDate", e.target.value)
            }
            placeholder="End Date"
            className="w-full border p-3 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
