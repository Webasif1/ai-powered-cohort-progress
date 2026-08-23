import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { logExpected } from "./logger";

export const getCurrentUser = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token) as { userID: string };
    return decoded.userID;
  } catch (error) {
    // An expired token is ordinary traffic, not an incident — this used to
    // log on every such request.
    logExpected("getCurrentUser", error);
    return null;
  }
};
