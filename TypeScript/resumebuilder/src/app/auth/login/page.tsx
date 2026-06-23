"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { loginUser } from "@/apis/auth.api";
import { useAuth } from "@/context/auth.context";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await loginUser(form);

      if (res?.success) {
        setUser(res.data.user);
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      sideContent={
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600">
            Continue building your resume
          </p>
        </div>
      }
    >
      <div>
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Register
          </span>
        </p>
      </div>
    </AuthShell>
  );
}
