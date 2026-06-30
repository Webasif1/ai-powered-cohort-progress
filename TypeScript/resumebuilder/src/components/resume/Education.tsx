"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown, Plus, Trash2, GripVertical } from "lucide-react";

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

interface EducationProps {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export default function Education({ education, onChange }: EducationProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEducation = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
    };
    onChange([...education, newItem]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    onChange(
      education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
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
            <GraduationCap style={{ width: "18px", height: "18px", color: "#7C3AED" }} />
          </div>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#F8F8FF" }}>
            Education
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
            {education.length}
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
              {education.map((item, index) => (
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
                        Education {index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeEducation(item.id)}
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
                    }}
                  >
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        Degree / Field of Study
                      </label>
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => updateEducation(item.id, "degree", e.target.value)}
                        placeholder="B.S. Computer Science"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        Institution
                      </label>
                      <input
                        type="text"
                        value={item.institution}
                        onChange={(e) => updateEducation(item.id, "institution", e.target.value)}
                        placeholder="University Name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        Start Year
                      </label>
                      <input
                        type="text"
                        value={item.startYear}
                        onChange={(e) => updateEducation(item.id, "startYear", e.target.value)}
                        placeholder="2018"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                        End Year
                      </label>
                      <input
                        type="text"
                        value={item.endYear}
                        onChange={(e) => updateEducation(item.id, "endYear", e.target.value)}
                        placeholder="2022"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add Button */}
              <button
                onClick={addEducation}
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
                Add Education
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
