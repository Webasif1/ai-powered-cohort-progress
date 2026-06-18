import { Types } from "mongoose";

export interface IPersonalInfo {
  fullName: string;
  email: string;
  profile: string;
  location: string;
  github: string;
  linkedin: string;
  portfolio: string;
}

export interface IWorkExperience {
  company: string;
  position: string;
  statDate: string;
  description: string;
}

export interface IProjects {
  title: string;
  description: string;
  githubUrl: string;
  linkedinUrl: string;
  techStack: string[];
}

export interface IEducation {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summery: string;
  personalInfo: IPersonalInfo;
  workExperience?: IWorkExperience[];
  projects: IProjects[];
  education: IEducation[];
  certifications?: string[];
}
