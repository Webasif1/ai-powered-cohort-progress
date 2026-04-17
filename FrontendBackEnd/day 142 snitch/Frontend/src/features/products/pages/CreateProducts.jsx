import React, { useState, useRef } from 'react'
import { useProduct } from '../hooks/useProduct.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

/* ─── colour tokens (same as Login / Register) ─── */
const C = {
  bg:          '#fdf8f3',
  surface:     '#f5ede4',
  border:      '#e8d5c0',
  borderFocus: '#b8915a',
  primary:     '#b8915a',
  primaryHov:  '#a07848',
  primaryLt:   '#d4b896',
  textDark:    '#1e160f',
  textMid:     '#8a7360',
  textLight:   '#c4a882',
  white:       '#fdf8f3',
  danger:      '#c0392b',
  shadow:      'rgba(184,145,90,0.18)',
}

/* ─── tiny reusable bits ─── */
const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    style={{ color: C.textMid, fontSize: 11, fontWeight: 700,
             textTransform: 'uppercase', letterSpacing: '0.08em',
             display: 'block', marginBottom: 6 }}
  >
    {children}
  </label>
)

const inputBase = {
  width: '100%', boxSizing: 'border-box',
  background: C.surface, border: `1.5px solid ${C.border}`,
  borderRadius: 10, padding: '10px 14px',
  fontSize: 13, color: C.textDark, outline: 'none',
  transition: 'border-color .18s, box-shadow .18s',
}

const useInputFocus = () => ({
  onFocus: e => { e.target.style.borderColor = C.borderFocus; e.target.style.boxShadow = `0 0 0 3px ${C.shadow}` },
  onBlur:  e => { e.target.style.borderColor = C.border;      e.target.style.boxShadow = 'none' },
})

const Input = ({ id, style, ...props }) => {
  const focus = useInputFocus()
  return (
    <input
      id={id}
      {...props}
      {...focus}
      style={{ ...inputBase, ...style }}
    />
  )
}

const Select = ({ id, children, style, ...props }) => {
  const focus = useInputFocus()
  return (
    <select
      id={id}
      {...props}
      {...focus}
      style={{ ...inputBase, appearance: 'none',
               backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a7360' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
               backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
               paddingRight: 36, cursor: 'pointer', ...style }}
    >
      {children}
    </select>
  )
}

