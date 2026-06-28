"use client";

type Props = {
  resume: any;
  setResume: React.Dispatch<React.SetStateAction<any>>;
};

export default function Education({ resume, setResume }: Props) {
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

  const removeEducation = (index: number) => {
    const updated = resume.education.filter(
      (_: any, i: number) => i !== index
    );

    setResume({
      ...resume,
      education: updated,
    });
  };

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...resume.education];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setResume({
      ...resume,
      education: updated,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-gray-500 text-sm">
            Add your education history
          </p>
        </div>

        <button
          onClick={addEducation}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          + Add
        </button>
      </div>

      {resume.education.map((edu: any, index: number) => (
        <div
          key={index}
          className="border rounded-xl p-5 space-y-4"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">
              Education {index + 1}
            </h3>

            <button
              onClick={() => removeEducation(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Institute"
            value={edu.institute}
            onChange={(e) =>
              handleChange(index, "institute", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleChange(index, "degree", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Start Date (2020)"
            value={edu.startDate}
            onChange={(e) =>
              handleChange(index, "startDate", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="End Date (2024)"
            value={edu.endDate}
            onChange={(e) =>
              handleChange(index, "endDate", e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>
      ))}
    </div>
  );
}
