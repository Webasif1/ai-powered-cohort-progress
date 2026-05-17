import { useEffect, useState } from 'react';
import { useCart } from '../../features/Cart/state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import MovingButton from '../components/MovingButton';
import EvilPopup from '../components/EvilPopup';
import { useProduct } from '../../features/Products/hooks/useProduct.js';
import { toast } from 'sonner';

export default function HomePage() {
  const [timer, setTimer] = useState(600); // fake 10-minute countdown
  const [toast, setToast] = useState(null);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const { loading, error, products, setProducts, getallProducts } = useProduct();

  useEffect(() => {
    console.log("products", products)
    getallProducts();
    if (loading) {
      toast.loading("Loading...");
    }
    if (error) {
      toast.error(error.message);
    }
  }, []);

  // Fake countdown — resets at 0
  useEffect(() => {
    const t = setInterval(() => {
      setTimer(prev => prev <= 1 ? 600 : prev - 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Shuffle products every 15 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setProducts(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`"${product.name}" added! (probably)`);
    setTimeout(() => setToast(null), 2500);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ fontFamily: 'Comic Sans MS, cursive', background: '#fffbe6', minHeight: '100vh' }}>
      <EvilPopup />

      {/* Annoying header */}
      <div style={{ background: '#e74c3c', color: '#fff', textAlign: 'center', padding: '0.5rem', fontSize: '0.85rem' }}>
        🚨 FLASH SALE ENDS IN {formatTime(timer)} 🚨 (Offer may or may not be real)
      </div>

      <header style={{ background: '#2c3e50', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>🛒 BuyStuff™ <small style={{ fontSize: '0.6rem', color: '#aaa' }}>Beta v0.0.1 (unstable)</small></h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Cart button goes to wrong page first */}
          <button
            onClick={() => navigate('/cart')}
            style={{ background: '#f39c12', border: 'none', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cart ({cart.reduce((s, i) => s + i.qty, 0)}) 🛍️
          </button>
        </div>
      </header>

      {/* Fake search bar that doesn't work */}
      <div style={{ padding: '1rem 2rem', display: 'flex', gap: '0.5rem' }}>
        <input
          placeholder="Search for products... (results may vary)"
          style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '2px solid #ccc', fontFamily: 'inherit' }}
          onChange={(e) => {
            // Search does nothing useful — just shuffles products
            if (e.target.value.length > 2) {
              setProducts(prev => [...prev].sort(() => Math.random() - 0.5));
            }
          }}
        />
        <button style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          🔍 Search
        </button>
      </div>

      {/* Fake ad banner */}
      <div style={{
        margin: '0 2rem 1rem', background: 'linear-gradient(135deg, #ff6b6b, #ffd93d)',
        padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '3px dashed #e74c3c',
      }}>
        <strong>🎁 CONGRATULATIONS! You qualify for FREE SHIPPING!</strong> (on orders over $999.99)
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', padding: '1rem 2rem' }}>
        {products.map(product => (
          <div key={product._id} style={{
            background: '#fff', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden', border: '2px solid #eee', position: 'relative',
          }}>
            {/* Only 1 left badge */}
            <div style={{
              position: 'absolute', top: '10px', left: '10px', background: '#e74c3c',
              color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '99px', fontWeight: 'bold',
            }}>
              🔥 ONLY 1 LEFT!
            </div>

            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />

            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{product.name}</h3>

              {/* Fake ratings */}
              <div style={{ fontSize: '0.8rem', color: '#f39c12', marginBottom: '0.5rem' }}>
                ★★★★★ <span style={{ color: '#aaa' }}>({product.fakeReviews?.toLocaleString()} reviews)</span>
              </div>

              {/* Price with fake strikethrough */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '0.9rem' }}>
                  ${product.fakeOriginalPrice}
                </span>
                {' '}
                <strong style={{ color: '#e74c3c', fontSize: '1.3rem' }}>${product.price}</strong>
                <span style={{ fontSize: '0.7rem', color: '#27ae60', marginLeft: '0.5rem' }}>
                  ({Math.round((1 - product.price / product.fakeOriginalPrice) * 100)}% OFF)
                </span>
              </div>

              {/* Moving Add to Cart button */}
              <MovingButton
                onClick={() => handleAddToCart(product)}
                style={{
                  width: '100%', padding: '0.6rem', background: '#2c3e50',
                  color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',
                  fontSize: '0.9rem', fontFamily: 'inherit',
                }}
              >
                Add to Cart (if you can catch me)
              </MovingButton>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          background: '#2c3e50', color: '#fff', padding: '1rem 1.5rem',
          borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 9000,
        }}>
          ✅ {toast}
        </div>
      )}
    </div>
  );
}
