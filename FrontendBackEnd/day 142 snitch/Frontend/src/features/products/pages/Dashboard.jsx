import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct.js';
import { Link } from 'react-router-dom';

/* ─── colour tokens ─── */
const C = {
  bg: '#fcfaf8',
  surface: '#ffffff',
  border: 'rgba(232, 213, 192, 0.6)',
  primary: '#b8915a',
  primaryLt: '#d4b896',
  textDark: '#1e160f',
  textMid: '#8a7360',
  textLight: '#c4a882',
  accent: '#7c3aed', // Purple for the main call to action
  danger: '#ef4444',
  success: '#10b981',
  pillOrange: '#f59e0b',
  pillGreen: '#10b981',
  pillBlue: '#3b82f6',
  pillPurple: '#8b5cf6'
}

const SidebarItem = ({ icon, text, active, badge }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 12, cursor: 'pointer', background: active ? 'rgba(184,145,90,0.08)' : 'transparent', color: active ? C.primary : C.textMid, fontWeight: active ? 700 : 600, transition: 'all 0.2s', marginBottom: 4 }}
       onMouseEnter={e => !active && (e.currentTarget.style.color = C.primary)}
       onMouseLeave={e => !active && (e.currentTarget.style.color = C.textMid)}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span style={{ fontSize: 13 }}>{text}</span>
    </div>
    {badge && <span style={{ background: C.success, color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 100 }}>{badge}</span>}
  </div>
)

const Tab = ({ text, active }) => (
  <div style={{ padding: '12px 0', marginRight: 32, cursor: 'pointer', borderBottom: active ? `2px solid ${C.accent}` : '2px solid transparent', color: active ? C.accent : C.textMid, fontWeight: active ? 700 : 600, transition: 'all 0.2s', fontSize: 14 }}>
    {text}
  </div>
)

const FilterPill = ({ text, active, count }) => (
  <div style={{ padding: '6px 16px', borderRadius: 100, border: `1px solid ${active ? C.accent : C.border}`, color: active ? C.accent : C.textMid, fontWeight: active ? 700 : 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, background: active ? 'rgba(124,58,237,0.05)' : 'transparent' }}>
    {text} {count && <span style={{ color: C.textLight, fontSize: 12, fontWeight: 500 }}>{count}</span>}
  </div>
)

