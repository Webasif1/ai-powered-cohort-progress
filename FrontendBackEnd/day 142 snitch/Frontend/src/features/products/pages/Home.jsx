import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'
import { Link } from 'react-router-dom'

/* ─── colour tokens ─── */
const C = {
  bg: '#fdf8f3',
  surface: 'rgba(255, 255, 255, 0.45)', // glass surface
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
    <div style={{ flex: 1, letterSpacing: '0.3px', color: '#e0e0e0' }}>Join our newsletter to get best Discount!</div>
    <div style={{ display: 'flex', gap: 32, fontWeight: 500, color: '#e0e0e0' }}>
      <span style={{ cursor: 'pointer' }}>United States (USD $) ∨</span>
      <span style={{ cursor: 'pointer' }}>English ∨</span>
    </div>
  </div>
)

const Header = () => (
  <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, position: 'sticky', top: 0, zIndex: 50, borderBottom: `1px solid ${C.border}` }}>
    {/* Logo */}
    <Link to="/" style={{ textDecoration: 'none' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: C.textDark, margin: 0, letterSpacing: '-0.02em' }}>
        Zewar.
      </h1>
    </Link>

    {/* Center Nav */}
    <nav style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600, color: C.textDark, alignItems: 'center', fontFamily: "'Outfit', sans-serif" }}>
      <Link to="/" style={{ color: C.textDark, textDecoration: 'none' }}>Home</Link>
      <Link to="/products" style={{ color: C.textMid, textDecoration: 'none', display: 'flex', gap: 6, alignItems: 'center' }}>
        Our Store <span style={{ fontSize: 10 }}>∨</span>
      </Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none', display: 'flex', gap: 6, alignItems: 'center' }}>
        Special <span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', fontSize: 10, borderRadius: 12, fontWeight: 700 }}>Hot</span>
      </Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none', display: 'flex', gap: 6, alignItems: 'center' }}>
        Categories <span style={{ background: '#ffebee', color: '#c62828', padding: '2px 6px', fontSize: 10, borderRadius: 12, fontWeight: 700 }}>New</span>
      </Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none', display: 'flex', gap: 6, alignItems: 'center' }}>
        Top Deals <span style={{ fontSize: 10 }}>∨</span>
      </Link>
      <Link to="#" style={{ color: C.textMid, textDecoration: 'none' }}>Reviews</Link>
    </nav>

    {/* Right Icons */}
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

