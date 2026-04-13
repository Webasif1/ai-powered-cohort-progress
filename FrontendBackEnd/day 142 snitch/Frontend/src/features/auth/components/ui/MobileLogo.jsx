import React from 'react'

const MobileLogo = () => {
  return (
    <>
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
    </>
  )
}

export default MobileLogo
