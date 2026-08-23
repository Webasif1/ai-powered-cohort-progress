import { NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { fail, guard, ok, parseBody, requireUser } from "../../_lib/respond";
import { resumeUpdateSchema } from "../_lib/schema";

type Context = { params: Promise<{ resumeId: string }> };

const notFound = () => fail("Resume not found", 404);

/**
 * A non-ObjectId path segment used to reach Mongoose, throw a CastError and
 * surface as a 500. It is a request problem, so it answers 404.
 */
async function resumeIdFrom(context: Context): Promise<string | null> {
  const { resumeId } = await context.params;
  return isValidObjectId(resumeId) ? resumeId : null;
}

export async function GET(_req: NextRequest, context: Context) {
  return guard("resumes/get", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    const resumeId = await resumeIdFrom(context);
    if (!resumeId) return notFound();

    const resume = await ResumeModel.findOne({
      _id: resumeId,
      user_id: auth.userId,
    }).lean();

    if (!resume) return notFound();

    return ok("Resume fetched successfully", resume);
  });
}

export async function PATCH(req: NextRequest, context: Context) {
  return guard("resumes/update", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    const resumeId = await resumeIdFrom(context);
    if (!resumeId) return notFound();

    // This used to be `$set: body` with the raw request. `user_id` is a
    // writable schema path, so a caller could hand their own document to
    // another account; `template` could be set to a premium id the create
    // route refuses; and nothing bounded the size of any field.
    const parsed = await parseBody(req, resumeUpdateSchema);
    if ("response" in parsed) return parsed.response;

    if (Object.keys(parsed.data).length === 0) {
      return fail("Nothing to update", 400);
    }

    const updated = await ResumeModel.findOneAndUpdate(
      { _id: resumeId, user_id: auth.userId },
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean();

    if (!updated) return notFound();

    return ok("Resume updated successfully", updated);
  });
}

export async function DELETE(_req: NextRequest, context: Context) {
  return guard("resumes/delete", async () => {
    await connectDB();

    const auth = await requireUser();
    if ("response" in auth) return auth.response;

    const resumeId = await resumeIdFrom(context);
    if (!resumeId) return notFound();

    const deleted = await ResumeModel.findOneAndDelete({
      _id: resumeId,
      user_id: auth.userId,
    }).lean();

    // Was a 400. Nothing about the request is malformed — the row is gone.
    if (!deleted) return notFound();

    return ok("Resume deleted successfully");
  });
}
