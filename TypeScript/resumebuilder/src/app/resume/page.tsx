"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/resume/ResumeNavbar";
import ResumeCard from "@/components/resume/ResumeCard";
import {
  createResume,
  deleteResume,
  getAllResumes,
} from "@/apis/resume.api";

export default function DashboardPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      const res = await getAllResumes();
      setResumes(res.data.resumes);
    } catch (error: any) {
      if (error.response?.status === 401) {
        router.push("/auth/login");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateResume() {
    try {
      setCreating(true);

      const res = await createResume();

      router.push(`/resume/${res.data._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(resumeId: string) {
    try {
      await deleteResume(resumeId);

      setResumes(
        resumes.filter((resume: any) => resume._id !== resumeId)
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <DashboardNavbar />

      {/* Top Action */}
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Resumes</h2>

        <button
          onClick={handleCreateResume}
          className="bg-orange-500 text-white px-5 py-3 rounded-xl"
        >
          {creating ? "Creating..." : "+ Create Resume"}
        </button>
      </div>

      {/* Resume Grid */}
      {resumes.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center mt-6">
          <h3 className="text-xl font-bold">
            No resumes yet
          </h3>
          <p className="text-gray-500 mt-2">
            Create your first resume
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {resumes.map((resume: any) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
