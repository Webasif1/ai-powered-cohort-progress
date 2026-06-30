import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized - Please log in again",
        },
        { status: 401 } // Return 401, not 500
      );
    }

    const resumes = await ResumeModel.find({
      user_id: userID,
    }).sort({ updatedAt: -1 });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "All resumes fetched successfully",
        data: resumes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in get all resumes api:", error);

    // Check if it's a JWT error
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Session expired - Please log in again",
        },
        { status: 401 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
