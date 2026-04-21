import React, { useState, useRef } from 'react'
import { useProduct } from '../hooks/useProduct.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/* ─── colour tokens (same as Login / Register) ─── */
const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="text-[#8a7360] text-[11px] font-bold uppercase tracking-[0.08em] block mb-[6px]"
  >
    {children}
  </label>
)

const inputBase = "w-full box-border bg-[#f5ede4] border-[1.5px] border-[#e8d5c0] rounded-[10px] py-[10px] px-[14px] text-[13px] text-[#1e160f] outline-none transition-all duration-[180ms] focus:border-[#b8915a] focus:shadow-[0_0_0_3px_rgba(184,145,90,0.18)]"

const Input = ({ id, className, style, ...props }) => {
  return (
    <input
      id={id}
      {...props}
      className={`${inputBase} ${className || ''}`}
      style={style}
    />
  )
}

const Select = ({ id, children, className, style, ...props }) => {
  return (
    <select
      id={id}
      {...props}
      className={`${inputBase} appearance-none bg-[url("data:image/svg+xml,%3Csvg_xmlns='http://www.w3.org/2000/svg'_width='12'_height='12'_viewBox='0_0_24_24'_fill='none'_stroke='%238a7360'_stroke-width='2'%3E%3Cpath_d='M6_9l6_6_6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center] pr-[36px] cursor-pointer ${className || ''}`}
      style={style}
    >
      {children}
    </select>
  )
}

const SectionCard = ({ title, children, className, style }) => (
  <div className={`bg-white border border-[#e8d5c0] rounded-[14px] py-[22px] px-[24px] mb-[20px] ${className || ''}`} style={style}>
    {title && (
      <h2 className="text-[15px] font-extrabold text-[#1e160f] m-0 mb-[18px] tracking-[-0.01em]">
        {title}
      </h2>
    )}
    {children}
  </div>
)

