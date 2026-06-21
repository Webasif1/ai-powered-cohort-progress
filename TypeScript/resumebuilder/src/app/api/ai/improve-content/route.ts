import { generateAiContent } from "@/lib/gemini";
import {  ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();

    const { content } = body;

    if (!content)
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 400 },
      );

    const prompt = `You are an expert resume writer and editor specializing in clear, professional, ATS (Applicant Tracking System) optimized content.

    Improve the following resume content while preserving its original meaning and factual details:

    Original Content:
    """
    ${content}
    """

    Rules:
    1. Improve clarity, grammar, sentence structure, and professional tone — do not change the core facts, achievements, or claims in the original content.
    2. Do NOT invent new facts, skills, numbers, or achievements that were not implied in the original content.
    3. Strengthen weak or passive phrasing with strong, active, resume-appropriate language (e.g., replace "was responsible for" with a strong past-tense action verb).
    4. Use ATS-friendly keywords and industry-standard terminology relevant to the content's context.
    5. Remove redundant words, filler phrases, and generic buzzwords without substance (e.g., "synergy", "go-getter", "hardworking individual").
    6. Keep the improved content roughly the same length as the original (within about ±20%) unless the original is clearly too short or contains unnecessary repetition.
    7. Preserve the original format style (if it was a single sentence, keep it a single sentence; if it was multiple sentences, keep a similar structure) — do not convert it into bullet points unless the original already was one.
    8. Output ONLY the improved content text — no quotes, no labels, no explanation, no markdown, no "Here's the improved version:" preamble, nothing else.

    Output:
    return only the improved ATS-friendly content.
    `;

    const result = await generateAiContent(prompt);

    const improvedContent = result;

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "improved content created",
      data: {
        improvedContent,
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
