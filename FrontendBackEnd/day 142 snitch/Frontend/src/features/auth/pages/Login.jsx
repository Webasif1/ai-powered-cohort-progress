import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const { handelLogin } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail = formData.identifier.includes("@");
    await handelLogin({
      email: isEmail ? formData.identifier : undefined,
      contact: !isEmail ? formData.identifier : undefined,
      password: formData.password,
    });
    navigate("/");
  };

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen h-100 flex" style={{ background: "#fdf8f3" }}>
      {/* ===== LEFT SIDE — HERO IMAGE ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background image */}
        <img
          src="/register-hero.png"
          alt="Zewar cosmetics hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(253,248,243,0.1) 0%, rgba(253,248,243,0.5) 50%, #fdf8f3 100%)",
          }}
        />

        {/* Brand badge */}
        <div className="absolute top-10 left-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: "#d4b896",
                boxShadow: "0 4px 14px rgba(212,184,150,0.35)",
              }}
            >
              <span
                className="font-black text-lg leading-none"
                style={{ color: "#1e160f" }}
              >
                Z
              </span>
            </div>
            <span
              className="font-black text-2xl tracking-widest uppercase"
              style={{ color: "#1e160f" }}
            >
              Zewar
            </span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-14 left-10 right-10">
          <h2
            className="text-4xl font-black leading-tight mb-3"
            style={{ color: "#1e160f" }}
          >
            Welcome Back to <span style={{ color: "#b8915a" }}>Zewar.</span>
          </h2>
          <p
            className="text-base font-medium leading-relaxed"
            style={{ color: "rgba(30,22,15,0.72)" }}
          >
            Your premium cosmetics, skincare rituals, and self-care essentials await. Sign in to continue your journey.
          </p>
          {/* trust badges */}
          <div className="flex items-center gap-6 mt-6">
            {["100% Authentic", "Cruelty Free", "Free Delivery"].map(
              (badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#d4b896" }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "rgba(30,22,15,0.82)" }}
                  >
                    {badge}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDE — FORM ===== */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        style={{ background: "#fdf8f3" }}
      >
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "#d4b896" }}
            >
              <span
                className="font-black text-lg"
                style={{ color: "#1e160f" }}
              >
                Z
              </span>
            </div>
            <span
              className="font-black text-xl tracking-widest uppercase"
              style={{ color: "#1e160f" }}
            >
              Zewar
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black mb-2 tracking-tight"
              style={{ color: "#1e160f" }}
            >
              Sign in to your account
            </h1>
            <p className="text-sm" style={{ color: "#8a7360" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold transition-colors"
                style={{ color: "#b8915a" }}
                onMouseEnter={(e) => (e.target.style.color = "#8a6a35")}
                onMouseLeave={(e) => (e.target.style.color = "#b8915a")}
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Contact Number */}
            <div className="group">
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#8a7360" }}
              >
                Email or Contact Number
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors"
                  style={{ color: "#c4a882" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="jane@example.com or +880 1XX XXX XXXX"
                  className="w-full rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f5ede4",
                    border: "1.5px solid #e8d5c0",
                    color: "#1e160f",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#b8915a";
                    e.target.style.boxShadow = "0 0 0 3px rgba(184,145,90,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8d5c0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest mb-2 flex justify-between"
                style={{ color: "#8a7360" }}
              >
                <span>Password</span>
                <span 
                  className="cursor-pointer transition-colors normal-case" 
                  style={{ color: "#b8915a" }}
                  onMouseEnter={(e) => (e.target.style.color = "#8a6a35")}
                  onMouseLeave={(e) => (e.target.style.color = "#b8915a")}
                >
                  Forgot password?
                </span>
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  style={{ color: "#c4a882" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none transition-all duration-200"
                  style={{
                    background: "#f5ede4",
                    border: "1.5px solid #e8d5c0",
                    color: "#1e160f",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#b8915a";
                    e.target.style.boxShadow = "0 0 0 3px rgba(184,145,90,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8d5c0";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center transition-colors"
                  style={{ color: "#c4a882" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#b8915a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#c4a882")}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full font-black text-sm uppercase tracking-widest rounded-xl py-4 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
              style={{
                background: loading ? "#d4b896" : "#b8915a",
                color: "#fdf8f3",
                boxShadow: "0 4px 18px rgba(184,145,90,0.30)",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#a07848";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "#b8915a";
              }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px" style={{ background: "#e8d5c0" }} />
            <span
              className="text-xs font-medium"
              style={{ color: "#c4a882" }}
            >
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px" style={{ background: "#e8d5c0" }} />
          </div>

          {/* Social buttons — Google only */}
          <div className="mt-5">
            <button
              id="login-google-btn"
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200"
              style={{
                background: "#f5ede4",
                border: "1.5px solid #e8d5c0",
                color: "#3d2c1e",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#b8915a";
                e.currentTarget.style.background = "#efe5d8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e8d5c0";
                e.currentTarget.style.background = "#f5ede4";
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.777L1.24 17.35C3.198 21.302 7.27 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                <path fill="#FBBC05" d="M5.277 14.314c-.221-.666-.34-1.377-.34-2.314s.12-1.649.34-2.314L1.24 6.65C.406 8.33 0 10.13 0 12s.406 3.67 1.24 5.35l4.037-3.036Z" />
              </svg>
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
