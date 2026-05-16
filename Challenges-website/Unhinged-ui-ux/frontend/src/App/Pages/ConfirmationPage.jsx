import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [orderNum] = useState(Math.floor(Math.random() * 9000000 + 1000000));
  const [deliveryDays] = useState(Math.floor(Math.random() * 847 + 3));

  return (
    <div style={{
      fontFamily: 'Comic Sans MS, cursive', background: '#fffbe6',
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '2rem',
    }}>
      <div>
        <div style={{ fontSize: '5rem' }}>🎉</div>
        <h1 style={{ color: '#27ae60', fontSize: '2rem' }}>Order Confirmed!</h1>
        <p>Order #BUY-{orderNum}</p>

        <div style={{ background: '#fff', borderRadius: '8px', padding: '1.5rem', margin: '1.5rem auto', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
          <p>✅ Your order has been placed successfully!</p>
          <p>📦 Estimated delivery: <strong>{deliveryDays} business days</strong></p>
          <p style={{ fontSize: '0.8rem', color: '#aaa' }}>
            (Business days do not include weekends, holidays, our lunch breaks, or days ending in 'y')
          </p>
          <hr />
          <p style={{ fontSize: '0.8rem', color: '#777' }}>
            A confirmation email has been sent to an address we made up.
            Please check all your email accounts, including ones you don't have.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{ padding: '0.8rem 2rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem' }}
        >
          Continue Shopping (You know you want to)
        </button>
      </div>
    </div>
  );
}
