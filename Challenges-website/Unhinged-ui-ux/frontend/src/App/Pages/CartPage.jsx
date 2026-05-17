import { useCart } from '../../features/Cart/state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();
  const [fakeTax, setFakeTax] = useState(0);
  const [randomFee, setRandomFee] = useState(0);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmStep, setConfirmStep] = useState(0);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Random fees that change
  useEffect(() => {
    setFakeTax(parseFloat((subtotal * (0.15 + Math.random() * 0.1)).toFixed(2)));
    setRandomFee(parseFloat((Math.random() * 15 + 5).toFixed(2)));
    const t = setInterval(() => {
      setFakeTax(parseFloat((subtotal * (0.15 + Math.random() * 0.1)).toFixed(2)));
      setRandomFee(parseFloat((Math.random() * 15 + 5).toFixed(2)));
    }, 8000);
    return () => clearInterval(t);
  }, [subtotal]);

  const handleRemove = (id) => {
    if (confirmStep === 0) { setConfirmRemove(id); setConfirmStep(1); return; }
    if (confirmStep === 1) { setConfirmStep(2); return; }
    if (confirmStep === 2) { setConfirmStep(3); return; }
    removeFromCart(id);
    setConfirmRemove(null);
    setConfirmStep(0);
  };

  const confirmMessages = [
    "Are you sure you want to remove this item?",
    "This item has a 4.9 ⭐ rating. Are you REALLY sure?",
    "Final warning: Other customers are eyeing this item. Remove anyway?",
  ];

  return (
    <div style={{ fontFamily: 'Comic Sans MS, cursive', background: '#fffbe6', minHeight: '100vh', padding: '2rem' }}>
      <h1>🛒 Your Cart <small style={{ fontSize: '0.7rem', color: '#aaa' }}>(subject to change without notice)</small></h1>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Your cart is empty.</h2>
          <p style={{ color: '#777' }}>Funny, you added things. They must have left.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Go Back and Try Again
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>

          {/* Cart Items */}
          <div>
            {cart.map(item => (
              <div key={item._id} style={{ background: '#fff', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.9rem', margin: '0 0 0.5rem' }}>{item.name}</h3>
                  <p style={{ color: '#e74c3c', fontWeight: 'bold', margin: '0 0 0.5rem' }}>${item.price}</p>

                  {/* Quantity with swapped +/- */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#777' }}>Qty:</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)} // + is labeled −
                      style={{ width: '28px', height: '28px', border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', borderRadius: '4px' }}
                    >−</button>
                    <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)} // − is labeled +
                      style={{ width: '28px', height: '28px', border: '1px solid #ddd', background: '#f5f5f5', cursor: 'pointer', borderRadius: '4px' }}
                    >+</button>
                    <small style={{ color: '#aaa', fontSize: '0.7rem' }}>(buttons may be swapped for your security)</small>
                  </div>
                </div>

                {/* Tiny remove button */}
                <button
                  onClick={() => handleRemove(item._id)}
                  style={{ fontSize: '8px', color: '#ccc', border: '1px solid #eee', background: '#fff', cursor: 'pointer', padding: '2px 4px', borderRadius: '2px' }}
                  title="Remove"
                >
                  remove
                </button>
              </div>
            ))}

            {/* Confirm removal dialogs */}
            {confirmRemove && confirmStep <= 3 && confirmStep > 0 && (
              <div style={{ background: '#fff3cd', border: '2px solid #f39c12', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <p><strong>⚠️ {confirmMessages[confirmStep - 1]}</strong></p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleRemove(confirmRemove)} style={{ padding: '0.4rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {confirmStep < 3 ? 'Yes, Remove' : 'OK Fine, Remove It'}
                  </button>
                  <button onClick={() => { setConfirmRemove(null); setConfirmStep(0); }} style={{ padding: '0.4rem 1rem', background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: '1rem' }}>
              <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#777' }}>
                <span>Tax (dynamic 🔄)</span><span>${fakeTax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#777' }}>
                <span>Convenience Fee</span><span>${randomFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#777' }}>
                <span>Inconvenience Fee</span><span>$4.99</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#aaa' }}>
                <span>Breathing Air Fee</span><span>$2.99</span>
              </div>
              <hr />
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0', fontWeight: 'bold' }}>
                <span>Total</span>
                <span>${(subtotal + fakeTax + randomFee + 4.99 + 2.99).toFixed(2)}</span>
              </div>
              <small style={{ color: '#aaa', fontSize: '0.7rem', display: 'block', marginBottom: '1rem' }}>
                * Total may change. We reserve the right to add more fees at checkout.
              </small>

              {/* Big useless "Continue Shopping" button */}
              <button
                onClick={() => navigate('/')}
                style={{ width: '100%', padding: '0.8rem', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.5rem', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 'bold' }}
              >
                ✅ CHECKOUT NOW
              </button>

              {/* Tiny actual checkout button */}
              <button
                onClick={() => navigate('/checkout')}
                style={{ width: '100%', padding: '0.3rem', background: '#eee', color: '#999', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.7rem' }}
              >
                proceed to payment (here)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
