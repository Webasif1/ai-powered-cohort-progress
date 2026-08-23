import { env, isProduction } from "./env";

/**
 * Server-side logging that cannot leak a connection string.
 *
 * The routes used to `console.log("...", error)` with the whole error object.
 * Mongo errors carry enumerable properties — a `MongooseServerSelectionError`
 * holds your cluster hostnames, and a driver-level failure can carry the URI
 * with `USER:PASSWORD@` still in it — all of which then flows to whatever
 * aggregates container stdout.
 *
 * So: name and message only, redacted, and on `console.error` rather than
 * `console.log` so it lands on the right stream.
 */

const MONGO_URI = /mongodb(\+srv)?:\/\/[^\s"']+/gi;
const BEARER = /\b(bearer\s+)[\w-]+\.[\w-]+\.[\w-]+/gi;

export function redact(value: string): string {
  return value
    .replace(MONGO_URI, "mongodb://[redacted]")
    .replace(BEARER, "$1[redacted]");
}

function describe(error: unknown): string {
  if (error instanceof Error) return redact(`${error.name}: ${error.message}`);
  if (typeof error === "string") return redact(error);
  return "Unknown error";
}

/** An unexpected failure. Always logged, and reported when Sentry is set up. */
export function logError(context: string, error: unknown): void {
  console.error(`[${context}] ${describe(error)}`);

  // The stack is where the value is, but only somewhere it will not be
  // scraped into a third-party log index alongside the rest of the message.
  if (!isProduction && error instanceof Error && error.stack) {
    console.error(error.stack);
  }

  // Imported lazily so the SDK is never pulled in when no DSN is configured,
  // which is the normal case locally and in CI.
  if (env.SENTRY_DSN) {
    import("@sentry/nextjs")
      .then((Sentry) => Sentry.captureException(error, { tags: { context } }))
      .catch(() => {
        /* reporting must never be the thing that breaks a request */
      });
  }
}

/**
 * Something that is expected in normal traffic — an expired token, a failed
 * login. Silent in production, where it is noise rather than signal.
 */
export function logExpected(context: string, error: unknown): void {
  if (isProduction) return;
  console.warn(`[${context}] ${describe(error)}`);
}
