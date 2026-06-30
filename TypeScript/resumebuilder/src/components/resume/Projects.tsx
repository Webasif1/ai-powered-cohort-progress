"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  ChevronDown,
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { generateProjectDescription } from "@/apis/ai.api";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

interface ProjectsProps {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
}

export default function Projects({ projects, onChange }: ProjectsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newItem: ProjectItem = {
      id: Date.now().toString(),
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      techStack: [],
    };
    onChange([...projects, newItem]);
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((item) => item.id !== id));
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: string | string[]) => {
    onChange(
      projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addTag = (projectId: string) => {
    const tag = tagInput[projectId]?.trim();
    if (!tag) return;

    const project = projects.find((p) => p.id === projectId);
    if (project && !project.techStack.includes(tag)) {
      updateProject(projectId, "techStack", [...project.techStack, tag]);
    }
    setTagInput({ ...tagInput, [projectId]: "" });
  };

  const removeTag = (projectId: string, tagToRemove: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        "techStack",
        project.techStack.filter((tag) => tag !== tagToRemove)
      );
    }
  };

  const handleGenerateDescription = async (item: ProjectItem) => {
    setGeneratingId(item.id);
    try {
      const response = await generateProjectDescription({
        experienceLevel: "mid",
        jobTitle: item.title || "Web Application",
        techStack: item.techStack.length > 0 ? item.techStack : ["React", "Node.js"],
      });
      const generatedText = response.description || response.data || response;

      // Typewriter effect
      let index = 0;
      const text = typeof generatedText === "string" ? generatedText : JSON.stringify(generatedText);
      const interval = setInterval(() => {
        if (index < text.length) {
          updateProject(item.id, "description", text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setGeneratingId(null);
          setSuccessId(item.id);
          setTimeout(() => setSuccessId(null), 2000);
        }
      }, 15);
    } catch (error) {
      console.error("Failed to generate description:", error);
      setGeneratingId(null);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    color: "#F8F8FF",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        marginBottom: "24px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          borderBottom: isOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              backgroundColor: "rgba(124, 58, 237, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FolderGit2 style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Projects
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#6B7280",
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "2px 8px",
              borderRadius: "10px",
            }}
          >
            {projects.length}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown style={{ width: "20px", height: "20px", color: "#6B7280" }} />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "20px" }}>
              {projects.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    padding: "20px",
                    marginBottom: "16px",
                    backgroundColor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "12px",
                  }}
                >
                  {/* Item Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <GripVertical style={{ width: "16px", height: "16px", color: "#6B7280", cursor: "grab" }} />
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#9CA3AF" }}>
                        Project {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeProject(item.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        color: "#EF4444",
                        backgroundColor: "transparent",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 style={{ width: "12px", height: "12px" }} />
                      Remove
                    </button>
                  </div>

                  {/* Title */}
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateProject(item.id, "title", e.target.value)}
                      placeholder="My Awesome Project"
                      style={inputStyle}
                    />
                  </div>

                  {/* URLs */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={item.githubUrl}
                        onChange={(e) => updateProject(item.id, "githubUrl", e.target.value)}
                        placeholder="https://github.com/..."
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={item.liveUrl}
                        onChange={(e) => updateProject(item.id, "liveUrl", e.target.value)}
                        placeholder="https://myproject.com"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div style={{ marginBottom: "12px" }}>
                    <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                      Tech Stack
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        padding: "10px",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        minHeight: "44px",
                      }}
                    >
                      {item.techStack.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "4px 10px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#A78BFA",
                            backgroundColor: "rgba(124, 58, 237, 0.2)",
                            border: "1px solid rgba(124, 58, 237, 0.3)",
                            borderRadius: "9999px",
                          }}
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(item.id, tag)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "2px",
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "#A78BFA",
                            }}
                          >
                            <X style={{ width: "12px", height: "12px" }} />
                          </button>
                        </motion.span>
                      ))}
                      <input
                        type="text"
                        value={tagInput[item.id] || ""}
                        onChange={(e) => setTagInput({ ...tagInput, [item.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addTag(item.id);
                          }
                        }}
                        placeholder="Add tech..."
                        style={{
                          flex: 1,
                          minWidth: "80px",
                          padding: "4px",
                          fontSize: "13px",
                          color: "#F8F8FF",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </div>
                    <p style={{ fontSize: "11px", color: "#6B7280", marginTop: "4px" }}>
                      Press Enter or comma to add
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateProject(item.id, "description", e.target.value)}
                      placeholder="Describe your project, its features, and your role..."
                      rows={4}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "100px",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  {/* AI Button */}
                  <button
                    onClick={() => handleGenerateDescription(item)}
                    disabled={generatingId === item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      marginTop: "12px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: successId === item.id ? "#10B981" : "#7C3AED",
                      backgroundColor: successId === item.id ? "rgba(16, 185, 129, 0.1)" : "transparent",
                      border: `1px solid ${successId === item.id ? "rgba(16, 185, 129, 0.3)" : "rgba(124, 58, 237, 0.3)"}`,
                      borderRadius: "8px",
                      cursor: generatingId === item.id ? "not-allowed" : "pointer",
                      opacity: generatingId === item.id ? 0.7 : 1,
                    }}
                  >
                    {generatingId === item.id ? (
                      <>
                        <Loader2 style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }} />
                        AI is thinking...
                      </>
                    ) : successId === item.id ? (
                      <>
                        <Check style={{ width: "14px", height: "14px" }} />
                        Generated!
                      </>
                    ) : (
                      <>
                        <Sparkles style={{ width: "14px", height: "14px" }} />
                        Generate Description
                      </>
                    )}
                  </button>
                </motion.div>
              ))}

              {/* Add Button */}
              <button
                onClick={addProject}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#6B7280",
                  backgroundColor: "transparent",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.5)";
                  e.currentTarget.style.color = "#7C3AED";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#6B7280";
                }}
              >
                <Plus style={{ width: "18px", height: "18px" }} />
                Add Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
