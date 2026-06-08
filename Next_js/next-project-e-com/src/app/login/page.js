"use client";

import { useAuth } from "@/context/authContext";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { hydrateUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/login", formData);

      await hydrateUser();
      router.replace("/home");
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md border rounded-xl p-8 shadow-sm bg-card">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="w-full h-11 px-3 border rounded-md bg-background"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              className="w-full h-11 px-3 border rounded-md bg-background"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-primary text-primary-foreground rounded-md font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don not have an account?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
