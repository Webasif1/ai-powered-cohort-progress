"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 48,
  text = "Loading...",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const containerStyle: React.CSSProperties = fullScreen
    ? {
        minHeight: "100vh",
        backgroundColor: "#0A0A0F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }
    : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "40px",
      };

  return (
    <div style={containerStyle}>
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: "3px solid rgba(124, 58, 237, 0.2)",
          borderTopColor: "#7C3AED",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      {text && (
        <p style={{ color: "#9CA3AF", fontSize: "16px", fontWeight: 500 }}>
          {text}
        </p>
      )}

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