const Toggle = ({ active }) => (
  <div style={{ width: 36, height: 20, borderRadius: 100, background: active ? C.accent : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: active ? 19 : 3, transition: '0.3s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
  </div>
)

const getTypeColor = (type) => {
  if(type === 'PREMIUM') return C.pillOrange;
  if(type === 'STANDARD') return C.pillGreen;
  if(type === 'LIMITED') return C.pillBlue;
  return C.pillPurple;
}

export default function Dashboard() {
  const Product = useProduct();
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => { });
  const allProducts = useSelector((state) => state.product.allProducts) || [];

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: "'Outfit', sans-serif" }}>
      
      {/* SIDEBAR */}
      <aside style={{ width: 260, background: C.surface, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', top: 0, left: 0, zIndex: 10 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ width: 36, height: 36, borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #4c1d95)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 }}>Z</div>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: C.textDark, letterSpacing: '-0.02em' }}>ZewarAds</span>
        </div>

        {/* Store Selector */}
        <div style={{ padding: '24px 16px 12px' }}>
          <div style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', boxShadow: '0 2px 8px rgba(184,145,90,0.05)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏡</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textDark }}>Zewar Boutique</div>
              <div style={{ fontSize: 11, color: C.textMid }}>Premium Store</div>
            </div>
            <span style={{ color: C.textMid, fontSize: 10 }}>▼</span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: '12px 16px', flex: 1, overflowY: 'auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: 1, padding: '0 16px 12px' }}>ZEWAR BUSINESS</div>
          <SidebarItem icon="📊" text="Business Dashboard" />
          <SidebarItem icon="⚙️" text="Store Settings" />
          <SidebarItem icon="📦" text="Orders" badge="12 ACTIVE" />
          <SidebarItem icon="📋" text="Menu & Products" active={true} />
          <SidebarItem icon="👥" text="Customer Management" />
          <SidebarItem icon="💳" text="Wallet Management" />
          
          <div style={{ marginTop: 24, padding: '0 16px 12px', fontSize: 11, fontWeight: 800, color: C.textLight, textTransform: 'uppercase', letterSpacing: 1 }}>REWARDS</div>
          <div style={{ padding: '12px 16px', borderRadius: 12, border: `1px dashed ${C.primaryLt}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 18 }}>🏆</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>Refer & Earn</span>
            </div>
            <span style={{ background: 'rgba(184,145,90,0.1)', color: C.primary, fontSize: 11, fontWeight: 800, padding: '2px 6px', borderRadius: 100 }}>+15 PTS</span>
          </div>
          <SidebarItem icon="🪙" text="Points Dashboard" />
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <header style={{ height: 72, background: C.surface, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', position: 'sticky', top: 0, zIndex: 5 }}>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
             {/* Location */}
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.textMid, fontSize: 13, fontWeight: 600 }}>
               <span>📍</span> 380 W 62nd Ave, Denver, CO <span style={{ fontSize: 10, fontWeight: 800, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>RETAIL</span>
             </div>
             
             {/* Search */}
             <div style={{ display: 'flex', alignItems: 'center', background: C.bg, borderRadius: 100, padding: '8px 16px', width: 300, border: `1px solid ${C.border}` }}>
               <span style={{ color: C.textLight, fontSize: 14 }}>🔍</span>
               <input type="text" placeholder="Products, retailers & more..." style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: 8, fontSize: 13, color: C.textDark, width: '100%', fontWeight: 500 }} />
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
             {/* Toggles */}
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, fontWeight: 600, color: C.textMid }}>
               Products <span style={{fontSize:10}}>▼</span>
             </div>
             <div style={{ fontSize: 12, fontWeight: 600, color: C.textMid, cursor: 'pointer' }}>Brands</div>
             <div style={{ fontSize: 12, fontWeight: 600, color: C.textMid, cursor: 'pointer' }}>Retailers</div>

             <div style={{ height: 24, width: 1, background: C.border }}></div>

             {/* Profile */}
             <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
               <img src="https://i.pravatar.cc/100?img=33" style={{ width: 32, height: 32, borderRadius: '50%' }} alt="User" />
               <span style={{ fontSize: 13, fontWeight: 700, color: C.textDark }}>Hi, jakubstaron <span style={{fontSize: 10, marginLeft: 4}}>▼</span></span>
             </div>

             {/* Icons */}
             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <span style={{ fontSize: 20, color: C.accent, cursor: 'pointer' }}>💜</span>
               <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.accent, padding: '8px 16px', borderRadius: 100, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
                 <span style={{fontSize: 16}}>🛒</span> <span style={{ fontSize: 13, fontWeight: 800 }}>90.99 USD</span>
               </div>
             </div>
           </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main style={{ padding: '40px 48px', flex: 1 }}>
           
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
             <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: C.textDark, margin: 0 }}>Menu & Products</h1>
             
             {/* Top Right Illustration Block (Simulated) */}
             <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(253,248,243,0))', padding: '16px 24px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 24 }}>✨</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.textDark }}>Store Performance</div>
                  <div style={{ fontSize: 12, color: C.textMid, fontWeight: 500 }}>Looking good this week.</div>
                </div>
             </div>
           </div>

           {/* Tabs */}
           <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 32 }}>
             <Tab text="My Menu" active={true} />
             <Tab text="Discounts & Specials" />
             <Tab text="Hot Deals" />
             <Tab text="Boost Product" />
             <Tab text="Boost Dispensary" />
             <Tab text="Connect API" />
           </div>

           {/* Main Data Card */}
           <div style={{ background: C.surface, borderRadius: 24, padding: 32, boxShadow: '0 10px 40px rgba(184,145,90,0.06)', border: `1px solid ${C.border}` }}>
             
             {/* Toolbar */}
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
               <div style={{ display: 'flex', gap: 24, fontSize: 15 }}>
                 <span style={{ fontWeight: 800, color: C.accent, borderBottom: `2px solid ${C.accent}`, paddingBottom: 8 }}>Products ({allProducts.length})</span>
                 <span style={{ fontWeight: 600, color: C.textMid, cursor: 'pointer' }}>Drafts (3)</span>
               </div>
               
               <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                 <div style={{ display: 'flex', alignItems: 'center', background: C.bg, borderRadius: 100, padding: '10px 20px', width: 280, border: `1px solid ${C.border}` }}>
                   <span style={{ color: C.textLight, fontSize: 14 }}>🔍</span>
                   <input type="text" placeholder="Search for Product..." style={{ border: 'none', background: 'transparent', outline: 'none', marginLeft: 8, fontSize: 13, color: C.textDark, width: '100%', fontWeight: 500 }} />
                 </div>
                 
                 <Link to="/create-product" style={{ textDecoration: 'none' }}>
                   <button style={{ background: C.accent, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
                     <span>+</span> Add New Product to the Menu
                   </button>
                 </Link>
               </div>
             </div>

             {/* Filter Pills */}
             <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
               <FilterPill text="All" active={true} />
               <FilterPill text="Skincare" count="(141)" />
               <FilterPill text="Cosmetics" count="(21)" />
               <FilterPill text="Serums" count="(13)" />
               <FilterPill text="Jewelry" count="(14)" />
               <FilterPill text="Rings" count="(17)" />
               <FilterPill text="Necklaces" count="(12)" />
               <FilterPill text="Tools" count="(10)" />
             </div>

             {/* Table */}
             <div style={{ overflowX: 'auto' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 900 }}>
                 <thead>
                   <tr style={{ background: C.bg, color: C.textMid, fontSize: 12, fontWeight: 700 }}>
                     <th style={{ padding: '16px 24px', borderRadius: '12px 0 0 12px', width: 40 }}><input type="checkbox" /></th>
                     <th style={{ padding: '16px' }}>Product Name <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>Category <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>Type <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>Brand <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>Price <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>In Stock <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px' }}>Visibility <span style={{fontSize:10, marginLeft: 4}}>⇅</span></th>
                     <th style={{ padding: '16px', borderRadius: '0 12px 12px 0', width: 40 }}></th>
                   </tr>
                 </thead>
                 <tbody>
                   {allProducts && allProducts.length > 0 ? allProducts.map((p, i) => {
                     // Add varying mock data to match the image UI variety
                     const types = ['PREMIUM', 'STANDARD', 'LIMITED', 'EXCLUSIVE'];
                     const mockType = types[i % 4];
                     const typeColor = getTypeColor(mockType);
                     const inStock = i % 3 !== 0;

                     return (
                       <tr key={p._id || i} style={{ borderBottom: `1px solid ${C.bg}`, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                         <td style={{ padding: '20px 24px' }}><input type="checkbox" /></td>
                         <td style={{ padding: '20px 16px' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                             <img src={p.images?.[0]?.url || '/assets/img/favicon.png'} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', background: '#e2e8f0' }} alt="" />
                             <span style={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>{p.title || p.name || `Product ${i+1}`}</span>
                           </div>
                         </td>
                         <td style={{ padding: '20px 16px', fontSize: 13, color: C.textMid, fontWeight: 600 }}>{p.category || 'Skincare'}</td>
                         <td style={{ padding: '20px 16px' }}>
                           <span style={{ color: typeColor, fontSize: 10, fontWeight: 800, letterSpacing: 0.5, border: `1px solid ${typeColor}`, padding: '4px 8px', borderRadius: 4 }}>{mockType}</span>
                         </td>
                         <td style={{ padding: '20px 16px' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                             <div style={{ width: 24, height: 24, borderRadius: 6, background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 'bold' }}>Z</div>
                             <span style={{ fontSize: 13, fontWeight: 700, color: C.textDark }}>Zewar</span>
                           </div>
                         </td>
                         <td style={{ padding: '20px 16px', fontSize: 14, fontWeight: 700, color: C.textDark }}>${parseFloat(p.price?.amount || p.price || 50).toFixed(2)}</td>
                         <td style={{ padding: '20px 16px' }}>
                           {inStock ? (
                             <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.success, fontWeight: 700 }}>
                               <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.success }}></div> {Math.floor(Math.random() * 50) + 1} oz
                             </div>
                           ) : (
                             <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.textMid, fontWeight: 600 }}>
                               <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.danger }}></div> No Info
                             </div>
                           )}
                         </td>
                         <td style={{ padding: '20px 16px' }}>
                           <Toggle active={inStock} />
                         </td>
                         <td style={{ padding: '20px 16px', color: C.textMid, cursor: 'pointer', textAlign: 'center', fontSize: 20 }}>⋮</td>
                       </tr>
                     )
                   }) : (
                     <tr>
                       <td colSpan="9" style={{ padding: '60px', textAlign: 'center', color: C.textMid, fontWeight: 600 }}>No products found. Add some from your menu.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>

             {/* Pagination */}
             <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, cursor: 'pointer' }}>‹</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.accent}`, background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent, fontWeight: 700, cursor: 'pointer' }}>1</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid transparent`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, fontWeight: 600, cursor: 'pointer' }}>2</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid transparent`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, fontWeight: 600, cursor: 'pointer' }}>3</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid transparent`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, fontWeight: 600 }}>...</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid transparent`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, fontWeight: 600, cursor: 'pointer' }}>8</div>
                  <div style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textMid, cursor: 'pointer' }}>›</div>
                </div>
             </div>

           </div>

        </main>
      </div>

    </div>
  )
}
