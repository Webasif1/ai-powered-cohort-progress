import { NextRequest } from "next/server";
import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import { setSessionCookie } from "@/lib/session";
import userModel from "@/models/User.model";
import { enforceLimit, fail, guard, ok, parseBody } from "../../_lib/respond";
import { loginSchema, wasteCompare } from "../_lib/credentials";

/** Tight, because the only reason to try this often is to guess. */
const LIMIT = 8;
const WINDOW_SECONDS = 60;

export async function POST(req: NextRequest) {
  return guard("auth/login", async () => {
    await connectDB();

    // Keyed on the address: there is no user to key on until it succeeds.
    const limited = await enforceLimit(req, "login", null, LIMIT, WINDOW_SECONDS);
    if (limited) return limited;

    const parsed = await parseBody(req, loginSchema);
    if ("response" in parsed) return parsed.response;

    const { email, password } = parsed.data;

    // The hash is `select: false`, so the one place that needs it asks.
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      // Same status, same body and comparable timing as a wrong password.
      // Answering 404 "User not found" here — as this route used to — turned
      // any email into a yes/no question.
      await wasteCompare(password);
      return fail("Invalid credentials", 401);
    }

    if (!(await user.comparePass(password))) {
      return fail("Invalid credentials", 401);
    }

    const response = ok("User logged in successfully", {
      user: { _id: user._id, name: user.name, email: user.email },
    });

    setSessionCookie(response, generateToken({ userID: user._id.toString() }));
    return response;
  });
}
