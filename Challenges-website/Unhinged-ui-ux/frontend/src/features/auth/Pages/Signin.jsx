import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '../hooks/useAuth';
import { useAuth } from '../state/authContext';
import ChaosMessage from '../Components/ChaosMessage';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const { handleSignin, loading } = useSignup();
  const { user } = useAuth();
  const navigate = useNavigate();
  const audioRef = useRef(new Audio('/sounds/among-us.mp3'));

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== '12345678') {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setShowPopup(true);
        audioRef.current.play().catch(e => console.log('Audio play failed', e));
      } else {
        alert(`Wrong password! You MUST use the universal secure password. Attempt ${newAttempts}/3`);
      }
      return;
    }

    await handleSignin({ email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-md w-full bg-black border-4 border-white p-8 relative z-10 shadow-[8px_8px_0_0_#fff] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        <h1 className="text-4xl font-black mb-6 uppercase tracking-tighter text-center">
          <span className="inline-block animate-bounce">S</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>i</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>g</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>n</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>i</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.5s'}}>n</span>
        </h1>
        
        <ChaosMessage 
          message="WE ARE THE BEST! TRUSTED BY 100 BILLION USERS! FASTEST LOGIN IN THE UNIVERSE! AND MORE AND MORE!"
          subtext="100% SECURE. WE NEVER SELL YOUR DATA (WE GIVE IT AWAY FOR FREE)."
        />

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Your pathetic email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black text-white border-2 border-white p-3 outline-none focus:bg-white focus:text-black transition-colors"
              placeholder="loser@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-2">Guess the Password (Hint: it's a very common 8-digit sequence!)</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black text-white border-2 border-white p-3 outline-none focus:bg-white focus:text-black transition-colors font-sans"
              placeholder="Guess the secret combination..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-black uppercase py-4 text-xl hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-all transform hover:scale-105 active:scale-95"
          >
            {loading ? 'HACKING MAINFRAME...' : 'LET ME IN'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm border-t-2 border-white pt-4">
          <p>Don't have an account? <Link to="/signup" className="underline hover:bg-white hover:text-black font-bold">Create one, coward.</Link></p>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black p-8 max-w-sm text-center border-8 border-black shadow-[16px_16px_0_0_#fff] animate-bounce">
            <h2 className="text-3xl font-black uppercase mb-4 text-red-600">IMPOSTER DETECTED!</h2>
            <p className="font-bold mb-4">You failed 3 times! The universal secure password is <strong>12345678</strong>. Are you even trying?!</p>
            <button 
              onClick={() => {
                setShowPopup(false);
                setAttempts(0);
              }}
              className="bg-black text-white px-6 py-2 font-black uppercase hover:scale-110 transition-transform"
            >
              I accept my shame
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
