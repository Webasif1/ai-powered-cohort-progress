import { useEffect, useState } from 'react';
import { playSussy, playBruh } from '../../utils/Sounds.js';

const messages = [
  {
    title: "🟡 SUSSY ALERT",
    body: "We detected suspicious behaviour. You were trying to BUY things. That's kinda sus ngl. 📮",
    btn: "NOT IMPOSTER ✅", tiny: "ok i'm the imposter"
  },
  {
    title: "🎉 YOU'RE OUR 1,000,000th VISITOR!",
    body: "Claim your prize! (Prize: the honour of giving us your credit card number.)",
    btn: "CLAIM NOW 🤑", tiny: "no thanks (still charges you)"
  },
  {
    title: "📱 Download Our App!",
    body: "Get the same bad experience on mobile! Now with 3x the popups and half the screen space. 📲",
    btn: "INSTALL (4.8GB)", tiny: "i value my storage"
  },
  {
    title: "🍪 Cookie Preferences",
    body: "We use 847 types of cookies. Chocolate chip, oatmeal raisin, and 845 tracking ones. Yum! 😋",
    btn: "Accept All (Only Option)", tiny: "reject (also accepts)"
  },
  {
    title: "💌 Your Ex Viewed This Item",
    body: "Just thought you should know. Anyway would you like to buy it before they do? 😤",
    btn: "BUY IT FIRST 😤", tiny: "i'm mature actually"
  },
  {
    title: "🔒 Identity Verification",
    body: "To continue shopping, please confirm: Are you a human? (Robots also click yes, so this does nothing.)",
    btn: "I AM HUMAN 🤖", tiny: "beep boop"
  },
  {
    title: "⭐ Quick 1-Question Survey!",
    body: "You've been here 3 seconds. How would you rate your experience so far? (47 follow-up questions incoming)",
    btn: "Sure Why Not 🙂", tiny: "absolutely not"
  },
  {
    title: "🚨 PRICE DROP ALERT",
    body: "The price of everything in your cart just went UP. We meant to say that. Price Drop Alert means Price UP Alert here.",
    btn: "Thanks for the heads up 😭", tiny: "this is illegal"
  },
  {
    title: "🎁 CONGRATULATIONS!",
    body: "You've been selected for our exclusive loyalty program! Benefits include: more emails, more popups, and a fake gold card.",
    btn: "SIGN ME UP 🥳", tiny: "i want my life back"
  },
];

export default function EvilPopup() {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const show = () => {
      setPopup(messages[Math.floor(Math.random() * messages.length)]);
      playSussy();
    };
    const first = setTimeout(show, 5000);
    const interval = setInterval(show, 22000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!popup) return null;

  return (
    <div className="fixed inset-0 bg-black/65 z-[9999] flex items-center justify-center font-[Inter,system-ui,sans-serif]">
      <div 
        className="bg-white p-8 rounded-xl max-w-[420px] w-[90%] text-center shadow-2xl border-4 border-black"
        style={{ animation: 'popIn 0.3s cubic-bezier(0.68,-0.55,0.27,1.55)' }}
      >
        <h2 className="mb-4 text-xl font-bold">{popup.title}</h2>
        <p className="mb-6 text-gray-600 text-sm leading-relaxed">{popup.body}</p>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => { setPopup(null); playBruh(); }}
            className="px-6 py-3 bg-black text-white rounded-md cursor-pointer text-base font-bold w-full hover:bg-gray-800 transition-colors"
          >
            {popup.btn}
          </button>
          <button
            onClick={() => setPopup(null)}
            className="bg-transparent border-none text-gray-400 cursor-pointer text-[10px] hover:text-black transition-colors"
          >
            {popup.tiny}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.4) rotate(-5deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
