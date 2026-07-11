"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Sparkles, RefreshCw, Loader2, Check } from "lucide-react";
import { generateSummary, improveContent } from "@/apis/ai.api";

interface ProfessionalSummaryProps {
  summary: string;
  onChange: (summary: string) => void;
  personalInfo: {
    title:string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  skills: string[];
}

export default function ProfessionalSummary({
  summary,
  onChange,
  personalInfo,
  skills,
}: ProfessionalSummaryProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [generateStatus, setGenerateStatus] = useState<"idle" | "loading" | "success">("idle");
  const [improveStatus, setImproveStatus] = useState<"idle" | "loading" | "success">("idle");

  const typewriterEffect = (text: string) => {
    let index = 0;
    onChange("");
    const interval = setInterval(() => {
      if (index < text.length) {
        onChange(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 15);
  };

  const handleGenerate = async () => {
    setGenerateStatus("loading");
    try {
      const response = await generateSummary({
        experienceLevel: "mid",
        jobTitle: personalInfo.fullName ? `${personalInfo.title}'s Resume` : "Software Engineer",
        skills: skills.length > 0 ? skills : ["JavaScript", "React", "Node.js"],
      });
      const generatedText = response.summary || response.data || response;
      typewriterEffect(typeof generatedText === "string" ? generatedText : JSON.stringify(generatedText));
      setGenerateStatus("success");
      setTimeout(() => setGenerateStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setGenerateStatus("idle");
    }
  };

  const handleImprove = async () => {
    if (!summary.trim()) return;
    setImproveStatus("loading");
    try {
      const response = await improveContent({ content: summary });
      const improvedText = response.content || response.data || response;
      typewriterEffect(typeof improvedText === "string" ? improvedText : JSON.stringify(improvedText));
      setImproveStatus("success");
      setTimeout(() => setImproveStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to improve summary:", error);
      setImproveStatus("idle");
    }
  };

  const renderAIButton = (
    status: "idle" | "loading" | "success",
    onClick: () => void,
    idleIcon: React.ReactNode,
    idleText: string
  ) => {
    return (
      <button
        onClick={onClick}
        disabled={status === "loading"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 14px",
          fontSize: "13px",
          fontWeight: 500,
          color: status === "success" ? "#10B981" : "#7C3AED",
          backgroundColor:
            status === "success"
              ? "rgba(16, 185, 129, 0.1)"
              : status === "loading"
              ? "rgba(124, 58, 237, 0.05)"
              : "transparent",
          border: `1px solid ${
            status === "success"
              ? "rgba(16, 185, 129, 0.3)"
              : "rgba(124, 58, 237, 0.3)"
          }`,
          borderRadius: "8px",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          opacity: status === "loading" ? 0.7 : 1,
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 style={{ width: "14px", height: "14px", animation: "spin 1s linear infinite" }} />
            AI is thinking...
          </>
        ) : status === "success" ? (
          <>
            <Check style={{ width: "14px", height: "14px" }} />
            Generated!
          </>
        ) : (
          <>
            {idleIcon}
            {idleText}
          </>
        )}
      </button>
    );
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
            <FileText style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Professional Summary
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
              <textarea
                value={summary}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Write a compelling professional summary that highlights your experience, skills, and career goals..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#F8F8FF",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "120px",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7C3AED";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />

              {/* AI Buttons */}
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                {renderAIButton(
                  generateStatus,
                  handleGenerate,
                  <Sparkles style={{ width: "14px", height: "14px" }} />,
                  "Generate with AI"
                )}
                {renderAIButton(
                  improveStatus,
                  handleImprove,
                  <RefreshCw style={{ width: "14px", height: "14px" }} />,
                  "Improve with AI"
                )}
              </div>
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
