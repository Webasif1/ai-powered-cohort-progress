import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDescription } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProjectDescription = await req.json();

    const { experienceLevel, jobTitle, techStack } = body;

    if (!experienceLevel || !jobTitle || !techStack)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert resume writer and ATS (Applicant Tracking System) optimization specialist.

    Generate a list of resume bullet points describing a project/work experience based on the following details:

    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel}
    - Tech Stack: ${techStack}

    Rules:
    1. Generate between 3 and 5 bullet points describing achievements and responsibilities for this project.
    2. Each bullet point MUST start with a strong action verb in past tense (e.g., "Developed", "Architected", "Optimized", "Implemented", "Led") — never use "I", "Responsible for", or passive voice.
    3. Each bullet point should be between 90 and 140 characters (including spaces).
    4. Naturally weave in relevant technologies from the Tech Stack — do not just list them, show how they were used.
    5. Wherever appropriate, include realistic, plausible quantifiable impact (e.g., performance improvements, reduced load times, user counts, scale) — but do not fabricate overly specific or implausible numbers.
    6. Tailor the scope and ownership language to the experience level:
      - Entry-level/Junior: focus on contribution, learning, and execution of defined tasks.
      - Mid-level: focus on ownership of features, problem-solving, and cross-functional collaboration.
      - Senior/Lead: focus on architecture decisions, mentorship, scalability, and strategic impact.
    7. Avoid generic filler phrases (e.g., "worked on various tasks", "helped the team").
    8. Do NOT use buzzwords without substance (e.g., "synergy", "go-getter", "rockstar").


    Output:
    Return only the project description text;
    `;

    const result = await generateAiContent(prompt);

    const projectDescription = result;

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Project description created",
      data: {
        projectDescription,
      },
    });
  } catch (error) {
    console.log("Error in generate project description api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
