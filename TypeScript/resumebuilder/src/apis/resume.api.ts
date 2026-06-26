import { api } from "@/lib/axios";

export const getAllResumes = async () => {
  const res = await api.get("/resumes");
  return res.data;
};

export const createResume = async () => {
  const res = await api.post("/resumes/create");
  return res.data;
};

export const getResumeById = async (resumeId: string) => {
  const res = await api.get(`/resumes/${resumeId}`);
  return res.data;
};

export const updateResume = async (
  resumeId: string,
  data: any
) => {
  try {
    const res = await api.patch(`/resume/${resumeId}`, data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteResume = async (resumeId: string) => {
  const res = await api.delete(`/resumes/${resumeId}`);
  return res.data;
};
