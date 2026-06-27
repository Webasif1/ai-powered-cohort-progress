// import { AtsScoreBody, GenerateExperienceDescriptionBody, GenerateProjectDescription, GenerateSkillsBody, GenerateSummeryBody, ImproveContentBody } from "@/types/ai.types";

// import { AtsScoreBody, GenerateExperienceDescriptionBody, GenerateProjectDescription, GenerateSkillsBody, GenerateSummeryBody, ImproveContentBody } from "@/types/ai.types";



import { api } from "@/lib/axios";

// Generate Summary
export const generateSummary = async (body: {
  experienceLevel: string;
  jobTitle: string;
  skills: string[];
}) => {
  const res = await api.post("/ai/generate-summery", body);
  return res.data;
};

// Generate Skills
export const generateSkills = async (body: {
  experienceLevel: string;
  jobTitle: string;
}) => {
  const res = await api.post("/ai/generate-skill", body);
  return res.data;
};

// Experience Description
export const generateExperience = async (body: {
  experienceLevel: string;
  yearsOfExperience: string;
  jobRole: string;
  techStack: string[];
}) => {
  const res = await api.post("/ai/generate-experience-description", body);
  return res.data;
};

// Project Description
export const generateProjectDescription = async (body: {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
}) => {
  const res = await api.post("/ai/generate-project-description", body);
  return res.data;
};

// Improve Content
export const improveContent = async (body: {
  content: string;
}) => {
  const res = await api.post("/ai/generate-content", body);
  return res.data;
};

// ATS Score
export const getATSScore = async (body: {
  resumeText: string;
}) => {
  const res = await api.post("/ai/ats-score", body);
  return res.data;
};
