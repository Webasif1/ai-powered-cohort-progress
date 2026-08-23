import type { NextConfig } from "next";

/**
 * The two blocking scripts in `app/layout.tsx` (theme and session) run before
 * React and cannot be moved to a file without reintroducing the flash they
 * exist to prevent, so the CSP has to allow inline script. `unsafe-inline` is
 * ignored by browsers when a nonce or hash is present, and Next only emits a
 * nonce when middleware supplies one — which would make every page dynamic.
 * Keeping the pages static is the better trade here: the app renders no
 * third-party or user-supplied HTML, so there is no injection surface for
 * `unsafe-inline` to widen.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  // Tailwind and the templates set style attributes at runtime.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // Only the app's own API is called; the Gemini calls are server-side.
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // The editor and preview render a user's own document; nothing should be
  // able to frame them and harvest clicks.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  // Only honoured over HTTPS, so it is inert until the proxy terminates TLS.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Emits `.next/standalone` with a self-contained server.js and only the
  // dependencies actually reached at runtime, so the Docker runtime stage
  // does not have to carry the full node_modules tree.
  output: "standalone",

  // This project sits inside a larger repo. File tracing walks up looking for
  // a workspace root and would otherwise trace from the outer repository —
  // the same problem the turbopack root below solves for the dev watcher.
  outputFileTracingRoot: __dirname,

  // No reason to advertise the framework and version to a scanner.
  poweredByHeader: false,

  // Rewrites `import { X } from "pkg"` into a deep import of just X, so a
  // route that uses six icons does not pull the whole barrel through the
  // compiler. lucide-react is the big one here — it is imported in 22 files.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // This project sits inside a larger repo. Without an explicit root,
  // Turbopack infers one by walking up to the outermost lockfile and then
  // watches far more of the filesystem than it needs to.
  turbopack: {
    root: __dirname,
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // A signed-in page must never be cached by a shared proxy — the
        // dashboard and editor are one user's private documents.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
