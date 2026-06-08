"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  let router = useRouter()
  const [formData, setFormData] = useState({})
  // console.log(formData);

  let handleChange = (e) => {
    let {name , value} = e.target
    setFormData({ ...formData, [name]: value })
  }

  let handleSubmit= async (e)=>{
    e.preventDefault()
  try{
    let res = await api.post('/api/auth/login', formData)
    // console.log(res);
    router.push('/home')
  }catch(error){
    console.log("error in login", error);
  }
}

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
            <label className="text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 px-3 border rounded-md bg-background"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-11 px-3 border rounded-md bg-background"
              onChange={handleChange}
              name="password"
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
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
