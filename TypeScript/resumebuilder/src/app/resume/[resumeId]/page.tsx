"use client";

import { useState } from "react";

import PersonalInfo from "@/components/resume/PersonalInformation";
import Summary from "@/components/resume/Summary";
import Skills from "@/components/resume/Skills";
import ResumePreview from "@/components/resume/ResumePreview";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Education from "@/components/resume/Education";
import Certifications from "@/components/resume/Certifications";
import { updateResume } from "@/apis/resume.api";
import { useParams } from "next/navigation";

type ResumeType = {
  title: string;
  summery: string;
  personalInfo: {
    fullName: string;
    email: string;
    profile: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  workExperience: {
    company: string;
    position: string;
    statDate: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string;
    techStack: string[];
  }[];
  skills: string[];
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  certifications: string[];
};

const steps = [
  "Personal Info",
  "Summary",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Certifications",
];

const initialResume: ResumeType = {
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
};

export default function ResumePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [resume, setResume] = useState<ResumeType>(initialResume);
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const resumeId = params.resumeId as string;

  const stepComponents = [
    PersonalInfo,
    Summary,
    Skills,
    Experience, // Experience
    Projects, // Projects
    Education, // Education
    Certifications, // Certifications
    null, // Preview
  ];

  const ActiveComponent = stepComponents[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        title: resume.title,
        summery: resume.summery,
        personalInfo: resume.personalInfo,
        workExperience: resume.workExperience,
        projects: resume.projects,
        skills: resume.skills,
        education: resume.education,
        certifications: resume.certifications,
      };

      const res = await updateResume(resumeId, payload);

      console.log(res);
      alert("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Top Navbar */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
        <div>
          <h1 className="text-xl font-bold text-orange-500">Resume Builder</h1>
          <p className="text-sm text-gray-500">
            Build your ATS-friendly resume
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Step Panel */}
        <div className="w-[280px] bg-white border-r p-5 overflow-y-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`p-3 rounded-lg mb-3 cursor-pointer transition ${
                currentStep === index
                  ? "bg-orange-100 border border-orange-400"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}>
              <p className="text-sm text-orange-500">Step {index + 1}</p>

              <p
                className={`font-semibold ${
                  currentStep === index ? "text-orange-500" : "text-gray-800"
                }`}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Center Resume Preview */}
        <div className="flex-1 bg-gray-50 p-6 flex justify-center items-start overflow-y-auto">
          <div className="w-full max-w-[700px] min-h-[900px] bg-white shadow-lg rounded-xl p-8">
            <ResumePreview resume={resume} />
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-[650px] bg-white border-l p-6 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {ActiveComponent ? (
              <ActiveComponent resume={resume} setResume={setResume} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                This section is not built yet
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t mt-4 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-5 py-2 rounded-lg bg-gray-200 disabled:opacity-50">
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="px-5 py-2 rounded-lg bg-orange-500 text-white disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
