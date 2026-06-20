import { generateAiContent } from "@/lib/gemini";
import { GenerateSummeryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummeryBody = await req.json();

    const { experienceLevel, skills, jobTitle } = body;

    if (!experienceLevel || !skills || !jobTitle)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert resume writer and ATS (Applicant Tracking System) optimization specialist.

    Generate a single professional summary for a resume based on the following candidate details:

    - Job Title: {jobTitle}
    - Experience Level: {experienceLevel}
    - Key Skills: {skills}

    Rules:
    1. The summary MUST be between 80 and 100 words total (including spaces). Count the characters carefully before responding — if it's outside this range, rewrite it until it fits.
    2. Write in third-person-omitted, resume style (no "I" or "He/She" — start directly with strong descriptors, e.g., "Results-driven...", "Detail-oriented...").
    3. Naturally incorporate 2–3 of the most relevant skills from the list — do not list all of them.
    4. Use strong, ATS-friendly keywords relevant to the job title and industry.
    5. Avoid generic filler phrases like "hardworking individual" or "team player" unless paired with a concrete skill or outcome.
    6. Do NOT use buzzwords without substance (e.g., "synergy", "go-getter").
    7. End with a period — no other trailing punctuation.
    8. Output ONLY the summary text — no quotes, no labels, no explanation, no markdown, nothing else.

    Output:
    return only the resume summery test;
    `;

    const result = await generateAiContent(prompt);

    const summery = result;

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Summery created",
      data: {
        summery,
      },
    });
  } catch (error) {
    console.log("Error in generate summery api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
