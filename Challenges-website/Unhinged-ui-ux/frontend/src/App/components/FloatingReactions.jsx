import { useState, useCallback } from 'react';

let _trigger = null;
export const triggerReaction = (type) => { if (_trigger) _trigger(type); };

const SETS = {
  runAway: ['😤', '💨', '🤬', '😡', '💀', '😩', '🫠'],
  addToCart: ['🛒', '💸', '😢', '🤑', '💀', '😭', '🤯'],
  popup: ['😱', '🙄', '💀', '😤', '🤦', '😭', '🟡'],
  betrayal: ['😭', '💔', '🤡', '😤', '💀', '😂', '🥲'],
  wrongAnswer: ['❌', '😬', '💀', '😤', '🤦', '😩', '💀'],
  priceUp: ['📈', '💸', '😱', '🤑', '😢', '💀', '😤'],
  remove: ['🗑️', '😢', '👋', '💀', '🤧', '😭', '🫠'],
};

export default function FloatingReactions() {
  const [particles, setParticles] = useState([]);

  _trigger = useCallback((type) => {
    const emojis = SETS[type] || SETS.popup;
    const batch = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 40 + 20,
      dx: (Math.random() - 0.5) * 140,
      dy: -(Math.random() * 160 + 80),
      rot: (Math.random() - 0.5) * 400,
    }));
    setParticles(p => [...p, ...batch]);
    setTimeout(() => setParticles(p => p.filter(x => !batch.find(b => b.id === x.id))), 1600);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99998 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed',
          left: `${p.x}%`, top: `${p.y}%`,
          fontSize: '1.8rem', userSelect: 'none',
          '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--rot': `${p.rot}deg`,
          animation: 'burst 1.5s ease-out forwards',
        }}>
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes burst {
          0%   { opacity:1; transform:translate(0,0) rotate(0) scale(1); }
          100% { opacity:0; transform:translate(var(--dx),var(--dy)) rotate(var(--rot)) scale(0.2); }
        }
      `}</style>
    </div>
  );
}
