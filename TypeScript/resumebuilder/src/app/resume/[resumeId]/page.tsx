"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
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

// ==================== TYPES ====================
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
  experience: any[];
  projects: any[];
  skills: string[];
  education: any[];
  certifications: string[];
}

const DEFAULT_DATA: ResumeData = {
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

// ==================== MAIN COMPONENT ====================
export default function ResumeEditorPage() {
  // Get params
  const params = useParams();
  const resumeId = typeof params?.resumeId === "string" ? params.resumeId : "";

  // State
  const [data, setData] = useState<ResumeData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState("Untitled Resume");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Refs - CRITICAL for preventing loops
  const hasFetched = useRef(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const canSave = useRef(false);
  const isSaving = useRef(false);

  // ==================== FETCH DATA (ONCE) ====================
  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched.current) return;
    if (!resumeId) {
      setIsLoading(false);
      return;
    }

    hasFetched.current = true;
    console.log("📡 Fetching resume:", resumeId);

    const fetchResume = async () => {
      try {
        const res = await getResumeById(resumeId);
        console.log("✅ Fetched:", res);

        setData({
          _id: res._id || resumeId,
          title: res.title || "Untitled Resume",
          personalInfo: {
            fullName: res.personalInfo?.fullName || "",
            email: res.personalInfo?.email || "",
            phone: res.personalInfo?.phone || "",
            location: res.personalInfo?.location || "",
            github: res.personalInfo?.github || "",
            linkedin: res.personalInfo?.linkedin || "",
            portfolio: res.personalInfo?.portfolio || "",
          },
          summary: res.summary || res.summery || "",
          experience: res.experience || res.workExperience || [],
          projects: res.projects || [],
          skills: res.skills || [],
          education: res.education || [],
          certifications: res.certifications || [],
        });
        setTitle(res.title || "Untitled Resume");
      } catch (error) {
        console.error("❌ Fetch error:", error);
        setData({ ...DEFAULT_DATA, _id: resumeId });
      } finally {
        setIsLoading(false);
        // Enable saving after delay
        setTimeout(() => {
          canSave.current = true;
          console.log("✅ Saving enabled");
        }, 1500);
      }
    };

    fetchResume();

    // Cleanup
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [resumeId]);

  // ==================== SAVE FUNCTION ====================
  const performSave = async (dataToSave: ResumeData, titleToSave: string) => {
    if (!resumeId || !canSave.current || isSaving.current) return;

    isSaving.current = true;
    setSaveStatus("saving");
    console.log("💾 Saving...");

    try {
      await updateResume(resumeId, {
        title: titleToSave,
        personalInfo: dataToSave.personalInfo,
        summary: dataToSave.summary,
        experience: dataToSave.experience,
        projects: dataToSave.projects,
        skills: dataToSave.skills,
        education: dataToSave.education,
        certifications: dataToSave.certifications,
      });

      setSaveStatus("saved");
      console.log("✅ Saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("❌ Save error:", error);
      setSaveStatus("error");
    } finally {
      isSaving.current = false;
    }
  };

  // ==================== DEBOUNCED SAVE ====================
  const triggerSave = (newData: ResumeData, newTitle: string) => {
    if (!canSave.current) return;

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      performSave(newData, newTitle);
    }, 2000);
  };

  // ==================== UPDATE HANDLERS ====================
  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      triggerSave(updated, title);
      return updated;
    });
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    triggerSave(data, title);
  };

  const handleRetry = () => {
    performSave(data, title);
  };

  // ==================== LOADING STATE ====================
  if (isLoading) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading resume...</p>
      </div>
    );
  }

  // ==================== NO RESUME ID ====================
  if (!resumeId) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.errorBox}>
          <h2 style={styles.errorTitle}>Resume Not Found</h2>
          <Link href="/resume" style={styles.errorLink}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // ==================== MAIN RENDER ====================
  return (
    <div style={styles.page}>
      {/* ========== NAVBAR ========== */}
      <nav style={styles.navbar}>
        {/* Left */}
        <Link href="/resume" style={styles.backLink}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </Link>

        {/* Center */}
        <div style={styles.navCenter}>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()}
              autoFocus
              style={styles.titleInput}
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              style={styles.titleButton}
            >
              {title || "Untitled Resume"}
            </button>
          )}

          {/* Save Status */}
          <div style={styles.saveStatus}>
            {saveStatus === "saving" && (
              <>
                <Loader2 size={14} style={styles.spinIcon} />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <Check size={14} style={{ color: "#10B981" }} />
                <span style={{ color: "#10B981" }}>Saved</span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertCircle size={14} style={{ color: "#EF4444" }} />
                <span style={{ color: "#EF4444" }}>Failed</span>
                <button onClick={handleRetry} style={styles.retryBtn}>
                  <RefreshCw size={12} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={styles.navRight}>
          <Link href={`/resume/${resumeId}/preview`} style={styles.previewBtn}>
            <Eye size={16} />
            <span>Preview</span>
          </Link>
          <button
            onClick={() => window.open(`/resume/${resumeId}/preview?download=true`, "_blank")}
            style={styles.downloadBtn}
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </nav>

      {/* ========== MOBILE TABS ========== */}
      <div style={styles.mobileTabs} className="mobile-tabs">
        <button
          onClick={() => setActiveTab("edit")}
          style={{
            ...styles.tab,
            ...(activeTab === "edit" ? styles.tabActive : {}),
          }}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          style={{
            ...styles.tab,
            ...(activeTab === "preview" ? styles.tabActive : {}),
          }}
        >
          Preview
        </button>
      </div>

      {/* ========== EDITOR LAYOUT ========== */}
      <div style={styles.editorLayout} className="editor-layout">
        {/* Form Panel */}
        <div
          style={styles.formPanel}
          className={`form-panel ${activeTab === "edit" ? "active" : ""}`}
        >
          <div style={styles.formContent}>
            <PersonalInformation
              data={data.personalInfo}
              onChange={(v) => updateField("personalInfo", v)}
            />
            <ProfessionalSummary
              summary={data.summary}
              onChange={(v) => updateField("summary", v)}
              personalInfo={data.personalInfo}
              skills={data.skills}
            />
            <Experience
              experience={data.experience}
              onChange={(v) => updateField("experience", v)}
              skills={data.skills}
            />
            <Projects
              projects={data.projects}
              onChange={(v) => updateField("projects", v)}
            />
            <Skills
              skills={data.skills}
              onChange={(v) => updateField("skills", v)}
              personalInfo={data.personalInfo}
            />
            <Education
              education={data.education}
              onChange={(v) => updateField("education", v)}
            />
            <Certifications
              certifications={data.certifications}
              onChange={(v) => updateField("certifications", v)}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div
          style={styles.previewPanel}
          className={`preview-panel ${activeTab === "preview" ? "active" : ""}`}
        >
          <p style={styles.previewLabel}>Live Preview</p>
          <ResumePreview data={data} />
        </div>
      </div>

      {/* ========== STYLES ========== */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-tabs {
            display: flex !important;
          }
          .form-panel {
            display: none !important;
          }
          .form-panel.active {
            display: block !important;
          }
          .preview-panel {
            display: none !important;
          }
          .preview-panel.active {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

// ==================== STYLES ====================
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0A0A0F",
  },
  centerScreen: {
    minHeight: "100vh",
    backgroundColor: "#0A0A0F",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  spinner: {
    width: 48,
    height: 48,
    border: "3px solid rgba(124, 58, 237, 0.2)",
    borderTopColor: "#7C3AED",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#6B7280",
    fontSize: 14,
  },
  errorBox: {
    textAlign: "center",
    padding: 40,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  errorTitle: {
    color: "#F8F8FF",
    marginBottom: 16,
    fontSize: 20,
  },
  errorLink: {
    display: "inline-block",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    color: "white",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 500,
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: "rgba(17, 17, 24, 0.95)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#6B7280",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
  },
  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  titleButton: {
    padding: "6px 12px",
    fontSize: 16,
    fontWeight: 600,
    color: "#F8F8FF",
    backgroundColor: "transparent",
    border: "1px solid transparent",
    borderRadius: 8,
    cursor: "pointer",
  },
  titleInput: {
    padding: "6px 12px",
    fontSize: 16,
    fontWeight: 600,
    color: "#F8F8FF",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid #7C3AED",
    borderRadius: 8,
    outline: "none",
    minWidth: 200,
  },
  saveStatus: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#6B7280",
  },
  spinIcon: {
    animation: "spin 1s linear infinite",
  },
  retryBtn: {
    display: "flex",
    alignItems: "center",
    padding: 4,
    color: "#7C3AED",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  previewBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 500,
    color: "#F8F8FF",
    backgroundColor: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    textDecoration: "none",
  },
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 16px",
    fontSize: 13,
    fontWeight: 500,
    color: "white",
    background: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
  mobileTabs: {
    display: "none",
    padding: 12,
    backgroundColor: "#111118",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 500,
    color: "#6B7280",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  tabActive: {
    color: "#F8F8FF",
    backgroundColor: "rgba(124, 58, 237, 0.2)",
  },
  editorLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "calc(100vh - 65px)",
  },
  formPanel: {
    overflowY: "auto",
    height: "calc(100vh - 65px)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
  },
  formContent: {
    padding: 24,
  },
  previewPanel: {
    backgroundColor: "#0D0D12",
    overflowY: "auto",
    height: "calc(100vh - 65px)",
    padding: 24,
  },
  previewLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
};
