import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/user.types";
import { env } from "./env";
import { SESSION_EXPIRES_IN } from "./session";

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: SESSION_EXPIRES_IN });
};

export const verifyToken = (token: string) => {
  // Pinning the algorithm is defence in depth: jsonwebtoken@9 already refuses
  // asymmetric algorithms when the key is a string, but this makes the
  // intent explicit and survives a future key-type change.
  return jwt.verify(token, env.JWT_SECRET, { algorithms: ["HS256"] });
};
