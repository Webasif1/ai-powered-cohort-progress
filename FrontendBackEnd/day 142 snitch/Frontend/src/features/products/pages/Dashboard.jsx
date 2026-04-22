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
  accent: '#7c3aed',
  danger: '#ef4444',
  success: '#10b981',
  pillOrange: '#f59e0b',
  pillGreen: '#10b981',
  pillBlue: '#3b82f6',
  pillPurple: '#8b5cf6'
}

const SidebarItem = ({ icon, text, active, badge }) => (
  <div className={`flex items-center justify-between py-[12px] px-[16px] rounded-[12px] cursor-pointer transition-all duration-200 mb-[4px] ${active ? 'bg-[rgba(184,145,90,0.08)] text-[#b8915a] font-bold' : 'bg-transparent text-[#8a7360] font-semibold hover:text-[#b8915a]'}`}>
    <div className="flex items-center gap-[12px]">
      <span className="text-[18px]">{icon}</span>
      <span className="text-[13px]">{text}</span>
    </div>
    {badge && <span className="bg-[#10b981] text-white text-[10px] font-extrabold py-[2px] px-[8px] rounded-full">{badge}</span>}
  </div>
)

const Tab = ({ text, active }) => (
  <div className={`py-[12px] px-0 mr-[16px] sm:mr-[32px] cursor-pointer transition-all duration-200 text-[13px] sm:text-[14px] whitespace-nowrap ${active ? 'border-b-2 border-[#7c3aed] text-[#7c3aed] font-bold' : 'border-b-2 border-transparent text-[#8a7360] font-semibold'}`}>
  {text}
</div>
)

const FilterPill = ({ text, active, count }) => (
  <div className={`py-[5px] sm:py-[6px] px-[12px] sm:px-[16px] rounded-full text-[12px] sm:text-[13px] cursor-pointer flex items-center gap-[6px] ${active ? 'border border-[#7c3aed] text-[#7c3aed] font-bold bg-[rgba(124,58,237,0.05)]' : 'border border-[rgba(232,213,192,0.6)] text-[#8a7360] font-semibold bg-transparent'}`}>
  {text} {count && <span className="text-[#c4a882] text-[12px] font-medium">{count}</span>}
</div>
)

