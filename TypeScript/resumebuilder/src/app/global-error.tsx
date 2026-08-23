"use client";

import { useEffect } from "react";

/**
 * The last resort: a throw in the root layout itself, above every provider.
 *
 * This replaces `<html>`, so it cannot use the app's components, fonts or
 * theme tokens — none of that has mounted. Everything here is inline and
 * self-contained on purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/global-error]", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.5rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#fff",
          color: "#111",
        }}
      >
        <h1 style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ margin: 0, maxWidth: "24rem", fontSize: "0.85rem", color: "#555" }}>
          The application failed to start. Reloading usually clears it.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: 6,
            padding: "0.5rem 1rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            background: "#fff",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
