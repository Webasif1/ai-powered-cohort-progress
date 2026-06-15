import { generateToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import userModel from "@/models/User.model";
import { ApiResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: LoginBody = await req.json();

    const { email, password } = body;

    if (!email || !password) {
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

    if (!isExist) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    const matchPass = isExist.comparePass(password);

    if (!matchPass) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid credential",
        },
        {
          status: 401,
        },
      );
    }

    const token = generateToken({ userID: isExist._id.toString() });

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User logged in successfully",
        data: {
          user: {
            _id: isExist._id,
            name: isExist.name,
            email: isExist.email,
          },
        },
      },
      {
        status: 201,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
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