/* ─── main component ─── */
const CreateProducts = () => {
  const { handleCreateProduct } = useProduct()
  const { isLoading } = useSelector(state => state.product)
  const navigate = useNavigate()

  /* form state */
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sku, setSku] = useState('')
  const [sellingType, setSellingType] = useState('instore')
  const [variants, setVariants] = useState([])
  const [images, setImages] = useState([])          // array of File
  const [imagePreviews, setImagePreviews] = useState([])
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')
  const [length, setLength] = useState('')
  const [breadth, setBreadth] = useState('')
  const [width, setWidth] = useState('')
  const [priceAmount, setPriceAmount] = useState('')
  const [comparePrice, setComparePrice] = useState('')
  const [priceCurrency, setPriceCurrency] = useState('USD')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  /* ── image handling ── */
  const addFiles = files => {
    const arr = Array.from(files).slice(0, 5 - images.length)
    if (!arr.length) return
    setImages(prev => [...prev, ...arr])
    arr.forEach(f => {
      const reader = new FileReader()
      reader.onload = e => setImagePreviews(prev => [...prev, e.target.result])
      reader.readAsDataURL(f)
    })
  }

  const removeImage = idx => {
    setImages(prev => prev.filter((_, i) => i !== idx))
    setImagePreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const handleDrop = e => {
    e.preventDefault(); setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  /* ── variant ── */
  const addVariant = () => setVariants(prev => [...prev, { name: '', value: '' }])
  const updateVariant = (idx, key, val) =>
    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [key]: val } : v))
  const removeVariant = idx => setVariants(prev => prev.filter((_, i) => i !== idx))

  /* ── submit ── */
  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('quantity', quantity)
    formData.append('sku', sku)
    formData.append('sellingType', sellingType)
    formData.append('weight', weight)
    formData.append('weightUnit', weightUnit)
    formData.append('length', length)
    formData.append('breadth', breadth)
    formData.append('width', width)
    formData.append('priceAmount', priceAmount)
    formData.append('comparePrice', comparePrice)
    formData.append('priceCurrency', priceCurrency)
    formData.append('variants', JSON.stringify(variants))

    images.forEach(img => {
      formData.append('images', img)
    })

    handleCreateProduct(formData)
  }

  /* ── button helpers ── */
  const btnBase = "py-[10px] px-[22px] rounded-[10px] text-[13px] font-bold cursor-pointer border-none transition-all duration-[180ms]"

  return (
    <div className="min-h-screen bg-[#fdf8f3] font-inter">

      {/* ── top bar ── */}
      <div className="bg-white border-b border-[#e8d5c0] py-[14px] px-[32px] flex items-center gap-[14px] sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer flex items-center gap-[6px] text-[#8a7360] text-[13px] font-semibold p-0 hover:text-[#b8915a] transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to product list
        </button>
        <div className="w-[1px] h-[20px] bg-[#e8d5c0]" />
        <h1 className="m-0 text-[20px] font-black text-[#1e160f] tracking-[-0.02em]">
          Add New Product
        </h1>
      </div>

      {/* ── body ── */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-[1120px] mx-auto py-[28px] px-[24px] grid grid-cols-[1fr_380px] gap-[20px]">

          {/* ══════════ LEFT COLUMN ══════════ */}
          <div>

            {/* Description */}
            <SectionCard title="Description">
              <div className="mb-[16px]">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  type="text"
                  placeholder="e.g. Full Spectrum CBD Tincture"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="business-desc">Business Description</Label>
                <textarea
                  id="business-desc"
                  rows={6}
                  placeholder="Describe your product in detail…"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={`${inputBase} resize-y leading-[1.6]`}
                  style={{ fontFamily: 'inherit' }}
                />
              </div>
            </SectionCard>

            {/* Category */}
            <SectionCard title="Category">
              <div className="grid grid-cols-2 gap-[14px]">
                <div>
                  <Label htmlFor="category">Product Category</Label>
                  <Select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select category</option>
                    <option value="health">Health &amp; Medicine</option>
                    <option value="beauty">Beauty</option>
                    <option value="fashion">Fashion</option>
                    <option value="electronics">Electronics</option>
                    <option value="food">Food &amp; Beverage</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sub-category">Sub Category</Label>
                  <Select id="sub-category" value={subCategory} onChange={e => setSubCategory(e.target.value)}>
                    <option value="">Select sub‑category</option>
                    <option value="skincare">Skincare</option>
                    <option value="haircare">Haircare</option>
                    <option value="supplements">Supplements</option>
                    <option value="accessories">Accessories</option>
                  </Select>
                </div>
              </div>
            </SectionCard>

            {/* Inventory */}
            <SectionCard title="Inventory">
              <div className="grid grid-cols-2 gap-[14px]">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU (Optional)</Label>
                  <Input
                    id="sku"
                    type="text"
                    placeholder="e.g. SKU-001"
                    value={sku}
                    onChange={e => setSku(e.target.value)}
                  />
                </div>
              </div>
            </SectionCard>

            {/* Selling Type */}
            <SectionCard title="Selling Type">
              {[
                { value: 'instore', label: 'In-store selling only' },
                { value: 'online', label: 'Online selling only' },
                { value: 'both', label: 'Available both in-store and online' },
              ].map(opt => (
                <label
                  key={opt.value}
                  className="flex items-center gap-[10px] mb-[10px] cursor-pointer text-[#1e160f] text-[13px] font-medium"
                >
                  <span className={`w-[18px] h-[18px] rounded-full border-[2px] flex items-center justify-center shrink-0 transition-all duration-[150ms] ${sellingType === opt.value ? 'border-[#b8915a] bg-[#b8915a]' : 'border-[#e8d5c0] bg-transparent'}`}>
                    {sellingType === opt.value && (
                      <span className="w-[7px] h-[7px] rounded-full bg-white block" />
                    )}
                  </span>
                  <input
                    type="radio"
                    name="sellingType"
                    value={opt.value}
                    checked={sellingType === opt.value}
                    onChange={() => setSellingType(opt.value)}
                    className="hidden"
                  />
                  {opt.label}
                </label>
              ))}
            </SectionCard>

            {/* Variant */}
            <SectionCard title="Variant">
              <div className="mb-[14px]">
                <p className="text-[#8a7360] text-[13px] m-0 mb-[14px]">Product variants</p>

                {variants.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1fr_auto] gap-[10px] mb-[10px]">
                    <Input
                      type="text"
                      placeholder="Name (e.g. Color)"
                      value={v.name}
                      onChange={e => updateVariant(idx, 'name', e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Value (e.g. Red)"
                      value={v.value}
                      onChange={e => updateVariant(idx, 'value', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] text-[#c0392b] w-[38px] cursor-pointer text-[16px]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addVariant}
                className="bg-transparent border-[1.5px] border-dashed border-[#b8915a] rounded-[10px] py-[8px] px-[18px] text-[#b8915a] text-[13px] font-bold cursor-pointer flex items-center gap-[6px] transition-colors duration-[150ms] hover:bg-[#fdf0e4]"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                Add Variant
              </button>
            </SectionCard>
          </div>

          {/* ══════════ RIGHT COLUMN ══════════ */}
          <div>

            {/* Product Images */}
            <SectionCard>
              <div className="flex items-center justify-between mb-[16px]">
                <h2 className="m-0 text-[15px] font-extrabold text-[#1e160f]">
                  Product Images
                </h2>
                <span className="text-[11px] text-[#8a7360] bg-[#f5ede4] border border-[#e8d5c0] rounded-[20px] py-[3px] px-[10px] font-semibold">
                  {imagePreviews.length}/5
                </span>
              </div>

              {/* drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-[2px] border-dashed rounded-[12px] py-[28px] px-[16px] text-center cursor-pointer transition-all duration-[180ms] mb-[14px] ${isDragging ? 'border-[#b8915a] bg-[#fdf0e4]' : 'border-[#e8d5c0] bg-[#f5ede4]'}`}
              >
                <svg width="32" height="32" fill="none" stroke="#c4a882" strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-[8px]">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="m-0 text-[13px] text-[#b8915a] font-bold">Click to upload</p>
                <p className="mt-[4px] mb-0 text-[11px] text-[#8a7360]">or drag and drop · PNG, JPG up to 5 MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => addFiles(e.target.files)}
                />
              </div>

              {/* previews grid */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-[8px]">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative rounded-[10px] overflow-hidden border border-[#e8d5c0] aspect-square">
                      <img src={src} alt={`product-${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-[4px] right-[4px] bg-[rgba(0,0,0,0.55)] border-none rounded-full w-[22px] h-[22px] text-white text-[14px] cursor-pointer flex items-center justify-center leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Shipping & Delivery */}
            <SectionCard title="Shipping and Delivery">
              <div className="mb-[14px]">
                <Label htmlFor="weight">Items Weight</Label>
                <div className="flex gap-[8px]">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0.00"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className="flex-1"
                  />
                  <Select
                    value={weightUnit}
                    onChange={e => setWeightUnit(e.target.value)}
                    className="w-[70px]"
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                  </Select>
                </div>
              </div>

              <Label>Package Size (cm)</Label>
              <p className="text-[11px] text-[#8a7360] m-0 mb-[8px]">
                The package you use to ship your product
              </p>
              <div className="grid grid-cols-3 gap-[8px]">
                {[
                  { label: 'Length', val: length, set: setLength, id: 'pkg-length' },
                  { label: 'Breadth', val: breadth, set: setBreadth, id: 'pkg-breadth' },
                  { label: 'Width', val: width, set: setWidth, id: 'pkg-width' },
                ].map(({ label, val, set, id }) => (
                  <div key={id}>
                    <p className="text-[11px] text-[#8a7360] m-0 mb-[4px] font-semibold">{label}</p>
                    <Input id={id} type="number" placeholder="0.00" value={val} onChange={e => set(e.target.value)} />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Pricing */}
            <SectionCard title="Pricing">
              <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#8a7360] text-[13px] font-bold pointer-events-none">$</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={priceAmount}
                      onChange={e => setPriceAmount(e.target.value)}
                      required
                      className="pl-[26px]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="compare-price">Compare at Price</Label>
                  <div className="relative">
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#8a7360] text-[13px] font-bold pointer-events-none">$</span>
                    <Input
                      id="compare-price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={comparePrice}
                      onChange={e => setComparePrice(e.target.value)}
                      className="pl-[26px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select id="currency" value={priceCurrency} onChange={e => setPriceCurrency(e.target.value)}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="BDT">BDT — Bangladeshi Taka</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="INR">INR — Indian Rupee</option>
                </Select>
              </div>
            </SectionCard>

            {/* Action Buttons */}
            <div className="flex gap-[10px] justify-end mt-[4px]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`${btnBase} bg-[#f5ede4] text-[#8a7360] border-[1.5px] border-[#e8d5c0] hover:bg-[#e8d5c0]`}
              >
                Discard
              </button>

              <button
                type="button"
                className={`${btnBase} bg-white text-[#b8915a] border-[1.5px] border-[#b8915a] hover:bg-[#fdf0e4]`}
              >
                Schedule
              </button>

              <button
                id="create-product-btn"
                type="submit"
                disabled={isLoading}
                className={`${btnBase} ${isLoading ? 'bg-[#d4b896] opacity-75 cursor-not-allowed' : 'bg-[#b8915a] hover:bg-[#a07848] text-[#fdf8f3] cursor-pointer'} shadow-[0_4px_16px_rgba(184,145,90,0.18)] flex items-center gap-[8px]`}
              >
                {isLoading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity=".75" />
                    </svg>
                    Saving…
                  </>
                ) : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      </form>


      {/* spin keyframe */}
      < style > {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div >
  )
}

export default CreateProducts
