import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { JWTPayload } from "@/types/user.types";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token not found");

  const decode = verifyToken(token);
  console.log("DECODED TOKEN:", decode);

  if (!decode) throw new Error("Unauthorize");

  return (decode as JWTPayload).userID;
}
