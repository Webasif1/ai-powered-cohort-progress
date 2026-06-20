import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExperienceDescriptionBody = await req.json();

    const { experienceLevel, yearsOfExperience,jobRole, techStack } = body;

    if (!experienceLevel || !yearsOfExperience|| !jobRole || !techStack)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert resume writer and ATS (Applicant Tracking System) optimization specialist.

    Generate a single professional experience description paragraph based on the following details:

    - Job Role: ${jobRole}
    - Experience Level: ${experienceLevel}
    - Years of Experience: ${yearsOfExperience}
    - Tech Stack: ${techStack}

    Rules:
    1. Write ONE cohesive paragraph, not bullet points or a list.
    2. The paragraph MUST be between 200 and 300 characters total (including spaces). Count the characters carefully before responding — if it's outside this range, rewrite it until it fits.
    3. Write in third-person-omitted, resume style (no "I" or "He/She" — start directly with strong descriptors, e.g., "Experienced...", "Skilled...").
    4. Naturally reference the job role, years of experience, and 3–4 of the most relevant technologies from the Tech Stack — do not list all of them mechanically.
    5. Use strong, ATS-friendly keywords relevant to the job role, experience level, and tech stack.
    6. Avoid generic filler phrases (e.g., "hardworking individual", "team player") unless paired with a concrete skill or outcome.
    7. Do NOT use buzzwords without substance (e.g., "synergy", "go-getter", "rockstar").
    8. End with a period — no other trailing punctuation.
    9. Output ONLY the paragraph text — no quotes, no labels, no explanation, no markdown, no JSON, nothing else.

    Output:
    Return only the experience description text;
    `;

    const result = await generateAiContent(prompt);

    const experienceDescription = result;

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "skills created",
      data: {
        experienceDescription,
      },
    });
  } catch (error) {
    console.log("Error in generate experience description api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
