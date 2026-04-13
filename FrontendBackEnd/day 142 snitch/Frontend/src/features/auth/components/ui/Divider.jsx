import React from 'react'

const Divider = () => {
  return (
    <>
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
    </>
  )
}

export default Divider
