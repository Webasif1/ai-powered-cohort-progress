import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  summery: {
    type: String,
    default: "",
  },
  personalInfo: {
    type: {
      fullName: String,
      email: String,
      profile: String,
      location: String,
      github: String,
      linkedin: String,
      portfolio: String,
    },
    default:{},
  },
  workExperience: {
    type: [
      {
        company: String,
        position: String,
        statDate: String,
        description: String,
      },
    ],
    default: [],
  },
  projects: {
    type: [
      {
        title: String,
        description: String,
        githubUrl: String,
        liveUrl: String,
        techStack: [String],
      },
    ],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  education: {
    type: [
      {
        institute: String,
        degree: String,
        startDate: String,
        endDate: String,
      },
    ],
    default: [],
  },
  certifications: {
    type: [String],
    default: [],
  },
},
{
  timestamps:true
});

const ResumeModel = mongoose.models.Resume ||mongoose.model("Resume", resumeSchema);

export default ResumeModel;
