import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export const getCurrentUser = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token) as { userID: string };
    return decoded.userID;
  } catch (error: any) {
    // Token expired or invalid
    console.log("Auth error:", error.message);
    return null;
  }
};
