import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'


const TopBar = () => (
  <div className="bg-[#1e160f] text-white text-[12px] flex justify-between py-[10px] px-[16px] sm:px-[48px] items-center">
    <div className="flex-1 tracking-[0.3px] text-[#e0e0e0] truncate">
      Sign up and GET 20% OFF for your first order.{' '}
      <span className="text-[#d4b896] cursor-pointer underline hidden sm:inline">Sign up now</span>
    </div>
    <div className="hidden sm:flex gap-[32px] font-medium text-[#e0e0e0]">
      <span className="cursor-pointer">Call Us : +123-456-789</span>
      <div className="flex gap-[12px]">
        <span className="cursor-pointer">f</span>
        <span className="cursor-pointer">t</span>
        <span className="cursor-pointer">in</span>
      </div>
    </div>
  </div>
)

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="py-[14px] sm:py-[24px] px-[16px] sm:px-[48px] flex justify-between items-center bg-[#fdf8f3] sticky top-0 z-50 border-b border-[rgba(232,213,192,0.4)]">
      <Link to="/" className="no-underline">
        <h1 className="font-playfair text-[22px] sm:text-[28px] font-extrabold text-[#1e160f] m-0 tracking-[-0.02em] flex items-center gap-[8px]">
          <span className="bg-[#b8915a] text-white w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] flex items-center justify-center rounded-full text-[14px] sm:text-[16px]">Z</span>
          Zewar.
        </h1>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-[32px] text-[14px] font-semibold text-[#1e160f] items-center font-outfit">
        <Link to="/" className="text-[#8a7360] no-underline">Home</Link>
        <Link to="/products" className="text-[#1e160f] no-underline border-b-2 border-[#1e160f] pb-[2px]">Shop</Link>
        <Link to="#" className="text-[#8a7360] no-underline">Skin Care</Link>
        <Link to="#" className="text-[#8a7360] no-underline">Makeup</Link>
        <Link to="#" className="text-[#8a7360] no-underline">Hair Care</Link>
        <Link to="#" className="text-[#8a7360] no-underline">About Us</Link>
        <Link to="#" className="text-[#8a7360] no-underline">Blogs</Link>
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
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded" />
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded" />
          <span className="block w-[22px] h-[2px] bg-[#1e160f] rounded" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#fdf8f3] border-t border-[rgba(232,213,192,0.4)] flex flex-col shadow-lg z-[100] lg:hidden">
          {['Home', 'Shop', 'Skin Care', 'Makeup', 'Hair Care', 'About Us', 'Blogs'].map(item => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : item === 'Shop' ? '/products' : '#'}
              onClick={() => setMenuOpen(false)}
              className="text-[#1e160f] no-underline text-[14px] font-semibold py-[14px] px-[20px] border-b border-[rgba(232,213,192,0.3)] hover:bg-[#f5ede4] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

const ProductCard = ({ product }) => {
  const price = parseFloat(product.price?.amount || 99).toFixed(2);
  const oldPrice = (parseFloat(price) + 25).toFixed(2);
  const rating = product.rating || 5;

  return (
    <Link to={`/product/${product._id}`} className="no-underline">
      <div className="bg-white rounded-[16px] p-[16px] sm:p-[24px] flex flex-col relative border border-[rgba(232,213,192,0.4)] transition-all duration-300 cursor-pointer h-full hover:shadow-[0_12px_32px_rgba(184,145,90,0.08)] hover:-translate-y-1">
        <div className="absolute top-[16px] left-[16px] bg-[#b8915a] text-white text-[10px] font-bold py-[4px] px-[8px] rounded-[4px] z-10 uppercase">
          50% Off
        </div>
        <div className="w-full aspect-square flex items-center justify-center mb-[16px] sm:mb-[20px] bg-[#fdfbfa] rounded-[12px] overflow-hidden">
          <img src={product.images && product.images[0] ? product.images[0].url : 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=300&q=80'} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-[20px]" />
        </div>
        <p className="text-[12px] text-[#8a7360] m-0 mb-[4px] uppercase tracking-[0.5px]">Skin Care</p>
        <div className="flex justify-between items-start mb-[8px]">
          <h4 className="text-[13px] sm:text-[14px] font-bold text-[#1e160f] m-0 font-outfit line-clamp-2 overflow-hidden pr-[8px]">
            {product.title || product.name}
          </h4>
          <div className="flex gap-[2px] text-[#f3c623] text-[12px] font-semibold whitespace-nowrap">
            ★ {rating}.0
          </div>
        </div>
        <div className="flex items-center gap-[8px] mt-auto">
          <span className="text-[15px] sm:text-[16px] font-extrabold text-[#b8915a]">${price}</span>
          <span className="text-[13px] text-[#a89a8c] line-through">${oldPrice}</span>
        </div>
      </div>
    </Link>
  )
}

const ProductGridSection = ({ title, products }) => (
  <section className="py-[40px] sm:py-[60px] px-[16px] sm:px-[48px] max-w-[1400px] mx-auto border-t border-[rgba(232,213,192,0.4)]">
    <div className="text-center mb-[28px] sm:mb-[40px]">
      <p className="text-[#8a7360] text-[14px] m-0 mb-[8px] font-semibold">Related Products</p>
      <h3 className="font-playfair text-[24px] sm:text-[32px] font-bold text-[#1e160f] m-0">
        Explore <span className="text-[#b8915a]">Related Products</span>
      </h3>
    </div>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[16px] sm:gap-[24px]">
      {products && products.length > 0 ? (
        products.map((p, i) => <ProductCard key={p._id || i} product={p} />)
      ) : (
        <div className="col-span-full text-center p-[40px] text-[#8a7360]">No related products available.</div>
      )}
    </div>
  </section>
)

const FeaturesFooter = () => (
  <div className="py-[40px] px-[16px] sm:px-[48px] max-w-[1400px] mx-auto mb-[40px] sm:mb-[60px] flex flex-col sm:flex-row justify-around gap-[24px] sm:gap-0 border-t border-[rgba(232,213,192,0.4)] pt-[40px] sm:pt-[60px]">
    <div className="flex items-center gap-[16px]">
      <div className="text-[32px]">📦</div>
      <div>
        <h4 className="m-0 mb-[4px] text-[16px] text-[#1e160f] font-bold">Free Shipping</h4>
        <p className="m-0 text-[13px] text-[#8a7360]">Free shipping for order above $50</p>
      </div>
    </div>
    <div className="flex items-center gap-[16px]">
      <div className="text-[32px]">💳</div>
      <div>
        <h4 className="m-0 mb-[4px] text-[16px] text-[#1e160f] font-bold">Flexible Payment</h4>
        <p className="m-0 text-[13px] text-[#8a7360]">Multiple secure payment options</p>
      </div>
    </div>
    <div className="flex items-center gap-[16px]">
      <div className="text-[32px]">🎧</div>
      <div>
        <h4 className="m-0 mb-[4px] text-[16px] text-[#1e160f] font-bold">24x7 Support</h4>
        <p className="m-0 text-[13px] text-[#8a7360]">We support online all days</p>
      </div>
    </div>
  </div>
)

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetSingleProduct, handleGetAllProducts } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const allProducts = useSelector((state) => state.product.allProducts) || [];
  const user = useSelector((state) => state.auth.user);

  const [quantity, setQuantity] = useState(1);
  const [selectedVol, setSelectedVol] = useState('30 ml');
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const resData = await handleGetSingleProduct(id);
      if (resData) setProduct(resData);
      setLoading(false);
    };
    fetchProduct();
    if (allProducts.length === 0) {
      handleGetAllProducts();
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-[#fdf8f3] flex justify-center items-center text-[20px] text-[#1e160f]">Loading Details...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#fdf8f3] flex justify-center items-center text-[20px] text-[#1e160f]">Product not found.</div>;
  }

  const price = parseFloat(product.price?.amount || 99).toFixed(2);
  const oldPrice = (parseFloat(price) + 25).toFixed(2);
  const rating = product.rating || 5;

  // Show "Add Variant" button only if the logged-in seller owns this product
  const isOwnerSeller =
    user?.role === 'seller' &&
    (user?._id === product?.seller ||
      user?._id === product?.seller?._id ||
      user?.id === product?.seller ||
      user?.id === product?.seller?._id);

  const defaultImage = 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80';
  const thumbnails = product.images && product.images.length > 0 ? product.images : [{ url: defaultImage }, { url: defaultImage }, { url: defaultImage }, { url: defaultImage }];
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
    <div className="min-h-screen font-outfit bg-[#fdf8f3]">
      <TopBar />
      <Header />

      {/* Breadcrumb */}
      <div className="py-[24px] sm:py-[40px] px-[16px] sm:px-[48px] text-center bg-[rgba(232,213,192,0.1)]">
        <h2 className="font-playfair text-[24px] sm:text-[36px] font-bold text-[#1e160f] m-0 mb-[12px]">Product Details</h2>
        <p className="text-[#8a7360] text-[14px] m-0 font-medium">
          <Link to="/" className="text-[#8a7360] no-underline">Home</Link> /
          <span className="mx-[8px]">Shop</span> /
          <span className="text-[#1e160f] ml-[8px]">Product Details</span>
        </p>
      </div>

      {/* Product section — stacks on mobile */}
      <div className="max-w-[1400px] my-[32px] sm:my-[60px] mx-auto px-[16px] sm:px-[48px] flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[10%]">

        {/* Info */}
        <div className="flex-[1.1] flex flex-col">
          <p className="text-[#8a7360] text-[13px] font-semibold m-0 mb-[12px] tracking-[0.5px]">SKIN CARE</p>

          <div className="flex flex-wrap items-center gap-[16px] mb-[12px]">
            <h1 className="font-playfair text-[28px] sm:text-[40px] font-bold text-[#1e160f] m-0 leading-[1.2]">
              {product.title || product.name}
            </h1>
          </div>
          <span className="w-[80px] bg-[#e8f5e9] text-[#2e7d32] py-[4px] px-[12px] text-[14px] rounded-full font-bold border border-[#c8e6c9]">In Stock</span>

          <div className="flex items-center gap-[8px] mb-[24px] text-[14px] mt-[12px]">
            <span className="text-[#f3c623] tracking-[2px]">★★★★★</span>
            <span className="text-[#1e160f] font-bold ml-[4px]">{rating}.0</span>
            <span className="text-[#8a7360]">(245 Review)</span>
          </div>

          <div className="flex items-center gap-[12px] mb-[24px]">
            <span className="text-[20px] sm:text-[24px] font-extrabold text-[#b8915a]">${price}</span>
            <span className="text-[16px] sm:text-[18px] text-[#a89a8c] line-through font-semibold">${oldPrice}</span>
          </div>

          <p className="text-[#8a7360] text-[14px] sm:text-[15px] leading-[1.6] mb-[32px]">
            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Elevate your skincare routine with this premium formula."}
          </p>

          {/* Size / Volume */}
          <div className="mb-[28px] sm:mb-[32px]">
            <p className="text-[#1e160f] text-[14px] font-bold m-0 mb-[12px]">Size / Volume</p>
            <div className="flex gap-[8px] sm:gap-[12px] flex-wrap">
              {['30 ml', '60 ml', '80 ml', '100 ml'].map(vol => (
                <button
                  key={vol}
                  onClick={() => setSelectedVol(vol)}
                  className={`py-[8px] px-[16px] sm:px-[20px] rounded-full text-[13px] font-semibold cursor-pointer transition-all duration-200 border ${selectedVol === vol ? 'bg-[#1e160f] text-white border-[#1e160f]' : 'bg-transparent text-[#1e160f] border-[rgba(232,213,192,0.4)]'}`}
                >
                  {vol}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Buttons */}
          <div className="flex flex-wrap items-center gap-[12px] mb-[32px] sm:mb-[40px]">
            <div className="flex items-center bg-white border border-[rgba(232,213,192,0.4)] rounded-full p-[4px]">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-none cursor-pointer text-[18px] text-[#1e160f]">-</button>
              <span className="w-[40px] text-center text-[15px] font-bold text-[#1e160f]">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-[36px] h-[36px] flex items-center justify-center bg-transparent border-none cursor-pointer text-[18px] text-[#1e160f]">+</button>
            </div>

            <button onClick={handleAddToCart} className="flex-1 min-w-[140px] bg-[#1e160f] text-white border-none h-[48px] rounded-full text-[14px] sm:text-[15px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-90">
              Add To Cart
            </button>

            <button onClick={handleBuyNow} className="flex-1 min-w-[140px] bg-[#b8915a] text-white border-none h-[48px] rounded-full text-[14px] sm:text-[15px] font-bold cursor-pointer transition-opacity duration-200 hover:opacity-90">
              Buy Now
            </button>

            <button className="w-[48px] h-[48px] rounded-full bg-white border border-[rgba(232,213,192,0.4)] flex items-center justify-center cursor-pointer text-[20px] text-[#1e160f] shrink-0">
              ♡
            </button>
          </div>

          {/* Seller-only: Add Variant Button */}
          {isOwnerSeller && (
            <button
              id="add-variant-btn"
              onClick={() => navigate(`/seller/product/${id}/add-variant`)}
              className="mt-[4px] w-full flex items-center justify-center gap-[10px] bg-gradient-to-r from-[#b8915a] to-[#d4a96a] text-white border-none h-[52px] rounded-full text-[14px] sm:text-[15px] font-bold cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_24px_rgba(184,145,90,0.35)] hover:-translate-y-[1px] active:translate-y-0"
            >
              <span className="text-[18px]">✦</span>
              Add Product Variant
              <span className="text-[18px]">✦</span>
            </button>
          )}

          {/* Meta */}
          <div className="border-t border-[rgba(232,213,192,0.4)] pt-[24px] text-[14px] flex flex-col gap-[12px]">
            <div className="flex">
              <span className="text-[#1e160f] font-bold w-[80px]">SKU :</span>
              <span className="text-[#8a7360]">GRFR85648HGJ</span>
            </div>
            <div className="flex">
              <span className="text-[#1e160f] font-bold w-[80px]">Tags :</span>
              <span className="text-[#8a7360]">Skincare, Serums, Vitamin C</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#1e160f] font-bold w-[80px]">Share :</span>
              <div className="flex gap-[8px]">
                {['f', 't', 'P', 'in'].map(s => (
                  <span key={s} className="w-[28px] h-[28px] rounded-full bg-[#1e160f] text-white flex items-center justify-center text-[12px] cursor-pointer">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#f6f1ec] rounded-[24px] p-[5px] mb-[15px] flex items-center justify-center aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] relative overflow-hidden">
            <img src={mainImage} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
            <div onClick={() => setIsModalOpen(true)} className="h-[35px] w-[35px] text-[20px] flex items-center justify-center absolute top-[20px] right-[20px] bg-[#fdf8f3] p-[8px] rounded-full cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)]">⤢</div>
            {thumbnails.length > 1 && (
              <>
                <button onClick={handlePrevImage} className="absolute left-[12px] sm:left-[20px] top-1/2 -translate-y-1/2 w-[36px] sm:w-[40px] h-[36px] sm:h-[40px] rounded-full bg-white border border-[rgba(232,213,192,0.4)] flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#1e160f]">←</button>
                <button onClick={handleNextImage} className="absolute right-[12px] sm:right-[20px] top-1/2 -translate-y-1/2 w-[36px] sm:w-[40px] h-[36px] sm:h-[40px] rounded-full bg-white text-[#1e160f] border-none flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)]">→</button>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-[8px] sm:gap-[16px]">
            {thumbnails.slice(0, 4).map((thumb, i) => (
              <div onClick={() => setCurrentImageIndex(i)} key={i} className={`aspect-square rounded-[12px] sm:rounded-[16px] bg-[#f6f1ec] border-2 flex items-center justify-center p-[4px] sm:p-[8px] cursor-pointer ${i === currentImageIndex ? 'border-[#b8915a]' : 'border-transparent'}`}>
                <img src={thumb.url} className="w-full h-full object-contain mix-blend-multiply" alt={`thumb-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1200px] mx-auto my-[40px] sm:my-[80px] px-[16px] sm:px-[48px]">
        <div className="flex justify-start sm:justify-center gap-[20px] sm:gap-[40px] border-b border-[rgba(232,213,192,0.4)] mb-[32px] sm:mb-[40px] overflow-x-auto">
          {['Description', 'Additional Information', 'Review'].map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-[16px] cursor-pointer text-[14px] sm:text-[16px] font-bold border-b-[3px] transition-all duration-200 whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-[#b8915a] border-[#b8915a]' : 'text-[#8a7360] border-transparent'}`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="text-[#8a7360] text-[14px] sm:text-[15px] leading-[1.8] max-w-[1000px] mx-auto">
          {activeTab === 'description' && (
            <>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <ul className="list-none p-0 mt-[24px]">
                <li className="mb-[12px] flex gap-[12px]"><span className="text-[#b8915a]">◉</span> 100% Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                <li className="mb-[12px] flex gap-[12px]"><span className="text-[#b8915a]">◉</span> Ut at nunc vel nisi gravida dictum.</li>
                <li className="mb-[12px] flex gap-[12px]"><span className="text-[#b8915a]">◉</span> Donec non velit sed risus tincidunt suscipit.</li>
                <li className="mb-[12px] flex gap-[12px]"><span className="text-[#b8915a]">◉</span> Cras laoreet lacus in dui posuere fringilla.</li>
              </ul>
            </>
          )}
          {activeTab === 'additional information' && <p>Information about weight, dimensions, and specifications will go here.</p>}
          {activeTab === 'review' && <p>Customer reviews will be displayed here.</p>}
        </div>
      </div>

      <ProductGridSection title="Related Products" products={allProducts.slice(0, 4)} />
      <FeaturesFooter />

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.85)] z-[1000] flex items-center justify-center">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-[20px] sm:top-[32px] right-[20px] sm:right-[32px] bg-transparent text-white border-none text-[28px] sm:text-[32px] cursor-pointer">✕</button>

          <img src={mainImage} className="max-w-[90%] max-h-[90%] object-contain" alt="Fullscreen" />

          {thumbnails.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-[12px] sm:left-[40px] top-1/2 -translate-y-1/2 w-[44px] sm:w-[56px] h-[44px] sm:h-[56px] rounded-full bg-white border-none flex items-center justify-center cursor-pointer text-[20px] sm:text-[24px] text-[#1e160f]">←</button>
              <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-[12px] sm:right-[40px] top-1/2 -translate-y-1/2 w-[44px] sm:w-[56px] h-[44px] sm:h-[56px] rounded-full bg-[#1e160f] text-white border-none flex items-center justify-center cursor-pointer text-[20px] sm:text-[24px]">→</button>
            </>
          )}
        </div>
      )}

    </div>
  )
}

export default ProductDetails
