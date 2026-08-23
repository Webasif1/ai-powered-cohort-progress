import { NextRequest } from "next/server";
import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { setSessionCookie } from "@/lib/session";
import userModel from "@/models/User.model";
import { enforceLimit, fail, guard, ok, parseBody } from "../../_lib/respond";
import { registerSchema } from "../_lib/credentials";

const LIMIT = 5;
const WINDOW_SECONDS = 60 * 10;

/** Mongo's duplicate-key error. */
const DUPLICATE = 11000;

export async function POST(req: NextRequest) {
  return guard("auth/register", async () => {
    await connectDB();

    const limited = await enforceLimit(req, "register", null, LIMIT, WINDOW_SECONDS);
    if (limited) return limited;

    const parsed = await parseBody(req, registerSchema);
    if ("response" in parsed) return parsed.response;

    const { name, email, password, mobile } = parsed.data;

    try {
      const user = await userModel.create({
        name,
        email,
        password,
        mobile: mobile || undefined,
      });

      const response = ok(
        "User register successfully",
        { user: { _id: user._id, name: user.name, email: user.email } },
        201,
      );

      setSessionCookie(response, generateToken({ userID: user._id.toString() }));
      return response;
    } catch (error) {
      // `unique: true` is an index directive, not a validator, so a
      // check-then-create races two simultaneous signups for the same email.
      // Letting the index decide is the only version without a window.
      if (
        typeof error === "object" &&
        error !== null &&
        (error as { code?: number }).code === DUPLICATE
      ) {
        return fail("An account with that email already exists", 409);
      }
      throw error;
    }
  });
}
