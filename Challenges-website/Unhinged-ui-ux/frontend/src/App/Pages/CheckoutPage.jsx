import { useState } from 'react';
import { useCart } from '../../features/Cart/state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import FakeProgressBar from '../components/FakeProgressBar';
import MovingButton from '../components/MovingButton';

const passwordRules = [
  "Must be at least 8 characters",
  "Must contain at least one uppercase letter",
  "Must contain at least one number",
  "Must contain at least one special character",
  "Must NOT contain the letter 'e'",
  "Must contain your father's maiden name",
  "Must be a prime number of characters long",
  "Must not contain any letters that appear in your email",
  "Must have been created on a Tuesday",
  "Must contain at least one emoji 🎃",
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', card: '' });
  const [loading, setLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes('@')) newErrors.email = "Invalid email";
    if (!form.address) newErrors.address = "Address required";
    if (!form.password) newErrors.password = "Password required";
    if (form.password && form.password.toLowerCase().includes('e')) {
      newErrors.password = "❌ Password must NOT contain the letter 'e'. Try again.";
    }
    if (!form.card) newErrors.card = "Card number required";
    return newErrors;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setAttempt(prev => prev + 1);
    if (attempt === 0) {
      setErrors({ general: "⚠️ Server timeout. Please try again. (This is totally real and not fake.)" });
      return;
    }
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <FakeProgressBar
          label="Processing your order..."
          onComplete={() => { clearCart(); navigate('/confirmation'); }}
        />
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded text-sm outline-none transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-black'
    }`;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Header */}
      <header className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
        <span className="text-xl font-black tracking-tight">🛒 Regretail™</span>
        <button onClick={() => navigate('/cart')} className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to Cart
        </button>
      </header>

      <div className="max-w-lg mx-auto px-6 py-10">
        <h1 className="text-3xl font-black tracking-tight mb-1">💳 Checkout</h1>
        <p className="text-gray-400 text-sm mb-8">You're almost done. Almost. Probably.</p>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm text-red-600">
            {errors.general}
          </div>
        )}

        {/* Fields */}
        <div className="space-y-5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your legal name (and any aliases)' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'We will spam this address' },
            { label: 'Delivery Address', name: 'address', type: 'text', placeholder: 'Somewhere on Earth, hopefully' },
            { label: 'Card Number', name: 'card', type: 'text', placeholder: '16 digits (or just guess)' },
          ].map(field => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className={inputClass(field.name)}
              />
              {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
            </div>
          ))}

          {/* Password with impossible rules */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              Password <span className="text-gray-400 font-normal">(for your security)</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className={inputClass('password')}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
              <p className="text-xs font-bold mb-2 text-amber-800">Password Requirements:</p>
              <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside">
                {passwordRules.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Moving submit */}
        <MovingButton
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '0.85rem',
            background: '#111', color: '#fff',
            border: 'none', borderRadius: '6px', cursor: 'pointer',
            fontSize: '0.95rem', fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: '700', marginTop: '1.5rem', display: 'block',
          }}
        >
          {attempt === 0 ? '🔒 Place Order Securely' : '🔒 Place Order (For Real This Time)'}
        </MovingButton>

        <p className="text-xs text-gray-300 mt-4 leading-relaxed">
          By clicking "Place Order" you agree to our Terms of Service (287 pages), Privacy Policy,
          Cookie Policy, Anti-Cookie Policy, the Geneva Convention, and confirm you have read
          our 47-page return policy which says no returns. Ever.
        </p>
      </div>
    </div>
  );
}
