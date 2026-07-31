import { api } from "@/lib/axios";

/**
 * Every AI route returns a loosely-shaped payload, so callers normalise with
 * `toText` / `toList` from `components/resume/AIActionButton`.
 */

export const generateSummary = async (body: {
  experienceLevel: string;
  jobTitle: string;
  skills: string[];
}) => {
  const res = await api.post("/ai/generate-summery", body);
  return res.data;
};

export const generateSkills = async (body: {
  experienceLevel: string;
  jobTitle: string;
}) => {
  const res = await api.post("/ai/generate-skills", body);
  return res.data;
};

export const generateExperience = async (body: {
  experienceLevel: string;
  yearsOfExperience: string;
  jobRole: string;
  techStack: string[];
}) => {
  const res = await api.post("/ai/generate-experience-description", body);
  return res.data;
};

export const generateProjectDescription = async (body: {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
}) => {
  const res = await api.post("/ai/generate-project-description", body);
  return res.data;
};

// The route lives at /api/ai/improve-content. This previously posted to
// /ai/generate-content, so "Improve with AI" 404'd on every click.
export const improveContent = async (body: { content: string }) => {
  const res = await api.post("/ai/improve-content", body);
  return res.data;
};

export const getATSScore = async (body: { resumeText: string }) => {
  const res = await api.post("/ai/ats-score", body);
  return res.data;
};
