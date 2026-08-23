import mongoose, { Schema } from "mongoose";

/**
 * The editor PATCHes `summary`, `experience`, `personalInfo.phone` and
 * `education.{institution,startYear,endYear}`. The original schema only
 * declared `summery`, `workExperience`, `personalInfo.profile` and
 * `education.{institute,startDate,endDate}` — and because Mongoose runs
 * updates in strict mode, every one of those paths was silently dropped from
 * `$set`. Users typed a summary, saw "Saved", and lost it on reload.
 *
 * The canonical names below now match the client. The legacy names are kept
 * so documents written by the old code still read back (the GET handler
 * already falls back to them).
 */

const subOptions = { _id: false, id: false } as const;

const personalInfoSchema = new Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    // Legacy: previously used in place of `phone`.
    profile: { type: String, default: "" },
  },
  subOptions,
);

const experienceSchema = new Schema(
  {
    id: { type: String, default: "" },
    company: { type: String, default: "" },
    position: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
  },
  subOptions,
);

const projectSchema = new Schema(
  {
    id: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    techStack: { type: [String], default: [] },
  },
  subOptions,
);

const educationSchema = new Schema(
  {
    id: { type: String, default: "" },
    degree: { type: String, default: "" },
    institution: { type: String, default: "" },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
  },
  subOptions,
);

const resumeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      // Belt and braces behind the PATCH allowlist. A writable owner field
      // meant a caller could move their own document into another account's
      // dashboard, where it would be served as that user's own.
      immutable: true,
    },
    title: { type: String, default: "Untitled Resume" },
    // Layout id from the template registry. Documents written before
    // templates existed have no value here, and the registry falls back to
    // the default when it cannot resolve one.
    template: { type: String, default: "classic" },

    summary: { type: String, default: "" },
    personalInfo: { type: personalInfoSchema, default: () => ({}) },
    experience: { type: [experienceSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    skills: { type: [String], default: [] },
    education: { type: [educationSchema], default: [] },
    certifications: { type: [String], default: [] },

    // ---- Legacy fields, read-only. Kept so pre-existing documents survive.
    summery: { type: String, default: undefined },
    workExperience: { type: [experienceSchema], default: undefined },
  },
  {
    timestamps: true,
    // Index builds are a deploy-time operation, not something to run against
    // the cluster on every cold container start.
    autoIndex: process.env.NODE_ENV !== "production",
  },
);

// The dashboard query is `find({user_id}).sort({updatedAt:-1})`. With only a
// single-field index on `user_id`, Mongo fetches every one of a user's
// documents and sorts them in memory — which hard-fails past 32 MB.
resumeSchema.index({ user_id: 1, updatedAt: -1 });

const ResumeModel =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default ResumeModel;
