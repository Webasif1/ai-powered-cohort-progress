import { api } from "@/lib/axios";
import type { ResumeData } from "@/types/resume.types";

export const getAllResumes = async () => {
  const res = await api.get("/resumes");
  // Response structure: { success, message, data: [...] }
  // Return the data array directly
  return res.data?.data || [];
};

export const createResume = async (template?: string) => {
  const res = await api.post("/resumes/create", template ? { template } : {});
  // Return the created resume
  return res.data?.data || res.data;
};

export const getResumeById = async (resumeId: string) => {
  const res = await api.get(`/resumes/${resumeId}`);
  // Return the resume object
  return res.data?.data || res.data;
};

export const updateResume = async (
  resumeId: string,
  data: Partial<Omit<ResumeData, "_id">>,
) => {
  const res = await api.patch(`/resumes/${resumeId}`, data);
  return res.data?.data || res.data;
};

export const deleteResume = async (resumeId: string) => {
  const res = await api.delete(`/resumes/${resumeId}`);
  return res.data;
};