const Toggle = ({ active }) => (
  <div className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors duration-300 ${active ? 'bg-[#7c3aed]' : 'bg-[#e2e8f0]'}`}>
    <div className={`w-[14px] h-[14px] rounded-full bg-white absolute top-[3px] transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${active ? 'left-[19px]' : 'left-[3px]'}`}></div>
  </div>
)

const getTypeColor = (type) => {
  if (type === 'PREMIUM') return C.pillOrange;
  if (type === 'STANDARD') return C.pillGreen;
  if (type === 'LIMITED') return C.pillBlue;
  return C.pillPurple;
}

export default function Dashboard() {
  const Product = useProduct();
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => { });
  const allProducts = useSelector((state) => state.product.allProducts) || [];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fcfaf8] font-outfit">

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-[9] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`w-[260px] bg-white border-r border-[rgba(232,213,192,0.6)] flex flex-col fixed h-screen top-0 left-0 z-10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Close button (mobile) */}
        <button
          className="lg:hidden absolute top-[16px] right-[16px] bg-transparent border-none text-[#8a7360] text-[24px] cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-[10px] p-[24px] border-b border-[rgba(232,213,192,0.6)]">
          <div className="w-[36px] h-[36px] rounded-[12px] bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] text-white flex items-center justify-center font-bold text-[20px]">Z</div>
          <span className="font-outfit text-[22px] font-extrabold text-[#1e160f] tracking-[-0.02em]">ZewarAds</span>
        </div>

        {/* Store Selector */}
        <div className="pt-[24px] px-[16px] pb-[12px]">
          <div className="py-[12px] px-[16px] rounded-[12px] border border-[rgba(232,213,192,0.6)] flex items-center gap-[12px] cursor-pointer shadow-[0_2px_8px_rgba(184,145,90,0.05)]">
            <div className="w-[32px] h-[32px] rounded-[8px] bg-[#f8f9fa] flex items-center justify-center text-[16px]">🏡</div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-[#1e160f]">Zewar Boutique</div>
              <div className="text-[11px] text-[#8a7360]">Premium Store</div>
            </div>
            <span className="text-[#8a7360] text-[10px]">▼</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="py-[12px] px-[16px] flex-1 overflow-y-auto">
          <div className="text-[11px] font-extrabold text-[#c4a882] uppercase tracking-[1px] pt-0 px-[16px] pb-[12px]">ZEWAR BUSINESS</div>
          <SidebarItem icon="📊" text="Business Dashboard" />
          <SidebarItem icon="⚙️" text="Store Settings" />
          <SidebarItem icon="📦" text="Orders" badge="12 ACTIVE" />
          <SidebarItem icon="📋" text="Menu & Products" active={true} />
          <SidebarItem icon="👥" text="Customer Management" />
          <SidebarItem icon="💳" text="Wallet Management" />

          <div className="mt-[24px] pt-0 px-[16px] pb-[12px] text-[11px] font-extrabold text-[#c4a882] uppercase tracking-[1px]">REWARDS</div>
          <div className="py-[12px] px-[16px] rounded-[12px] border border-dashed border-[#d4b896] flex items-center justify-between cursor-pointer mb-[4px]">
            <div className="flex items-center gap-[12px]">
              <span className="text-[18px]">🏆</span>
              <span className="text-[13px] font-bold text-[#b8915a]">Refer &amp; Earn</span>
            </div>
            <span className="bg-[rgba(184,145,90,0.1)] text-[#b8915a] text-[11px] font-extrabold py-[2px] px-[6px] rounded-full">+15 PTS</span>
          </div>
          <SidebarItem icon="🪙" text="Points Dashboard" />
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-w-0">

        {/* HEADER */}
        <header className="h-[64px] lg:h-[72px] bg-white border-b border-[rgba(232,213,192,0.6)] flex items-center justify-between py-0 px-[16px] sm:px-[24px] lg:px-[32px] sticky top-0 z-[5]">

          <div className="flex items-center gap-[12px] sm:gap-[32px]">
            {/* Hamburger (mobile) */}
            <button
              className="lg:hidden flex flex-col gap-[4px] cursor-pointer bg-transparent border-none p-[4px]"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <span className="block w-[20px] h-[2px] bg-[#1e160f] rounded" />
              <span className="block w-[20px] h-[2px] bg-[#1e160f] rounded" />
              <span className="block w-[20px] h-[2px] bg-[#1e160f] rounded" />
            </button>

            {/* Location */}
            <div className="hidden sm:flex items-center gap-[8px] text-[#8a7360] text-[13px] font-semibold">
              <span>📍</span> <span className="hidden md:inline">380 W 62nd Ave, Denver, CO</span> <span className="text-[10px] font-extrabold bg-[#f1f5f9] py-[2px] px-[6px] rounded-[4px] ml-[4px]">RETAIL</span>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center bg-[#fcfaf8] rounded-full py-[8px] px-[16px] w-[200px] lg:w-[300px] border border-[rgba(232,213,192,0.6)]">
              <span className="text-[#c4a882] text-[14px]">🔍</span>
              <input type="text" placeholder="Search products..." className="border-none bg-transparent outline-none ml-[8px] text-[13px] text-[#1e160f] w-full font-medium" />
            </div>
          </div>

          <div className="flex items-center gap-[12px] sm:gap-[24px]">
            {/* Toggles (hidden on mobile) */}
            <div className="hidden lg:flex items-center gap-[12px] text-[12px] font-semibold text-[#8a7360]">
              Products <span className="text-[10px]">▼</span>
            </div>
            <div className="hidden lg:block text-[12px] font-semibold text-[#8a7360] cursor-pointer">Brands</div>
            <div className="hidden lg:block text-[12px] font-semibold text-[#8a7360] cursor-pointer">Retailers</div>

            <div className="hidden lg:block h-[24px] w-[1px] bg-[rgba(232,213,192,0.6)]"></div>

            {/* Profile */}
            <div className="flex items-center gap-[8px] sm:gap-[12px] cursor-pointer">
              <img src="https://i.pravatar.cc/100?img=33" className="w-[32px] h-[32px] rounded-full" alt="User" />
              <span className="hidden sm:block text-[13px] font-bold text-[#1e160f]">Hi, jakubstaron <span className="text-[10px] ml-[4px]">▼</span></span>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-[6px] sm:gap-[8px] bg-[#7c3aed] py-[6px] sm:py-[8px] px-[12px] sm:px-[16px] rounded-full text-white cursor-pointer shadow-[0_4px_12px_rgba(124,58,237,0.3)]">
              <span className="text-[16px]">🛒</span>
              <span className="hidden sm:block text-[13px] font-extrabold">90.99 USD</span>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="py-[24px] sm:py-[40px] px-[16px] sm:px-[32px] lg:px-[48px] flex-1 min-w-0">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[24px] gap-[16px]">
            <h1 className="font-outfit text-[22px] sm:text-[28px] font-extrabold text-[#1e160f] m-0">Menu &amp; Products</h1>

            {/* Store Performance */}
            <div className="bg-gradient-to-br from-[rgba(124,58,237,0.1)] to-[rgba(253,248,243,0)] py-[12px] sm:py-[16px] px-[16px] sm:px-[24px] rounded-[16px] flex items-center gap-[12px] sm:gap-[16px]">
              <div className="text-[24px]">✨</div>
              <div>
                <div className="text-[13px] sm:text-[14px] font-extrabold text-[#1e160f]">Store Performance</div>
                <div className="text-[12px] text-[#8a7360] font-medium">Looking good this week.</div>
              </div>
            </div>
          </div>

          {/* Tabs — scrollable on mobile */}
          <div className="flex border-b border-[rgba(232,213,192,0.6)] mb-[24px] sm:mb-[32px] overflow-x-auto pb-0 scrollbar-hide">
            <Tab text="My Menu" active={true} />
            <Tab text="Discounts & Specials" />
            <Tab text="Hot Deals" />
            <Tab text="Boost Product" />
            <Tab text="Boost Dispensary" />
            <Tab text="Connect API" />
          </div>

          {/* Main Data Card */}
          <div className="bg-white rounded-[20px] sm:rounded-[24px] p-[20px] sm:p-[32px] shadow-[0_10px_40px_rgba(184,145,90,0.06)] border border-[rgba(232,213,192,0.6)]">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-[20px] sm:mb-[24px] gap-[16px]">
              <div className="flex gap-[16px] sm:gap-[24px] text-[14px] sm:text-[15px]">
                <span className="font-extrabold text-[#7c3aed] border-b-2 border-[#7c3aed] pb-[8px]">Products ({allProducts.length})</span>
                <span className="font-semibold text-[#8a7360] cursor-pointer">Drafts (3)</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[16px] items-stretch sm:items-center w-full sm:w-auto">
                <div className="flex items-center bg-[#fcfaf8] rounded-full py-[10px] px-[16px] sm:px-[20px] border border-[rgba(232,213,192,0.6)] w-full sm:w-[220px] lg:w-[280px]">
                  <span className="text-[#c4a882] text-[14px]">🔍</span>
                  <input type="text" placeholder="Search for Product..." className="border-none bg-transparent outline-none ml-[8px] text-[13px] text-[#1e160f] w-full font-medium" />
                </div>

                <Link to="/create-product" className="no-underline">
                  <button className="bg-[#7c3aed] text-white border-none py-[10px] sm:py-[12px] px-[16px] sm:px-[24px] rounded-full text-[13px] font-bold cursor-pointer flex items-center justify-center gap-[8px] shadow-[0_4px_12px_rgba(124,58,237,0.3)] w-full sm:w-auto whitespace-nowrap">
                    <span>+</span> Add New Product
                  </button>
                </Link>
              </div>
            </div>

            {/* Filter Pills — scrollable */}
            <div className="flex gap-[8px] sm:gap-[12px] mb-[24px] sm:mb-[32px] overflow-x-auto pb-[4px]">
              <FilterPill text="All" active={true} />
              <FilterPill text="Skincare" count="(141)" />
              <FilterPill text="Cosmetics" count="(21)" />
              <FilterPill text="Serums" count="(13)" />
              <FilterPill text="Jewelry" count="(14)" />
              <FilterPill text="Rings" count="(17)" />
              <FilterPill text="Necklaces" count="(12)" />
              <FilterPill text="Tools" count="(10)" />
            </div>

            {/* Table — horizontal scroll on small screens */}
            <div className="overflow-x-auto -mx-[20px] sm:mx-0 px-[20px] sm:px-0">
              <table className="w-full border-collapse text-left min-w-[700px] lg:min-w-[900px]">
                <thead>
                  <tr className="bg-[#fcfaf8] text-[#8a7360] text-[12px] font-bold">
                    <th className="py-[14px] px-[16px] sm:py-[16px] sm:px-[24px] rounded-l-[12px] w-[40px]"><input type="checkbox" /></th>
                    <th className="p-[12px] sm:p-[16px]">Product Name <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px]">Category <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px] hidden md:table-cell">Type <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px] hidden lg:table-cell">Brand <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px]">Price <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px] hidden sm:table-cell">In Stock <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px] hidden md:table-cell">Visibility <span className="text-[10px] ml-[4px]">⇅</span></th>
                    <th className="p-[12px] sm:p-[16px] rounded-r-[12px] w-[40px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts && allProducts.length > 0 ? allProducts.map((p, i) => {
                    const types = ['PREMIUM', 'STANDARD', 'LIMITED', 'EXCLUSIVE'];
                    const mockType = types[i % 4];
                    const typeColor = getTypeColor(mockType);
                    const inStock = i % 3 !== 0;

                    return (
                      <tr key={p._id || i} className="border-b border-[#fcfaf8] transition-colors duration-200 hover:bg-[#f9fafb]">
                        <td className="py-[16px] sm:py-[20px] px-[16px] sm:px-[24px]"><input type="checkbox" /></td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px]">
                          <div className="flex items-center gap-[10px] sm:gap-[16px]">
                            <img src={p.images?.[0]?.url || '/assets/img/favicon.png'} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-[8px] object-cover bg-[#e2e8f0] shrink-0" alt="" />
                            <span className="text-[13px] sm:text-[14px] font-bold text-[#1e160f] line-clamp-1">{p.title || p.name || `Product ${i + 1}`}</span>
                          </div>
                        </td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] text-[12px] sm:text-[13px] text-[#8a7360] font-semibold">{p.category || 'Skincare'}</td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] hidden md:table-cell">
                          <span className="text-[10px] font-extrabold tracking-[0.5px] border py-[4px] px-[8px] rounded-[4px]" style={{ color: typeColor, borderColor: typeColor }}>{mockType}</span>
                        </td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] hidden lg:table-cell">
                          <div className="flex items-center gap-[8px]">
                            <div className="w-[24px] h-[24px] rounded-[6px] bg-[#1e1b4b] flex items-center justify-center text-white text-[11px] font-bold">Z</div>
                            <span className="text-[13px] font-bold text-[#1e160f]">Zewar</span>
                          </div>
                        </td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] text-[13px] sm:text-[14px] font-bold text-[#1e160f]">${parseFloat(p.price?.amount || p.price || 50).toFixed(2)}</td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] hidden sm:table-cell">
                          {inStock ? (
                            <div className="flex items-center gap-[6px] text-[12px] text-[#10b981] font-bold">
                              <div className="w-[6px] h-[6px] rounded-full bg-[#10b981]"></div> {Math.floor(Math.random() * 50) + 1} oz
                            </div>
                          ) : (
                            <div className="flex items-center gap-[6px] text-[12px] text-[#8a7360] font-semibold">
                              <div className="w-[6px] h-[6px] rounded-full bg-[#ef4444]"></div> No Info
                            </div>
                          )}
                        </td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] hidden md:table-cell">
                          <Toggle active={inStock} />
                        </td>
                        <td className="py-[16px] sm:py-[20px] px-[12px] sm:px-[16px] text-[#8a7360] cursor-pointer text-center text-[20px]">⋮</td>
                      </tr>
                    )
                  }) : (
                    <tr>
                      <td colSpan="9" className="p-[40px] sm:p-[60px] text-center text-[#8a7360] font-semibold">No products found. Add some from your menu.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center sm:justify-end mt-[24px] sm:mt-[32px]">
              <div className="flex gap-[6px] sm:gap-[8px]">
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-[rgba(232,213,192,0.6)] flex items-center justify-center text-[#8a7360] cursor-pointer text-[14px]">‹</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-[#7c3aed] bg-[rgba(124,58,237,0.1)] flex items-center justify-center text-[#7c3aed] font-bold cursor-pointer text-[13px]">1</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-transparent flex items-center justify-center text-[#8a7360] font-semibold cursor-pointer text-[13px]">2</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-transparent flex items-center justify-center text-[#8a7360] font-semibold cursor-pointer text-[13px]">3</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-transparent flex items-center justify-center text-[#8a7360] font-semibold text-[13px]">...</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-transparent flex items-center justify-center text-[#8a7360] font-semibold cursor-pointer text-[13px]">8</div>
                <div className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-[8px] border border-[rgba(232,213,192,0.6)] flex items-center justify-center text-[#8a7360] cursor-pointer text-[14px]">›</div>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  )
}
