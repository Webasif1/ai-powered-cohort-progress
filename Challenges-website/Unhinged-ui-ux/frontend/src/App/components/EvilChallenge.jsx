import { useState, useEffect } from 'react';
import { playBruh, playEmotionalDamage } from '../../utils/Sounds.js';
import { triggerReaction } from './FloatingReactions.jsx';
import { addAnger } from './AngerMeter.jsx';

const CHALLENGES = [
  {
    id: 1,
    title: "🎯 Type Challenge for 25% OFF!",
    teaser: "Type 'REGRETAIL' backwards — NO BACKSPACE — for 25% discount!",
    type: 'text',
    answer: 'LIATERGER',
    noBackspace: true,
    placeholder: "Type LIATERGER here (no going back lol)",
    betrayal: "Correct! 25% OFF applied... to our profits. Not yours. 💀",
    emoji: "🤡",
  },
  {
    id: 2,
    title: "👆 Click 25 Times for FREE SHIPPING!",
    teaser: "Click the button 25 times and shipping is on us!",
    type: 'clicks',
    target: 25,
    betrayal: "WOW. 25 clicks. Your dedication is unmatched. Your free shipping is not. Womp womp. 😭",
    emoji: "💀",
  },
  {
    id: 3,
    title: "🧮 Solve for 50% OFF!",
    teaser: "What is (7 × 8) - 4 + 13? Answer correctly = 50% off everything!",
    type: 'text',
    answer: '65',
    noBackspace: false,
    placeholder: "Type your answer...",
    betrayal: "Correct! But our system uses different math. The answer was 47. Always has been. 🌍🔫",
    emoji: "🤓",
  },
  {
    id: 4,
    title: "🕵️ Find the Secret Promo Code!",
    teaser: "There's a secret promo code hidden somewhere on this page. Find it for 40% OFF!",
    type: 'promo',
    placeholder: "Enter the secret code...",
    betrayal: "LMAOOO there is no code. There never was. We just wanted to watch you look. 🔍😂",
    emoji: "🗿",
  },
  {
    id: 5,
    title: "⏱️ 10-Second Challenge for 15% OFF!",
    teaser: "Press START, wait EXACTLY 10 seconds (no counting!), press STOP. Win 15% off!",
    type: 'timer',
    target: 10000,
    betrayal: "You were {diff}ms off. The system requires EXACTLY 10.000 seconds. So close. So very close. 😈",
    emoji: "⏰",
  },
];

const ROASTS = [
  "User.exe has crashed 💻",
  "Therapist bookings up 400% in your area 📞",
  "That vein on your forehead, bestie 😬",
  "Our servers run on your rage ⚡",
  "Not the sigma move fr 📉",
  "L + ratio + you got trolled 🤡",
  "Skill issue + no cap + womp womp 💀",
];

