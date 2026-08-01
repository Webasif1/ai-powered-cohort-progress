/**
 * Validates a `next` destination taken from the query string.
 *
 * Without this, `/auth/login?next=https://evil.example` would send a user
 * straight off-site immediately after they had signed in — a textbook open
 * redirect, and a convincing one because it happens on a real login.
 *
 * Only same-origin absolute paths are allowed. Anything else falls back to
 * the dashboard.
 */
export const DEFAULT_REDIRECT = "/resume";

export function safeRedirect(
  value: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT,
): string {
  if (!value) return fallback;

  // Must be a path on this origin.
  if (!value.startsWith("/")) return fallback;

  // `//host` and `/\host` are protocol-relative URLs — they leave the site.
  if (value.startsWith("//") || value.startsWith("/\\")) return fallback;

  // Reject anything a browser might still resolve to another origin.
  if (value.includes("://")) return fallback;

  return value;
}
