"use client";

export function ResumeCardSkeleton() {
  return (
    <div
      style={{
        padding: "24px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    >
      <div
        style={{
          height: "20px",
          width: "60%",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "4px",
          marginBottom: "16px",
        }}
      />
      <div
        style={{
          height: "14px",
          width: "40%",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "4px",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          height: "14px",
          width: "30%",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "4px",
        }}
      />

      <style jsx global>{`
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

export function ResumeEditorSkeleton() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A0A0F" }}>
      {/* Navbar Skeleton */}
      <div
        style={{
          height: "64px",
          backgroundColor: "rgba(17, 17, 24, 0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "16px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
          }}
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <div
            style={{
              width: "80px",
              height: "36px",
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
            }}
          />
          <div
            style={{
              width: "120px",
              height: "36px",
              backgroundColor: "rgba(124, 58, 237, 0.2)",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      {/* Editor Content Skeleton */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 64px)" }}>
        {/* Left Panel */}
        <div style={{ padding: "24px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                marginBottom: "24px",
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  height: "18px",
                  width: "50%",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  marginBottom: "16px",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            </div>
          ))}
        </div>

        {/* Right Panel - Preview */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#0D0D12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "600px",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>
      </div>

      <style jsx global>{`
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
