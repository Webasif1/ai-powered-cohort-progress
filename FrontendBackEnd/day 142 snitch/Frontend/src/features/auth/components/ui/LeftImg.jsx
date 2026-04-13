import React from 'react'

const LeftImg = () => {
  return (
    <>
      {/* ===== LEFT SIDE — Register IMAGE ===== */}
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
            Discover Your{" "}
            <span style={{ color: "#b8915a" }}>Glow.</span>
          </h2>
          <p
            className="text-base font-medium leading-relaxed"
            style={{ color: "rgba(30,22,15,0.72)" }}
          >
            Join a community of beauty lovers who trust Zewar for premium
            cosmetics, skincare rituals, and self-care essentials.
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
    </>
  )
}

export default LeftImg
