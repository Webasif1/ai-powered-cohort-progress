import { useEffect, useState } from 'react';

export default function FakeProgressBar({ onComplete, label = "Processing..." }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing...");

  const messages = [
    "Initializing...",
    "Connecting to servers...",
    "Verifying your humanity...",
    "Consulting the algorithm...",
    "Almost there...",
    "Just kidding, starting over...",
    "For real this time...",
    "OK seriously almost done...",
    "✅ Complete!",
  ];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8;

      // Fake stall at 69%
      if (p > 69 && p < 75) p = 69;

      // Reset at 80% once
      if (p >= 80 && p < 85) {
        p = 10;
        setMessage("Just kidding, starting over...");
      }

      if (p >= 100) {
        p = 100;
        setMessage("✅ Complete!");
        clearInterval(interval);
        setTimeout(onComplete, 800);
      } else {
        const idx = Math.min(Math.floor((p / 100) * messages.length), messages.length - 1);
        setMessage(messages[idx]);
      }

      setProgress(Math.min(p, 100));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{label}</p>
      <div style={{ background: '#eee', borderRadius: '10px', overflow: 'hidden', height: '20px', margin: '0 auto 1rem', width: '300px' }}>
        <div style={{
          width: `${progress}%`, height: '100%',
          background: 'linear-gradient(90deg, #e74c3c, #f39c12)',
          transition: 'width 0.3s ease',
        }} />
      </div>
      <p style={{ fontSize: '0.85rem', color: '#777' }}>{progress.toFixed(0)}% — {message}</p>
    </div>
  );
}
