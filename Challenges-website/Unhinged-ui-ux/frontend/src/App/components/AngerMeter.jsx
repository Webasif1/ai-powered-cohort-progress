import { useState, useEffect } from 'react';

let _add = null;
export const addAnger = (n) => { if (_add) _add(n); };

const LEVELS = [
  { max: 20, label: '😐 Calm', color: '#000000', border: 'border-black' },
  { max: 40, label: '🤨 Suspicious', color: '#333333', border: 'border-gray-800' },
  { max: 60, label: '😤 Annoyed', color: '#555555', border: 'border-gray-600' },
  { max: 80, label: '😡 Frustrated', color: '#777777', border: 'border-gray-500' },
  { max: 95, label: '🤬 FULL RAGE', color: '#999999', border: 'border-gray-400' },
  { max: 100, label: '💀 TOUCH GRASS', color: '#cccccc', border: 'border-gray-300' },
];

const ROASTS = [
  "skill issue tbh 💀",
  "L + ratio + no free shipping 🤡",
  "you fell off fr fr 📉",
  "this ain't it chief 😬",
  "not the gigachad move 💀",
  "bro said 'I got this' 😭",
];

export default function AngerMeter() {
  const [anger, setAnger] = useState(0);
  const [roast, setRoast] = useState('');
  const [visible, setVisible] = useState(true);

  _add = (n) => {
    setAnger(prev => {
      const next = Math.min(100, prev + n);
      if (next >= 95) setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)]);
      return next;
    });
  };

  useEffect(() => {
    const t = setInterval(() => setAnger(p => Math.max(0, p - 0.5)), 600);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;
  const level = LEVELS.find(l => anger <= l.max) || LEVELS[LEVELS.length - 1];

  return (
    <div className={`fixed top-[70px] right-4 w-[165px] bg-white border-2 ${level.border} rounded-xl p-3 shadow-lg z-[7000] font-[Inter,system-ui,sans-serif] transition-colors duration-400`}>
      <div className="flex justify-between mb-1.5">
        <span className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider">Frustration Meter™</span>
        <button onClick={() => setVisible(false)} className="bg-transparent border-none cursor-pointer text-[10px] text-gray-300 p-0 leading-none hover:text-black transition-colors">✕</button>
      </div>
      <div className="bg-gray-100 rounded-full h-2 overflow-hidden mb-1.5 border border-gray-200">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${anger}%`, background: level.color }}
        />
      </div>
      <div className="text-[0.72rem] font-bold text-center uppercase tracking-wide transition-colors duration-400" style={{ color: level.color }}>
        {level.label}
      </div>
      {anger >= 95 && roast && (
        <div className="text-[0.62rem] text-black text-center mt-1 font-bold bg-gray-100 py-1 rounded">
          {roast}
        </div>
      )}
    </div>
  );
}
