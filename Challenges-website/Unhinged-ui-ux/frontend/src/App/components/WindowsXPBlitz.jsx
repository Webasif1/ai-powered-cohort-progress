import { useEffect, useState, useRef, useCallback } from 'react';
import { playWindowsXPSong, stopWindowsXPSong } from '../../utils/Sounds.js';

const XP_ERRORS = [
  { title: 'Fatal Error',         icon: '🚫', msg: 'Your browser has performed an illegal operation and will be shut down.\n\nYour wallet has been notified.' },
  { title: 'Critical Warning',    icon: '⚠️',  msg: 'REGRETAIL.EXE has caused a divide by zero error in your bank account.' },
  { title: 'Payment Processor',   icon: '💸', msg: 'Transaction complete. We have taken the liberty of rounding up to the nearest $100.' },
  { title: 'Virus Detected',      icon: '🦠', msg: 'A virus called "common sense" was detected and removed for your convenience.' },
  { title: 'Security Alert',      icon: '🔒', msg: 'Your password "password123" has been verified. Very secure. We\'re proud of you.' },
  { title: 'System Update',       icon: '🔄', msg: 'Your PC requires 47 updates to continue shopping. Estimated time: 2–6 business eternities.' },
  { title: 'Low Disk Space',      icon: '💾', msg: 'Your hard drive is almost full. We recommend deleting your savings to free up space.' },
  { title: 'Printer Not Found',   icon: '🖨️', msg: 'No printers found. Your receipt has been lost forever. This is fine.' },
  { title: 'Illegal Operation',   icon: '👮', msg: 'You tried to close a popup. That is illegal in 14 countries including this website.' },
  { title: 'Memory Error',        icon: '🧠', msg: 'Insufficient memory to remember your order. Please add to cart again. And again.' },
  { title: 'Network Timeout',     icon: '📡', msg: 'Connection timed out. Your items are still in the cart. The cart is in flames. 🔥' },
  { title: 'Stack Overflow',      icon: '📚', msg: 'Too many popups. Spawning more popups to resolve the popup overflow error.' },
];

// Clamp a random spawn position inside the viewport
const randomPos = () => ({
  x: Math.random() * Math.max(window.innerWidth - 360, 20),
  y: Math.random() * Math.max(window.innerHeight - 220, 20),
});

let idCounter = 0;

