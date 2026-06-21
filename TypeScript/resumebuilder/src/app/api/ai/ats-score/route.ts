import { generateAiContent } from "@/lib/gemini";
import {  AtsScoreBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: AtsScoreBody = await req.json();

    const { resumeText } = body;

    if (!resumeText)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and professional resume reviewer with deep knowledge of how modern ATS software parses and ranks resumes.

    Analyze the following resume text and evaluate how well it would perform when scanned by an ATS:

    Resume Text:
    """
    {resumeText}
    """

    Evaluate the resume across these categories:
    1. Keyword Optimization — presence of relevant, role-specific keywords and skills.
    2. Formatting & Structure — use of standard, ATS-parseable section headers (e.g., "Experience", "Education", "Skills"), absence of tables/columns/graphics that break parsing, consistent date formats.
    3. Action Verbs & Impact — use of strong action verbs and quantifiable achievements (numbers, percentages, metrics).
    4. Contact & Essential Info — presence of clear contact information, job titles, and dates.
    5. Clarity & Conciseness — readability, absence of redundant or filler content.

    Rules:
    1. Give an overall ATS score from 0 to 100 based on the categories above.
    2. Give a sub-score from 0 to 100 for each of the 5 categories.
    3. List 3–5 specific strengths found in the resume.
    4. List 3–5 specific, actionable weaknesses or issues found in the resume.
    5. List 3–5 specific, actionable suggestions for improvement — concrete rewrites or additions, not vague advice like "add more keywords".
    6. Base the evaluation strictly on the provided resume text — do not assume information that isn't present.
    7. Be honest and critical — do not inflate the score to be encouraging. A weak resume should score low.
    8. Output ONLY a valid JSON object matching this exact structure — no markdown, no explanation, no code fences, nothing else:

    {
      "overallScore": number,
      "categoryScores": {
        "keywordOptimization": number,
        "formattingStructure": number,
        "actionVerbsImpact": number,
        "contactEssentialInfo": number,
        "clarityConciseness": number
      },
      "strengths": string[],
      "weaknesses": string[],
      "suggestions": string[]
    }

    Output:
    return only the json object.
    `;

    const result = await generateAiContent(prompt);

    let atsScore = result;

    if (typeof atsScore === "string") {
      try {
        atsScore = JSON.parse(atsScore);
      } catch (error) {
        console.log("Failed to parse skill", error);
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "improved content created",
      data: {
        atsScore,
      },
    });
  } catch (error) {
    console.log("Error in improved content api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
