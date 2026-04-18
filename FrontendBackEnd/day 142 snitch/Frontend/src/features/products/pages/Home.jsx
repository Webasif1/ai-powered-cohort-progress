import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'
import { Link } from 'react-router-dom'

/* ─── colour tokens ─── */
const C = {
  bg: '#fdf8f3',
  surface: '#f5ede4',
  border: '#e8d5c0',
  borderFocus: '#b8915a',
  primary: '#b8915a',
  primaryHov: '#a07848',
  primaryLt: '#d4b896',
  textDark: '#1e160f',
  textMid: '#8a7360',
  textLight: '#c4a882',
  white: '#fdf8f3',
  danger: '#c0392b',
  shadow: 'rgba(184,145,90,0.18)',
}

const ProductCard = ({ product }) => {
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 16, padding: 16, transition: 'transform 0.2s', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', marginBottom: 16, background: C.surface }}>
        <img src={product.images && product.images[0] ? product.images[0].url : ''} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span style={{ position: 'absolute', top: 12, left: 12, background: C.danger, color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Sale</span>
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.textDark, margin: '0 0 8px', lineHeight: 1.3 }}>{product.title || product.name}</h3>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        <span style={{ color: C.primary, fontSize: 14 }}>★★★★★</span> <span style={{ color: C.textMid, fontSize: 12 }}>(12)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: C.textMid, textDecoration: 'line-through' }}>${(product.comparePrice || (product.price?.amount * 1.2))?.toFixed(2)}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: C.textDark }}>${parseFloat(product.price?.amount || 0).toFixed(2)}</span>
      </div>
      <button style={{ width: '100%', background: C.surface, color: C.textDark, border: 'none', padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.textDark; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.textDark }}
      >
        Add to cart
      </button>
    </div>
  )
}

