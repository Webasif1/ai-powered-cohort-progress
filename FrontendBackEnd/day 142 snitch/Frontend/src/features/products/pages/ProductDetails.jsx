import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'

/* ─── colour tokens ─── */
const C = {
  bg: '#fdf8f3',
  surface: 'rgba(255, 255, 255, 0.45)',
  surfaceLight: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(232, 213, 192, 0.4)',
  primary: '#b8915a',
  primaryLt: '#d4b896',
  textDark: '#1e160f',
  textMid: '#8a7360',
  textLight: '#c4a882',
  white: '#ffffff',
  saleTag: '#e34c4c'
}

const TopBar = () => (
  <div style={{ background: C.textDark, color: C.white, fontSize: 12, display: 'flex', justifyContent: 'space-between', padding: '10px 48px', alignItems: 'center' }}>
    <div style={{ flex: 1, letterSpacing: '0.3px', color: '#e0e0e0' }}>Sign up and GET 20% OFF for your first order. <span style={{ color: C.primaryLt, cursor: 'pointer', textDecoration: 'underline' }}>Sign up now</span></div>
    <div style={{ display: 'flex', gap: 32, fontWeight: 500, color: '#e0e0e0' }}>
      <span style={{ cursor: 'pointer' }}>Call Us : +123-456-789</span>
      <div style={{ display: 'flex', gap: 12 }}>
         <span style={{ cursor: 'pointer' }}>f</span>
         <span style={{ cursor: 'pointer' }}>t</span>
         <span style={{ cursor: 'pointer' }}>in</span>
      </div>
    </div>
  </div>
)

