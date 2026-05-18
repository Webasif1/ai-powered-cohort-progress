import { useEffect, useState } from 'react';
import { useCart } from '../../features/Cart/state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import MovingButton from '../components/MovingButton.jsx';
import EvilPopup from '../components/EvilPopup.jsx';
import FloatingReactions, { triggerReaction } from '../components/FloatingReactions.jsx';
import AngerMeter from '../components/AngerMeter.jsx';
import EvilChallenge from '../components/EvilChallenge.jsx';
import WindowsXPBlitz from '../components/WindowsXPBlitz.jsx';
import NotWelcomePopup from '../components/NotWelcomePopup.jsx';
import { useProduct } from '../../features/Products/hooks/useProduct.js';
import { playAirHorn, playWindowsError } from '../../utils/Sounds.js';
import { useSignup } from '../../features/auth/hooks/useAuth.js';

export default function HomePage() {
  const [timer, setTimer] = useState(600);
  const [toastMsg, setToastMsg] = useState(null);
  const [hoveredPrices, setHoveredPrices] = useState({});
  const [muted, setMuted] = useState(false);
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();
  const { loading, error, products, setProducts, getallProducts } = useProduct();
  const { handleLogout } = useSignup();

  const handleOfferClick = async () => {
    playWindowsError();
    alert("🎉 SPECIAL OFFER REDEEMED! 🎉\n\nYou've won a free, non-refundable LOGOUT!");
    await handleLogout();
    navigate('/login');
  };

  useEffect(() => { getallProducts(); }, []);

  useEffect(() => {
    const t = setInterval(() => setTimer(p => p <= 1 ? 600 : p - 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setProducts(p => [...p].sort(() => Math.random() - 0.5));
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    playAirHorn();
    triggerReaction('addToCart');
    const fakeName = Math.random() < 0.2 ? '"Blockchain-Verified Sticky Notes"' : `"${product.name}"`;
    setToastMsg(`${fakeName} added to cart! (probably) 🤞`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleHoverPrice = (productId, basePrice) => {
    const extra = (Math.random() * 3 + 0.5).toFixed(2);
    setHoveredPrices(p => ({ ...p, [productId]: (parseFloat(basePrice) + parseFloat(extra)).toFixed(2) }));
    triggerReaction('priceUp');
  };

  const handleLeavePrice = (productId) => {
    setHoveredPrices(p => ({ ...p, [productId]: null }));
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Global components */}
      <NotWelcomePopup />
      <WindowsXPBlitz />
      <FloatingReactions />
      <AngerMeter />
      <EvilChallenge />
      <EvilPopup />

      {/* Flash sale banner */}
      <div className="bg-black text-white text-center py-2 text-xs font-medium tracking-wide">
        🚨 FLASH SALE ENDS IN {formatTime(timer)} 🚨{' '}
        <span className="opacity-50">(offer may or may not be real)</span>
      </div>

      {/* Header */}
      <header className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight">🛒 Regretail™</span>
          <span className="text-xs text-gray-500 font-normal">Beta v0.0.1 (extremely unstable)</span>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/profile')}
            className="bg-black text-white border border-white text-sm font-semibold px-4 py-2 rounded hover:bg-white hover:text-black transition-colors"
          >
            My Profile 👤
          </button>
          <button
            onClick={handleOfferClick}
            className="bg-red-600 text-white animate-pulse text-sm font-black px-4 py-2 rounded shadow-[0_0_15px_red] hover:bg-red-800 transition-colors uppercase border-2 border-dashed border-white"
          >
            🔥 CLAIM FREE OFFER! 🔥
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="bg-white text-black text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Cart ({cart.reduce((s, i) => s + i.qty, 0)}) 🛍️
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="px-8 py-20 bg-gray-50 border-b border-gray-200 text-center flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, black 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative z-10">
          Voted #1 Worst Shopping Experience
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight max-w-4xl relative z-10">
          Buy things you <span className="line-through text-gray-400">don't</span> need.
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl relative z-10 font-medium">
          Experience the thrill of spending money on poorly described items with randomized pricing, mandatory viewing fees, and a checkout process designed to test your will to live.
        </p>
        <div className="flex gap-4 relative z-10">
          <button 
            className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
            onClick={() => { playAirHorn(); window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' }); }}
          >
            Take My Money 💸
          </button>
          <button 
            className="px-8 py-4 bg-white text-black font-bold rounded-lg border-2 border-gray-200 hover:border-black hover:bg-gray-100 transition-all hover:scale-105"
            onClick={() => { playWindowsError(); alert("No. You must buy something first."); }}
          >
            Leave Site 🚫
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-8 py-4 flex gap-3 border-b border-gray-100">
        <input
          placeholder="Search products... (results are random, not related to your query)"
          className="flex-1 px-4 py-2 border border-gray-200 rounded text-sm outline-none focus:border-black transition-colors"
          onChange={(e) => {
            if (e.target.value.length > 2) {
              setProducts(p => [...p].sort(() => Math.random() - 0.5));
              playWindowsError();
            }
          }}
        />
        <button
          className="bg-black text-white px-5 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
          onClick={() => {
            setProducts(p => [...p].sort(() => Math.random() - 0.5));
            playWindowsError();
          }}
        >
          🔍 Search
        </button>
      </div>

      {/* Promo banner */}
      <div className="mx-8 my-4 border border-dashed border-gray-300 rounded-lg p-4 flex items-center gap-2 bg-gray-50">
        <span className="text-sm font-semibold">🎁 CONGRATULATIONS! You qualify for FREE SHIPPING!</span>
        <span className="text-xs text-gray-400">(on orders over $999.99 — excluding weekends, your birthday, and Tuesdays)</span>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center py-16 text-gray-500 text-sm">
          ⏳ Loading products... <span className="text-gray-300">(this might take a while, or forever)</span>
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-500 text-sm">💀 Something went wrong: {error.message}</div>
      )}

      {/* Product Grid */}
      <div className="grid gap-5 p-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {products.map(product => {
          const displayPrice = hoveredPrices[product._id] || product.price;
          const isPriceUp = !!hoveredPrices[product._id];
          return (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden relative hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Stock badge */}
              <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
                🔥 ONLY 1 LEFT!
              </div>

              {/* Image */}
              <div
                onMouseEnter={() => handleHoverPrice(product._id, product.price)}
                onMouseLeave={() => handleLeavePrice(product._id)}
                onClick={() => {
                  playWindowsError();
                  navigate(`/product/${product._id}`);
                }}
                className="cursor-pointer"
              >
                <img src={product.image} alt={product.name} className="w-full h-52 object-cover hover:scale-105 transition-transform" />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold leading-snug mb-2">{product.name}</h3>

                {/* Fake ratings */}
                <div className="text-xs text-amber-500 mb-2">
                  ★★★★★ <span className="text-gray-400">({product.fakeReviews?.toLocaleString()} verified reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="line-through text-gray-300 text-sm">${product.fakeOriginalPrice}</span>{' '}
                  <strong className={`text-lg font-black transition-all ${isPriceUp ? 'text-red-500' : 'text-black'}`}>
                    ${displayPrice}
                  </strong>
                  {isPriceUp && (
                    <span className="text-xs text-red-400 ml-1 font-semibold">📈 Viewing Fee Applied!</span>
                  )}
                  {!isPriceUp && (
                    <span className="text-xs text-green-600 ml-1">
                      ({Math.round((1 - product.price / product.fakeOriginalPrice) * 100)}% OFF)
                    </span>
                  )}
                </div>

                {/* Moving Add to Cart */}
                <MovingButton
                  onClick={() => handleAddToCart(product)}
                  style={{
                    width: '100%', padding: '0.55rem',
                    background: '#111', color: '#fff',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                    fontSize: '0.85rem', fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: '600',
                  }}
                >
                  Add to Cart 🛒 (if you can catch me)
                </MovingButton>
              </div>
            </div>
          );
        })}
      </div>

      {/* "As Seen On" Fake Banner */}
      <div className="border-y border-gray-200 bg-gray-50 py-10 overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">As (Never) Seen On</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 font-black text-xl md:text-2xl text-gray-600 grayscale">
          <span>📉 FORBS</span>
          <span>🗞️ NEW YORK SLIMES</span>
          <span>🚫 BANNED IN EU</span>
          <span>👎 F- RATING (BBB)</span>
        </div>
      </div>

      {/* Features / Why Choose Us */}
      <div className="py-24 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">Why shop with us? <br/><span className="text-gray-400">Honestly, you shouldn't.</span></h2>
        <div className="grid md:grid-cols-3 gap-12 text-left">
          <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors">
            <div className="text-4xl mb-4">🐢</div>
            <h3 className="text-lg font-bold mb-2">Lightning Slow Shipping</h3>
            <p className="text-sm text-gray-500">Why get it tomorrow when you can get it eventually? We hand-deliver packages via carrier pigeon. When they feel like it.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors bg-black text-white">
            <div className="text-4xl mb-4">💸</div>
            <h3 className="text-lg font-bold mb-2">Hidden Fees (Everywhere)</h3>
            <p className="text-sm text-gray-400">Convenience fee, inconvenience fee, breathing air fee, and the classic "because we can" fee. Your wallet will weep.</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors">
            <div className="text-4xl mb-4">🔇</div>
            <h3 className="text-lg font-bold mb-2">Zero Customer Support</h3>
            <p className="text-sm text-gray-500">Got a problem? Tell it to a wall. Our AI chatbot is trained exclusively on sarcastic Reddit comments and will only roast you.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-black text-white py-24 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-12">What our "victims" say</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-yellow-500 text-xs mb-3">★☆☆☆☆ (1/5)</div>
              <p className="text-sm text-gray-300 italic mb-4">"I tried to buy a mug. The 'Add to Cart' button ran away from my mouse. I chased it for 45 minutes. I am now in therapy."</p>
              <p className="text-xs font-bold">— Sarah, recovering shopper</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-yellow-500 text-xs mb-3">★★★★★ (5/5)</div>
              <p className="text-sm text-gray-300 italic mb-4">"They charged me a 'Viewing Fee' just for looking at a product. Honestly, the sheer audacity is impressive. Respect the hustle."</p>
              <p className="text-xs font-bold">— TechBro CEO</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="text-yellow-500 text-xs mb-3">★☆☆☆☆ (1/5)</div>
              <p className="text-sm text-gray-300 italic mb-4">"Please let me leave this site. Every time I try to close the tab, a Windows XP popup spawns. Send help."</p>
              <p className="text-xs font-bold">— Anonymous Hostage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evil Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-8 text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-black text-lg mb-4">🛒 Regretail™</h4>
            <p className="text-gray-500 text-xs leading-relaxed">The only store that actively hates its customers. We take your money, but we make you work for it.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Customer Care (lol)</h4>
            <ul className="space-y-2 text-gray-500 text-xs flex flex-col items-start">
              <li><button onClick={() => playWindowsError()} className="hover:text-black transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Return Policy (No)</button></li>
              <li><button onClick={() => playAirHorn()} className="hover:text-black transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Contact Us (Don't)</button></li>
              <li><button onClick={() => alert("Your complaint has been forwarded to /dev/null")} className="hover:text-black transition-colors text-left bg-transparent border-none p-0 cursor-pointer">File a Complaint</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500 text-xs flex flex-col items-start">
              <li><button className="hover:text-black transition-colors bg-transparent border-none p-0 cursor-pointer">Terms of Servitude</button></li>
              <li><button onClick={() => alert("We sold your data to advertisers 3 seconds ago.")} className="hover:text-black transition-colors text-left bg-transparent border-none p-0 cursor-pointer">Privacy Policy (We sell it all)</button></li>
              <li><button className="hover:text-black transition-colors bg-transparent border-none p-0 cursor-pointer">Cookie Policy (Oatmeal Raisin only)</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-500 text-xs mb-2">Subscribe to be spammed hourly.</p>
            <div className="flex">
              <input type="email" placeholder="fake@email.com" className="px-3 py-2 border border-gray-300 rounded-l text-xs w-full focus:outline-none" />
              <button className="bg-black text-white px-4 py-2 text-xs font-bold rounded-r cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => alert("Error: Email too genuine.")}>Submit</button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs pt-8 border-t border-gray-100">
          © {new Date().getFullYear()} Regretail Corp. All rights reversed. Any resemblance to a functional website is purely coincidental.
        </div>
      </footer>

      {/* Toast */}
      {toastMsg && (
        <div
          className="fixed bottom-8 right-8 bg-black text-white px-5 py-4 rounded-xl shadow-2xl z-[9000] text-sm max-w-xs"
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          ✅ {toastMsg}
        </div>
      )}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
