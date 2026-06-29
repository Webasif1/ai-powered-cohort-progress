import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#111118",
        "surface-hover": "#16161D",
        border: "#1E1E2E",
        primary: {
          DEFAULT: "#7C3AED",
          hover: "#8B5CF6",
        },
        accent: {
          DEFAULT: "#06B6D4",
          hover: "#22D3EE",
        },
        "text-primary": "#F8F8FF",
        "text-muted": "#6B7280",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out 2s infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-20px) scale(1.05)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.03)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
