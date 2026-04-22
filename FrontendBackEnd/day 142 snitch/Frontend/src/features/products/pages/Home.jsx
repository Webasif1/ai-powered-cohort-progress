import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'
import { Link } from 'react-router-dom'


const TopBar = () => (
  <div className="bg-[#1e160f] text-white text-[12px] flex justify-between py-[10px] px-[16px] sm:px-[48px] items-center">
    <div className="flex-1 tracking-[0.3px] text-[#e0e0e0] truncate">Join our newsletter to get best Discount!</div>
    <div className="hidden sm:flex gap-[32px] font-medium text-[#e0e0e0]">
      <span className="cursor-pointer">United States (USD $) ∨</span>
      <span className="cursor-pointer">English ∨</span>
    </div>
  </div>
)

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="py-[14px] sm:py-[24px] px-[16px] sm:px-[48px] flex justify-between items-center bg-[#fdf8f3] sticky top-0 z-[50] border-b border-[rgba(232,213,192,0.4)]">
      {/* Logo */}
      <Link to="/" className="no-underline">
        <h1 className="font-playfair text-[22px] sm:text-[28px] font-extrabold text-[#1e160f] m-0 tracking-[-0.02em]">
          Zewar.
        </h1>
      </Link>

      {/* Center Nav — hidden on mobile */}
      <nav className="hidden lg:flex gap-[32px] text-[14px] font-semibold text-[#1e160f] items-center font-outfit">
        <Link to="/" className="text-[#1e160f] no-underline">Home</Link>
        <Link to="/products" className="text-[#8a7360] no-underline flex gap-[6px] items-center">
          Our Store <span className="text-[10px]">∨</span>
        </Link>
        <Link to="#" className="text-[#8a7360] no-underline flex gap-[6px] items-center">
          Special <span className="bg-[#e8f5e9] text-[#2e7d32] py-[2px] px-[6px] text-[10px] rounded-[12px] font-bold">Hot</span>
        </Link>
        <Link to="#" className="text-[#8a7360] no-underline flex gap-[6px] items-center">
          Categories <span className="bg-[#ffebee] text-[#c62828] py-[2px] px-[6px] text-[10px] rounded-[12px] font-bold">New</span>
        </Link>
        <Link to="#" className="text-[#8a7360] no-underline flex gap-[6px] items-center">
          Top Deals <span className="text-[10px]">∨</span>
        </Link>
        <Link to="#" className="text-[#8a7360] no-underline">Reviews</Link>
      </nav>

      {/* Right Icons */}
      <div className="flex gap-[16px] sm:gap-[24px] text-[20px] text-[#1e160f] items-center">
        <span className="cursor-pointer hidden sm:block">⌕</span>
        <span className="cursor-pointer relative">
          ♡<span className="absolute -top-[4px] -right-[8px] bg-[#b8915a] text-white text-[10px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full">0</span>
        </span>
        <Link to="/login" className="text-[#1e160f] no-underline hidden sm:block">👤</Link>
        <Link to="/cart" className="text-[#1e160f] no-underline relative">
          🛒<span className="absolute -top-[4px] -right-[8px] bg-[#1e160f] text-white text-[10px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full">0</span>
        </Link>
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="lg:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-[4px]"
          aria-label="Open menu"
        >
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded transition-all duration-200" />
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded transition-all duration-200" />
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded transition-all duration-200" />
        </button>
      </div>

      {/* Mobile Dropdown Nav */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#fdf8f3] border-t border-[rgba(232,213,192,0.4)] flex flex-col gap-0 shadow-lg z-[100] lg:hidden">
          {['Home', 'Our Store', 'Special', 'Categories', 'Top Deals', 'Reviews'].map(item => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : item === 'Our Store' ? '/products' : '#'}
              onClick={() => setMenuOpen(false)}
              className="text-[#1e160f] no-underline text-[14px] font-semibold py-[14px] px-[20px] border-b border-[rgba(232,213,192,0.3)] hover:bg-[#f5ede4] transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="text-[#1e160f] no-underline text-[14px] font-semibold py-[14px] px-[20px] hover:bg-[#f5ede4]">
            👤 My Account
          </Link>
        </div>
      )}
    </header>
  )
}

