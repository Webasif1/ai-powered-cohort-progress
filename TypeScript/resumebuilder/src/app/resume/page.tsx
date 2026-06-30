"use client";

import { useState, useEffect, useRef } from "react";
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
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { getAllResumes, createResume, deleteResume } from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  atsScore?: number;
}

export default function ResumeDashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Prevent multiple fetches
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchResumes = async () => {
      try {
        const data = await getAllResumes();
        console.log("Fetched resumes:", data);

        // data should already be an array from the API function
        if (Array.isArray(data)) {
          setResumes(data);
        } else {
          console.error("Expected array, got:", typeof data);
          setResumes([]);
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
        setResumes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    setIsCreating(true);
    try {
      const data = await createResume();
      const newId = data?._id || data?.resume?._id;
      if (newId) {
        router.push(`/resume/${newId}`);
      } else {
        console.error("No ID in response:", data);
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Failed to create resume:", error);
      setIsCreating(false);
    }
  };

  const handleDeleteResume = async (id: string) => {
    setDeleteId(id);
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Failed to delete resume:", error);
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <Sparkles size={18} />
          </div>
          <span className="logo-text">ResumeAI</span>
        </Link>

        <nav className="nav">
          <div className="nav-section">
            <NavItem icon={FileText} label="My Resumes" href="/resume" active />
            <NavItem
              icon={Plus}
              label="New Resume"
              onClick={handleCreateResume}
              loading={isCreating}
            />
          </div>

          <div className="nav-divider" />

          <div className="nav-section">
            <NavItem icon={User} label="Profile" href="/profile" />
            <NavItem icon={Settings} label="Settings" href="/settings" />
          </div>
        </nav>

        <div className="nav-footer">
          <NavItem icon={LogOut} label="Logout" href="/auth/login" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div>
            <h1>Welcome back! 👋</h1>
            <p>
              {resumes.length} resume{resumes.length !== 1 ? "s" : ""} · Last
              active: today
            </p>
          </div>
          <button
            onClick={handleCreateResume}
            disabled={isCreating}
            className="create-btn"
          >
            {isCreating ? (
              <>
                <Loader2 size={18} className="spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                New Resume
              </>
            )}
          </button>
        </header>

        {/* Content */}
        {isLoading ? (
          <div className="grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-icon" />
                <div className="skeleton-title" />
                <div className="skeleton-date" />
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">
              <Sparkles size={40} />
            </div>
            <h2>No resumes yet</h2>
            <p>Create your first AI-powered resume in minutes</p>
            <button
              onClick={handleCreateResume}
              disabled={isCreating}
              className="create-btn large"
            >
              {isCreating ? (
                <>
                  <Loader2 size={20} className="spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  Create Resume
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {resumes.map((resume, index) => (
              <motion.div
                key={resume._id}
                className="resume-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="card-icon">
                  <FileText size={24} />
                </div>

                <h3 className="card-title">
                  {resume.title || "Untitled Resume"}
                </h3>

                <p className="card-date">
                  Updated {formatDate(resume.updatedAt)}
                </p>

                {resume.atsScore && (
                  <div className="ats-score">
                    <div className="ats-bar">
                      <div
                        className="ats-fill"
                        style={{ width: `${resume.atsScore}%` }}
                      />
                    </div>
                    <span>ATS: {resume.atsScore}%</span>
                  </div>
                )}

                <div className="card-actions">
                  <Link href={`/resume/${resume._id}`} className="edit-btn">
                    <Pencil size={14} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    disabled={deleteId === resume._id}
                    className="delete-btn"
                  >
                    {deleteId === resume._id ? (
                      <Loader2 size={14} className="spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #0a0a0f;
          display: flex;
        }

        /* Sidebar */
        .sidebar {
          width: 240px;
          background: #111118;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 32px;
          padding-left: 8px;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(to right, #a78bfa, #818cf8, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav {
          flex: 1;
        }
        .nav-section {
          margin-bottom: 8px;
        }
        .nav-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 16px 0;
        }
        .nav-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
        }

        /* Main */
        .main {
          flex: 1;
          margin-left: 240px;
          padding: 32px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #f8f8ff;
          margin: 0 0 8px 0;
        }
        .header p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        .create-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #7c3aed, #8b5cf6);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .create-btn:hover:not(:disabled) {
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
        }
        .create-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .create-btn.large {
          padding: 14px 28px;
          font-size: 16px;
        }

        /* Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* Resume Card */
        .resume-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s;
        }
        .resume-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-2px);
        }
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(124, 58, 237, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7c3aed;
          margin-bottom: 16px;
        }
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #f8f8ff;
          margin: 0 0 8px 0;
        }
        .card-date {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 16px 0;
        }
        .ats-score {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ats-bar {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .ats-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #10b981);
          border-radius: 3px;
        }
        .ats-score span {
          font-size: 12px;
          color: #10b981;
          font-weight: 500;
        }
        .card-actions {
          display: flex;
          gap: 8px;
        }
        .edit-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          font-size: 13px;
          font-weight: 500;
          color: #f8f8ff;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .edit-btn:hover {
          background: rgba(124, 58, 237, 0.2);
          border-color: rgba(124, 58, 237, 0.3);
        }
        .delete-btn {
          padding: 10px 12px;
          color: #6b7280;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .delete-btn:hover:not(:disabled) {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
        }
        .empty-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: rgba(124, 58, 237, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7c3aed;
          margin-bottom: 24px;
        }
        .empty-state h2 {
          font-size: 24px;
          font-weight: 700;
          color: #f8f8ff;
          margin: 0 0 12px 0;
        }
        .empty-state p {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 32px 0;
        }

        /* Skeleton */
        .skeleton-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 24px;
          animation: pulse 2s ease-in-out infinite;
        }
        .skeleton-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 16px;
        }
        .skeleton-title {
          width: 60%;
          height: 20px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 12px;
        }
        .skeleton-date {
          width: 40%;
          height: 14px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Animations */
        :global(.spin) {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
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

        /* Responsive */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ===== NAV ITEM COMPONENT ===== */
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

function NavItem({ icon: Icon, label, href, active, onClick, loading }: NavItemProps) {
  const content = (
    <div
      className={`nav-item ${active ? "active" : ""} ${loading ? "loading" : ""}`}
    >
      {loading ? <Loader2 size={18} className="spin" /> : <Icon size={18} />}
      <span>{label}</span>

      <style jsx>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s;
          border-left: 2px solid transparent;
        }
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #f8f8ff;
        }
        .nav-item.active {
          background: rgba(124, 58, 237, 0.1);
          color: #7c3aed;
          border-left-color: #7c3aed;
        }
        .nav-item.loading {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        disabled={loading}
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
