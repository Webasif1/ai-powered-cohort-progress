"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ResumeNavbar from "@/components/resume/ResumeNavbar";
import PersonalInformation from "@/components/resume/PersonalInformation";
import ProfessionalSummary from "@/components/resume/Summary";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";
import Education from "@/components/resume/Education";
import Certifications from "@/components/resume/Certifications";
import ResumePreview from "@/components/resume/ResumePreview";
import { getResumeById, updateResume } from "@/apis/resume.api";

interface ResumeData {
  _id: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string;
    techStack: string[];
  }>;
  skills: string[];
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
  }>;
  certifications: string[];
}

const defaultResumeData: ResumeData = {
  _id: "",
  title: "Untitled Resume",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
  },
  summary: "",
  experience: [],
  projects: [],
  skills: [],
  education: [],
  certifications: [],
};

export default function ResumeEditorPage() {
  const params = useParams();

  // Handle both string and string[] cases
  const resumeId = Array.isArray(params?.resumeId)
    ? params.resumeId[0]
    : params?.resumeId || "";

  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [hasError, setHasError] = useState(false);

  // Fetch resume data
  useEffect(() => {
    const fetchResume = async () => {
      // Don't fetch if no resumeId
      if (!resumeId) {
        console.error("No resumeId provided");
        setIsLoading(false);
        setHasError(true);
        return;
      }

      try {
        const data = await getResumeById(resumeId);
        setResumeData({
          ...defaultResumeData,
          ...data,
          _id: data._id || resumeId,
          personalInfo: { ...defaultResumeData.personalInfo, ...(data.personalInfo || {}) },
          experience: data.experience || [],
          projects: data.projects || [],
          skills: data.skills || [],
          education: data.education || [],
          certifications: data.certifications || [],
        });
        setHasError(false);
      } catch (error: any) {
        console.error("Failed to fetch resume:", error);
        // Still allow editing with default data
        setResumeData({
          ...defaultResumeData,
          _id: resumeId,
        });
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [resumeId]);

  // Debounced save
  const saveResume = useCallback(
    async (data: Partial<ResumeData>) => {
      if (!resumeId) return;

      setSaveStatus("saving");
      try {
        await updateResume(resumeId, data);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (error) {
        console.error("Failed to save resume:", error);
        setSaveStatus("error");
      }
    },
    [resumeId]
  );

  // Auto-save with debounce
  useEffect(() => {
    if (isLoading || !resumeData._id || hasError) return;

    const timeoutId = setTimeout(() => {
      saveResume(resumeData);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, isLoading, saveResume, hasError]);

  // Update handlers
  const handleTitleChange = (newTitle: string) => {
    setResumeData((prev) => ({ ...prev, title: newTitle }));
  };

  const handlePersonalInfoChange = (personalInfo: ResumeData["personalInfo"]) => {
    setResumeData((prev) => ({ ...prev, personalInfo }));
  };

  const handleSummaryChange = (summary: string) => {
    setResumeData((prev) => ({ ...prev, summary }));
  };

  const handleExperienceChange = (experience: ResumeData["experience"]) => {
    setResumeData((prev) => ({ ...prev, experience }));
  };

  const handleProjectsChange = (projects: ResumeData["projects"]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const handleEducationChange = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const handleCertificationsChange = (certifications: string[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  };

  const handleRetry = () => {
    saveResume(resumeData);
  };

  const handleDownload = () => {
    window.open(`/resume/${resumeId}/preview?download=true`, "_blank");
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A0A0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(124, 58, 237, 0.2)",
              borderTopColor: "#7C3AED",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#6B7280", fontSize: "14px" }}>Loading resume...</p>
        </div>
        <style jsx global>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // No resumeId error state
  if (!resumeId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A0A0F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ color: "#F8F8FF", marginBottom: "16px" }}>Resume Not Found</h2>
          <p style={{ color: "#6B7280", marginBottom: "24px" }}>
            The resume ID is missing or invalid.
          </p>
          <a
            href="/resume"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
              background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
              borderRadius: "12px",
              textDecoration: "none",
            }}
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0F" }}>
      {/* Navbar */}
      <ResumeNavbar
        resumeId={resumeId}
        title={resumeData.title}
        onTitleChange={handleTitleChange}
        saveStatus={saveStatus}
        onRetry={handleRetry}
        onDownload={handleDownload}
      />

      {/* Mobile Tab Switcher */}
      <div
        className="mobile-tabs"
        style={{
          display: "none",
          padding: "12px 16px",
          backgroundColor: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "10px",
            padding: "4px",
          }}
        >
          <button
            onClick={() => setActiveTab("edit")}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: activeTab === "edit" ? "#F8F8FF" : "#6B7280",
              backgroundColor: activeTab === "edit" ? "rgba(124, 58, 237, 0.2)" : "transparent",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 500,
              color: activeTab === "preview" ? "#F8F8FF" : "#6B7280",
              backgroundColor: activeTab === "preview" ? "rgba(124, 58, 237, 0.2)" : "transparent",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div
        className="editor-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "calc(100vh - 65px)",
        }}
      >
        {/* Left Panel - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={`editor-form ${activeTab === "edit" ? "active" : ""}`}
          style={{
            overflowY: "auto",
            height: "calc(100vh - 65px)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ padding: "24px" }}>
            {/* Personal Information */}
            <PersonalInformation
              data={resumeData.personalInfo}
              onChange={handlePersonalInfoChange}
            />

            {/* Professional Summary */}
            <ProfessionalSummary
              summary={resumeData.summary}
              onChange={handleSummaryChange}
              personalInfo={resumeData.personalInfo}
              skills={resumeData.skills}
            />

            {/* Work Experience */}
            <Experience
              experience={resumeData.experience}
              onChange={handleExperienceChange}
              skills={resumeData.skills}
            />

            {/* Projects */}
            <Projects
              projects={resumeData.projects}
              onChange={handleProjectsChange}
            />

            {/* Skills */}
            <Skills
              skills={resumeData.skills}
              onChange={handleSkillsChange}
              personalInfo={resumeData.personalInfo}
            />

            {/* Education */}
            <Education
              education={resumeData.education}
              onChange={handleEducationChange}
            />

            {/* Certifications */}
            <Certifications
              certifications={resumeData.certifications}
              onChange={handleCertificationsChange}
            />
          </div>
        </motion.div>

        {/* Right Panel - Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`editor-preview ${activeTab === "preview" ? "active" : ""}`}
          style={{
            backgroundColor: "#0D0D12",
            overflowY: "auto",
            height: "calc(100vh - 65px)",
            padding: "24px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#6B7280",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            This is how your resume looks to recruiters
          </p>
          <ResumePreview data={resumeData} />
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-tabs {
            display: block !important;
          }
          .editor-form {
            display: none;
          }
          .editor-form.active {
            display: block;
          }
          .editor-preview {
            display: none;
          }
          .editor-preview.active {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
