import { api } from "@/lib/axios";
import { AtsScoreBody, GenerateExperienceDescriptionBody, GenerateProjectDescription, GenerateSkillsBody, GenerateSummeryBody, ImproveContentBody } from "@/types/ai.types";

export const generateSummary = async (payload:GenerateSummeryBody) => {
  const res = await api.post(
    "/ai/genenrate-summery",
    payload
  );
  return res.data;
};

export const generateSkills = async (payload:GenerateSkillsBody) => {
  const res = await api.post(
    "/ai/generate-skills",
    payload
  );
  return res.data;
};

export const generateExperienceDescription = async (payload:GenerateExperienceDescriptionBody) => {
  const res = await api.post(
    "/ai/generate-experience-description",
    payload
  );
  return res.data;
};

export const generateProjectDescription = async (payload:GenerateProjectDescription) => {
  const res = await api.post(
    "/ai/generate-project-description",
    payload
  );
  return res.data;
};

export const improveContent = async (payload:ImproveContentBody) => {
  const res = await api.post(
    "/ai/improve-content",
    payload
  );
  return res.data;
};

export const getATSScore = async (payload:AtsScoreBody) => {
  const res = await api.post(
    "/ai/ats-score",
    payload
  );
  return res.data;
};
