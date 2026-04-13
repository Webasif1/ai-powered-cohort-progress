const SocialButton = () => {
  return (
    <div className="mt-5">
      <button
        onClick={() => window.location.href = "/api/auth/google"}
        id="login-google-btn"
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200 cursor-pointer"
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
  )
}

export default SocialButton
