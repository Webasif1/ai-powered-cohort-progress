import { api } from "@/lib/axios";

export const getAllResumes = async () => {
  const res = await api.get("/resumes");
  // Response structure: { success, message, data: [...] }
  // Return the data array directly
  return res.data?.data || [];
};

export const createResume = async () => {
  const res = await api.post("/resumes/create");
  // Return the created resume
  return res.data?.data || res.data;
};

export const getResumeById = async (resumeId: string) => {
  const res = await api.get(`/resumes/${resumeId}`);
  // Return the resume object
  return res.data?.data || res.data;
};

export const updateResume = async (resumeId: string, data: any) => {
  const res = await api.patch(`/resumes/${resumeId}`, data);
  return res.data?.data || res.data;
};

export const deleteResume = async (resumeId: string) => {
  const res = await api.delete(`/resumes/${resumeId}`);
  return res.data;
};

