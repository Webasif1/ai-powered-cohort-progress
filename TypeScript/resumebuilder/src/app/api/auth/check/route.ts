import { getCurrentUser } from "@/lib/getCurrentUser";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userID = await getCurrentUser();

    if (!userID) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Authenticated",
        data: { userID },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Authentication check failed",
      },
      { status: 401 }
    );
  }
}
