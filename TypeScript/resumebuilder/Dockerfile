# No `# syntax=` directive on purpose: it makes BuildKit pull the
# docker/dockerfile frontend image (~14 MB) on every cold build before it can
# even read this file. Nothing here needs a newer frontend than the built-in
# one, apart from the cache mounts below, which the bundled frontend supports.

# Node 22 LTS. The floors that matter: next@16 needs >=20.9.0 and
# mongoose@9.7 needs >=20.19.0, so Node 20 would have worked but only on its
# final patches — and it left support in April 2026.
#
# Alpine is safe here despite bcrypt being a native addon: bcrypt@6 ships musl
# prebuilds (prebuilds/linux-x64/bcrypt.musl.node) and installs through
# node-gyp-build, so nothing is compiled and no toolchain is needed.
ARG NODE_VERSION=22-alpine


# ---------------------------------------------------------------------------
# deps — dependencies alone, so editing source does not invalidate npm ci
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

COPY package.json package-lock.json ./

# The image ships npm 10, but this lockfile was produced by npm 11 and npm 10
# rejects it:
#
#   npm error `npm ci` can only install packages when your package.json and
#   package-lock.json ... are in sync.
#   npm error Missing: @emnapi/runtime@1.11.3 from lock file
#
# Those two packages are optional wasm dependencies of
# @tailwindcss/oxide-wasm32-wasi. npm omits them from the lockfile — npm 11
# then tolerates its own omission and npm 10 does not. Regenerating the lock
# with either version does not add them, so the fix is to install the npm that
# matches the lockfile rather than to fight the lockfile.
#
# Pinned exactly, so a future npm release cannot change how the lock resolves.
RUN npm install -g npm@11.6.2

# Cache mount keeps the npm cache across builds, so a rebuild after a
# dependency change re-uses already-downloaded tarballs.
RUN --mount=type=cache,target=/root/.npm npm ci


# ---------------------------------------------------------------------------
# builder — compile the app
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# No build arguments are passed on purpose. Every environment variable this
# app reads (MONGO_URI, JWT_SECRET, GEMINI_API_KEY) is read inside a request
# handler, and no NEXT_PUBLIC_* variable is referenced anywhere in src/, so
# nothing is inlined at build time and no secret needs to enter this stage.
#
# This stage does need network access: next/font/google fetches Geist during
# the build.
RUN npm run build


# ---------------------------------------------------------------------------
# runner — only what is needed to serve
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    # The standalone server binds to HOSTNAME. Left at its default it listens
    # on localhost inside the container, which is unreachable from the host.
    HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs \
 && adduser -S -u 1001 -G nodejs nextjs

# `output: "standalone"` emits server.js plus only the traced dependencies.
# It deliberately excludes public/ and .next/static, so both are copied
# separately — missing them is the usual cause of an app that boots but
# serves no CSS.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
