"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  FileText,
  Calendar,
  MoreVertical,
  Trash2,
  Edit,
  Download,
  Loader2,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ResumeCardSkeleton } from "@/components/SkeletonLoader";
import { getAllResumes, createResume, deleteResume } from "@/apis/resume.api";

export default function ResumeDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setIsLoading(true);
      const data = await getAllResumes();
      setResumes(data);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = async () => {
    try {
      setIsCreating(true);
      const newResume = await createResume();
      router.push(`/resume/${newResume._id}`);
    } catch (error) {
      console.error("Failed to create resume:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0F" }}>
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(17, 17, 24, 0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "20px",
              fontWeight: 700,
              background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
            }}
          >
            ResumeAI
          </Link>

          <button
            onClick={handleCreateResume}
            disabled={isCreating}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 600,
              color: "white",
              background: isCreating
                ? "rgba(124, 58, 237, 0.5)"
                : "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
              border: "none",
              borderRadius: "10px",
              cursor: isCreating ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {isCreating ? (
              <>
                <Loader2
                  style={{
                    width: "16px",
                    height: "16px",
                    animation: "spin 1s linear infinite",
                  }}
                />
                Creating...
              </>
            ) : (
              <>
                <Plus style={{ width: "16px", height: "16px" }} />
                New Resume
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#F8F8FF",
              marginBottom: "12px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            My Resumes
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "16px" }}>
            Create and manage your professional resumes
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {[1, 2, 3].map((i) => (
              <ResumeCardSkeleton key={i} />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "2px dashed rgba(255,255,255,0.1)",
              borderRadius: "20px",
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
                margin: "0 auto 24px",
              }}
            >
              <FileText style={{ width: "40px", height: "40px", color: "#7C3AED" }} />
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#F8F8FF",
                marginBottom: "12px",
              }}
            >
              No resumes yet
            </h2>
            <p style={{ color: "#9CA3AF", marginBottom: "32px", fontSize: "16px" }}>
              Create your first AI-powered resume and land your dream job!
            </p>
            <button
              onClick={handleCreateResume}
              disabled={isCreating}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: 600,
                color: "white",
                background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
              }}
            >
              <Plus style={{ width: "20px", height: "20px" }} />
              Create Your First Resume
            </button>
          </motion.div>
        ) : (
          /* Resume Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(124, 58, 237, 0.3)",
                  scale: 1.02,
                }}
                onClick={() => router.push(`/resume/${resume._id}`)}
              >
                <div style={{ marginBottom: "16px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#F8F8FF",
                      marginBottom: "8px",
                    }}
                  >
                    {resume.title || "Untitled Resume"}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#9CA3AF",
                    }}
                  >
                    <Calendar style={{ width: "14px", height: "14px" }} />
                    <span>
                      Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteResume(resume._id);
                  }}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Trash2 style={{ width: "14px", height: "14px", color: "#EF4444" }} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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
