import { useEffect, useState } from 'react';

const messages = [
  { title: "🎉 YOU'RE OUR 1,000,000th VISITOR!", body: "Click OK to claim your prize (limited time!)", btn: "CLAIM NOW" },
  { title: "⚠️ Your cart is about to expire!", body: "Items in your cart are selling fast. Act now!", btn: "I UNDERSTAND" },
  { title: "🍪 Cookie Preferences", body: "We use 847 types of cookies. By breathing near this website you accept all of them.", btn: "I Accept (No Choice)" },
  { title: "📧 Newsletter Signup", body: "Get exclusive deals! (You're already subscribed. This is just to confirm you're subscribed.)", btn: "OK FINE" },
  { title: "🔔 Enable Notifications", body: "We promise to only notify you 47 times per day about things you don't care about.", btn: "Sure Why Not" },
  { title: "⭐ Rate Your Experience", body: "You've been on our site for 4 seconds. How would you rate your experience?", btn: "5 Stars Obviously" },
];

export default function EvilPopup() {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const show = () => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setPopup(msg);
    };

    // Show first popup after 5 seconds, then every 20 seconds
    const first = setTimeout(show, 5000);
    const interval = setInterval(show, 20000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!popup) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.6)', zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff', padding: '2rem', borderRadius: '8px',
        maxWidth: '400px', width: '90%', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <h2 style={{ marginBottom: '1rem' }}>{popup.title}</h2>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>{popup.body}</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => setPopup(null)}
            style={{ padding: '0.5rem 1.5rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
          >
            {popup.btn}
          </button>
          {/* Tiny close button, barely visible */}
          <button
            onClick={() => setPopup(null)}
            style={{ padding: '0.2rem 0.4rem', background: '#ddd', color: '#aaa', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '8px', alignSelf: 'flex-end' }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
