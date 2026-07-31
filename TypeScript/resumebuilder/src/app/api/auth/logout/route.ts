import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";

/**
 * The session cookie is httpOnly, so the client cannot clear it. Sign-out
 * previously had nowhere to go — the header now calls this.
 */
export async function POST() {
  const response = NextResponse.json<ApiResponse>({
    success: true,
    message: "Logged out",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
