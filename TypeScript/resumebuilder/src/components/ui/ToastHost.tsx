"use client";

import { Toaster } from "react-hot-toast";

/**
 * `react-hot-toast` was already a dependency but nothing rendered its host,
 * so every failure in the app went to `console.error` and the user saw
 * nothing. Styled from the theme tokens so it tracks light/dark.
 */
export function ToastHost() {
  return (
    <Toaster
      position="bottom-right"
      gutter={10}
      toastOptions={{
        duration: 3500,
        style: {
          background: "var(--elevated)",
          color: "var(--fg)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          boxShadow: "var(--sh-md)",
          fontSize: "13px",
          padding: "10px 14px",
          maxWidth: "360px",
        },
        success: { iconTheme: { primary: "var(--success)", secondary: "var(--elevated)" } },
        error: { iconTheme: { primary: "var(--danger)", secondary: "var(--elevated)" } },
      }}
    />
  );
}
