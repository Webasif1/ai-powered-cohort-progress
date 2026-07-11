"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Wrench,
  FileText,
  Search,
  Zap,
  ArrowRight,
  Play,
  Star,
  CheckCircle,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const features = [
  {
    icon: Sparkles,
    title: "AI Summary Generator",
    description: "Write a compelling professional summary tailored to any role in seconds",
  },
  {
    icon: Target,
    title: "ATS Score Analyzer",
    description: "Get a real-time score and fix what's keeping you from passing ATS filters",
  },
  {
    icon: Wrench,
    title: "Skills Optimizer",
    description: "AI suggests the right keywords and skills for your target job",
  },
  {
    icon: FileText,
    title: "Experience Writer",
    description: "Describe your work experience with powerful action verbs and metrics",
  },
  {
    icon: Search,
    title: "Project Describer",
    description: "Turn rough project notes into impressive, recruiter-ready descriptions",
  },
  {
    icon: Zap,
    title: "Instant Preview",
    description: "Live real-time preview of your resume as you type",
  },
];

const steps = [
  {
    number: "01",
    title: "Fill your info",
    description: "Add your details with our guided form",
  },
  {
    number: "02",
    title: "Let AI enhance it",
    description: "One click to generate summaries, skills & more",
  },
  {
    number: "03",
    title: "Download & Apply",
    description: "Export as PDF, pass ATS, get hired",
  },
];