const Hero = () => (
  <section style={{ background: C.bg, padding: '40px 48px 60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ maxWidth: 1400, width: '100%', display: 'flex', alignItems: 'center', gap: '5%', background: '#f6f1ec', borderRadius: 24, padding: '0 80px', minHeight: 450 }}>
      <div style={{ flex: 1, padding: '60px 0' }}>
        <p style={{ color: C.textMid, fontSize: 13, fontWeight: 700, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '1px' }}>Flat 15% Discount!</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 800, color: C.textDark, lineHeight: 1.1, margin: '0 0 20px' }}>
          Proven To Tackle<br />Wrinkles & Acne
        </h2>
        <p style={{ color: '#6d5a49', fontSize: 16, lineHeight: 1.6, marginBottom: 32, maxWidth: 360 }}>
          What makes us different? We treat you personally - and honestly.
        </p>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.textDark, marginBottom: 32, fontFamily: "'Playfair Display', serif" }}>
          From $49
        </div>
        <button style={{ background: C.primary, color: C.white, border: 'none', padding: '14px 32px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = C.textDark} onMouseLeave={e => e.currentTarget.style.background = C.primary}>
          Learn More
        </button>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="https://images.unsplash.com/photo-1598440947619-2c3f125f8eba?auto=format&fit=crop&w=800&q=80" alt="Cosmetics Products" style={{ width: '100%', maxWidth: 500, height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
      </div>
    </div>
  </section>
)

const Categories = () => {
  const cats = [
    { name: 'Concealer', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=150&q=80' },
    { name: 'Exfoliators', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=150&q=80' },
    { name: 'Creams', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=150&q=80' },
    { name: 'Brightening', img: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&w=150&q=80' },
    { name: 'Foundation', img: 'https://images.unsplash.com/photo-1629198725838-8c11438965f3?auto=format&fit=crop&w=150&q=80' },
    { name: 'Sunscreens', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80' },
    { name: 'Serum', img: 'https://images.unsplash.com/photo-1512496015851-a1c8cf71d80c?auto=format&fit=crop&w=150&q=80' }
  ]

  return (
    <section style={{ padding: '60px 48px', maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: C.textDark, marginBottom: 40 }}>Shop By Categories</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        {cats.map(c => (
          <div key={c.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
            <div style={{ width: 110, height: 110, borderRadius: 20, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${C.border}`, boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <img src={c.img} alt={c.name} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const Sustainability = () => (
  <section style={{ padding: '40px 48px', maxWidth: 1100, margin: '0 auto 60px' }}>
    <div style={{ background: '#fcfaf8', borderRadius: 24, display: 'flex', overflow: 'hidden', border: `1px solid ${C.border}` }}>
      <div style={{ flex: 1, position: 'relative', minHeight: 400 }}>
        <img src="https://images.unsplash.com/photo-1608248593842-83b3e2bf6cd4?auto=format&fit=crop&w=800&q=80" alt="Sustainability" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ flex: 0.8, padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: C.white }}>
        <p style={{ color: C.textMid, fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Welcome To Zewar Store!</p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.textDark, marginBottom: 20, lineHeight: 1.2 }}>Our Commitment<br/>To Sustainability</h3>
        <p style={{ color: C.textMid, fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>We exist to meet the needs of the present without compromising future generations' ability to meet their own.</p>
        <div>
          <button style={{ background: C.primary, color: C.white, border: 'none', padding: '12px 24px', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = C.textDark} onMouseLeave={e => e.currentTarget.style.background = C.primary}>
            Shop About Us
          </button>
        </div>
      </div>
    </div>
  </section>
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
        
        {/* Sale tag */}
      <div style={{ position: 'absolute', top: 16, left: 16, background: C.saleTag, color: C.white, fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 4, zIndex: 1, textTransform: 'uppercase' }}>
        Sale
      </div>

      <div style={{ width: '100%', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#fdfbfa', borderRadius: 12, overflow: 'hidden' }}>
         <img src={product.images && product.images[0] ? product.images[0].url : 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=300&q=80'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply', padding: 20 }} />
      </div>

      <h4 style={{ fontSize: 14, fontWeight: 700, color: C.textDark, margin: '0 0 8px', minHeight: 40, fontFamily: "'Outfit', sans-serif", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {product.title || product.name}
      </h4>

      <div style={{ display: 'flex', gap: 2, color: '#f3c623', fontSize: 12, marginBottom: 12 }}>
        ★★★★★ <span style={{ color: C.textMid, marginLeft: 4 }}>({rating})</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: '#a89a8c', textDecoration: 'line-through' }}>${oldPrice}</span>
        <span style={{ fontSize: 16, fontWeight: 800, color: C.textDark }}>${price}</span>
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: C.textDark, cursor: 'pointer', borderBottom: `1px solid ${C.textDark}`, display: 'inline-block', alignSelf: 'flex-start', paddingBottom: 2, marginTop: 'auto' }}>
        Choose options
      </div>
    </div>
    </Link>
  )
}

const ProductGridSection = ({ title, products }) => (
  <section style={{ padding: '40px 48px', maxWidth: 1400, margin: '0 auto 60px' }}>
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: C.textDark, marginBottom: 40, textAlign: 'center' }}>
      {title}
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
      {products && products.length > 0 ? (
        products.map((p, i) => <ProductCard key={p._id || i} product={p} />)
      ) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 40, color: C.textMid }}>No products available.</div>
      )}
    </div>
  </section>
)

const PromoBanners = () => (
  <section style={{ padding: '20px 48px', maxWidth: 1400, margin: '0 auto 80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
    {/* Banner 1 */}
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', background: '#333' }}>
      <img src="https://images.unsplash.com/photo-1512496015851-a1c8cf71d80c?auto=format&fit=crop&w=400&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} alt="Influencers" />
      <div style={{ position: 'absolute', bottom: 30, left: 24, right: 24 }}>
        <p style={{ color: C.white, fontSize: 12, margin: '0 0 6px', opacity: 0.9, letterSpacing: '0.5px' }}>Zewar</p>
        <h4 style={{ color: C.white, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>Chosen By<br/>Influencers</h4>
      </div>
    </div>
    {/* Banner 2 */}
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', background: '#ebdccb', padding: 30, display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ color: C.textDark, fontSize: 22, fontWeight: 700, margin: '0 0 10px', fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>Carefully<br/>Crafted</h4>
      <p style={{ color: C.textMid, fontSize: 13, margin: 0, lineHeight: 1.5 }}>Created After Years<br/>Of Research</p>
      <div style={{ marginTop: 'auto', alignSelf: 'center', width: '80%', height: '50%' }}>
         <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} alt="Crafted" />
      </div>
    </div>
    {/* Banner 3 */}
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', background: '#1c1c1c', padding: 30, display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ color: C.white, fontSize: 22, fontWeight: 700, margin: '0 0 10px', fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>15% Off Only<br/>This Week</h4>
      <p style={{ color: '#a0a0a0', fontSize: 13, margin: 0, lineHeight: 1.5 }}>15% Off Our<br/>Anti-Aging Cream</p>
      <div style={{ marginTop: 'auto', alignSelf: 'flex-end', width: '90%', height: '50%' }}>
         <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=200&q=80" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'rotate(-10deg) scale(1.1) translate(10%, 10%)' }} alt="Discount" />
      </div>
    </div>
    {/* Banner 4 */}
    <div style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', background: '#c1a58c' }}>
      <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&w=400&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Flaky Skin" />
      <div style={{ position: 'absolute', bottom: 30, left: 24, right: 24 }}>
        <p style={{ color: C.textDark, fontSize: 12, margin: '0 0 6px', fontWeight: 700, letterSpacing: '0.5px' }}>Flat 15% Off</p>
        <h4 style={{ color: C.textDark, fontSize: 22, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>Prevent Dry,<br/>Flaky Skin</h4>
      </div>
    </div>
  </section>
)

const PreFooter = () => (
  <section style={{ padding: '40px 48px', maxWidth: 1100, margin: '0 auto 80px', textAlign: 'center' }}>
    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: C.textDark, margin: '0 0 16px' }}>Get Your Customised Skincare Treatment</h3>
    <p style={{ color: C.textMid, fontSize: 15, margin: '0 auto 32px', maxWidth: 640, lineHeight: 1.6 }}>
      We have a specialized remedy to help you with any issues and advise you routines. Formica tristique. Donec rhoncus dignissim volutpat. Aliquam pellentesque scelerisque.
    </p>
    <div style={{ fontSize: 14, fontWeight: 700, color: C.textDark, cursor: 'pointer', borderBottom: `2px solid ${C.textDark}`, display: 'inline-block', paddingBottom: 4, marginBottom: 48 }}>
      Shop Skincare
    </div>
    <div style={{ width: '100%', height: 350, borderRadius: 24, overflow: 'hidden', background: C.surfaceLight, border: `1px solid ${C.border}` }}>
      <img src="https://images.unsplash.com/photo-1556228720-1c2f689e4c5b?auto=format&fit=crop&w=1200&q=80" alt="Special Skincare" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </section>
)

function Home() {
  const Product = useProduct()
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => {});
  const allProducts = useSelector((state) => state.product.allProducts) || []

  useEffect(() => {
    handleGetAllProducts()
  }, [])

  // Show 4 products per row
  const popularProducts = allProducts.slice(0, 4);
  const bestDeals = allProducts.length > 4 ? allProducts.slice(4, 8) : allProducts.slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Outfit', sans-serif", background: C.bg }}>
      <TopBar />
      <Header />
      <Hero />
      <Categories />
      <Sustainability />
      <ProductGridSection title="Popular On The Zewar Store." products={popularProducts} />
      <PromoBanners />
      <ProductGridSection title="Best Deals On The Zewar Store." products={bestDeals} />
      <PreFooter />
    </div>
  )
}

export default Home