const SectionCard = ({ title, children, style }) => (
  <div style={{
    background: '#fff',
    border: `1px solid ${C.border}`,
    borderRadius: 14,
    padding: '22px 24px',
    marginBottom: 20,
    ...style,
  }}>
    {title && (
      <h2 style={{ fontSize: 15, fontWeight: 800, color: C.textDark,
                   margin: '0 0 18px 0', letterSpacing: '-0.01em' }}>
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
  const [title,           setTitle]           = useState('')
  const [description,     setDescription]     = useState('')
  const [category,        setCategory]        = useState('')
  const [subCategory,     setSubCategory]     = useState('')
  const [quantity,        setQuantity]        = useState('')
  const [sku,             setSku]             = useState('')
  const [sellingType,     setSellingType]     = useState('instore')
  const [variants,        setVariants]        = useState([])
  const [images,          setImages]          = useState([])          // array of File
  const [imagePreviews,   setImagePreviews]   = useState([])
  const [weight,          setWeight]          = useState('')
  const [weightUnit,      setWeightUnit]      = useState('kg')
  const [length,          setLength]          = useState('')
  const [breadth,         setBreadth]         = useState('')
  const [width,           setWidth]           = useState('')
  const [priceAmount,     setPriceAmount]     = useState('')
  const [comparePrice,    setComparePrice]    = useState('')
  const [priceCurrency,   setPriceCurrency]   = useState('USD')
  const [isDragging,      setIsDragging]      = useState(false)
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
    handleCreateProduct({ title, description, priceAmount, priceCurrency, images })
  }

  /* ── button helpers ── */
  const btnBase = {
    padding: '10px 22px', borderRadius: 10, fontSize: 13,
    fontWeight: 700, cursor: 'pointer', border: 'none',
    transition: 'background .18s, box-shadow .18s',
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── top bar ── */}
      <div style={{
        background: '#fff', borderBottom: `1px solid ${C.border}`,
        padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 14,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
                   display: 'flex', alignItems: 'center', gap: 6,
                   color: C.textMid, fontSize: 13, fontWeight: 600, padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = C.primary}
          onMouseLeave={e => e.currentTarget.style.color = C.textMid}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to product list
        </button>
        <div style={{ width: 1, height: 20, background: C.border }} />
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: C.textDark, letterSpacing: '-0.02em' }}>
          Add New Product
        </h1>
      </div>

      {/* ── body ── */}
      <form onSubmit={handleSubmit}>
        <div style={{
          maxWidth: 1120, margin: '0 auto', padding: '28px 24px',
          display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20,
        }}>

          {/* ══════════ LEFT COLUMN ══════════ */}
          <div>

            {/* Description */}
            <SectionCard title="Description">
              <div style={{ marginBottom: 16 }}>
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
                  style={{
                    ...inputBase, resize: 'vertical', lineHeight: 1.6,
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => { e.target.style.borderColor = C.borderFocus; e.target.style.boxShadow = `0 0 0 3px ${C.shadow}` }}
                  onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = 'none' }}
                />
              </div>
            </SectionCard>

            {/* Category */}
            <SectionCard title="Category">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
                { value: 'instore',   label: 'In-store selling only' },
                { value: 'online',    label: 'Online selling only' },
                { value: 'both',      label: 'Available both in-store and online' },
              ].map(opt => (
                <label
                  key={opt.value}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 10, cursor: 'pointer',
                    color: C.textDark, fontSize: 13, fontWeight: 500,
                  }}
                >
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: `2px solid ${sellingType === opt.value ? C.primary : C.border}`,
                    background: sellingType === opt.value ? C.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all .15s',
                  }}>
                    {sellingType === opt.value && (
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'block' }} />
                    )}
                  </span>
                  <input
                    type="radio"
                    name="sellingType"
                    value={opt.value}
                    checked={sellingType === opt.value}
                    onChange={() => setSellingType(opt.value)}
                    style={{ display: 'none' }}
                  />
                  {opt.label}
                </label>
              ))}
            </SectionCard>

            {/* Variant */}
            <SectionCard title="Variant">
              <div style={{ marginBottom: 14 }}>
                <p style={{ color: C.textMid, fontSize: 13, margin: '0 0 14px 0' }}>Product variants</p>

                {variants.map((v, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, marginBottom: 10 }}>
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
                      style={{ background: '#fef2f2', border: `1px solid #fecaca`, borderRadius: 8,
                               color: C.danger, width: 38, cursor: 'pointer', fontSize: 16 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addVariant}
                style={{
                  background: 'none', border: `1.5px dashed ${C.primary}`,
                  borderRadius: 10, padding: '8px 18px',
                  color: C.primary, fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fdf0e4'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: C.textDark }}>
                  Product Images
                </h2>
                <span style={{
                  fontSize: 11, color: C.textMid, background: C.surface,
                  border: `1px solid ${C.border}`, borderRadius: 20,
                  padding: '3px 10px', fontWeight: 600,
                }}>
                  {imagePreviews.length}/5
                </span>
              </div>

              {/* drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? C.primary : C.border}`,
                  borderRadius: 12, padding: '28px 16px',
                  background: isDragging ? '#fdf0e4' : C.surface,
                  textAlign: 'center', cursor: 'pointer',
                  transition: 'all .18s', marginBottom: 14,
                }}
              >
                <svg width="32" height="32" fill="none" stroke={C.textLight} strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: '0 auto 8px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p style={{ margin: 0, fontSize: 13, color: C.primary, fontWeight: 700 }}>Click to upload</p>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: C.textMid }}>or drag and drop · PNG, JPG up to 5 MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={e => addFiles(e.target.files)}
                />
              </div>

              {/* previews grid */}
              {imagePreviews.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden',
                                           border: `1px solid ${C.border}`, aspectRatio: '1' }}>
                      <img src={src} alt={`product-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        style={{
                          position: 'absolute', top: 4, right: 4,
                          background: 'rgba(0,0,0,0.55)', border: 'none',
                          borderRadius: '50%', width: 22, height: 22,
                          color: '#fff', fontSize: 14, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          lineHeight: 1,
                        }}
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
              <div style={{ marginBottom: 14 }}>
                <Label htmlFor="weight">Items Weight</Label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="0.00"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <Select
                    value={weightUnit}
                    onChange={e => setWeightUnit(e.target.value)}
                    style={{ width: 70 }}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                  </Select>
                </div>
              </div>

              <Label>Package Size (cm)</Label>
              <p style={{ fontSize: 11, color: C.textMid, margin: '0 0 8px' }}>
                The package you use to ship your product
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Length', val: length, set: setLength, id: 'pkg-length' },
                  { label: 'Breadth', val: breadth, set: setBreadth, id: 'pkg-breadth' },
                  { label: 'Width',  val: width,  set: setWidth,  id: 'pkg-width' },
                ].map(({ label, val, set, id }) => (
                  <div key={id}>
                    <p style={{ fontSize: 11, color: C.textMid, margin: '0 0 4px', fontWeight: 600 }}>{label}</p>
                    <Input id={id} type="number" placeholder="0.00" value={val} onChange={e => set(e.target.value)} />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Pricing */}
            <SectionCard title="Pricing">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                                   color: C.textMid, fontSize: 13, fontWeight: 700, pointerEvents: 'none' }}>$</span>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={priceAmount}
                      onChange={e => setPriceAmount(e.target.value)}
                      required
                      style={{ paddingLeft: 26 }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="compare-price">Compare at Price</Label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                                   color: C.textMid, fontSize: 13, fontWeight: 700, pointerEvents: 'none' }}>$</span>
                    <Input
                      id="compare-price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={comparePrice}
                      onChange={e => setComparePrice(e.target.value)}
                      style={{ paddingLeft: 26 }}
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
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{ ...btnBase, background: C.surface, color: C.textMid, border: `1.5px solid ${C.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = C.border}
                onMouseLeave={e => e.currentTarget.style.background = C.surface}
              >
                Discard
              </button>

              <button
                type="button"
                style={{
                  ...btnBase, background: '#fff', color: C.primary,
                  border: `1.5px solid ${C.primary}`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fdf0e4'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                Schedule
              </button>

              <button
                id="create-product-btn"
                type="submit"
                disabled={isLoading}
                style={{
                  ...btnBase,
                  background: isLoading ? C.primaryLt : C.primary,
                  color: C.white,
                  boxShadow: `0 4px 16px ${C.shadow}`,
                  opacity: isLoading ? 0.75 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
                onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = C.primaryHov }}
                onMouseLeave={e => { if (!isLoading) e.currentTarget.style.background = C.primary }}
              >
                {isLoading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin"
                         style={{ animation: 'spin 1s linear infinite' }}>
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
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default CreateProducts
