"use client";

import { memo } from "react";
import { Mail, Phone, MapPin, GitBranch, Link, Globe } from "lucide-react";

// ==================== TYPES ====================
interface ResumeData {
  _id: string;
  title: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string;
    techStack: string[];
  }>;
  skills: string[];
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
  }>;
  certifications: string[];
}

interface ResumePreviewProps {
  data: ResumeData;
}

// ==================== HELPER FUNCTIONS ====================

// Extract plain text from JSON or object responses
const extractPlainText = (value: any): string => {
  if (!value) return "";

  if (typeof value === "string") {
    const trimmed = value.trim();
    // Check if it looks like JSON
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        return (
          parsed.summary ||
          parsed.summery ||
          parsed.text ||
          parsed.content ||
          parsed.description ||
          parsed.data?.summary ||
          parsed.data?.summery ||
          value
        );
      } catch {
        return value;
      }
    }
    return value;
  }

  if (typeof value === "object" && value !== null) {
    return (
      value.summary ||
      value.summery ||
      value.text ||
      value.content ||
      value.description ||
      JSON.stringify(value)
    );
  }

  return String(value);
};

// Format date for display
const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  if (dateStr.toLowerCase() === "present") return "Present";

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
};

// ==================== MAIN COMPONENT ====================
const ResumePreview = memo(function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, summary, experience, projects, skills, education, certifications } = data;

  // Check if there's any content to display
  const hasPersonalInfo =
    personalInfo.fullName ||
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.location;
  const hasSummary = extractPlainText(summary).trim().length > 0;
  const hasExperience = experience && experience.length > 0;
  const hasProjects = projects && projects.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasEducation = education && education.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  const hasAnyContent =
    hasPersonalInfo ||
    hasSummary ||
    hasExperience ||
    hasProjects ||
    hasSkills ||
    hasEducation ||
    hasCertifications;

  // Empty state
  if (!hasAnyContent) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyText}>
          Start filling in your information to see the preview
        </p>
      </div>
    );
  }

  return (
    <div style={styles.resumeContainer}>
      <div style={styles.resumePaper}>
        {/* ========== HEADER ========== */}
        {hasPersonalInfo && (
          <header style={styles.header}>
            {personalInfo.fullName && (
              <h1 style={styles.name}>{personalInfo.fullName}</h1>
            )}

            {/* Contact Info Row */}
            <div style={styles.contactRow}>
              {personalInfo.email && (
                <ContactItem icon={Mail} text={personalInfo.email} />
              )}
              {personalInfo.phone && (
                <ContactItem icon={Phone} text={personalInfo.phone} />
              )}
              {personalInfo.location && (
                <ContactItem icon={MapPin} text={personalInfo.location} />
              )}
            </div>

            {/* Links Row */}
            <div style={styles.linksRow}>
              {personalInfo.github && (
                <LinkItem
                  icon={GitBranch}
                  url={personalInfo.github}
                  label="GitHub"
                />
              )}
              {personalInfo.linkedin && (
                <LinkItem
                  icon={Link}
                  url={personalInfo.linkedin}
                  label="LinkedIn"
                />
              )}
              {personalInfo.portfolio && (
                <LinkItem
                  icon={Globe}
                  url={personalInfo.portfolio}
                  label="Portfolio"
                />
              )}
            </div>
          </header>
        )}

        {/* ========== SUMMARY ========== */}
        {hasSummary && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Professional Summary</h2>
            <p style={styles.summaryText}>{extractPlainText(summary)}</p>
          </section>
        )}

        {/* ========== EXPERIENCE ========== */}
        {hasExperience && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Work Experience</h2>
            {experience.map((exp, index) => (
              <div key={exp.id || index} style={styles.experienceItem}>
                <div style={styles.expHeader}>
                  <div>
                    <h3 style={styles.expPosition}>{exp.position}</h3>
                    <p style={styles.expCompany}>{exp.company}</p>
                  </div>
                  <p style={styles.expDate}>
                    {formatDate(exp.startDate)} —{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </p>
                </div>
                {exp.description && (
                  <p style={styles.expDescription}>
                    {extractPlainText(exp.description)}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ========== PROJECTS ========== */}
        {hasProjects && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Projects</h2>
            {projects.map((project, index) => (
              <div key={project.id || index} style={styles.projectItem}>
                <div style={styles.projectHeader}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  <div style={styles.projectLinks}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.projectLink}
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.projectLink}
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p style={styles.projectDescription}>
                    {extractPlainText(project.description)}
                  </p>
                )}
                {project.techStack && project.techStack.length > 0 && (
                  <div style={styles.techStack}>
                    {project.techStack.map((tech, i) => (
                      <span key={i} style={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* ========== SKILLS ========== */}
        {hasSkills && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ========== EDUCATION ========== */}
        {hasEducation && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Education</h2>
            {education.map((edu, index) => (
              <div key={edu.id || index} style={styles.educationItem}>
                <div style={styles.eduHeader}>
                  <div>
                    <h3 style={styles.eduDegree}>{edu.degree}</h3>
                    <p style={styles.eduInstitution}>{edu.institution}</p>
                  </div>
                  <p style={styles.eduDate}>
                    {edu.startYear} — {edu.endYear || "Present"}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ========== CERTIFICATIONS ========== */}
        {hasCertifications && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Certifications</h2>
            <ul style={styles.certList}>
              {certifications.map((cert, index) => (
                <li key={index} style={styles.certItem}>
                  {cert}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
});

export default ResumePreview;

// ==================== SUB-COMPONENTS ====================

interface ContactItemProps {
  icon: React.ElementType;
  text: string;
}

const ContactItem = ({ icon: Icon, text }: ContactItemProps) => (
  <div style={styles.contactItem}>
    <Icon size={12} color="#666" />
    <span>{text}</span>
  </div>
);

interface LinkItemProps {
  icon: React.ElementType;
  url: string;
  label: string;
}

const LinkItem = ({ icon: Icon, url, label }: LinkItemProps) => {
  // Extract display text from URL
  const displayUrl = url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  return (
    <a
      href={url.startsWith("http") ? url : `https://${url}`}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.linkItem}
    >
      <Icon size={12} />
      <span>{displayUrl}</span>
    </a>
  );
};

// ==================== STYLES ====================
const styles: Record<string, React.CSSProperties> = {
  resumeContainer: {
    display: "flex",
    justifyContent: "center",
  },
  resumePaper: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    padding: "40px 48px",
    color: "#1a1a1a",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    lineHeight: 1.6,
  },
  emptyState: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    border: "2px dashed rgba(255,255,255,0.1)",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
  },

  // Header
  header: {
    textAlign: "center",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: "2px solid #e5e5e5",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    color: "#1a1a1a",
    margin: "0 0 12px 0",
    letterSpacing: "-0.5px",
  },
  contactRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 8,
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#444",
  },
  linksRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#2563eb",
    textDecoration: "none",
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1a1a1a",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottom: "1px solid #e5e5e5",
  },

  // Summary
  summaryText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 1.7,
    margin: 0,
    textAlign: "justify",
  },

  // Experience
  experienceItem: {
    marginBottom: 16,
  },
  expHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  expPosition: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a1a1a",
    margin: 0,
  },
  expCompany: {
    fontSize: 13,
    color: "#666",
    margin: "2px 0 0 0",
  },
  expDate: {
    fontSize: 12,
    color: "#888",
    margin: 0,
    whiteSpace: "nowrap",
  },
  expDescription: {
    fontSize: 13,
    color: "#444",
    lineHeight: 1.6,
    margin: 0,
    whiteSpace: "pre-line",
  },

  // Projects
  projectItem: {
    marginBottom: 16,
  },
  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a1a1a",
    margin: 0,
  },
  projectLinks: {
    display: "flex",
    gap: 12,
  },
  projectLink: {
    fontSize: 11,
    color: "#2563eb",
    textDecoration: "none",
  },
  projectDescription: {
    fontSize: 13,
    color: "#444",
    lineHeight: 1.6,
    margin: "0 0 8px 0",
    whiteSpace: "pre-line",
  },
  techStack: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  techTag: {
    fontSize: 11,
    color: "#666",
    backgroundColor: "#f3f4f6",
    padding: "2px 8px",
    borderRadius: 4,
  },

  // Skills
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  skillTag: {
    fontSize: 12,
    color: "#1a1a1a",
    backgroundColor: "#f3f4f6",
    padding: "4px 12px",
    borderRadius: 4,
    fontWeight: 500,
  },

  // Education
  educationItem: {
    marginBottom: 12,
  },
  eduHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eduDegree: {
    fontSize: 14,
    fontWeight: 600,
    color: "#1a1a1a",
    margin: 0,
  },
  eduInstitution: {
    fontSize: 13,
    color: "#666",
    margin: "2px 0 0 0",
  },
  eduDate: {
    fontSize: 12,
    color: "#888",
    margin: 0,
  },

  // Certifications
  certList: {
    margin: 0,
    paddingLeft: 20,
  },
  certItem: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
};
