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
}

const glassStyle = {
  background: C.surface,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${C.border}`,
  boxShadow: '0 8px 32px rgba(184, 145, 90, 0.08)'
}

const BackgroundBlobs = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', background: C.bg }}>
    <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,145,90,0.12) 0%, rgba(253,248,243,0) 70%)', filter: 'blur(40px)' }}></div>
    <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,213,192,0.3) 0%, rgba(253,248,243,0) 70%)', filter: 'blur(60px)' }}></div>
    <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,184,150,0.15) 0%, rgba(253,248,243,0) 70%)', filter: 'blur(40px)' }}></div>

    {/* geometric floaters */}
    <div style={{ position: 'absolute', top: '15%', right: '40%', width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #d4b896, #b8915a)', boxShadow: '0 4px 12px rgba(184,145,90,0.3)' }}></div>
    <div style={{ position: 'absolute', top: '45%', left: '5%', width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #ffffff, #e8d5c0)', boxShadow: '0 8px 16px rgba(232,213,192,0.3)' }}></div>
    <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #b8915a, #8a7360)', boxShadow: '0 4px 12px rgba(138,115,96,0.3)' }}></div>
  </div>
)

const GlassProductCard = ({ product }) => (
  <div style={{ ...glassStyle, borderRadius: 24, padding: 16, display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', zIndex: 1, position: 'relative' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
  >
    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: 16, overflow: 'hidden', marginBottom: 16, background: C.surfaceLight }}>
      <img src={product.images && product.images[0] ? product.images[0].url : ''} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Top badges within image area */}
      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, color: C.primary, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <span>☁️</span> Home
      </div>

      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
        <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', color: C.textMid, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>▤</div>
        <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, cursor: 'pointer', color: C.primary, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>✓</div>
      </div>
    </div>

    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: C.textDark, margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title || product.name}</h3>
    <p style={{ fontSize: 12, color: C.textMid, margin: '0 0 16px', fontWeight: 500 }}>2753 Active • 🌟 4.8</p>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
      <span style={{ fontSize: 18, fontWeight: 800, color: C.textDark }}>${parseFloat(product.price?.amount || 0).toFixed(2)} Ceft</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.textLight, display: 'flex', alignItems: 'center', gap: 4 }}>📍 Chicago</span>
    </div>
  </div>
)

function Home() {
  const Product = useProduct()
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => { });
  const allProducts = useSelector((state) => state.product.allProducts) || []

  useEffect(() => {
    handleGetAllProducts()
  }, [])

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Outfit', sans-serif", position: 'relative' }}>
      <BackgroundBlobs />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ maxWidth: 1400, margin: '24px auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #b8915a, #8a7360)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>Z</div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: C.textDark, letterSpacing: '-0.02em' }}>ZewarAds</span>
          </div>

          {/* Nav Pill */}
          <nav style={{ ...glassStyle, borderRadius: 100, padding: '8px', display: 'flex', gap: 4, fontSize: 14, fontWeight: 600, color: C.textDark }}>
            <Link to="/" style={{ color: C.textDark, textDecoration: 'none', padding: '8px 20px', borderRadius: 100, background: 'rgba(255,255,255,0.7)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>Home</Link>
            <Link to="/create-products" style={{ color: C.textMid, textDecoration: 'none', padding: '8px 20px' }}>Animas</Link>
            <a href="#" style={{ color: C.textMid, textDecoration: 'none', padding: '8px 20px' }}>Seet</a>
            <a href="#" style={{ color: C.textMid, textDecoration: 'none', padding: '8px 20px' }}>Treding</a>
            <Link to="/login" style={{ color: C.textMid, textDecoration: 'none', padding: '8px 20px' }}>Login</Link>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ cursor: 'pointer', color: C.textDark, fontSize: 20, ...glassStyle, width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📂</span>
            <button style={{ background: C.primary, color: C.white, border: 'none', padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 6px 16px rgba(184,145,90,0.3)' }}>Call Us</button>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{ maxWidth: 1400, margin: '60px auto 100px', padding: '0 48px', display: 'flex', alignItems: 'center', gap: '5%' }}>

          <div style={{ flex: 1, paddingRight: '5%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.textMid, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              <span>Browsted Vetairl</span> <span style={{ fontSize: 10 }}>⯆</span>
            </div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 56, fontWeight: 800, color: C.textDark, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              The Classified Ads
            </h1>
            <p style={{ fontSize: 16, color: '#5c4a3d', marginBottom: 40, lineHeight: 1.6, fontWeight: 500, maxWidth: 440 }}>
              Tey ured dt.liins Classilfen atrs ul bnangprefferant
              geo on the fred hiy clojeah our snese lifto hane
              mast cammisation hamo.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', ...glassStyle, padding: '6px', borderRadius: 100 }}>
              <button style={{ background: C.primary, color: C.white, border: 'none', padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(184,145,90,0.3)' }}>
                Home
              </button>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
                <input type="text" placeholder="Search It" style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 15, color: C.textDark, width: 90, fontWeight: 700 }} />
              </div>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '5/4', ...glassStyle, borderRadius: 32, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.6)' }}>
              <img src="/assets/img/clean_hero_banner_1776539186065.png" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }} alt="Hero" />
            </div>

            {/* Floating spheres mimicking the 3d elements */}
            <div style={{ position: 'absolute', top: -30, right: 40, width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #b8915a, #fdf8f3)', boxShadow: '0 8px 16px rgba(184,145,90,0.3)' }}></div>
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #d4b896, #ffffff)', boxShadow: '0 10px 20px rgba(184,145,90,0.2)' }}></div>
            <div style={{ position: 'absolute', top: '40%', left: -30, width: 28, height: 28, borderRadius: '50%', background: '#8a7360', boxShadow: '0 4px 12px rgba(138,115,96,0.3)' }}></div>
            <div style={{ position: 'absolute', bottom: '20%', right: -15, width: 20, height: 20, borderRadius: '50%', background: '#1e160f', boxShadow: '0 2px 8px rgba(30,22,15,0.4)' }}></div>
          </div>

        </section>

        {/* Categories Section */}
        <section style={{ maxWidth: 1400, margin: '80px auto', padding: '0 48px' }}>
          <div style={{ ...glassStyle, borderRadius: 32, padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* top links pill */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', display: 'inline-flex', gap: 16, padding: '12px 32px', borderRadius: 100, border: `1px solid ${C.border}`, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ background: 'rgba(184,145,90,0.15)', color: C.textDark, padding: '6px 16px', borderRadius: 100, fontWeight: 700, fontSize: 13 }}>WomenApp</span>
                {['Blue', 'Electstion', 'Funaiture', 'Auto Andst...', 'Animal', 'Services', 'Euroris'].map((link, i) => (
                  <span key={link} style={{ color: C.textMid, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    {i === 4 && '🕒'}
                    {i === 5 && '✔'}
                    {i === 6 && '💵'}
                    {link}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)` }}></div>

            {/* category icons */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4%' }}>
              {[
                { name: 'Caegrey', icon: '📦' },
                { name: 'Categories', icon: '📑' },
                { name: 'Electronies', icon: '👔' },
                { name: 'Loradion', icon: '🏠' },
                { name: 'Deshboard', icon: '📋' },
                { name: 'Trevices', icon: '🤍' }
              ].map(cat => (
                <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, cursor: 'pointer', flex: 1, minWidth: 80, position: 'relative' }}
                  onMouseEnter={e => e.currentTarget.children[0].style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.children[0].style.transform = 'none'}
                >
                  <div style={{ width: '100%', maxWidth: 80, aspectRatio: '1', borderRadius: 20, background: 'rgba(255,255,255,0.8)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, transition: 'transform 0.2s', boxShadow: '0 4px 16px rgba(184,145,90,0.06)' }}>
                    {cat.icon}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.textMid }}>{cat.name}</span>
                  {cat.name === 'Caegrey' && <div style={{ position: 'absolute', bottom: -16, width: 24, height: 3, background: C.primary, borderRadius: 2 }}></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Ads */}
        <section style={{ maxWidth: 1400, margin: '100px auto 80px', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 700, color: C.textDark, margin: '0 0 8px' }}>Featured AaxIs</h2>
              <p style={{ color: C.textMid, fontSize: 15, margin: 0, fontWeight: 500 }}>Dee Alos for the atutres ently ClassiAds</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'transparent', border: `1px solid ${C.border}`, cursor: 'pointer', color: C.textMid, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 16 }}>←</button>
              <button style={{ width: 40, height: 40, borderRadius: '50%', ...glassStyle, cursor: 'pointer', color: C.primary, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 16 }}>→</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {allProducts && allProducts.length > 0 ? allProducts.slice(0, 4).map(p => <GlassProductCard key={p._id} product={p} />) : <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: 40 }}>No products available yet. Create some from the dashboard!</div>}
          </div>
        </section>

        {/* Feature listings */}
        <section style={{ maxWidth: 1400, margin: '80px auto', padding: '0 48px', paddingBottom: 100 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 700, color: C.textDark, margin: '0' }}>Feature listings</h2>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button style={{ background: C.primary, color: C.white, border: 'none', borderRadius: 100, padding: '10px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(184,145,90,0.3)' }}>Login</button>
              <button style={{ width: 40, height: 40, borderRadius: '50%', background: 'transparent', border: `1px solid ${C.border}`, cursor: 'pointer', color: C.textMid, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 16 }}>⚙</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {allProducts && allProducts.length > 4 ? allProducts.slice(4, 8).map(p => <GlassProductCard key={p._id} product={p} />) : allProducts && allProducts.length > 0 ? allProducts.slice(0, 4).map(p => <GlassProductCard key={p._id + 'duplicate'} product={p} />) : null}
          </div>
        </section>
      </div>

    </div>
  )
}

export default Home
