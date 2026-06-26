"use client";

import { useAuth } from "@/context/auth.context";

export default function DashboardNavbar() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back, {user?.name}
        </p>
      </div>
    </div>
  );
}
