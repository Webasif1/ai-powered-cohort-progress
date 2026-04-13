import React from 'react'
import { Link } from 'react-router-dom';
import SocialButton from './ui/SocialButton';
import LeftImg from './ui/LeftImg';
import MobileLogo from './ui/MobileLogo';
import Divider from './ui/Divider';

const RegisterComponents = ({ handleSubmit, formData, handleChange, handleSellerChange, loading, showPassword, setShowPassword }) => {
  return (
    <>
      {/* ===== LEFT SIDE — Register IMAGE ===== */}
      <LeftImg />
      {/* ===== RIGHT SIDE — FORM ===== */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"
        style={{ background: "#fdf8f3" }}
      >
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <MobileLogo />

          {/* Heading */}
          <div className="mb-8">
            <h1
              className="text-3xl font-black mb-2 tracking-tight"
              style={{ color: "#1e160f" }}
            >
              Create your account
            </h1>
            <p className="text-sm" style={{ color: "#8a7360" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold transition-colors"
                style={{ color: "#b8915a" }}
                onMouseEnter={(e) => (e.target.style.color = "#8a6a35")}
                onMouseLeave={(e) => (e.target.style.color = "#b8915a")}
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
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#8a7360" }}
              >
                Full Name
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
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Doe"
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

            {/* Email */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#8a7360" }}
              >
                Email Address
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  style={{ color: "#c4a882" }}
                >
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
                  placeholder="jane@example.com"
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

            {/* Contact */}
            <div className="group">
              <label
                htmlFor="contact"
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#8a7360" }}
              >
                Contact Number
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  style={{ color: "#c4a882" }}
                >
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
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "#8a7360" }}
              >
                Password
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

            {/* isSeller Radio */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "#8a7360" }}
              >
                Account Type
              </label>
              <p className="text-[11px] mb-3" style={{ color: "#a08872" }}>
                Note: Check 'Seller' if you want to become a seller.
              </p>
              <div className="flex gap-4">
                {/* Buyer */}
                <label
                  className="flex items-center gap-2 cursor-pointer select-none"
                  htmlFor="isSeller-buyer"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      id="isSeller-buyer"
                      type="radio"
                      name="isSeller"
                      checked={formData.isSeller === false}
                      onChange={() => handleSellerChange(false)}
                      className="sr-only"
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: formData.isSeller === false ? "#b8915a" : "#c4a882",
                        background: formData.isSeller === false ? "#b8915a" : "transparent",
                      }}
                    >
                      {formData.isSeller === false && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#3d2c1e" }}>
                    Buyer
                  </span>
                </label>

                {/* Seller */}
                <label
                  className="flex items-center gap-2 cursor-pointer select-none"
                  htmlFor="isSeller-seller"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      id="isSeller-seller"
                      type="radio"
                      name="isSeller"
                      checked={formData.isSeller === true}
                      onChange={() => handleSellerChange(true)}
                      className="sr-only"
                    />
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: formData.isSeller === true ? "#b8915a" : "#c4a882",
                        background: formData.isSeller === true ? "#b8915a" : "transparent",
                      }}
                    >
                      {formData.isSeller === true && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#3d2c1e" }}>
                    Seller
                  </span>
                </label>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs leading-relaxed" style={{ color: "#a08872" }}>
              By creating an account, you agree to our{" "}
              <span
                className="font-medium cursor-pointer transition-colors"
                style={{ color: "#b8915a" }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                className="font-medium cursor-pointer transition-colors"
                style={{ color: "#b8915a" }}
              >
                Privacy Policy
              </span>
              .
            </p>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full font-black text-sm uppercase tracking-widest rounded-xl py-4 transition-all duration-200 flex items-center justify-center gap-2"
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <Divider />

          {/* Social buttons — Google only */}
          <SocialButton />
        </div>
      </div>
    </>
  )
}

export default RegisterComponents
