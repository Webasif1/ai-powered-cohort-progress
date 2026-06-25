"use client";

import { useEffect, useState } from "react";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { useParams } from "next/navigation";

const sections = [
  "Personal Info",
  "Summary",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Certifications",
];

export default function ResumePage() {
  const params = useParams();
  const resumeId = params.resumeId as string;

  const [activeSection, setActiveSection] = useState("Personal Info");
  const [resume, setResume] = useState<any>({
  title: "",
  summery: "",
  personalInfo: {
    fullName: "",
    email: "",
    profile: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
  },
  workExperience: [],
  projects: [],
  skills: [],
  education: [],
  certifications: [],
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    try {
      const res = await getResumeById(resumeId);
      setResume(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      await updateResume(resumeId, resume);
      alert("Saved");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-black grid grid-cols-12 gap-4 p-4">

      {/* Sidebar */}
      <div className="col-span-2 bg-black rounded-xl shadow p-4">
        <h2 className="font-bold text-xl mb-4">Sections</h2>

        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                activeSection === section
                  ? "bg-orange-500 text-black"
                  : "hover:bg-gray-100"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="col-span-5 bg-black rounded-xl shadow p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-6">
          {activeSection}
        </h2>

        {activeSection === "Personal Info" && (
          <div className="space-y-4">
            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Full Name"
              value={resume.personalInfo?.fullName || ""}
              onChange={(e) =>
                setResume({
                  ...resume,
                  personalInfo: {
                    ...resume.personalInfo,
                    fullName: e.target.value,
                  },
                })
              }
            />

            <input
              className="w-full border p-3 rounded-lg"
              placeholder="Email"
              value={resume.personalInfo?.email || ""}
              onChange={(e) =>
                setResume({
                  ...resume,
                  personalInfo: {
                    ...resume.personalInfo,
                    email: e.target.value,
                  },
                })
              }
            />
          </div>
        )}

        {activeSection === "Summary" && (
          <textarea
            className="w-full border p-4 rounded-lg h-48"
            value={resume.summery || ""}
            onChange={(e) =>
              setResume({
                ...resume,
                summery: e.target.value,
              })
            }
          />
        )}

        <button
          onClick={handleSave}
          className="mt-6 bg-orange-500 text-black px-5 py-3 rounded-lg"
        >
          Save Changes
        </button>
      </div>

      {/* Preview */}
      <div className="col-span-5 bg-black rounded-xl shadow p-6 overflow-auto">
        <h2 className="text-2xl font-bold">
          {resume.personalInfo?.fullName || "Your Name"}
        </h2>

        <p className="text-gray-500">
          {resume.personalInfo?.profile || "Job Title"}
        </p>

        <hr className="my-4" />

        <h3 className="font-bold mb-2">Summary</h3>
        <p>{resume.summery || "Your summary..."}</p>

        <hr className="my-4" />

        <h3 className="font-bold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resume.skills?.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-100 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
