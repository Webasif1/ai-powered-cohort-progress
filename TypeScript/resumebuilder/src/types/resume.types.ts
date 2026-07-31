import { Types } from "mongoose";

export interface IPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
  /** Legacy field, written by earlier versions in place of `phone`. */
  profile?: string;
}

export interface IExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

export interface IEducation {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summary: string;
  personalInfo: IPersonalInfo;
  experience: IExperience[];
  projects: IProject[];
  skills: string[];
  education: IEducation[];
  certifications: string[];

  /** Legacy aliases still present on older documents. */
  summery?: string;
  workExperience?: IExperience[];

  createdAt?: Date;
  updatedAt?: Date;
}

/** Shape the editor and preview both work against. */
export type ResumeData = Pick<
  IResume,
  | "title"
  | "summary"
  | "personalInfo"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certifications"
> & { _id: string };

export const EMPTY_RESUME: ResumeData = {
  _id: "",
  title: "Untitled Resume",
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
  },
  summary: "",
  experience: [],
  projects: [],
  skills: [],
  education: [],
  certifications: [],
};