function Home() {
  const Product = useProduct()
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => { });
  const allProducts = useSelector((state) => state.product.allProducts) || []

  useEffect(() => {
    handleGetAllProducts()
  }, [])

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>

      {/* Announcement Bar */}
      <div style={{ background: C.textDark, color: C.white, fontSize: 12, padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 500 }}>Join our newsletter to get best Discount!</div>
        <div style={{ display: 'flex', gap: 20, fontWeight: 500 }}>
          <span style={{ cursor: 'pointer' }}>United States (USD $) ▾</span>
          <span style={{ cursor: 'pointer' }}>English ▾</span>
        </div>
      </div>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: `1px solid ${C.border}`, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: C.textDark, letterSpacing: '-0.02em' }}>Zewar.</div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 600, color: C.textMid }}>
          <Link to="/" style={{ color: C.primary, textDecoration: 'none' }}>Home</Link>
          <a href="#" style={{ color: C.textMid, textDecoration: 'none' }}>Our Store ▾</a>
          <a href="#" style={{ color: C.textMid, textDecoration: 'none' }}>Special <span style={{ color: '#fff', background: '#22c55e', padding: '2px 6px', borderRadius: 10, fontSize: 10, marginLeft: 4 }}>Hot</span></a>
          <Link to="/create-product" style={{ color: C.textMid, textDecoration: 'none' }}>Categories ▾</Link>
          <a href="#" style={{ color: C.textMid, textDecoration: 'none' }}>Top Tools ▾</a>
          <a href="#" style={{ color: C.textMid, textDecoration: 'none' }}>More ▾</a>
        </nav>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', color: C.textDark, fontSize: 18 }}>
          <span style={{ cursor: 'pointer' }}>🔍</span>
          <span style={{ cursor: 'pointer' }}>🤍</span>
          <Link to="/login" style={{ textDecoration: 'none', cursor: 'pointer' }}>👤</Link>
          <span style={{ cursor: 'pointer' }}>👜 <span style={{ fontSize: 13, fontWeight: 800, marginLeft: 4 }}>$0.00</span></span>
        </div>
      </header>

      {/* Hero Slider */}
      <section style={{
        position: 'relative',
        height: '650px',
        backgroundImage: 'url(/assets/img/clean_hero_banner_1776539186065.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', alignItems: 'center'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 32px' }}>
          <div style={{ maxWidth: 480, padding: '24px 0' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 800, color: C.textDark, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(253, 248, 243, 0.9)' }}>Elegant Beauty<br />& Fine Jewelry</h1>
            <p style={{ fontSize: 17, color: '#1e160f', marginBottom: 36, lineHeight: 1.6, fontWeight: 600, textShadow: '0 2px 10px rgba(253, 248, 243, 0.9)' }}>Discover our premium collection of Zewar cosmetics and jewelry. Elevate your aesthetic.</p>
            <button style={{ background: C.textDark, color: C.white, border: 'none', padding: '14px 36px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#000'}
              onMouseLeave={e => e.currentTarget.style.background = C.textDark}
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '80px auto', padding: '0 32px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, color: C.textDark, marginBottom: 40, letterSpacing: '-0.02em' }}>Shop By Categories</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
          {[
            { name: 'Skincare', color: '#e6d5c3' },
            { name: 'Necklaces', color: '#d8cfc4' },
            { name: 'Creams', color: '#e8dbce' },
            { name: 'Rings', color: '#c7bca1' },
            { name: 'Earrings', color: '#d1cabb' },
            { name: 'Serums', color: '#e3cfb4' }
          ].map(cat => (
            <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.children[0].style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.children[0].style.transform = 'none'}
            >
              <div style={{ width: 110, height: 110, background: '#fff', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.border}`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 20px rgba(184,145,90,0.05)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: cat.color }} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.textMid }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          background: '#fff', borderRadius: 32, overflow: 'hidden',
          border: `1px solid ${C.border}`,
          boxShadow: '0 20px 40px rgba(184,145,90,0.06)'
        }}>
          <img src="/assets/img/sustainability_banner_1776537082069.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sustainability" />
          <div style={{ padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fcf6f0' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.textMid, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Welcome nicely to Zewar</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: C.textDark, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.02em' }}>Our Commitment<br />To Sustainability</h2>
            <p style={{ fontSize: 16, color: '#5c4a3d', lineHeight: 1.6, marginBottom: 36, fontWeight: 500 }}>We meet the needs of the present without compromising future generations' ability to meet their own. Discover our eco-friendly practices.</p>
            <div>
              <button style={{ background: C.textDark, color: C.white, border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#000'}
                onMouseLeave={e => e.currentTarget.style.background = C.textDark}
              >
                Read About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: C.textDark, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Popular On Zewar.</h2>
        {allProducts && allProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {allProducts.slice(0, 4).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: 20, border: `1px dashed ${C.border}`, color: C.textMid, fontWeight: 600 }}>
            No products available yet. Create some from the dashboard!
          </div>
        )}
      </section>

      {/* Tri Banners */}
      <section style={{ maxWidth: 1200, margin: '0 auto 80px', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>

        {/* Banner 1 */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '0.8', boxShadow: '0 15px 30px rgba(0,0,0,0.08)' }}>
          <img src="/assets/img/influencer_banner_1776537245523.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Chosen by Influencers" />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 36, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Zewar Beauty</span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 32, fontWeight: 800, margin: '8px 0 0', lineHeight: 1.1 }}>Chosen By<br />Influencers</h3>
          </div>
        </div>

        {/* Banner 2 */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '0.8', background: C.surface, boxShadow: '0 15px 30px rgba(184,145,90,0.1)' }}>
          <img src="/assets/img/carefully_crafted_banner_1776537312169.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} alt="Carefully Crafted" />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 36 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: C.textDark, fontSize: 32, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.1 }}>Carefully<br />Crafted</h3>
            <p style={{ color: '#5c4a3d', fontSize: 15, margin: 0, maxWidth: 200, fontWeight: 600, lineHeight: 1.5 }}>Created after years of intense botanical research.</p>
          </div>
        </div>

        {/* Banner 3 */}
        <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', aspectRatio: '0.8', background: '#111', boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}>
          <img src="/assets/img/discount_offer_banner_1776537468007.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Discount" />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 36 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.1 }}>15% Off Only<br />This Week</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0, fontWeight: 600 }}>Use Code ZEW15 at checkout</p>
          </div>
          <div style={{ position: 'absolute', bottom: 36, left: 36 }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>Premium Cosmetics</h4>
          </div>
        </div>

      </section>

      {/* Best Deals */}
      <section style={{ maxWidth: 1200, margin: '0 auto 100px', padding: '0 32px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: C.textDark, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em' }}>Best Deals On Zewar.</h2>
        {allProducts && allProducts.length > 4 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {allProducts.slice(4, 8).map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Footer Pre */}
      <section style={{ background: '#fff', padding: '80px 32px', textAlign: 'center', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 650, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, color: C.textDark, margin: '0 0 20px', letterSpacing: '-0.02em' }}>Get Your Customised Skincare Treatment</h2>
          <p style={{ fontSize: 16, color: '#5c4a3d', margin: '0 auto 40px', lineHeight: 1.6, fontWeight: 500 }}>We have a specialised service to help you with any issues and advice you desire. Famous boutique, finest choices, sign up for latest Zewar collection.</p>
          <button style={{ background: '#fff', color: C.textDark, border: `2px solid ${C.textDark}`, padding: '14px 36px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.textDark; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = C.textDark }}
          >
            Shop Skincare
          </button>
        </div>
      </section>

    </div>
  )
}

export default Home