const atsCategories = [
  { label: "Keywords", score: 82 },
  { label: "Formatting", score: 95 },
  { label: "Action Verbs", score: 74 },
  { label: "Contact Info", score: 100 },
  { label: "Clarity", score: 80 },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0F", color: "#F8F8FF" }}>
      {/* ==================== NAVBAR ==================== */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles style={{ width: "16px", height: "16px", color: "white" }} />
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

          {/* Nav Links - Hidden on mobile */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: "32px",
            }}
            className="md:flex"
          >
            <a href="#features" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>
              Features
            </a>
            <a href="#how-it-works" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>
              How It Works
            </a>
            <a href="#ats" style={{ fontSize: "14px", color: "#6B7280", textDecoration: "none" }}>
              ATS Score
            </a>
          </div>

          {/* Auth Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/auth/login"
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#F8F8FF",
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                fontSize: "14px",
                fontWeight: 500,
                color: "white",
                background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                border: "none",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
            >
              Get Started
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section style={{ paddingTop: "128px", paddingBottom: "80px", padding: "128px 24px 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            style={{ textAlign: "center", maxWidth: "896px", margin: "0 auto" }}
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                marginBottom: "32px",
              }}
            >
              <Sparkles style={{ width: "16px", height: "16px", color: "#7C3AED" }} />
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#A78BFA" }}>
                AI-Powered Resume Builder
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "24px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Build{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ATS-Optimized
              </span>
              <br />
              Resumes with AI in Minutes
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              style={{
                fontSize: "18px",
                color: "#6B7280",
                maxWidth: "640px",
                margin: "0 auto 40px",
                lineHeight: 1.6,
              }}
            >
              Stop guessing. Let AI craft your perfect resume, analyze ATS compatibility,
              and land more interviews — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                marginBottom: "48px",
              }}
              className="sm:flex-row"
            >
              <Link
                href="/auth/register"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                  border: "none",
                  borderRadius: "12px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                }}
              >
                Start Free
                <ArrowRight style={{ width: "20px", height: "20px" }} />
              </Link>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#F8F8FF",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <Play style={{ width: "20px", height: "20px" }} />
                Watch Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Star style={{ width: "16px", height: "16px", color: "#EAB308", fill: "#EAB308" }} />
                <span>
                  <strong style={{ color: "#F8F8FF" }}>4.9/5</strong> rating
                </span>
              </div>
              <div style={{ width: "1px", height: "16px", backgroundColor: "#1E1E2E" }} />
              <span>
                <strong style={{ color: "#F8F8FF" }}>10,000+</strong> resumes created
              </span>
              <div style={{ width: "1px", height: "16px", backgroundColor: "#1E1E2E" }} />
              <span>
                ATS Pass Rate: <strong style={{ color: "#10B981" }}>94%</strong>
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Editor Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "80px", maxWidth: "1024px", margin: "80px auto 0" }}
          >
            <div
              style={{
                padding: "8px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ backgroundColor: "#111118", borderRadius: "12px", overflow: "hidden" }}>
                {/* Mock Editor Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "#6B7280", marginLeft: "8px" }}>Resume Editor</span>
                </div>
                {/* Mock Editor Content */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                  }}
                  className="md:grid-cols-2"
                >
                  {/* Left - Form */}
                  <div style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ height: "32px", width: "192px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }} />
                      <div style={{ height: "40px", width: "100%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }} />
                      <div style={{ height: "40px", width: "100%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }} />
                      <div style={{ height: "96px", width: "100%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }} />
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div
                          style={{
                            height: "36px",
                            width: "128px",
                            backgroundColor: "rgba(124, 58, 237, 0.2)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Sparkles style={{ width: "16px", height: "16px", color: "#7C3AED" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right - Preview */}
                  <div style={{ padding: "24px", backgroundColor: "rgba(255,255,255,0.02)" }}>
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "16px",
                        aspectRatio: "1 / 1.2",
                        maxHeight: "256px",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ height: "16px", width: "128px", backgroundColor: "#E5E7EB", borderRadius: "4px" }} />
                        <div style={{ height: "8px", width: "192px", backgroundColor: "#F3F4F6", borderRadius: "4px" }} />
                        <div style={{ height: "8px", width: "160px", backgroundColor: "#F3F4F6", borderRadius: "4px" }} />
                        <div style={{ marginTop: "16px", height: "12px", width: "96px", backgroundColor: "#E5E7EB", borderRadius: "4px" }} />
                        <div style={{ height: "8px", width: "100%", backgroundColor: "#F3F4F6", borderRadius: "4px" }} />
                        <div style={{ height: "8px", width: "100%", backgroundColor: "#F3F4F6", borderRadius: "4px" }} />
                        <div style={{ height: "8px", width: "75%", backgroundColor: "#F3F4F6", borderRadius: "4px" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                marginBottom: "16px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Everything you need to{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                land the job
              </span>
            </h2>
            <p style={{ color: "#6B7280", maxWidth: "640px", margin: "0 auto" }}>
              Powerful AI tools designed to make your resume stand out and pass any ATS system
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.15)",
                  scale: 1.02,
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(124, 58, 237, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <feature.icon style={{ width: "24px", height: "24px", color: "#7C3AED" }} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>{feature.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.5 }}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS SECTION ==================== */}
      <section id="how-it-works" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                marginBottom: "16px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Three steps to your{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                dream job
              </span>
            </h2>
            <p style={{ color: "#6B7280", maxWidth: "640px", margin: "0 auto" }}>
              Create a professional, ATS-optimized resume in minutes
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  {/* Number Badge */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 8px 24px rgba(124, 58, 237, 0.3)",
                    }}
                  >
                    <span style={{ fontSize: "24px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                      {step.number}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B7280" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ATS SCORE SECTION ==================== */}
      <section id="ats" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="lg:grid-cols-2"
          >
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Know your{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ATS Score
                </span>
                <br />
                before you apply
              </h2>
              <p style={{ color: "#6B7280", marginBottom: "32px", lineHeight: 1.6 }}>
                Our AI analyzes your resume against real ATS systems and gives you actionable
                feedback to improve your chances of getting past the bots and into interviews.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                {["Real-time scoring", "Keyword optimization", "Formatting checks", "Actionable suggestions"].map(
                  (item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px" }}>
                      <CheckCircle style={{ width: "20px", height: "20px", color: "#10B981" }} />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/auth/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                  border: "none",
                  borderRadius: "12px",
                  textDecoration: "none",
                }}
              >
                Try ATS Analyzer
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </Link>
            </motion.div>

            {/* Right - ATS Score Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div
                style={{
                  padding: "32px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                }}
              >
                {/* Score Circle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                  <div style={{ position: "relative", width: "160px", height: "160px" }}>
                    <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${87 * 4.4} 440`}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "36px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                        87
                      </span>
                      <span style={{ fontSize: "14px", color: "#6B7280" }}>out of 100</span>
                    </div>
                  </div>
                </div>

                {/* ATS Optimized Badge */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                  >
                    <CheckCircle style={{ width: "16px", height: "16px", color: "#10B981" }} />
                    <span style={{ fontSize: "14px", fontWeight: 500, color: "#10B981" }}>ATS Optimized</span>
                  </div>
                </div>

                {/* Category Bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {atsCategories.map((category) => (
                    <div key={category.label}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "14px",
                          marginBottom: "6px",
                        }}
                      >
                        <span style={{ color: "#6B7280" }}>{category.label}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                          {category.score}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: "8px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          borderRadius: "9999px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${category.score}%`,
                            background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                            borderRadius: "9999px",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "896px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              padding: "48px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
            }}
          >
            {/* Background glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(124, 58, 237, 0.1) 0%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Ready to land your{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #A78BFA, #818CF8, #22D3EE)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  dream job
                </span>
                ?
              </h2>
              <p style={{ color: "#6B7280", marginBottom: "32px", maxWidth: "560px", margin: "0 auto 32px" }}>
                Join thousands of job seekers who have already improved their resumes with AI
                and landed interviews at top companies.
              </p>
              <Link
                href="/auth/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "white",
                  background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                  border: "none",
                  borderRadius: "12px",
                  textDecoration: "none",
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
                }}
              >
                Start Free — No Credit Card
                <ArrowRight style={{ width: "20px", height: "20px" }} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        style={{
          padding: "48px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
            className="md:flex-row md:justify-between"
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles style={{ width: "16px", height: "16px", color: "white" }} />
              </div>
              <span
                style={{
                  fontSize: "18px",
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

            {/* Copyright */}
            <p style={{ fontSize: "14px", color: "#6B7280" }}>
              © {new Date().getFullYear()} ResumeAI. Built with ❤️ using AI
            </p>

            {/* Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: "14px", color: "#6B7280" }}>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Privacy
              </a>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Terms
              </a>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
