/**
 * Runs once, before the first request is served.
 *
 * Importing `env` here is the whole point: it validates at module load, so a
 * container with a missing or too-short `JWT_SECRET` dies at boot with a
 * named error instead of serving traffic where every request silently looks
 * signed-out.
 */
export async function register() {
  const { env } = await import("./lib/env");

  if (!env.SENTRY_DSN) return;

  const Sentry = await import("@sentry/nextjs");

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    // Errors are the point here; tracing every request is not worth the
    // volume on a single-VPS deployment.
    tracesSampleRate: 0,
    // Resume content is the user's employment history. Never ship it.
    sendDefaultPii: false,
  });
}

export async function onRequestError(
  ...args: Parameters<
    NonNullable<typeof import("@sentry/nextjs")["captureRequestError"]>
  >
) {
  const { env } = await import("./lib/env");
  if (!env.SENTRY_DSN) return;

  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(...args);
}
