import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

// GET all resumes for current user
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Find ALL resumes for this user (use find, not findById)
    const resumes = await ResumeModel.find({
      user_id: userID,
    }).sort({ updatedAt: -1 }); // Sort by most recently updated

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "All resumes fetched successfully",
        data: resumes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in get all resumes api:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
