"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, Plus, Trash2 } from "lucide-react";

interface CertificationsProps {
  certifications: string[];
  onChange: (certifications: string[]) => void;
}

export default function Certifications({ certifications, onChange }: CertificationsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addCertification = () => {
    onChange([...certifications, ""]);
  };

  const removeCertification = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, value: string) => {
    onChange(certifications.map((cert, i) => (i === index ? value : cert)));
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
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
            <Award style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Certifications
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
            {certifications.length}
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
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => updateCertification(index, e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                    style={inputStyle}
                  />
                  <button
                    onClick={() => removeCertification(index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px",
                      color: "#EF4444",
                      backgroundColor: "transparent",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <Trash2 style={{ width: "16px", height: "16px" }} />
                  </button>
                </motion.div>
              ))}

              {/* Add Button */}
              <button
                onClick={addCertification}
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
                Add Certification
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
