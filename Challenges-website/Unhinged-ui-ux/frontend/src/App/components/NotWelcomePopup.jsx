import { useState, useEffect } from 'react';
import { playWompWomp } from '../../utils/Sounds.js';
import { addAnger } from './AngerMeter.jsx';

export default function NotWelcomePopup() {
  const [show, setShow] = useState(true);

  // We don't want to use useEffect for showing, it starts true.
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center font-[Inter,system-ui,sans-serif]">
      <div 
        className="bg-white p-10 rounded-xl max-w-[450px] w-[90%] text-center shadow-2xl border-4 border-black relative overflow-hidden"
        style={{ animation: 'dropIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
      >
        <div className="text-6xl mb-4 animate-bounce">😩</div>
        <h2 className="mb-2 text-2xl font-black uppercase tracking-tight">Ugh... Another Visitor? 🙄</h2>
        <p className="mb-8 text-gray-600 text-sm leading-relaxed font-medium">
          Look, we were having a really peaceful day until your IP address showed up. Our servers are tired, our engineers are crying, and frankly, we don't need your money that badly right now. Have you considered taking a nap instead? 🛌💤
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setShow(false);
              playWompWomp();
              addAnger(10);
            }}
            className="px-6 py-4 bg-black text-white rounded-md cursor-pointer text-sm font-bold w-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            I'm staying, deal with it 😤
          </button>
          
          <button
            onClick={() => {
              window.location.href = "https://www.google.com";
            }}
            className="px-6 py-3 bg-white text-black border-2 border-gray-200 rounded-md cursor-pointer text-xs font-bold w-full hover:border-black transition-colors"
          >
            Understandable, have a nice day ✌️
          </button>
        </div>
      </div>
      <style>{`
        @keyframes dropIn {
          0% { transform: translateY(-100vh) scale(0.5) rotate(15deg); opacity: 0; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