const Hero = () => (
  <section className="bg-[#fdf8f3] pt-[24px] sm:pt-[40px] px-[16px] sm:px-[48px] pb-[40px] sm:pb-[60px] flex items-center justify-center">
    <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center gap-[5%] bg-[#f6f1ec] rounded-[24px] py-[40px] px-[24px] sm:px-[60px] lg:px-[80px] min-h-[auto] lg:min-h-[450px]">
      <div className="flex-1 py-0 lg:py-[60px] text-center lg:text-left">
        <p className="text-[#8a7360] text-[13px] font-bold mb-[16px] uppercase tracking-[1px]">Flat 15% Discount!</p>
        <h2 className="font-playfair text-[36px] sm:text-[44px] lg:text-[52px] font-extrabold text-[#1e160f] leading-[1.1] m-0 mb-[20px]">
          Proven To Tackle<br />Wrinkles &amp; Acne
        </h2>
        <p className="text-[#6d5a49] text-[14px] sm:text-[16px] leading-[1.6] mb-[32px] max-w-[360px] mx-auto lg:mx-0">
          What makes us different? We treat you personally - and honestly.
        </p>
        <div className="text-[18px] sm:text-[20px] font-bold text-[#1e160f] mb-[32px] font-playfair">
          From $49
        </div>
        <button className="bg-[#b8915a] text-white border-none py-[12px] sm:py-[14px] px-[28px] sm:px-[32px] rounded-[4px] text-[14px] font-semibold cursor-pointer tracking-[0.5px] transition-colors duration-300 hover:bg-[#1e160f]">
          Learn More
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center mt-[24px] lg:mt-0">
        <img src="https://images.unsplash.com/photo-1598440947619-2c3f125f8eba?auto=format&fit=crop&w=800&q=80" alt="Cosmetics Products" className="w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[500px] h-auto object-contain mix-blend-multiply" />
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
    <section className="py-[40px] sm:py-[60px] px-[16px] sm:px-[48px] max-w-[1400px] mx-auto text-center">
      <h3 className="font-playfair text-[20px] sm:text-[24px] font-bold text-[#1e160f] mb-[32px] sm:mb-[40px]">Shop By Categories</h3>
      <div className="flex justify-center gap-[16px] sm:gap-[24px] flex-wrap">
        {cats.map(c => (
          <div key={c.name} className="flex flex-col items-center gap-[12px] sm:gap-[16px] cursor-pointer transition-transform duration-200 hover:-translate-y-[6px]">
            <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-[20px] bg-white flex items-center justify-center overflow-hidden border border-[rgba(232,213,192,0.4)] shadow-[0_4px_16px_rgba(0,0,0,0.03)]">
              <img src={c.img} alt={c.name} className="w-[60%] h-[60%] object-contain" />
            </div>
            <span className="text-[12px] sm:text-[13px] font-semibold text-[#1e160f]">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

const Sustainability = () => (
  <section className="py-[20px] sm:py-[40px] px-[16px] sm:px-[48px] max-w-[1100px] mx-auto mb-[40px] sm:mb-[60px]">
    <div className="bg-[#fcfaf8] rounded-[24px] flex flex-col md:flex-row overflow-hidden border border-[rgba(232,213,192,0.4)]">
      <div className="flex-1 relative min-h-[240px] md:min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1608248593842-83b3e2bf6cd4?auto=format&fit=crop&w=800&q=80" alt="Sustainability" className="w-full h-full object-cover" />
      </div>
      <div className="flex-[0.8] py-[40px] sm:py-[60px] px-[28px] sm:px-[50px] flex flex-col justify-center bg-white">
        <p className="text-[#8a7360] text-[12px] font-bold mb-[12px] uppercase tracking-[0.5px]">Welcome To Zewar Store!</p>
        <h3 className="font-playfair text-[24px] sm:text-[32px] font-bold text-[#1e160f] mb-[20px] leading-[1.2]">Our Commitment<br />To Sustainability</h3>
        <p className="text-[#8a7360] text-[14px] leading-[1.6] mb-[32px]">We exist to meet the needs of the present without compromising future generations' ability to meet their own.</p>
        <div>
          <button className="bg-[#b8915a] text-white border-none py-[12px] px-[24px] rounded-[4px] text-[13px] font-semibold cursor-pointer transition-colors duration-300 hover:bg-[#1e160f]">
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
    <Link to={`/product/${product._id}`} className="no-underline">
      <div className="bg-white rounded-[16px] p-[16px] sm:p-[24px] flex flex-col relative border border-[rgba(232,213,192,0.4)] transition-all duration-300 cursor-pointer h-full hover:shadow-[0_12px_32px_rgba(184,145,90,0.08)] hover:-translate-y-1">
        {/* Sale tag */}
        <div className="absolute top-[16px] left-[16px] bg-[#e34c4c] text-white text-[10px] font-bold py-[4px] px-[8px] rounded-[4px] z-10 uppercase">
          Sale
        </div>

        <div className="w-full aspect-square flex items-center justify-center mb-[16px] sm:mb-[20px] bg-[#fdfbfa] rounded-[12px] overflow-hidden">
          <img src={product.images && product.images[0] ? product.images[0].url : 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=300&q=80'} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-[20px]" />
        </div>

        <h4 className="text-[13px] sm:text-[14px] font-bold text-[#1e160f] m-0 mb-[8px] min-h-[40px] font-outfit line-clamp-2 overflow-hidden">
          {product.title || product.name}
        </h4>

        <div className="flex gap-[2px] text-[#f3c623] text-[12px] mb-[12px]">
          ★★★★★ <span className="text-[#8a7360] ml-[4px]">({rating})</span>
        </div>

        <div className="flex items-center gap-[8px] mb-[16px]">
          <span className="text-[13px] text-[#a89a8c] line-through">${oldPrice}</span>
          <span className="text-[15px] sm:text-[16px] font-extrabold text-[#1e160f]">${price}</span>
        </div>

        <div className="text-[13px] font-semibold text-[#1e160f] cursor-pointer border-b border-[#1e160f] inline-block self-start pb-[2px] mt-auto">
          Choose options
        </div>
      </div>
    </Link>
  )
}

const ProductGridSection = ({ title, products }) => (
  <section className="py-[32px] sm:py-[40px] px-[16px] sm:px-[48px] max-w-[1400px] mx-auto mb-[40px] sm:mb-[60px]">
    <h3 className="font-playfair text-[20px] sm:text-[26px] font-bold text-[#1e160f] mb-[28px] sm:mb-[40px] text-center">
      {title}
    </h3>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[16px] sm:gap-[24px]">
      {products && products.length > 0 ? (
        products.map((p, i) => <ProductCard key={p._id || i} product={p} />)
      ) : (
        <div className="col-span-full text-center p-[40px] text-[#8a7360]">No products available.</div>
      )}
    </div>
  </section>
)

const PromoBanners = () => (
  <section className="py-[20px] px-[16px] sm:px-[48px] max-w-[1400px] mx-auto mb-[60px] sm:mb-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] sm:gap-[20px]">
    {/* Banner 1 */}
    <div className="rounded-[20px] overflow-hidden relative aspect-[4/3] sm:aspect-[4/5] bg-[#333]">
      <img src="https://images.unsplash.com/photo-1512496015851-a1c8cf71d80c?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-80" alt="Influencers" />
      <div className="absolute bottom-[24px] sm:bottom-[30px] left-[20px] sm:left-[24px] right-[20px] sm:right-[24px]">
        <p className="text-white text-[12px] m-0 mb-[6px] opacity-90 tracking-[0.5px]">Zewar</p>
        <h4 className="text-white text-[20px] sm:text-[22px] font-bold m-0 font-playfair leading-[1.2]">Chosen By<br />Influencers</h4>
      </div>
    </div>
    {/* Banner 2 */}
    <div className="rounded-[20px] overflow-hidden relative aspect-[4/3] sm:aspect-[4/5] bg-[#ebdccb] p-[24px] sm:p-[30px] flex flex-col">
      <h4 className="text-[#1e160f] text-[20px] sm:text-[22px] font-bold m-0 mb-[10px] font-playfair leading-[1.2]">Carefully<br />Crafted</h4>
      <p className="text-[#8a7360] text-[13px] m-0 leading-[1.5]">Created After Years<br />Of Research</p>
      <div className="mt-auto self-center w-[80%] h-[50%]">
        <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" alt="Crafted" />
      </div>
    </div>
    {/* Banner 3 */}
    <div className="rounded-[20px] overflow-hidden relative aspect-[4/3] sm:aspect-[4/5] bg-[#1c1c1c] p-[24px] sm:p-[30px] flex flex-col">
      <h4 className="text-white text-[20px] sm:text-[22px] font-bold m-0 mb-[10px] font-playfair leading-[1.2]">15% Off Only<br />This Week</h4>
      <p className="text-[#a0a0a0] text-[13px] m-0 leading-[1.5]">15% Off Our<br />Anti-Aging Cream</p>
      <div className="mt-auto self-end w-[90%] h-[50%]">
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain -rotate-[10deg] scale-110 translate-x-[10%] translate-y-[10%]" alt="Discount" />
      </div>
    </div>
    {/* Banner 4 */}
    <div className="rounded-[20px] overflow-hidden relative aspect-[4/3] sm:aspect-[4/5] bg-[#c1a58c]">
      <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Flaky Skin" />
      <div className="absolute bottom-[24px] sm:bottom-[30px] left-[20px] sm:left-[24px] right-[20px] sm:right-[24px]">
        <p className="text-[#1e160f] text-[12px] m-0 mb-[6px] font-bold tracking-[0.5px]">Flat 15% Off</p>
        <h4 className="text-[#1e160f] text-[20px] sm:text-[22px] font-bold m-0 font-playfair leading-[1.2]">Prevent Dry,<br />Flaky Skin</h4>
      </div>
    </div>
  </section>
)

const PreFooter = () => (
  <section className="py-[32px] sm:py-[40px] px-[16px] sm:px-[48px] max-w-[1100px] mx-auto mb-[60px] sm:mb-[80px] text-center">
    <h3 className="font-playfair text-[22px] sm:text-[28px] font-bold text-[#1e160f] m-0 mb-[16px]">Get Your Customised Skincare Treatment</h3>
    <p className="text-[#8a7360] text-[14px] sm:text-[15px] m-0 mx-auto mb-[32px] max-w-[640px] leading-[1.6]">
      We have a specialized remedy to help you with any issues and advise you routines. Formica tristique. Donec rhoncus dignissim volutpat.
    </p>
    <div className="text-[14px] font-bold text-[#1e160f] cursor-pointer border-b-2 border-[#1e160f] inline-block pb-[4px] mb-[32px] sm:mb-[48px]">
      Shop Skincare
    </div>
    <div className="w-full h-[220px] sm:h-[350px] rounded-[24px] overflow-hidden bg-[rgba(255,255,255,0.7)] border border-[rgba(232,213,192,0.4)]">
      <img src="https://images.unsplash.com/photo-1556228720-1c2f689e4c5b?auto=format&fit=crop&w=1200&q=80" alt="Special Skincare" className="w-full h-full object-cover" />
    </div>
  </section>
)

function Home() {
  const Product = useProduct()
  const handleGetAllProducts = Product?.handleGetAllProducts || (() => { });
  const allProducts = useSelector((state) => state.product.allProducts) || []

  useEffect(() => {
    handleGetAllProducts()
  }, [])

  const popularProducts = allProducts.slice(0, 4);
  const bestDeals = allProducts.length > 4 ? allProducts.slice(4, 8) : allProducts.slice(0, 4);

  return (
    <div className="min-h-screen font-outfit bg-[#fdf8f3]">
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
