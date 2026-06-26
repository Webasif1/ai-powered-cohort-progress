"use client";

import { useRouter } from "next/navigation";

export default function ResumeCard({
  resume,
  onDelete,
}: any) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">
        {resume.title || "Untitled Resume"}
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Updated: {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => router.push(`/resume/${resume._id}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(resume._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
