import { useCart } from '../../features/Cart/state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { playWompWomp, playWindowsError, playOhNo, playEmotionalDamage } from '../../utils/Sounds.js';

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();
  const [fakeTax, setFakeTax] = useState(0);
  const [randomFee, setRandomFee] = useState(0);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmStep, setConfirmStep] = useState(0);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  useEffect(() => {
    setFakeTax(parseFloat((subtotal * (0.15 + Math.random() * 0.1)).toFixed(2)));
    setRandomFee(parseFloat((Math.random() * 15 + 5).toFixed(2)));
    const t = setInterval(() => {
      setFakeTax(parseFloat((subtotal * (0.15 + Math.random() * 0.1)).toFixed(2)));
      setRandomFee(parseFloat((Math.random() * 15 + 5).toFixed(2)));
      playOhNo();
    }, 8000);
    return () => clearInterval(t);
  }, [subtotal]);

  const handleRemove = (id) => {
    if (confirmStep === 0) { setConfirmRemove(id); setConfirmStep(1); playWompWomp(); return; }
    if (confirmStep === 1) { setConfirmStep(2); playWompWomp(); return; }
    if (confirmStep === 2) { setConfirmStep(3); playWompWomp(); return; }
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
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <header className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
        <span className="text-xl font-black tracking-tight">🛒 Regretail™</span>
        <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to Shop
        </button>
      </header>

      <div className="px-8 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-black tracking-tight mb-1">
          Your Cart <small className="text-xs font-normal text-gray-400">(subject to change without notice)</small>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-bold mb-2">Your cart is empty.</p>
            <p className="text-gray-400 text-sm mb-6">Funny, you added things. They must have left.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-black text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Go Back and Try Again
            </button>
          </div>
        ) : (
          <div className="grid gap-8 mt-6" style={{ gridTemplateColumns: '1fr 300px' }}>

            {/* Cart Items */}
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item._id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center hover:shadow-sm transition-shadow">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
                    <p className="text-black font-bold mb-2">${item.price}</p>

                    {/* Quantity — swapped +/- */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Qty:</span>
                      <button
                        onClick={() => { updateQty(item._id, item.qty + 1); playWindowsError(); }}
                        className="w-7 h-7 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                      >−</button>
                      <span className="min-w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => { updateQty(item._id, item.qty - 1); playWindowsError(); }}
                        className="w-7 h-7 border border-gray-200 rounded text-sm hover:bg-gray-50 transition-colors"
                      >+</button>
                      <span className="text-xs text-gray-300">(buttons may be swapped for your security)</span>
                    </div>
                  </div>

                  {/* Tiny remove button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-gray-200 text-xs border border-gray-100 rounded px-2 py-0.5 hover:text-gray-500 hover:border-gray-300 transition-colors"
                    title="Remove"
                  >
                    remove
                  </button>
                </div>
              ))}

              {/* Confirm removal */}
              {confirmRemove && confirmStep <= 3 && confirmStep > 0 && (
                <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
                  <p className="font-semibold text-sm mb-3">⚠️ {confirmMessages[confirmStep - 1]}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRemove(confirmRemove)}
                      className="bg-black text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      {confirmStep < 3 ? 'Yes, Remove' : 'OK Fine, Remove It'}
                    </button>
                    <button
                      onClick={() => { setConfirmRemove(null); setConfirmStep(0); }}
                      className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-20">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (dynamic 🔄)</span><span>${fakeTax}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Convenience Fee</span><span>${randomFee}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Inconvenience Fee</span><span>$4.99</span>
                </div>
                <div className="flex justify-between text-gray-300 text-xs">
                  <span>Breathing Air Fee</span><span>$2.99</span>
                </div>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="flex justify-between font-black text-base mb-1">
                <span>Total</span>
                <span>${(subtotal + fakeTax + randomFee + 4.99 + 2.99).toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-300 mb-4">* Total may change. We reserve the right to add more fees at checkout.</p>

              {/* Big fake checkout */}
              <button
                onClick={() => { playEmotionalDamage(); setTimeout(() => navigate('/'), 600); }}
                className="w-full py-3 bg-black text-white rounded font-bold text-sm hover:bg-gray-800 transition-colors mb-2"
              >
                ✅ CHECKOUT NOW
              </button>

              {/* Real tiny checkout */}
              <button
                onClick={() => { playOhNo(); navigate('/checkout'); }}
                className="w-full py-1.5 bg-gray-50 text-gray-400 rounded text-xs hover:bg-gray-100 transition-colors border border-gray-100"
              >
                proceed to payment (here)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