const Header = () => (
  <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: C.textDark, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ background: C.primary, color: C.white, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 16 }}>Z</span>
        Zewar.
      </h1>
    </Link>
    <nav style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600, color: C.textDark, alignItems: 'center', fontFamily: "'Outfit', sans-serif" }}>
      <Link to="/" style={{ color: C.textMid, textDecoration: 'none' }}>Home</Link>
      <Link to="/products" style={{ color: C.textDark, textDecoration: 'none', borderBottom: `2px solid ${C.textDark}`, paddingBottom: 2 }}>Shop</Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>Skin Care</Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>Makeup</Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>Hair Care</Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>About Us</Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>Blogs</Link>
    </nav>
    <div style={{ display: 'flex', gap: 24, fontSize: 20, color: C.textDark, alignItems: 'center' }}>
      <span style={{ cursor: 'pointer' }}>⌕</span>
      <span style={{ cursor: 'pointer', position: 'relative' }}>
        ♡<span style={{ position: 'absolute', top: -4, right: -8, background: C.primary, color: C.white, fontSize: 10, fontWeight: 700, width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>0</span>
      </span>
      <Link to="/login" style={{ color: C.textDark, textDecoration: 'none' }}>👤</Link>
      <Link to="/cart" style={{ color: C.textDark, textDecoration: 'none', position: 'relative' }}>
        🛒<span style={{ position: 'absolute', top: -4, right: -8, background: C.textDark, color: C.white, fontSize: 10, fontWeight: 700, width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>0</span>
      </Link>
    </div>
  </header>
)

const ProductCard = ({ product }) => {
  const price = parseFloat(product.price?.amount || 99).toFixed(2);
  const oldPrice = (parseFloat(price) + 25).toFixed(2);
  const rating = product.rating || 5;

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: C.white, borderRadius: 16, padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', border: `1px solid ${C.border}`, transition: 'box-shadow 0.3s, transform 0.3s', cursor: 'pointer', height: '100%' }}
           onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(184,145,90,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
           onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
        <div style={{ position: 'absolute', top: 16, left: 16, background: C.primary, color: C.white, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4, zIndex: 1, textTransform: 'uppercase' }}>
          50% Off
        </div>
        <div style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#fdfbfa', borderRadius: 12, overflow: 'hidden' }}>
           <img src={product.images && product.images[0] ? product.images[0].url : 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=300&q=80'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', padding: 20 }} />
        </div>
        <p style={{ fontSize: 12, color: C.textMid, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skin Care</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, margin: 0, fontFamily: "'Outfit', sans-serif", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', paddingRight: 8 }}>
            {product.title || product.name}
          </h4>
          <div style={{ display: 'flex', gap: 2, color: '#f3c623', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
            ★ {rating}.0
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>${price}</span>
          <span style={{ fontSize: 13, color: '#a89a8c', textDecoration: 'line-through' }}>${oldPrice}</span>
        </div>
      </div>
    </Link>
  )
}

const ProductGridSection = ({ title, products }) => (
  <section style={{ padding: '60px 48px', maxWidth: 1400, margin: '0 auto', borderTop: `1px solid ${C.border}` }}>
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      <p style={{ color: C.textMid, fontSize: 14, margin: '0 0 8px', fontWeight: 600 }}>Related Products</p>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.textDark, margin: 0 }}>
        Explore <span style={{ color: C.primary }}>Related Products</span>
      </h3>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
      {products && products.length > 0 ? (
        products.map((p, i) => <ProductCard key={p._id || i} product={p} />)
      ) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: C.textMid }}>No related products available.</div>
      )}
    </div>
  </section>
)

const FeaturesFooter = () => (
  <div style={{ padding: '40px 48px', maxWidth: 1400, margin: '0 auto 60px', display: 'flex', justifyContent: 'space-around', borderTop: `1px solid ${C.border}`, paddingTop: 60 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
       <div style={{ fontSize: 32 }}>📦</div>
       <div>
         <h4 style={{ margin: '0 0 4px', fontSize: 16, color: C.textDark, fontWeight: 700 }}>Free Shipping</h4>
         <p style={{ margin: 0, fontSize: 13, color: C.textMid }}>Free shipping for order above $50</p>
       </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
       <div style={{ fontSize: 32 }}>💳</div>
       <div>
         <h4 style={{ margin: '0 0 4px', fontSize: 16, color: C.textDark, fontWeight: 700 }}>Flexible Payment</h4>
         <p style={{ margin: 0, fontSize: 13, color: C.textMid }}>Multiple secure payment options</p>
       </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
       <div style={{ fontSize: 32 }}>🎧</div>
       <div>
         <h4 style={{ margin: '0 0 4px', fontSize: 16, color: C.textDark, fontWeight: 700 }}>24x7 Support</h4>
         <p style={{ margin: 0, fontSize: 13, color: C.textMid }}>We support online all days</p>
       </div>
    </div>
  </div>
)

const ProductDetails = () => {
  const { id } = useParams();
  const { handleGetSingleProduct, handleGetAllProducts } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const allProducts = useSelector((state) => state.product.allProducts) || [];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVol, setSelectedVol] = useState('30 ml');
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const resData = await handleGetSingleProduct(id);
      if(resData) setProduct(resData);
      setLoading(false);
    };
    fetchProduct();
    if (allProducts.length === 0) {
      handleGetAllProducts();
    }
  }, [id]);

  if (loading) {
    return <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, color: C.textDark }}>Loading Details...</div>;
  }

  if (!product) {
    return <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, color: C.textDark }}>Product not found.</div>;
  }

  const price = parseFloat(product.price?.amount || 99).toFixed(2);
  const oldPrice = (parseFloat(price) + 25).toFixed(2);
  const rating = product.rating || 5;

  const defaultImage = 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80';
  const thumbnails = product.images && product.images.length > 0 ? product.images : [{url: defaultImage}, {url: defaultImage}, {url: defaultImage}, {url: defaultImage}];
  const mainImage = thumbnails[currentImageIndex]?.url || defaultImage;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${product.title || product.name} to cart!`);
  }

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} of ${product.title || product.name} for $${(price * quantity).toFixed(2)}`);
  }

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Outfit', sans-serif", background: C.bg }}>
      <TopBar />
      <Header />
      
      {/* Page Title & Breadcrumb */}
      <div style={{ padding: '40px 48px', textAlign: 'center', background: 'rgba(232, 213, 192, 0.1)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: C.textDark, margin: '0 0 12px' }}>Shop</h2>
        <p style={{ color: C.textMid, fontSize: 14, margin: '0', fontWeight: 500 }}>
          <Link to="/" style={{ color: C.textMid, textDecoration: 'none' }}>Home</Link> / 
          <span style={{ margin: '0 8px' }}>Shop</span> / 
          <span style={{ color: C.textDark, marginLeft: 8 }}>Product Details</span>
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '60px auto', padding: '0 48px', display: 'flex', gap: '5%' }}>
        {/* Gallery */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: '#f6f1ec', borderRadius: 24, padding: 40, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
             <img src={mainImage} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
             <div onClick={() => setIsModalOpen(true)} style={{ position: 'absolute', top: 20, right: 20, background: C.bg, padding: 8, borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>⤢</div>
             {thumbnails.length > 1 && (
               <>
                 <button onClick={handlePrevImage} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: C.white, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: C.textDark }}>←</button>
                 <button onClick={handleNextImage} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: C.textDark, color: C.white, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>→</button>
               </>
             )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {thumbnails.slice(0,4).map((thumb, i) => (
              <div onClick={() => setCurrentImageIndex(i)} key={i} style={{ aspectRatio: '1', borderRadius: 16, background: '#f6f1ec', border: `2px solid ${i === currentImageIndex ? C.primary : 'transparent'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8, cursor: 'pointer' }}>
                 <img src={thumb.url} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: C.textMid, fontSize: 13, fontWeight: 600, margin: '0 0 12px', letterSpacing: '0.5px' }}>SKIN CARE</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: C.textDark, margin: 0, lineHeight: 1.2 }}>
              {product.title || product.name}
            </h1>
            <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', fontSize: 12, borderRadius: 100, fontWeight: 700, border: '1px solid #c8e6c9' }}>In Stock</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14 }}>
            <span style={{ color: '#f3c623', letterSpacing: '2px' }}>★★★★★</span>
            <span style={{ color: C.textDark, fontWeight: 700, marginLeft: 4 }}>{rating}.0</span>
            <span style={{ color: C.textMid }}>(245 Review)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: C.primary }}>${price}</span>
            <span style={{ fontSize: 18, color: '#a89a8c', textDecoration: 'line-through', fontWeight: 600 }}>${oldPrice}</span>
          </div>

          <p style={{ color: C.textMid, fontSize: 15, lineHeight: 1.6, marginBottom: 32, maxWidth: 500 }}>
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Elevate your skincare routine with this premium formula."}
          </p>

          <div style={{ marginBottom: 32 }}>
            <p style={{ color: C.textDark, fontSize: 14, fontWeight: 700, margin: '0 0 12px' }}>Size / Volume</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {['30 ml', '60 ml', '80 ml', '100 ml'].map(vol => (
                <button
                  key={vol}
                  onClick={() => setSelectedVol(vol)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: selectedVol === vol ? C.textDark : 'transparent',
                    color: selectedVol === vol ? C.white : C.textDark,
                    border: `1px solid ${selectedVol === vol ? C.textDark : C.border}`,
                    transition: 'all 0.2s'
                  }}
                >
                  {vol}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: C.white, border: `1px solid ${C.border}`, borderRadius: 100, padding: '4px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textDark }}>-</button>
              <span style={{ width: 40, textAlign: 'center', fontSize: 15, fontWeight: 700, color: C.textDark }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: C.textDark }}>+</button>
            </div>
            
            <button onClick={handleAddToCart} style={{ flex: 1, background: C.textDark, color: C.white, border: 'none', height: 48, borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
              Add To Cart
            </button>
            
            <button onClick={handleBuyNow} style={{ flex: 1, background: C.primary, color: C.white, border: 'none', height: 48, borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.9} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
              Buy Now
            </button>

            <button style={{ width: 48, height: 48, borderRadius: '50%', background: C.white, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, color: C.textDark }}>
              ♡
            </button>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex' }}>
               <span style={{ color: C.textDark, fontWeight: 700, width: 80 }}>SKU :</span>
               <span style={{ color: C.textMid }}>GRFR85648HGJ</span>
            </div>
            <div style={{ display: 'flex' }}>
               <span style={{ color: C.textDark, fontWeight: 700, width: 80 }}>Tags :</span>
               <span style={{ color: C.textMid }}>Skincare, Serums, Vitamin C</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <span style={{ color: C.textDark, fontWeight: 700, width: 80 }}>Share :</span>
               <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: C.textDark, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>f</span>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: C.textDark, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>t</span>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: C.textDark, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>P</span>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: C.textDark, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer' }}>in</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1200, margin: '80px auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, borderBottom: `1px solid ${C.border}`, marginBottom: 40 }}>
          {['Description', 'Additional Information', 'Review'].map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{ paddingBottom: 16, cursor: 'pointer', fontSize: 16, fontWeight: 700, color: activeTab === tab.toLowerCase() ? C.primary : C.textMid, borderBottom: activeTab === tab.toLowerCase() ? `3px solid ${C.primary}` : '3px solid transparent', transition: 'all 0.2s' }}
            >
              {tab}
            </div>
          ))}
        </div>
        
        <div style={{ color: C.textMid, fontSize: 15, lineHeight: 1.8, maxWidth: 1000, margin: '0 auto' }}>
          {activeTab === 'description' && (
            <>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              <ul style={{ listStyleType: 'none', padding: 0, marginTop: 24 }}>
                <li style={{ marginBottom: 12, display: 'flex', gap: 12 }}><span style={{ color: C.primary }}>◉</span> 100% Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li style={{ marginBottom: 12, display: 'flex', gap: 12 }}><span style={{ color: C.primary }}>◉</span> Ut at nunc vel nisi gravida dictum.</li>
                <li style={{ marginBottom: 12, display: 'flex', gap: 12 }}><span style={{ color: C.primary }}>◉</span> Donec non velit sed risus tincidunt suscipit.</li>
                <li style={{ marginBottom: 12, display: 'flex', gap: 12 }}><span style={{ color: C.primary }}>◉</span> Cras laoreet lacus in dui posuere fringilla.</li>
              </ul>
            </>
          )}
          {activeTab === 'additional information' && <p>Information about weight, dimensions, and specifications will go here.</p>}
          {activeTab === 'review' && <p>Customer reviews will be displayed here.</p>}
        </div>
      </div>

      <ProductGridSection title="Related Products" products={allProducts.slice(0, 4)} />
      
      <FeaturesFooter />
      
      {/* Fullscreen Image Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: 32, right: 32, background: 'transparent', color: C.white, border: 'none', fontSize: 32, cursor: 'pointer' }}>✕</button>
          
          <img src={mainImage} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} alt="Fullscreen" />
          
          {thumbnails.length > 1 && (
            <>
               <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: '50%', background: C.white, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 24, color: C.textDark }}>←</button>
               <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} style={{ position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, borderRadius: '50%', background: C.textDark, color: C.white, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 24 }}>→</button>
            </>
          )}
        </div>
      )}

    </div>
  )
}

export default ProductDetails
