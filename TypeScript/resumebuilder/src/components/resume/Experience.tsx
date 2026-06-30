"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import { generateExperience } from "@/apis/ai.api";

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceProps {
  experience: ExperienceItem[];
  onChange: (experience: ExperienceItem[]) => void;
  skills: string[];
}

export default function Experience({ experience, onChange, skills }: ExperienceProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange([...experience, newItem]);
  };

  const removeExperience = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string | boolean) => {
    onChange(
      experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleGenerateDescription = async (item: ExperienceItem) => {
    setGeneratingId(item.id);
    try {
      const response = await generateExperience({
        experienceLevel: "mid",
        yearsOfExperience: "3",
        jobRole: item.position || "Software Engineer",
        techStack: skills.length > 0 ? skills : ["JavaScript", "React"],
      });
      const generatedText = response.description || response.data || response;

      // Typewriter effect
      let index = 0;
      const text = typeof generatedText === "string" ? generatedText : JSON.stringify(generatedText);
      const interval = setInterval(() => {
        if (index < text.length) {
          updateExperience(item.id, "description", text.slice(0, index + 1));
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
            <Briefcase style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Work Experience
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
            {experience.length}
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
              {experience.map((item, index) => (
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
                      <GripVertical
                        style={{ width: "16px", height: "16px", color: "#6B7280", cursor: "grab" }}
                      />
                      <span style={{ fontSize: "14px", fontWeight: 500, color: "#9CA3AF" }}>
                        Experience {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeExperience(item.id)}
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

                  {/* Fields */}
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
                        Company
                      </label>
                      <input
                        type="text"
                        value={item.company}
                        onChange={(e) => updateExperience(item.id, "company", e.target.value)}
                        placeholder="Company name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        Position
                      </label>
                      <input
                        type="text"
                        value={item.position}
                        onChange={(e) => updateExperience(item.id, "position", e.target.value)}
                        placeholder="Job title"
                        style={inputStyle}
                      />
                    </div>
                  </div>

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
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={item.startDate}
                        onChange={(e) => updateExperience(item.id, "startDate", e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        End Date
                      </label>
                      <input
                        type="month"
                        value={item.endDate}
                        onChange={(e) => updateExperience(item.id, "endDate", e.target.value)}
                        disabled={item.current}
                        style={{
                          ...inputStyle,
                          opacity: item.current ? 0.5 : 1,
                        }}
                      />
                    </div>
                  </div>

                  {/* Currently Working Checkbox */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      color: "#9CA3AF",
                      marginBottom: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(e) => updateExperience(item.id, "current", e.target.checked)}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#7C3AED",
                      }}
                    />
                    Currently working here
                  </label>

                  {/* Description */}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateExperience(item.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
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
                      backgroundColor:
                        successId === item.id
                          ? "rgba(16, 185, 129, 0.1)"
                          : "transparent",
                      border: `1px solid ${
                        successId === item.id
                          ? "rgba(16, 185, 129, 0.3)"
                          : "rgba(124, 58, 237, 0.3)"
                      }`,
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
                onClick={addExperience}
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
                Add Experience
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
