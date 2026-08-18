import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import type { IResume } from "@/types/resume.types";
import { NextRequest, NextResponse } from "next/server";

/** Mongoose caps nothing here, so the suffix is what keeps titles bounded. */
function copyTitle(title?: string): string {
  const base = (title ?? "").trim() || "Untitled Resume";
  return `${base.slice(0, 110)} (copy)`;
}

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

    // Only the free layouts can be selected: there is no billing, so a
    // premium id arriving here would mean someone had crafted the request
    // by hand. Anything unrecognised falls back to the default.
    const FREE_TEMPLATES = ["classic", "minimal", "compact"];

    const body = await req.json().catch(() => ({}));

    // `from` turns this into a duplicate. It lives here rather than in its own
    // route so the template whitelist below has exactly one implementation.
    let source: Partial<IResume> | null = null;
    if (typeof body?.from === "string" && body.from) {
      // Scoped by user_id, so an id belonging to someone else is a 404, not a
      // copy. A malformed id makes Mongoose throw a CastError, which would
      // otherwise surface as a 500.
      source = await ResumeModel.findOne({
        _id: body.from,
        user_id: userID,
      })
        .lean()
        .catch(() => null);

      if (!source) {
        return NextResponse.json<ApiResponse>(
          {
            success: false,
            message: "Resume not found",
          },
          { status: 404 }
        );
      }
    }

    const requested = source
      ? source.template
      : typeof body?.template === "string"
        ? body.template
        : "";
    const template = FREE_TEMPLATES.includes(requested) ? requested : "classic";

    const blankPersonalInfo = {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      github: "",
      linkedin: "",
      portfolio: "",
    };

    // `_id`, `user_id` and the timestamps are deliberately never carried over.
    const newResume = await ResumeModel.create({
      user_id: userID,
      title: source ? copyTitle(source.title) : "Untitled Resume",
      template,
      // Older documents still carry the legacy `summery` / `workExperience`
      // names — reading through them stops a duplicate silently losing content.
      personalInfo: { ...blankPersonalInfo, ...(source?.personalInfo ?? {}) },
      summary: source?.summary ?? source?.summery ?? "",
      experience: source?.experience ?? source?.workExperience ?? [],
      projects: source?.projects ?? [],
      skills: source?.skills ?? [],
      education: source?.education ?? [],
      certifications: source?.certifications ?? [],
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: source
          ? "Resume duplicated successfully"
          : "Resume created successfully",
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
