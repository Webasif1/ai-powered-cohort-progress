# ResumeAI

An AI-assisted resume builder. Fill in seven guided sections, let Gemini draft
the phrasing, score the result against what an applicant tracking system looks
for, and export a selectable-text A4 PDF through the browser's own print
pipeline.

Next.js 16 (App Router) · React 19 · Tailwind v4 · MongoDB/Mongoose · Google
Gemini · JWT sessions in an httpOnly cookie.

## Running locally

Requires Node 22+ and a MongoDB you can reach (Atlas or local).

```bash
cp .env.example .env.local   # then fill in the three required values
npm install
npm run dev                  # http://localhost:3000
```

`src/lib/env.ts` validates the environment at boot, so a missing or too-short
`JWT_SECRET` stops the server with a named error instead of letting every
request silently look signed-out.

| Variable | Required | Notes |
|---|---|---|
| `MONGO_URI` | yes | Must start with `mongodb://` or `mongodb+srv://` |
| `JWT_SECRET` | yes | Minimum 32 characters. Changing it signs everyone out |
| `GEMINI_API_KEY` | yes | Every `/api/ai/*` route needs it |
| `SENTRY_DSN` | no | Unset means the SDK is never imported |

## Docker

The intended deployment path. `next.config.ts` sets `output: "standalone"`, so
the runtime image carries only the dependencies actually reached at runtime.

```bash
cp .env.docker.example .env.docker   # then fill in
docker compose up --build            # against your own cluster

docker compose --profile local-db up --build   # with a throwaway local mongo
```

The compose file deliberately does not publish Mongo's port. The image runs as
a non-root user and has a healthcheck on `/`.

## Deploying

One step that is easy to miss: the models set `autoIndex: false` for
production, so index creation is a **deploy step**, not something that happens
on boot.

```bash
npm run db:indexes   # idempotent; run after any schema index change
```

Skip it and the dashboard query sorts in memory, which fails outright once a
user's resumes exceed 32 MB — and the rate-limit collection grows forever
because its TTL index never gets built.

## Checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint, warnings fail
npm run check       # both
npm run build
```

CI (`.github/workflows/ci.yml`) runs all four on every push and pull request.

## Layout

```
src/app/api/_lib/      response envelope, auth guard, body parsing, rate limits
src/app/api/ai/_lib/   the AI route factory, prompts and input schemas
src/lib/               env, logging, jwt/session, rate limiting, resume helpers
src/models/            Mongoose schemas
src/components/resume/templates/   the six layouts + the registry that resolves them
```

Two things worth knowing before changing them:

- **Every write route validates against an explicit allowlist.** `PATCH
  /api/resumes/:id` once applied the raw request body, which let a caller
  reassign `user_id` and hand their document to another account.
- **All six `/api/ai/*` routes are built from one factory** so the auth gate,
  the per-user rate limit and the input cap cannot be forgotten by the next
  one. Adding a route means adding a prompt and a schema, not a handler.

## Not done yet

Tests (there are none), the SEO/social bundle (`robots.ts`, `sitemap.ts`,
OG image, a real favicon), and JWT revocation — logout clears the cookie but a
captured token stays valid until it expires.
