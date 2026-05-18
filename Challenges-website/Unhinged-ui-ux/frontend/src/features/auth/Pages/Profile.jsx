import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
      
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white text-black p-8 max-w-md w-full text-center border-8 border-black shadow-[16px_16px_0_0_#fff] transform hover:scale-105 transition-transform">
            <h2 className="text-4xl font-black uppercase mb-4 text-red-600 animate-pulse">
              WOAH THERE, STALKER!
            </h2>
            <p className="font-bold mb-6 text-lg">
              Did you really think we would let you see your profile? We sold that data 5 minutes ago! It's gone. Poof. Buy it back if you want it!
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-6 py-4 font-black text-xl uppercase hover:bg-red-600 transition-colors border-4 border-transparent hover:border-black"
              >
                Go Back to Shopping
              </button>
              <button 
                onClick={() => {
                  alert("ERROR: 402 Payment Required. We accept dogecoin and your firstborn child.");
                }}
                className="bg-transparent text-black px-6 py-2 font-bold uppercase underline hover:text-red-600 transition-colors text-sm"
              >
                Let me see it anyway
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Background content barely visible */}
      <div className="z-10 text-center opacity-10 pointer-events-none select-none">
        <h1 className="text-9xl font-black mb-4">PROFILE</h1>
        <p className="text-4xl">[REDACTED]</p>
      </div>
    </div>
  );
}
