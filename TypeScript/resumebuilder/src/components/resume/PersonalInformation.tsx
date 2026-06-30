"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GitBranch,  // Use GitBranch instead of Github
  Link,       // Use Link instead of Linkedin
  Globe,
  ChevronDown,
} from "lucide-react";

interface PersonalInfoData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

interface PersonalInformationProps {
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
}

// Memoize to prevent unnecessary re-renders
const PersonalInformation = memo(function PersonalInformation({
  data,
  onChange,
}: PersonalInformationProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Handle input change - only call onChange when value actually changes
  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    if (data[field] === value) return; // Don't update if same value
    onChange({ ...data, [field]: value });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.iconBox}>
            <User size={18} color="#7C3AED" />
          </div>
          <span style={styles.title}>Personal Information</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} color="#6B7280" />
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
            <div style={styles.content}>
              {/* Full Name - Full Width */}
              <div style={{ gridColumn: "span 2" }}>
                <InputField
                  icon={User}
                  label="Full Name"
                  value={data.fullName}
                  onChange={(v) => handleChange("fullName", v)}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                value={data.email}
                onChange={(v) => handleChange("email", v)}
                placeholder="john@example.com"
              />

              {/* Phone */}
              <InputField
                icon={Phone}
                label="Phone Number"
                type="tel"
                value={data.phone}
                onChange={(v) => handleChange("phone", v)}
                placeholder="+1 (555) 000-0000"
              />

              {/* Location */}
              <InputField
                icon={MapPin}
                label="Location"
                value={data.location}
                onChange={(v) => handleChange("location", v)}
                placeholder="San Francisco, CA"
              />

              {/* GitHub */}
              <InputField
                icon={GitBranch}
                label="GitHub URL"
                type="url"
                value={data.github}
                onChange={(v) => handleChange("github", v)}
                placeholder="https://github.com/username"
              />

              {/* LinkedIn */}
              <InputField
                icon={Link}
                label="LinkedIn URL"
                type="url"
                value={data.linkedin}
                onChange={(v) => handleChange("linkedin", v)}
                placeholder="https://linkedin.com/in/username"
              />

              {/* Portfolio */}
              <InputField
                icon={Globe}
                label="Portfolio URL"
                type="url"
                value={data.portfolio}
                onChange={(v) => handleChange("portfolio", v)}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default PersonalInformation;

// ==================== INPUT FIELD COMPONENT ====================
interface InputFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const InputField = memo(function InputField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrapper}>
        <Icon size={18} color="#6B7280" style={styles.inputIcon} />
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={styles.input}
          onFocus={(e) => {
            e.target.style.borderColor = "#7C3AED";
            e.target.style.boxShadow = "0 0 0 3px rgba(124, 58, 237, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>
    </div>
  );
});

// ==================== STYLES ====================
const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: 24,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(124, 58, 237, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: "#F8F8FF",
  },
  content: {
    padding: 20,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 16,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 500,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative" as const,
  },
  inputIcon: {
    position: "absolute" as const,
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 42px",
    fontSize: 14,
    color: "#F8F8FF",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    outline: "none",
    transition: "all 0.2s ease",
  },
};
