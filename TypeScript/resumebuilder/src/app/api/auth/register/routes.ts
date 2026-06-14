import { connectDB } from "@/lib/mongodb";
import { RegisterBody } from "@/types/user.types";
import { NextRequest } from "next/server";

async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: RegisterBody = await req.json();

    const { name, email, mobile, password } = body;
  } catch (error) {
    console.log("error in register api", error);
  }
}