export default function WindowsXPBlitz() {
  const [dialogs, setDialogs] = useState([]);
  const [dismissed, setDismissed] = useState(false);
  const spawnRef = useRef(null);
  const dragRef = useRef({}); // { id: { startX, startY, origX, origY } }

  // Spawn 8 dialogs staggered over ~3 seconds
  useEffect(() => {
    playWindowsXPSong();
    const TOTAL = 8;
    const timers = [];
    for (let i = 0; i < TOTAL; i++) {
      const t = setTimeout(() => {
        const err = XP_ERRORS[Math.floor(Math.random() * XP_ERRORS.length)];
        const pos = randomPos();
        setDialogs(prev => [...prev, { id: ++idCounter, ...err, x: pos.x, y: pos.y }]);
      }, i * 380);
      timers.push(t);
    }
    spawnRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, []);

  // Stop song when all closed
  useEffect(() => {
    if (dismissed) stopWindowsXPSong();
  }, [dismissed]);

  const close = useCallback((id) => {
    setDialogs(prev => {
      const next = prev.filter(d => d.id !== id);
      if (next.length === 0) setDismissed(true);
      return next;
    });
  }, []);

  const closeAll = () => {
    setDialogs([]);
    setDismissed(true);
  };

  // --- Drag logic ---
  const onMouseDown = (e, id) => {
    if (e.target.closest('button')) return; // don't drag on button clicks
    const dialog = dialogs.find(d => d.id === id);
    if (!dialog) return;
    dragRef.current[id] = { startX: e.clientX, startY: e.clientY, origX: dialog.x, origY: dialog.y };

    const onMove = (mv) => {
      const dx = mv.clientX - dragRef.current[id].startX;
      const dy = mv.clientY - dragRef.current[id].startY;
      setDialogs(prev => prev.map(d =>
        d.id === id ? { ...d, x: dragRef.current[id].origX + dx, y: dragRef.current[id].origY + dy } : d
      ));
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  if (dialogs.length === 0) return null;

  return (
    <>
      {/* Dim overlay with "close all" escape hatch */}
      {dialogs.length >= 4 && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: '1.5rem', pointerEvents: 'none',
          }}
        >
          <button
            onClick={closeAll}
            style={{
              pointerEvents: 'all',
              background: '#c0c0c0', border: '2px solid #888',
              borderRadius: '2px', padding: '4px 16px',
              fontFamily: 'Tahoma, Arial, sans-serif', fontSize: '11px',
              cursor: 'pointer', boxShadow: '2px 2px 0 #fff inset, -2px -2px 0 #555 inset',
              color: '#000',
            }}
          >
            Close All Errors ({dialogs.length})
          </button>
        </div>
      )}

      {dialogs.map((d, idx) => (
        <div
          key={d.id}
          onMouseDown={(e) => onMouseDown(e, d.id)}
          style={{
            position: 'fixed',
            left: d.x,
            top: d.y,
            zIndex: 10001 + idx,
            width: '340px',
            userSelect: 'none',
            cursor: 'default',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '11px',
            boxShadow: '2px 2px 6px rgba(0,0,0,0.6), inset 1px 1px 0 #fff',
            border: '2px solid #0054a0',
            animation: 'xpPopIn 0.15s ease-out',
          }}
        >
          {/* Title bar */}
          <div style={{
            background: 'linear-gradient(to bottom, #0a87e6 0%, #0054a0 100%)',
            padding: '3px 4px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'move',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fff', fontWeight: 'bold', fontSize: '11px' }}>
              <span style={{ fontSize: '12px' }}>💻</span>
              {d.title}
            </div>
            {/* Fake min/max + real close */}
            <div style={{ display: 'flex', gap: '2px' }}>
              {['─', '□'].map((lbl, i) => (
                <button key={i} style={{
                  width: '16px', height: '14px', fontSize: '8px', lineHeight: '12px',
                  background: 'linear-gradient(to bottom, #e4e4e4, #b0b0b0)',
                  border: '1px solid #555', cursor: 'default', color: '#000',
                  boxShadow: '1px 1px 0 #fff inset',
                }}>{lbl}</button>
              ))}
              <button
                onClick={() => close(d.id)}
                style={{
                  width: '16px', height: '14px', fontSize: '8px', lineHeight: '12px',
                  background: 'linear-gradient(to bottom, #e4706a, #c0312b)',
                  border: '1px solid #7a0000', cursor: 'pointer', color: '#fff', fontWeight: 'bold',
                  boxShadow: '1px 1px 0 rgba(255,255,255,0.4) inset',
                }}
              >✕</button>
            </div>
          </div>

          {/* Body */}
          <div style={{
            background: '#ece9d8',
            borderTop: '1px solid #fff',
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '28px', flexShrink: 0 }}>{d.icon}</span>
              <p style={{ margin: 0, color: '#000', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{d.msg}</p>
            </div>
            {/* Buttons row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {['OK', 'Cancel', 'Details >>'].map((lbl) => (
                <button
                  key={lbl}
                  onClick={() => close(d.id)}
                  style={{
                    minWidth: '72px', padding: '3px 8px',
                    background: 'linear-gradient(to bottom, #f5f4f0, #ddd)',
                    border: '1px solid #7a7a7a',
                    fontFamily: 'Tahoma, Arial, sans-serif', fontSize: '11px',
                    cursor: 'pointer', color: '#000',
                    boxShadow: '1px 1px 0 #fff inset, -1px -1px 0 #999 inset',
                  }}
                >{lbl}</button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes xpPopIn {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
