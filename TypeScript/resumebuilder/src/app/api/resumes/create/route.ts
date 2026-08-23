import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { normalizeResume } from "@/lib/resumeData";
import ResumeModel from "@/models/Resume.model";
import { EMPTY_RESUME, type IResume } from "@/types/resume.types";
import { fail, guard, ok, parseBody, requireUser } from "../../_lib/respond";
import { resolveTemplate, resumeCreateSchema } from "../_lib/schema";

/** A ceiling, so one account cannot fill the collection. */
const MAX_RESUMES = 60;

/** Mongoose caps nothing here, so the suffix is what keeps titles bounded. */
function copyTitle(title?: string): string {
  const base = (title ?? "").trim() || EMPTY_RESUME.title;
  return `${base.slice(0, 110)} (copy)`;
}

export async function POST(req: NextRequest) {
  return guard("resumes/create", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    const parsed = await parseBody(req, resumeCreateSchema);
    if ("response" in parsed) return parsed.response;

    const { from, template: requested } = parsed.data;

    const count = await ResumeModel.countDocuments({ user_id: auth.userId });
    if (count >= MAX_RESUMES) {
      return fail(`You can keep up to ${MAX_RESUMES} resumes. Delete one first.`, 409);
    }

    // `from` turns this into a duplicate. It lives here rather than in its own
    // route so the free-template rule has exactly one implementation.
    let source: Partial<IResume> | null = null;
    if (from) {
      if (!isValidObjectId(from)) return fail("Resume not found", 404);

      source = await ResumeModel.findOne({
        _id: from,
        user_id: auth.userId,
      }).lean();

      if (!source) return fail("Resume not found", 404);
    }

    // `normalizeResume` already resolves the legacy `summery` /
    // `workExperience` names, so a duplicate of an old document keeps its
    // content instead of silently coming out blank.
    const base = normalizeResume(source);

    // `_id`, `user_id` and the timestamps are deliberately never carried over.
    const created = await ResumeModel.create({
      user_id: auth.userId,
      title: source ? copyTitle(source.title) : EMPTY_RESUME.title,
      template: resolveTemplate(source ? source.template : requested),
      personalInfo: base.personalInfo,
      summary: base.summary,
      experience: base.experience,
      projects: base.projects,
      skills: base.skills,
      education: base.education,
      certifications: base.certifications,
    });

    return ok(
      source ? "Resume duplicated successfully" : "Resume created successfully",
      created.toObject(),
      201,
    );
  });
}
