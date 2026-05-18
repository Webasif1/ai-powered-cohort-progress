import React from 'react';

export default function ChaosMessage({ message, subtext }) {
  return (
    <div className="mb-6 p-4 border-2 border-dashed border-white text-xs text-center font-bold">
      <p className="animate-pulse">{message}</p>
      {subtext && <p className="mt-2 text-[10px] opacity-70">{subtext}</p>}
    </div>
  );
}
