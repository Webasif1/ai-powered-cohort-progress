"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Plus,
  FileText,
  Settings,
  User,
  LogOut,
  Loader2,
} from "lucide-react";
import { getAllResumes, createResume } from "@/apis/resume.api";
import ResumeCard from "@/components/resume/ResumeCard";

interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
  atsScore?: number;
}

export default function ResumeDashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await getAllResumes();

      // Debug: Log the response to see its structure
      console.log("API Response:", response);

      // Handle different response structures
      let resumeArray: Resume[] = [];

      if (Array.isArray(response.data)) {
        // Response is already an array
        resumeArray = response.data;
      } else if (response?.data && Array.isArray(response.data)) {
        // Response has a data property that is an array
        resumeArray = response.data;
      } else if (response?.data && Array.isArray(response.data)) {
        // Response has a resumes property that is an array
        resumeArray = response.data;
      } else if (response.data && typeof response === "object") {
        // Response might be a single resume object, wrap it in array
        resumeArray = [response.data];
      }

      setResumes(resumeArray);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
      setResumes([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = async () => {
    setIsCreating(true);
    try {
      const data = await createResume();
      console.log("handelCreateResume ---->", data)
      // Handle different response structures
      const newResumeId = data?.data._id || data?.resume?._id || data?.data?._id;
      if (newResumeId) {
        router.push(`/resume/${newResumeId}`);
      } else {
        console.error("No resume ID in response:", data.data);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Failed to create resume:", error);
      setIsCreating(false);
    }
  };

  const handleDeleteResume = (deletedId: string) => {
    setResumes(resumes.filter((r) => r._id !== deletedId));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0F" }}>
      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "240px",
          backgroundColor: "#111118",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            marginBottom: "32px",
            paddingLeft: "8px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles style={{ width: "18px", height: "18px", color: "white" }} />
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ResumeAI
          </span>
        </Link>

        {/* Navigation */}
        <nav style={{ flex: 1 }}>
          {/* Main Nav */}
          <div style={{ marginBottom: "24px" }}>
            <NavItem
              icon={FileText}
              label="My Resumes"
              href="/resume"
              active
            />
            <NavItem
              icon={Plus}
              label="New Resume"
              onClick={handleCreateResume}
              isLoading={isCreating}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.05)",
              margin: "16px 0",
            }}
          />

          {/* Secondary Nav */}
          <div>
            <NavItem icon={User} label="Profile" href="/profile" />
            <NavItem icon={Settings} label="Settings" href="/settings" />
          </div>
        </nav>

        {/* Logout */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "16px",
          }}
        >
          <NavItem icon={LogOut} label="Logout" href="/auth/login" />
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "240px",
          minHeight: "100vh",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 700,
                marginBottom: "8px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#F8F8FF",
              }}
            >
              Welcome back, {userName} 👋
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              You have {resumes.length} resume{resumes.length !== 1 ? "s" : ""} ·
              Last active: today
            </p>
          </div>

          <button
            onClick={handleCreateResume}
            disabled={isCreating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
              background: isCreating
                ? "rgba(124, 58, 237, 0.5)"
                : "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: isCreating ? "not-allowed" : "pointer",
              transition: "all 0.25s ease",
              boxShadow: isCreating ? "none" : "0 0 20px rgba(124, 58, 237, 0.3)",
            }}
          >
            {isCreating ? (
              <>
                <Loader2
                  style={{
                    width: "18px",
                    height: "18px",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Creating...
              </>
            ) : (
              <>
                <Plus style={{ width: "18px", height: "18px" }} />
                New Resume
              </>
            )}
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          /* Loading State */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginBottom: "16px",
                  }}
                />
                <div
                  style={{
                    width: "60%",
                    height: "20px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginBottom: "12px",
                  }}
                />
                <div
                  style={{
                    width: "40%",
                    height: "14px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                />
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "rgba(124, 58, 237, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <Sparkles style={{ width: "40px", height: "40px", color: "#7C3AED" }} />
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "12px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#F8F8FF",
              }}
            >
              No resumes yet
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#6B7280",
                marginBottom: "32px",
                maxWidth: "400px",
              }}
            >
              Create your first AI-powered resume in minutes and start landing
              more interviews.
            </p>
            <button
              onClick={handleCreateResume}
              disabled={isCreating}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: 600,
                color: "white",
                background: isCreating
                  ? "rgba(124, 58, 237, 0.5)"
                  : "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: isCreating ? "not-allowed" : "pointer",
                transition: "all 0.25s ease",
                boxShadow: isCreating
                  ? "none"
                  : "0 0 20px rgba(124, 58, 237, 0.3)",
              }}
            >
              {isCreating ? (
                <>
                  <Loader2
                    style={{
                      width: "20px",
                      height: "20px",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Creating...
                </>
              ) : (
                <>
                  <Plus style={{ width: "20px", height: "20px" }} />
                  Create Resume
                </>
              )}
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ResumeCard
                  resume={resume}
                  onDelete={handleDeleteResume}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Animations */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

/* ==================== NAV ITEM COMPONENT ==================== */
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

function NavItem({ icon: Icon, label, href, active, onClick, isLoading }: NavItemProps) {
  const content = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        fontSize: "14px",
        fontWeight: 500,
        color: active ? "#7C3AED" : "#6B7280",
        backgroundColor: active ? "rgba(124, 58, 237, 0.1)" : "transparent",
        borderRadius: "10px",
        cursor: isLoading ? "not-allowed" : "pointer",
        transition: "all 0.15s ease",
        borderLeft: active ? "2px solid #7C3AED" : "2px solid transparent",
        marginLeft: active ? "-2px" : "0",
        opacity: isLoading ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!active && !isLoading) {
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
          e.currentTarget.style.color = "#F8F8FF";
        }
      }}
      onMouseLeave={(e) => {
        if (!active && !isLoading) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#6B7280";
        }
      }}
    >
      {isLoading ? (
        <Loader2
          style={{
            width: "18px",
            height: "18px",
            animation: "spin 1s linear infinite",
          }}
        />
      ) : (
        <Icon style={{ width: "18px", height: "18px" }} />
      )}
      <span>{label}</span>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: 0,
          textAlign: "left",
        }}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} style={{ textDecoration: "none" }}>
      {content}
    </Link>
  );
}
