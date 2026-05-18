import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../features/Products/hooks/useProduct.js';
import { useCart } from '../../features/Cart/state/CartContext.jsx';
import MovingButton from '../components/MovingButton.jsx';
import FloatingReactions, { triggerReaction } from '../components/FloatingReactions.jsx';
import { playAirHorn, playWindowsError } from '../../utils/Sounds.js';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, products, getProductsById } = useProduct();
  const { addToCart } = useCart();
  
  const [stock, setStock] = useState(1);
  const [toastMsg, setToastMsg] = useState(null);
  
  useEffect(() => {
    getProductsById(id);
  }, [id]);
  
  useEffect(() => {
    const t = setInterval(() => {
      setStock(prev => (prev > -50 ? prev - Math.floor(Math.random() * 3) : -50));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const handleAddToCart = () => {
    if (products) {
      addToCart(products);
      playAirHorn();
      triggerReaction('addToCart');
      setToastMsg(`"${products.name}" forcibly added to your cart! 💀`);
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  const goBack = () => {
    playWindowsError();
    alert('You are attempting to escape. We will allow it, but we judge you.');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-black">
        <div className="text-4xl animate-bounce mb-4">🌀</div>
        <h1 className="text-2xl font-black">Loading product...</h1>
        <p className="text-gray-500 mt-2">We are manually drawing the pixels. Please wait.</p>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-6xl font-black text-red-500 mb-4">404</h1>
        <h2 className="text-2xl mb-4">Product Not Found (or it hid from you)</h2>
        <button onClick={() => navigate('/')} className="bg-white text-black px-6 py-3 font-bold rounded">
          Flee to Safety
        </button>
      </div>
    );
  }

  const product = products; // It's an object now, based on useProduct hook

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <FloatingReactions />
      
      {/* Header */}
      <header className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-800">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-xl font-black tracking-tight">🛒 Regretail™</span>
        </div>
        <button
          onClick={goBack}
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          &larr; Abort Mission
        </button>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-8">
        {/* Warning Banner */}
        <div className="bg-red-500 text-white p-3 rounded-lg font-bold text-center mb-10 shadow-lg animate-pulse">
          🚨 WARNING: Viewing this page has incurred a $4.99 "Lookie-Loo" fee. 🚨
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-200 relative overflow-hidden">
          
          {/* Annoying watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center z-0">
            <span className="text-9xl font-black rotate-[-45deg] whitespace-nowrap">PAY UP</span>
          </div>

          {/* Left Column: Image */}
          <div className="relative z-10">
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-black uppercase z-20 shadow-md transform -rotate-3">
              🔥 Stock: {stock} left!
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-2"
            />
            <p className="text-xs text-center text-gray-400 mt-3 italic">
              * Actual product may be a JPEG printed on printer paper
            </p>
          </div>

          {/* Right Column: Details */}
          <div className="relative z-10 flex flex-col justify-center">
            <div className="inline-block bg-black text-white text-xs px-2 py-1 rounded font-mono mb-4 w-max">
              ID: {product._id?.substring(0, 8)}...
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 leading-tight">
              {product.name}
            </h1>
            
            <div className="text-sm text-amber-500 mb-6 flex items-center gap-2">
              <span>★★☆☆☆</span> 
              <span className="text-gray-400 underline decoration-dashed cursor-help" title="These reviews are generated by our AI intern">
                ({(Math.random() * 1000).toFixed(0)} completely unbiased reviews)
              </span>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
              <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Our Ridiculous Price</div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black">${product.price}</span>
                <span className="text-lg text-gray-400 line-through decoration-red-500 decoration-2">
                  ${(product.price * 2.5).toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-green-600 font-bold mt-2">
                Save absolutely nothing because of shipping!
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              {product.description || "The seller was too lazy to write a description. Just buy it and see what happens. It's like a loot box, but disappointing."}
            </p>

            <div className="space-y-4">
              <MovingButton
                onClick={handleAddToCart}
                style={{
                  width: '100%', padding: '1rem',
                  background: 'black', color: 'white',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '1.1rem', fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: '900', textTransform: 'uppercase',
                  boxShadow: '0 10px 20px -10px rgba(0,0,0,0.5)'
                }}
              >
                Add to Cart & Regret Later 🛒
              </MovingButton>

              <button 
                onClick={() => { playWindowsError(); alert("Hah. Nice try. We disabled this button."); }}
                className="w-full p-4 bg-white text-black font-bold border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors uppercase text-sm"
              >
                Buy Now (Error 404)
              </button>
            </div>
          </div>
        </div>
        
        {/* Fake Reviews Section */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-black mb-8 border-b-4 border-black pb-4 inline-block">Real* Reviews</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-amber-500 text-xs mb-1">★★★★★</div>
              <h4 className="font-bold mb-2">Changed my life (for the worse)</h4>
              <p className="text-sm text-gray-600 mb-2">I bought this on a whim. My wife left me. My dog ran away. But at least I have this item. 10/10.</p>
              <span className="text-xs font-bold text-gray-400">- Verified Victim</span>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="text-amber-500 text-xs mb-1">★☆☆☆☆</div>
              <h4 className="font-bold mb-2">Never arrived</h4>
              <p className="text-sm text-gray-600 mb-2">I ordered this 3 years ago. Still waiting. Customer service sent me a picture of a clown.</p>
              <span className="text-xs font-bold text-gray-400">- Angry Shopper 88</span>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toastMsg && (
        <div
          className="fixed bottom-8 right-8 bg-black text-white px-5 py-4 rounded-xl shadow-2xl z-[9000] text-sm max-w-xs font-bold"
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          {toastMsg}
        </div>
      )}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
