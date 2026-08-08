import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits `.next/standalone` with a self-contained server.js and only the
  // dependencies actually reached at runtime, so the Docker runtime stage
  // does not have to carry the full node_modules tree.
  output: "standalone",

  // This project sits inside a larger repo. File tracing walks up looking for
  // a workspace root and would otherwise trace from the outer repository —
  // the same problem the turbopack root below solves for the dev watcher.
  outputFileTracingRoot: __dirname,

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
};

export default nextConfig;
