"use client";

interface ResumeData {
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

export default function ResumePreview({ data }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#1a1a1a",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        lineHeight: 1.5,
      }}
    >
      {/* Header - Personal Info */}
      <header style={{ textAlign: "center", marginBottom: "24px", borderBottom: "2px solid #7C3AED", paddingBottom: "16px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: "8px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            fontSize: "10px",
            color: "#4a4a4a",
          }}
        >
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
            fontSize: "10px",
            color: "#7C3AED",
            marginTop: "6px",
          }}
        >
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
          {data.personalInfo.linkedin && <span>• {data.personalInfo.linkedin}</span>}
          {data.personalInfo.portfolio && <span>• {data.personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ color: "#4a4a4a" }}>{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a" }}>
                  {exp.position || "Position"}
                </h3>
                <span style={{ fontSize: "10px", color: "#6a6a6a" }}>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "#4a4a4a", fontStyle: "italic", marginBottom: "4px" }}>
                {exp.company || "Company"}
              </p>
              {exp.description && (
                <p style={{ color: "#4a4a4a", whiteSpace: "pre-line" }}>{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a" }}>
                  {project.title || "Project Title"}
                </h3>
                <div style={{ fontSize: "10px", color: "#7C3AED" }}>
                  {project.githubUrl && <span>GitHub</span>}
                  {project.liveUrl && <span> • Live</span>}
                </div>
              </div>
              {project.techStack.length > 0 && (
                <p style={{ fontSize: "10px", color: "#6a6a6a", marginBottom: "4px" }}>
                  {project.techStack.join(" • ")}
                </p>
              )}
              {project.description && (
                <p style={{ color: "#4a4a4a", whiteSpace: "pre-line" }}>{project.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Skills
          </h2>
          <p style={{ color: "#4a4a4a" }}>{data.skills.join(" • ")}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a" }}>
                  {edu.degree || "Degree"}
                </h3>
                <span style={{ fontSize: "10px", color: "#6a6a6a" }}>
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "#4a4a4a", fontStyle: "italic" }}>
                {edu.institution || "Institution"}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && data.certifications.some((c) => c.trim()) && (
        <section>
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#7C3AED",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "8px",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "4px",
            }}
          >
            Certifications
          </h2>
          <ul style={{ margin: 0, paddingLeft: "16px", color: "#4a4a4a" }}>
            {data.certifications
              .filter((c) => c.trim())
              .map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
