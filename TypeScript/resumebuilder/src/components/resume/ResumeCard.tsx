"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";

interface ResumeNavbarProps {
  resumeId: string;
  title: string;
  onTitleChange: (newTitle: string) => void;
  saveStatus: "idle" | "saving" | "saved" | "error";
  onRetry?: () => void;
  onDownload?: () => void;
}

export default function ResumeNavbar({
  resumeId,
  title,
  onTitleChange,
  saveStatus,
  onRetry,
  onDownload,
}: ResumeNavbarProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() && editedTitle !== title) {
      onTitleChange(editedTitle.trim());
    } else {
      setEditedTitle(title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
    if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#7C3AED",
                animation: "pulse-dot 1.5s ease-in-out infinite",
              }}
            />
            Saving...
          </div>
        );
      case "saved":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#10B981",
            }}
          >
            <Check style={{ width: "14px", height: "14px" }} />
            Saved
          </div>
        );
      case "error":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#EF4444",
            }}
          >
            <AlertCircle style={{ width: "14px", height: "14px" }} />
            Save failed
            {onRetry && (
              <button
                onClick={onRetry}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  color: "#EF4444",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <RefreshCw style={{ width: "12px", height: "12px" }} />
                Retry
              </button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        backgroundColor: "rgba(17, 17, 24, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Left - Back Button */}
      <Link
        href="/resume"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#6B7280",
          textDecoration: "none",
          transition: "color 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F8F8FF")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
      >
        <ArrowLeft style={{ width: "18px", height: "18px" }} />
        Back
      </Link>

      {/* Center - Title + Save Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Editable Title */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            style={{
              padding: "6px 12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#F8F8FF",
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid #7C3AED",
              borderRadius: "8px",
              outline: "none",
              minWidth: "200px",
              textAlign: "center",
            }}
          />
        ) : (
          <button
            onClick={handleTitleClick}
            style={{
              padding: "6px 12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#F8F8FF",
              backgroundColor: "transparent",
              border: "1px solid transparent",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            {title || "Untitled Resume"}
          </button>
        )}

        {/* Save Status */}
        {renderSaveStatus()}
      </div>

      {/* Right - Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Preview Button */}
        <Link
          href={`/resume/${resumeId}/preview`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#F8F8FF",
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <Eye style={{ width: "16px", height: "16px" }} />
          Preview
        </Link>

        {/* Download Button */}
        <button
          onClick={onDownload}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "white",
            background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Download style={{ width: "16px", height: "16px" }} />
          Download PDF
        </button>
      </div>

      {/* Pulse Animation */}
      <style jsx global>{`
        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>
    </nav>
  );
}
