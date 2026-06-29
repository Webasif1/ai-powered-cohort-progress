import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeAI - Build ATS-Optimized Resumes with AI",
  description:
    "Create professional, ATS-friendly resumes in minutes with AI-powered suggestions, real-time scoring, and instant PDF export.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Background Orbs */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: -1,
          }}
        >
          {/* Violet orb */}
          <div
            className="animate-float"
            style={{
              position: "absolute",
              top: "-160px",
              left: "-160px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Cyan orb */}
          <div
            className="animate-float-delayed"
            style={{
              position: "absolute",
              bottom: "-160px",
              right: "-160px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          {/* Grid overlay */}
          <div
            className="bg-grid"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.5,
            }}
          />
        </div>

        {/* Main content */}
        <main style={{ position: "relative", zIndex: 0 }}>{children}</main>
      </body>
    </html>
  );
}