export default function EvilChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [input, setInput] = useState('');
  const [clicks, setClicks] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [betrayalMsg, setBetrayalMsg] = useState('');
  const [roast, setRoast] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setChallenge(CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]);
      setShow(true);
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const betray = (msg) => {
    setBetrayalMsg(msg);
    setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)]);
    setPhase('betrayed');
    playEmotionalDamage(); // one sound — emotional damage on task complete
    triggerReaction('betrayal');
    addAnger(25);
  };

  const handleTextSubmit = () => {
    if (input.trim().toUpperCase() === challenge.answer) {
      betray(challenge.betrayal);
    } else {
      playBruh();
      addAnger(8);
      triggerReaction('wrongAnswer');
      setInput('');
    }
  };

  const handleClick = () => {
    const n = clicks + 1;
    setClicks(n);
    addAnger(2);
    if (n >= challenge.target) betray(challenge.betrayal);
  };

  const handleTimerStop = () => {
    if (!timerStart) return;
    const diff = Math.abs(Date.now() - timerStart - challenge.target);
    betray(challenge.betrayal.replace('{diff}', diff));
  };

  const handlePromo = () => {
    if (input.trim().length > 0) betray(challenge.betrayal);
    else { playBruh(); addAnger(5); }
  };

  const reset = () => {
    const next = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setChallenge(next);
    setPhase('idle');
    setInput('');
    setClicks(0);
    setTimerStart(null);
  };

  if (!show || !challenge) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[300px] bg-white border-2 border-black rounded-xl overflow-hidden z-[8000] shadow-2xl font-[Inter,system-ui,sans-serif]">
      <div className="bg-black text-white px-4 py-3 flex justify-between items-center text-sm font-bold">
        <span>{challenge.title}</span>
        <button onClick={() => setShow(false)} className="bg-transparent border-none text-gray-400 cursor-pointer text-[10px] hover:text-white transition-colors">✕</button>
      </div>
      <div className="p-4">

        {phase === 'idle' && (
          <>
            <p className="text-[0.82rem] text-gray-700 mb-3 leading-relaxed font-medium">{challenge.teaser}</p>
            <button className="w-full py-2 bg-black text-white rounded-md cursor-pointer font-bold text-sm mt-2 hover:bg-gray-800 transition-colors" onClick={() => setPhase('active')}>🎮 Accept Challenge!</button>
          </>
        )}

        {phase === 'active' && (
          <>
            {/* Text input */}
            {(challenge.type === 'text' || challenge.type === 'promo') && (
              <>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (challenge.noBackspace && e.key === 'Backspace') {
                      e.preventDefault(); playBruh(); addAnger(6); triggerReaction('wrongAnswer');
                    }
                  }}
                  placeholder={challenge.placeholder}
                  className="w-full p-2 rounded border-2 border-gray-200 text-sm mt-1 mb-2 outline-none focus:border-black transition-colors"
                />
                {challenge.noBackspace && (
                  <small className="text-black font-semibold text-[0.7rem] block mb-2 bg-gray-100 p-1.5 rounded text-center">⚠️ Backspace = instant buzzer. We're serious.</small>
                )}
                <button
                  className="w-full py-2 bg-black text-white rounded-md cursor-pointer font-bold text-sm hover:bg-gray-800 transition-colors"
                  onClick={challenge.type === 'promo' ? handlePromo : handleTextSubmit}
                >
                  Submit ✅
                </button>
              </>
            )}

            {/* Click counter */}
            {challenge.type === 'clicks' && (
              <>
                <div className="text-center text-2xl font-black text-black my-2">
                  {clicks} <span className="text-gray-400 text-lg">/ {challenge.target}</span>
                </div>
                <button className="w-full py-2 bg-black text-white rounded-md cursor-pointer font-bold text-sm hover:bg-gray-800 transition-colors" onClick={handleClick}>
                  👆 CLICK ({challenge.target - clicks} left)
                </button>
              </>
            )}

            {/* Timer */}
            {challenge.type === 'timer' && (
              <>
                <div className="flex gap-2 mt-2">
                  <button
                    className="flex-1 py-2 bg-black text-white rounded-md cursor-pointer font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setTimerStart(Date.now())}
                    disabled={!!timerStart}
                  >▶ START</button>
                  <button
                    className="flex-1 py-2 bg-white text-black border-2 border-black rounded-md cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleTimerStop}
                    disabled={!timerStart}
                  >■ STOP</button>
                </div>
                {timerStart && <p className="text-[0.75rem] text-black font-bold text-center mt-2 animate-pulse">⏱️ Running... don't count! 👀</p>}
              </>
            )}
          </>
        )}

        {phase === 'betrayed' && (
          <>
            <div className="text-center text-4xl my-2">{challenge.emoji}</div>
            <p className="text-[0.85rem] text-black font-bold leading-relaxed mb-1 text-center">{betrayalMsg}</p>
            <p className="text-[0.75rem] text-gray-500 italic mb-4 text-center">{roast}</p>
            <button className="w-full py-2 bg-white text-black border-2 border-black rounded-md cursor-pointer font-bold text-sm hover:bg-gray-100 transition-colors" onClick={reset}>😤 Try Another Challenge</button>
          </>
        )}
      </div>
    </div>
  );
}
