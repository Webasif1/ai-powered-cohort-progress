import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: RegisterBody = await req.json();

    const { name, email, mobile, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        },
      );
    }

    const isExist = await userModel.findOne({ email });

    if (isExist) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "This user Already exist",
        },
        {
          status: 409,
        },
      );
    }

    const newUser = await userModel.create({
      name,
      email,
      mobile,
      password,
    });

    const token = generateToken({ userID: newUser._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User register successfully",
        data: {
          user: {
            _id: newUser._id,
            name: newUser.name,
            mobile:newUser.mobile,
            email: newUser.email,
          },
        },
      },
      {
        status: 201,
      },
    );

    // Seconds, not milliseconds — see the note in the login route.
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });

    return response
  } catch (error) {
    console.log("error in register api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        error: {
          error,
        },
      },
      { status: 500 },
    );
  }
}
