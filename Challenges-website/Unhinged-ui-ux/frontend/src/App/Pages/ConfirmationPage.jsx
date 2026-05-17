import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [orderNum] = useState(Math.floor(Math.random() * 9000000 + 1000000));
  const [deliveryDays] = useState(Math.floor(Math.random() * 847 + 3));

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black text-white px-8 py-4 flex items-center">
        <span className="text-xl font-black tracking-tight">🛒 Regretail™</span>
      </div>

      <div className="mt-16 max-w-md w-full">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-black tracking-tight mb-1">Order Confirmed!</h1>
        <p className="text-gray-400 text-sm mb-8">Order #BUY-{orderNum}</p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 text-left shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <span>✅</span>
            <p className="text-sm text-gray-700">Your order has been placed successfully!</p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <span>📦</span>
            <p className="text-sm text-gray-700">
              Estimated delivery: <strong className="text-black">{deliveryDays} business days</strong>
            </p>
          </div>
          <p className="text-xs text-gray-300 mt-1 ml-6">
            (Business days do not include weekends, holidays, our lunch breaks, or days ending in 'y')
          </p>

          <hr className="my-4 border-gray-100" />

          <p className="text-xs text-gray-400">
            A confirmation email has been sent to an address we made up.
            Please check all your email accounts, including ones you don't have.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 rounded font-bold text-sm hover:bg-gray-800 transition-colors"
        >
          Continue Shopping (You know you want to)
        </button>
      </div>
    </div>
  );
}
