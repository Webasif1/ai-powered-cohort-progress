"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Download,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import PersonalInformation from "@/components/resume/PersonalInformation";
import ProfessionalSummary from "@/components/resume/Summary";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";
import Education from "@/components/resume/Education";
import Certifications from "@/components/resume/Certifications";
import ResumePreview from "@/components/resume/ResumePreview";
import { getResumeById, updateResume } from "@/apis/resume.api";

// Types
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

const DEFAULT_RESUME: ResumeData = {
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

// ============ MAIN COMPONENT ============
export default function ResumeEditorPage() {
  const params = useParams();
  const resumeId =
    typeof params?.resumeId === "string"
      ? params.resumeId
      : Array.isArray(params?.resumeId)
      ? params.resumeId[0]
      : "";

  // State
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState("Untitled Resume");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Refs to prevent loops
  const fetchedRef = useRef(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canSaveRef = useRef(false);

  // ============ FETCH - RUNS ONLY ONCE ============
  useEffect(() => {
    // Guard: only fetch once
    if (fetchedRef.current) return;
    if (!resumeId) {
      setIsLoading(false);
      return;
    }

    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const data = await getResumeById(resumeId);
        console.log("gerResumeById ---->", data)
        setResumeData({
          ...DEFAULT_RESUME,
          ...data,
          _id: data._id || resumeId,
          personalInfo: { ...DEFAULT_RESUME.personalInfo, ...(data.data.personalInfo || {}) },
          experience: data.data.experience || [],
          projects: data.data.projects || [],
          skills: data.data.skills || [],
          education: data.data.education || [],
          certifications: data.data.certifications || [],
        });
        setTitle(data.data.title || "Untitled Resume");
      } catch (err) {
        console.error("Fetch error:", err);
        setResumeData({ ...DEFAULT_RESUME, _id: resumeId });
      } finally {
        setIsLoading(false);
        // Enable saving after 1 second
        setTimeout(() => {
          canSaveRef.current = true;
        }, 1000);
      }
    };

    fetchData();
  }, [resumeId]); // Only resumeId - no functions!

  // ============ CLEANUP ============
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // ============ SAVE FUNCTION ============
  const doSave = useCallback(
    async (data: ResumeData, newTitle: string) => {
      if (!resumeId || !canSaveRef.current) return;

      setSaveStatus("saving");
      try {
        await updateResume(resumeId, {
          title: newTitle,
          personalInfo: data.personalInfo,
          summary: data.summary,
          experience: data.experience,
          projects: data.projects,
          skills: data.skills,
          education: data.education,
          certifications: data.certifications,
        });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err) {
        console.error("Save error:", err);
        setSaveStatus("error");
      }
    },
    [resumeId]
  );

  // ============ DEBOUNCED SAVE TRIGGER ============
  const triggerSave = useCallback(
    (data: ResumeData, newTitle: string) => {
      if (!canSaveRef.current) return;

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

      saveTimeoutRef.current = setTimeout(() => {
        doSave(data, newTitle);
      }, 2000);
    },
    [doSave]
  );

  // ============ UPDATE HANDLERS ============
  const handleUpdate = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setResumeData((prev) => {
      const updated = { ...prev, [field]: value };
      triggerSave(updated, title);
      return updated;
    });
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    triggerSave(resumeData, newTitle);
  };

  const handleDownload = () => {
    window.open(`/resume/${resumeId}/preview?download=true`, "_blank");
  };

  // ============ LOADING STATE ============
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading resume...</p>
        <style jsx>{`
          .loading-screen {
            min-height: 100vh;
            background: #0a0a0f;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(124, 58, 237, 0.2);
            border-top-color: #7c3aed;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          p {
            color: #6b7280;
            font-size: 14px;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // ============ ERROR STATE ============
  if (!resumeId) {
    return (
      <div className="error-screen">
        <h2>Resume Not Found</h2>
        <Link href="/resume">Go to Dashboard</Link>
        <style jsx>{`
          .error-screen {
            min-height: 100vh;
            background: #0a0a0f;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
          }
          h2 {
            color: #f8f8ff;
          }
          a {
            padding: 12px 24px;
            background: linear-gradient(135deg, #7c3aed, #8b5cf6);
            color: white;
            border-radius: 12px;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }

  // ============ MAIN RENDER ============
  return (
    <div className="editor-page">
      {/* ===== NAVBAR (rendered ONCE here) ===== */}
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/resume" className="back-btn">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>

          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                setIsEditingTitle(false);
                handleTitleChange(title);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditingTitle(false);
                  handleTitleChange(title);
                }
              }}
              autoFocus
              className="title-input"
            />
          ) : (
            <h1 className="title" onClick={() => setIsEditingTitle(true)}>
              {title}
            </h1>
          )}

          <span className="save-status">
            {saveStatus === "saving" && (
              <>
                <Loader2 size={14} className="spin" /> Saving...
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Check size={14} /> Saved
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertCircle size={14} /> Failed
                <button onClick={() => doSave(resumeData, title)} className="retry-btn">
                  <RefreshCw size={12} />
                </button>
              </>
            )}
          </span>
        </div>

        <div className="nav-right">
          <Link href={`/resume/${resumeId}/preview`} className="preview-btn">
            <Eye size={16} />
            <span>Preview</span>
          </Link>
          <button onClick={handleDownload} className="download-btn">
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </nav>

      {/* ===== MOBILE TABS ===== */}
      <div className="mobile-tabs">
        <button
          className={`tab ${activeTab === "edit" ? "active" : ""}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit
        </button>
        <button
          className={`tab ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {/* ===== EDITOR LAYOUT ===== */}
      <div className="editor-layout">
        {/* Left: Form */}
        <motion.div
          className={`form-panel ${activeTab === "edit" ? "active" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="form-content">
            <PersonalInformation
              data={resumeData.personalInfo}
              onChange={(v) => handleUpdate("personalInfo", v)}
            />
            <ProfessionalSummary
              summary={resumeData.summary}
              onChange={(v) => handleUpdate("summary", v)}
              personalInfo={resumeData.personalInfo}
              skills={resumeData.skills}
            />
            <Experience
              experience={resumeData.experience}
              onChange={(v) => handleUpdate("experience", v)}
              skills={resumeData.skills}
            />
            <Projects
              projects={resumeData.projects}
              onChange={(v) => handleUpdate("projects", v)}
            />
            <Skills
              skills={resumeData.skills}
              onChange={(v) => handleUpdate("skills", v)}
              personalInfo={resumeData.personalInfo}
            />
            <Education
              education={resumeData.education}
              onChange={(v) => handleUpdate("education", v)}
            />
            <Certifications
              certifications={resumeData.certifications}
              onChange={(v) => handleUpdate("certifications", v)}
            />
          </div>
        </motion.div>

        {/* Right: Preview */}
        <motion.div
          className={`preview-panel ${activeTab === "preview" ? "active" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="preview-label">Live Preview</p>
          <ResumePreview data={resumeData} />
        </motion.div>
      </div>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .editor-page {
          min-height: 100vh;
          background: #0a0a0f;
        }

        /* Navbar */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background: #111118;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-left,
        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .back-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f8f8ff;
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          color: #f8f8ff;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          margin: 0;
        }
        .title:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .title-input {
          font-size: 16px;
          font-weight: 600;
          color: #f8f8ff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #7c3aed;
          border-radius: 6px;
          padding: 4px 8px;
          outline: none;
        }
        .save-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }
        .retry-btn {
          background: none;
          border: none;
          color: #7c3aed;
          cursor: pointer;
          padding: 4px;
        }
        .preview-btn,
        .download-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .preview-btn {
          color: #f8f8ff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-decoration: none;
        }
        .preview-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .download-btn {
          color: white;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: none;
        }
        .download-btn:hover {
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
        }

        /* Mobile Tabs */
        .mobile-tabs {
          display: none;
          padding: 12px 16px;
          background: #111118;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tab {
          flex: 1;
          padding: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .tab.active {
          color: #f8f8ff;
          background: rgba(124, 58, 237, 0.2);
        }

        /* Editor Layout */
        .editor-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 65px);
        }
        .form-panel {
          overflow-y: auto;
          height: calc(100vh - 65px);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }
        .form-content {
          padding: 24px;
        }
        .preview-panel {
          background: #0d0d12;
          overflow-y: auto;
          height: calc(100vh - 65px);
          padding: 24px;
        }
        .preview-label {
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 16px;
        }

        /* Animations */
        :global(.spin) {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr;
          }
          .mobile-tabs {
            display: flex;
          }
          .form-panel {
            display: none;
          }
          .form-panel.active {
            display: block;
          }
          .preview-panel {
            display: none;
          }
          .preview-panel.active {
            display: block;
          }
          .preview-btn span,
          .download-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
