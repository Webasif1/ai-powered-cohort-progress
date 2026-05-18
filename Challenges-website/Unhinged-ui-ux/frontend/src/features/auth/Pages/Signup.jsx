import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '../hooks/useAuth';
import { useAuth } from '../state/authContext';
import ChaosMessage from '../Components/ChaosMessage';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignup, loading } = useSignup();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSignup({ name, email, password: '12345678' });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-md w-full bg-black border-4 border-white p-8 relative z-10 shadow-[-8px_8px_0_0_#fff] transform rotate-1 hover:-rotate-1 transition-transform duration-300">
        <h1 className="text-4xl font-black mb-6 uppercase tracking-tighter text-center">
          Join the <span className="text-transparent bg-clip-text bg-white invert mix-blend-difference">Chaos</span>
        </h1>

        <ChaosMessage
          message="OUR PAGE IS THE BEST! WE ARE SO TRUSTED! BLAZING FAST! AND MORE AND MORE AND MORE AND MORE..."
          subtext="We will absolutely sell all your information to the highest bidder."
        />

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold uppercase mb-1">Fake Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black text-white border-2 border-white p-3 outline-none focus:bg-white focus:text-black transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-1">Real Email (we will spam you)</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black text-white border-2 border-white p-3 outline-none focus:bg-white focus:text-black transition-all"
              placeholder="victim@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase mb-1">Create a Password (we will ignore it)</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black text-white border-2 border-white p-3 outline-none focus:bg-white focus:text-black transition-all font-sans"
              placeholder="super_secret_password"
            />
            <p className="text-[10px] mt-1 opacity-60">Seriously, pick whatever. It doesn't matter.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-white text-black font-black uppercase py-4 text-xl hover:bg-black hover:text-white border-2 border-transparent hover:border-white transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_0_0_#fff] active:translate-y-0 active:shadow-none"
          >
            {loading ? 'SELLING DATA...' : 'SELL MY SOUL'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm border-t-2 border-white pt-4">
          <p>Already a victim? <Link to="/login" className="underline hover:bg-white hover:text-black font-bold">Login here.</Link></p>
        </div>
      </div>
    </div>
  );
}
