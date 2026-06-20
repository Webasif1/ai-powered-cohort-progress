import { generateAiContent } from "@/lib/gemini";
import { GenerateSummeryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummeryBody = await req.json();

    const { experienceLevel, jobTitle } = body;

    if (!experienceLevel || !jobTitle)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert technical recruiter and resume consultant with deep knowledge of industry-standard tools, languages, and frameworks across all tech roles.

    Generate a list of relevant technical skills for a resume based on the following candidate details:

    - Job Title: ${jobTitle}
    - Experience Level: ${experienceLevel}

    Rules:
    1. Only include TECHNICAL skills — programming languages, frameworks, libraries, tools, platforms, databases, or methodologies directly tied to the job title.
    2. Do NOT include soft skills (e.g., "communication", "teamwork", "leadership").
    3. Do NOT include vague or generic terms (e.g., "computer skills", "problem-solving", "Microsoft Office" unless the role specifically requires it).
    4. Tailor the skill set and depth to the experience level:
      - Entry-level/Junior: core fundamentals and commonly used tools for the role.
      - Mid-level: fundamentals plus more advanced frameworks, tools, and best practices.
      - Senior/Lead: advanced architecture, system design, scaling, and specialized tools relevant to the field.
    5. Return between 8 and 12 skills — relevant and specific, not padded with filler.
    6. Each skill should be a short, standard industry term (1–3 words), not a sentence.
    7. Do not repeat near-duplicate skills (e.g., don't list both "React" and "ReactJS").
    8. Output ONLY a valid JSON array of strings — no markdown, no explanation, no labels, no code fences.

    Example output format:
    ["React", "TypeScript", "Node.js", "REST APIs", "PostgreSQL", "Docker", "Git", "AWS"]
    return only json array;
    `;

    const result = await generateAiContent(prompt);

    let skills = result;

    if (typeof skills === "string") {
      try {
        skills = JSON.parse(skills);
      } catch (error) {
        console.log("Failed to parse skill", error);
      }
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "skills created",
      data: {
        skills,
      },
    });
  } catch (error) {
    console.log("Error in generate skills api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
