import { clearSessionCookie } from "@/lib/session";
import { ok } from "../../_lib/respond";

/**
 * The session cookie is httpOnly, so the client cannot clear it. Sign-out
 * previously had nowhere to go — the header now calls this.
 */
export async function POST() {
  const response = ok("Logged out");
  clearSessionCookie(response);
  return response;
}
