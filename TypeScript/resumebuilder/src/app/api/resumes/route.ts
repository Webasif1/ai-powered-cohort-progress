import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { guard, ok, requireUser } from "../_lib/respond";

/**
 * Nobody legitimately has more resumes than this, and without a ceiling one
 * account can make the dashboard response grow without bound.
 */
const MAX_RESUMES = 60;

export async function GET() {
  return guard("resumes/list", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    // `.lean()` because these are serialized to JSON immediately — hydrating
    // full Mongoose documents first was pure waste. The dashboard genuinely
    // needs every section (it renders the real template and computes
    // completeness), so there is no projection to add.
    const resumes = await ResumeModel.find({ user_id: auth.userId })
      .sort({ updatedAt: -1 })
      .limit(MAX_RESUMES)
      .lean();

    // `data` is the array itself — the existing wire contract that
    // `getAllResumes` reads.
    return ok("Resumes fetched successfully", resumes);
  });
}
