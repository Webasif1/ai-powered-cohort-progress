import type { NextResponse } from "next/server";
import { isProduction } from "./env";

/**
 * How long a signed-in session lasts.
 *
 * Was one hour with no refresh, which logged people out mid-edit and bounced
 * them to the login screen through the axios interceptor. Seven days is the
 * usual shape for a tool people return to; the cookie is httpOnly, sameSite
 * lax and secure in production, so the exposure is a stolen-device problem
 * rather than a network one.
 */
export const SESSION_SECONDS = 60 * 60 * 24 * 7;
export const SESSION_EXPIRES_IN = "7d";

const COOKIE = "token";

/** `maxAge` is in seconds — a mismatch here once outlived the JWT by weeks. */
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isProduction,
    maxAge: SESSION_SECONDS,
  });
}

/** Attributes must match the setter, or a proxy can leave the cookie behind. */
export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isProduction,
    maxAge: 0,
  });
}
