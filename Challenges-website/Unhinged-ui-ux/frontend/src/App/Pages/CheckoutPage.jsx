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
    // Impossible rule check for fun
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
      // First attempt: fake error
      setErrors({ general: "⚠️ Server timeout. Please try again. (This is totally real and not fake.)" });
      return;
    }

    // Second attempt: actually process
    setLoading(true);
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'Comic Sans MS, cursive', background: '#fffbe6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FakeProgressBar
          label="Processing your order..."
          onComplete={() => { clearCart(); navigate('/confirmation'); }}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Comic Sans MS, cursive', background: '#fffbe6', minHeight: '100vh', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>💳 Checkout</h1>
      <p style={{ color: '#777', fontSize: '0.85rem' }}>You're almost done. Almost. Probably.</p>

      {errors.general && (
        <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', padding: '1rem', marginBottom: '1rem', color: '#721c24' }}>
          {errors.general}
        </div>
      )}

      {/* Form fields */}
      {[
        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your legal name (and any aliases)' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'We will spam this address' },
        { label: 'Delivery Address', name: 'address', type: 'text', placeholder: 'Somewhere on Earth, hopefully' },
        { label: 'Card Number', name: 'card', type: 'text', placeholder: '16 digits (or just guess)' },
      ].map(field => (
        <div key={field.name} style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{field.label}</label>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            style={{
              width: '100%', padding: '0.6rem', borderRadius: '4px',
              border: errors[field.name] ? '2px solid #e74c3c' : '2px solid #ddd',
              fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
          {errors[field.name] && <small style={{ color: '#e74c3c' }}>{errors[field.name]}</small>}
        </div>
      ))}

      {/* Password field with impossible rules */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
          Password <small style={{ color: '#aaa' }}>(for your security)</small>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: '100%', padding: '0.6rem', borderRadius: '4px',
            border: errors.password ? '2px solid #e74c3c' : '2px solid #ddd',
            fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
        {errors.password && <small style={{ color: '#e74c3c' }}>{errors.password}</small>}
        <div style={{ background: '#fff3cd', borderRadius: '4px', padding: '0.8rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
          <strong>Password Requirements:</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem' }}>
            {passwordRules.map((r, i) => <li key={i} style={{ marginBottom: '0.2rem' }}>{r}</li>)}
          </ul>
        </div>
      </div>

      {/* Moving submit button */}
      <MovingButton
        onClick={handleSubmit}
        style={{
          width: '100%', padding: '1rem', background: '#e74c3c',
          color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',
          fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 'bold',
          marginTop: '1rem', display: 'block',
        }}
      >
        {attempt === 0 ? '🔒 Place Order Securely' : '🔒 Place Order (For Real This Time)'}
      </MovingButton>

      <p style={{ fontSize: '0.65rem', color: '#bbb', marginTop: '1rem', lineHeight: 1.5 }}>
        By clicking "Place Order" you agree to our Terms of Service (287 pages), Privacy Policy,
        Cookie Policy, Anti-Cookie Policy, the Geneva Convention, and confirm you have read
        our 47-page return policy which says no returns. Ever.
      </p>
    </div>
  );
}
