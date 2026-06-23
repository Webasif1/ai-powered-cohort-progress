import { api } from "@/lib/axios";

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
  payload: any
) => {
  const res = await api.patch(`/resumes/${resumeId}`, payload);
  return res.data;
};

export const deleteResume = async (resumeId: string) => {
  const res = await api.delete(`/resumes/${resumeId}`);
  return res.data;
};
