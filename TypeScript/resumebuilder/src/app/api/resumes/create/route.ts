import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized - Please log in again",
        },
        { status: 401 }
      );
    }

    const newResume = await ResumeModel.create({
      user_id: userID,
      title: "Untitled Resume",
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        github: "",
        linkedin: "",
        portfolio: "",
      },
      summary: "",
      experience: [],
      projects: [],
      skills: [],
      education: [],
      certifications: [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume created successfully",
        data: newResume,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in creating resume api:", error);

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
