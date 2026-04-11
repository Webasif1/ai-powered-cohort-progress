import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { handelRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handelRegister(formData);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* ===== LEFT SIDE — HERO IMAGE ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background image */}
        <img
          src="/register-hero.png"
          alt="Snitch e-commerce hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Brand badge */}
        <div className="absolute top-10 left-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-400/30">
              <span className="text-black font-black text-lg leading-none">S</span>
            </div>
            <span className="text-white font-black text-2xl tracking-widest uppercase">
              Snitch
            </span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="absolute bottom-14 left-10 right-10">
          <h2 className="text-white text-4xl font-black leading-tight mb-3">
            Shop the <span className="text-yellow-400">Latest</span> Drops.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Join thousands of shoppers getting exclusive deals, early access
            and premium finds — all in one place.
          </p>
          {/* trust badges */}
          <div className="flex items-center gap-6 mt-6">
            {["50K+ Brands", "Free Delivery", "Easy Returns"].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-white/80 text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIGHT SIDE — FORM ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-zinc-950">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-lg">S</span>
            </div>
            <span className="text-white font-black text-xl tracking-widest uppercase">Snitch</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-white text-3xl font-black mb-2 tracking-tight">
              Create your account
            </h1>
            <p className="text-zinc-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div className="group">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 group-focus-within:text-yellow-400 transition-colors pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 group-focus-within:text-yellow-400 transition-colors pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="group">
              <label
                htmlFor="contact"
                className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2"
              >
                Contact Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 group-focus-within:text-yellow-400 transition-colors pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="+880 1XX XXX XXXX"
                  className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 group-focus-within:text-yellow-400 transition-colors pointer-events-none">
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
                  className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-yellow-400 transition-colors"
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

            {/* Terms */}
            <p className="text-zinc-500 text-xs leading-relaxed">
              By creating an account, you agree to our{" "}
              <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors">
                Privacy Policy
              </span>
              .
            </p>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-black font-black text-sm uppercase tracking-widest rounded-xl py-4 transition-all duration-200 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3 mt-5">
            {["Google", "Facebook"].map((provider) => (
              <button
                key={provider}
                id={`register-${provider.toLowerCase()}-btn`}
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-yellow-400/40 hover:bg-zinc-800 text-zinc-300 text-sm font-medium rounded-xl py-3 transition-all duration-200"
              >
                {provider === "Google" ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                    <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.777L1.24 17.35C3.198 21.302 7.27 24 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                    <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                    <path fill="#FBBC05" d="M5.277 14.314c-.221-.666-.34-1.377-.34-2.314s.12-1.649.34-2.314L1.24 6.65C.406 8.33 0 10.13 0 12s.406 3.67 1.24 5.35l4.037-3.036Z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                )}
                {provider}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
