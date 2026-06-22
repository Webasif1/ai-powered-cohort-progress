import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { resumeId } = await params.params;
    const resume = await ResumeModel.findOne({
      _id: resumeId,
      user_id: userID,
    });

    if (!resume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume fetched successfully",
        data: resume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in get resume api:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  params: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { resumeId } = await params.params;
    const updatedResume = await ResumeModel.findOneAndUpdate(
      {
        _id: resumeId,
        user_id: userID,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedResume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume failed to updated",
        },
        { status: 400 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: updatedResume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in update resume api:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  params: { params: Promise<{ resumeId: string }> },
) {
  try {
    await connectDB();
    const userID = await getCurrentUser();
    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { resumeId } = await params.params;
    const deleteResume = await ResumeModel.findOneAndDelete({
      _id: resumeId,
      user_id: userID,
    });

    if (!deleteResume) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Resume failed to delete",
        },
        { status: 400 },
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resume delete successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in delete resume api:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
