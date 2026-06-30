"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, ChevronDown, Sparkles, Loader2, Check, X } from "lucide-react";
import { generateSkills } from "@/apis/ai.api";

interface SkillsProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
}

export default function Skills({ skills, onChange, personalInfo }: SkillsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [generateStatus, setGenerateStatus] = useState<"idle" | "loading" | "success">("idle");

  const addSkill = () => {
    const skill = tagInput.trim();
    if (skill && !skills.includes(skill)) {
      onChange([...skills, skill]);
    }
    setTagInput("");
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleGenerate = async () => {
    setGenerateStatus("loading");
    try {
      const response = await generateSkills({
        experienceLevel: "mid",
        jobTitle: "Software Engineer",
      });
      const generatedSkills = response.skills || response.data || response;
      const skillsArray = Array.isArray(generatedSkills)
        ? generatedSkills
        : typeof generatedSkills === "string"
        ? generatedSkills.split(",").map((s: string) => s.trim())
        : [];

      // Animate skills appearing one by one
      let index = 0;
      const interval = setInterval(() => {
        if (index < skillsArray.length) {
          const newSkill = skillsArray[index];
          if (!skills.includes(newSkill)) {
            onChange([...skills, newSkill]);
          }
          index++;
        } else {
          clearInterval(interval);
          setGenerateStatus("success");
          setTimeout(() => setGenerateStatus("idle"), 2000);
        }
      }, 100);
    } catch (error) {
      console.error("Failed to generate skills:", error);
      setGenerateStatus("idle");
    }
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
            <Wrench style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Skills
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
            {skills.length}
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
              {/* Skills Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  padding: "14px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  minHeight: "60px",
                  marginBottom: "16px",
                }}
              >
                <AnimatePresence>
                  {skills.map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#A78BFA",
                        backgroundColor: "rgba(124, 58, 237, 0.2)",
                        border: "1px solid rgba(124, 58, 237, 0.3)",
                        borderRadius: "9999px",
                      }}
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "2px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#A78BFA",
                          transition: "color 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#A78BFA")}
                      >
                        <X style={{ width: "14px", height: "14px" }} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "6px",
                    fontSize: "14px",
                    color: "#F8F8FF",
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>

              <p style={{ fontSize: "12px", color: "#6B7280", marginBottom: "16px" }}>
                Press Enter or comma to add a skill
              </p>

              {/* AI Button */}
              <button
                onClick={handleGenerate}
                disabled={generateStatus === "loading"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: generateStatus === "success" ? "#10B981" : "#7C3AED",
                  backgroundColor:
                    generateStatus === "success"
                      ? "rgba(16, 185, 129, 0.1)"
                      : generateStatus === "loading"
                      ? "rgba(124, 58, 237, 0.05)"
                      : "transparent",
                  border: `1px solid ${
                    generateStatus === "success"
                      ? "rgba(16, 185, 129, 0.3)"
                      : "rgba(124, 58, 237, 0.3)"
                  }`,
                  borderRadius: "10px",
                  cursor: generateStatus === "loading" ? "not-allowed" : "pointer",
                  opacity: generateStatus === "loading" ? 0.7 : 1,
                }}
              >
                {generateStatus === "loading" ? (
                  <>
                    <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                    AI is thinking...
                  </>
                ) : generateStatus === "success" ? (
                  <>
                    <Check style={{ width: "16px", height: "16px" }} />
                    Generated!
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: "16px", height: "16px" }} />
                    Generate Skills with AI
                  </>
                )}
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
