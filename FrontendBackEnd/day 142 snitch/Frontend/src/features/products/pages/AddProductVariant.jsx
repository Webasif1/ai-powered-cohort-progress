import React, { useState, useRef } from 'react'
import { useProduct } from '../hooks/useProduct.js'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

/* ─── shared design tokens (same as CreateProducts) ─── */
const inputBase =
  'w-full box-border bg-[#f5ede4] border-[1.5px] border-[#e8d5c0] rounded-[10px] py-[10px] px-[14px] text-[13px] text-[#1e160f] outline-none transition-all duration-[180ms] focus:border-[#b8915a] focus:shadow-[0_0_0_3px_rgba(184,145,90,0.18)]'

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="text-[#8a7360] text-[11px] font-bold uppercase tracking-[0.08em] block mb-[6px]"
  >
    {children}
  </label>
)

const Input = ({ id, className, style, ...props }) => (
  <input
    id={id}
    {...props}
    className={`${inputBase} ${className || ''}`}
    style={style}
  />
)

const SectionCard = ({ title, children, className, style }) => (
  <div
    className={`bg-white border border-[#e8d5c0] rounded-[14px] py-[18px] px-[18px] sm:py-[22px] sm:px-[24px] mb-[16px] sm:mb-[20px] ${className || ''}`}
    style={style}
  >
    {title && (
      <h2 className="text-[14px] sm:text-[15px] font-extrabold text-[#1e160f] m-0 mb-[16px] sm:mb-[18px] tracking-[-0.01em]">
        {title}
      </h2>
    )}
    {children}
  </div>
)

/* ─── main component ─── */
const AddProductVariant = () => {
  const { productId } = useParams()
  const { handleGetProductVariants } = useProduct()
  const { isLoading } = useSelector(state => state.product)
  const navigate = useNavigate()

  /* ── form state ── */
  const [price, setPrice]     = useState('')
  const [stock, setStock]     = useState('')
  const [attributes, setAttributes] = useState([{ name: '', value: '' }])
  const [images, setImages]   = useState([])        // File objects
  const [previews, setPreviews] = useState([])       // data-URL strings
  const [isDragging, setIsDragging] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error'
  const [statusMsg, setStatusMsg]       = useState('')

  const fileInputRef = useRef(null)

  /* ── image helpers ── */
  const addFiles = files => {
    const arr = Array.from(files).slice(0, 5 - images.length)
    if (!arr.length) return
    setImages(prev => [...prev, ...arr])
    arr.forEach(f => {
      const reader = new FileReader()
      reader.onload = e => setPreviews(prev => [...prev, e.target.result])
      reader.readAsDataURL(f)
    })
  }

  const removeImage = idx => {
    setImages(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  /* ── attribute helpers ── */
  const addAttribute = () =>
    setAttributes(prev => [...prev, { name: '', value: '' }])

  const updateAttribute = (idx, key, val) =>
    setAttributes(prev =>
      prev.map((a, i) => (i === idx ? { ...a, [key]: val } : a))
    )

  const removeAttribute = idx =>
    setAttributes(prev => prev.filter((_, i) => i !== idx))

  /* ── submit ── */
  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitStatus(null)

    if (!price || !stock) {
      setSubmitStatus('error')
      setStatusMsg('Price and stock are required.')
      return
    }

    const filteredAttrs = attributes.filter(a => a.name.trim() && a.value.trim())

    const newProductVariant = {
      images: images.map(file => ({ file })),
      stock: Number(stock),
      price: Number(price),
      attributes: filteredAttrs,
    }

    try {
      await handleGetProductVariants(productId, newProductVariant)
      setSubmitStatus('success')
      setStatusMsg('Variant added successfully!')
      // reset
      setPrice(''); setStock('')
      setAttributes([{ name: '', value: '' }])
      setImages([]); setPreviews([])
    } catch {
      setSubmitStatus('error')
      setStatusMsg('Failed to add variant. Please try again.')
    }
  }

  const btnBase =
    'py-[10px] px-[18px] sm:px-[22px] rounded-[10px] text-[13px] font-bold cursor-pointer border-none transition-all duration-[180ms]'

  return (
    <div className="min-h-screen bg-[#fdf8f3] font-inter">

      {/* ── top bar ── */}
      <div className="bg-white border-b border-[#e8d5c0] py-[12px] sm:py-[14px] px-[16px] sm:px-[32px] flex items-center gap-[10px] sm:gap-[14px] sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none cursor-pointer flex items-center gap-[6px] text-[#8a7360] text-[13px] font-semibold p-0 hover:text-[#b8915a] transition-colors"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Back to product</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="w-[1px] h-[20px] bg-[#e8d5c0]" />
        <h1 className="m-0 text-[16px] sm:text-[20px] font-black text-[#1e160f] tracking-[-0.02em]">
          Add Product Variant
        </h1>
        {productId && (
          <span className="ml-auto text-[11px] text-[#8a7360] bg-[#f5ede4] border border-[#e8d5c0] rounded-[20px] py-[3px] px-[10px] font-semibold hidden sm:inline">
            ID: {productId}
          </span>
        )}
      </div>

      {/* ── status toast ── */}
      {submitStatus && (
        <div
          className={`mx-auto max-w-[1120px] px-[16px] sm:px-[24px] mt-[16px] py-[12px] px-[16px] rounded-[10px] text-[13px] font-semibold flex items-center gap-[8px] border ${
            submitStatus === 'success'
              ? 'bg-[#f0fdf4] border-[#86efac] text-[#166534]'
              : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
          }`}
        >
          <span>{submitStatus === 'success' ? '✓' : '✕'}</span>
          {statusMsg}
        </div>
      )}

      {/* ── body ── */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-[1120px] mx-auto py-[20px] sm:py-[28px] px-[16px] sm:px-[24px] grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-[16px] sm:gap-[20px]">

          {/* ══ LEFT COLUMN ══ */}
          <div>

            {/* Pricing */}
            <SectionCard title="Pricing">
              <div className="grid grid-cols-2 gap-[14px]">
                <div>
                  <Label htmlFor="variant-price">Price</Label>
                  <div className="relative">
                    <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#8a7360] text-[13px] font-bold pointer-events-none">
                      $
                    </span>
                    <Input
                      id="variant-price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      required
                      className="pl-[26px]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="variant-stock">Stock / Quantity</Label>
                  <Input
                    id="variant-stock"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>
            </SectionCard>

            {/* Attributes */}
            <SectionCard title="Variant Attributes">
              <p className="text-[#8a7360] text-[13px] m-0 mb-[14px]">
                Define the distinguishing attributes of this variant (e.g. Color → Red, Size → XL).
              </p>

              {attributes.map((attr, idx) => (
                <div key={idx} className="flex gap-[8px] sm:gap-[10px] mb-[10px]">
                  <Input
                    type="text"
                    placeholder="Name (e.g. Color)"
                    value={attr.name}
                    onChange={e => updateAttribute(idx, 'name', e.target.value)}
                    className="flex-1 min-w-0"
                  />
                  <Input
                    type="text"
                    placeholder="Value (e.g. Red)"
                    value={attr.value}
                    onChange={e => updateAttribute(idx, 'value', e.target.value)}
                    className="flex-1 min-w-0"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(idx)}
                    disabled={attributes.length === 1}
                    className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] text-[#c0392b] w-[38px] shrink-0 cursor-pointer text-[16px] disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ×
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addAttribute}
                className="bg-transparent border-[1.5px] border-dashed border-[#b8915a] rounded-[10px] py-[8px] px-[18px] text-[#b8915a] text-[13px] font-bold cursor-pointer flex items-center gap-[6px] transition-colors duration-[150ms] hover:bg-[#fdf0e4] mt-[4px]"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
                Add Attribute
              </button>
            </SectionCard>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div>

            {/* Variant Images */}
            <SectionCard>
              <div className="flex items-center justify-between mb-[16px]">
                <h2 className="m-0 text-[14px] sm:text-[15px] font-extrabold text-[#1e160f]">
                  Variant Images
                </h2>
                <span className="text-[11px] text-[#8a7360] bg-[#f5ede4] border border-[#e8d5c0] rounded-[20px] py-[3px] px-[10px] font-semibold">
                  {previews.length}/5
                </span>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-[2px] border-dashed rounded-[12px] py-[24px] sm:py-[28px] px-[16px] text-center cursor-pointer transition-all duration-[180ms] mb-[14px] ${
                  isDragging
                    ? 'border-[#b8915a] bg-[#fdf0e4]'
                    : 'border-[#e8d5c0] bg-[#f5ede4]'
                }`}
              >
                <svg
                  width="32" height="32" fill="none" stroke="#c4a882"
                  strokeWidth="1.5" viewBox="0 0 24 24" className="mx-auto mb-[8px]"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
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

              {/* Previews grid */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-[8px]">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-[10px] overflow-hidden border border-[#e8d5c0] aspect-square"
                    >
                      <img src={src} alt={`variant-${idx}`} className="w-full h-full object-cover" />
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

            {/* Summary preview card */}
            <SectionCard title="Variant Summary">
              <div className="space-y-[10px]">
                <div className="flex justify-between items-center py-[8px] border-b border-[#f5ede4]">
                  <span className="text-[12px] text-[#8a7360] font-semibold">Price</span>
                  <span className="text-[13px] font-bold text-[#1e160f]">
                    {price ? `$${parseFloat(price).toFixed(2)}` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-[8px] border-b border-[#f5ede4]">
                  <span className="text-[12px] text-[#8a7360] font-semibold">Stock</span>
                  <span className="text-[13px] font-bold text-[#1e160f]">
                    {stock ? `${stock} units` : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-[8px] border-b border-[#f5ede4]">
                  <span className="text-[12px] text-[#8a7360] font-semibold">Images</span>
                  <span className="text-[13px] font-bold text-[#1e160f]">{images.length} uploaded</span>
                </div>
                <div className="flex justify-between items-center py-[8px]">
                  <span className="text-[12px] text-[#8a7360] font-semibold">Attributes</span>
                  <span className="text-[13px] font-bold text-[#1e160f]">
                    {attributes.filter(a => a.name && a.value).length} defined
                  </span>
                </div>

                {/* Attribute chips */}
                {attributes.filter(a => a.name && a.value).length > 0 && (
                  <div className="flex flex-wrap gap-[6px] pt-[4px]">
                    {attributes
                      .filter(a => a.name.trim() && a.value.trim())
                      .map((a, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-bold bg-[#f5ede4] border border-[#e8d5c0] text-[#8a7360] rounded-[20px] py-[3px] px-[10px]"
                        >
                          {a.name}: {a.value}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </SectionCard>

            {/* Action buttons */}
            <div className="flex gap-[8px] sm:gap-[10px] justify-end mt-[4px] flex-wrap">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`${btnBase} bg-[#f5ede4] text-[#8a7360] border-[1.5px] border-[#e8d5c0] hover:bg-[#e8d5c0]`}
              >
                Discard
              </button>

              <button
                id="add-variant-btn"
                type="submit"
                disabled={isLoading}
                className={`${btnBase} ${
                  isLoading
                    ? 'bg-[#d4b896] opacity-75 cursor-not-allowed'
                    : 'bg-[#b8915a] hover:bg-[#a07848] cursor-pointer'
                } text-[#fdf8f3] shadow-[0_4px_16px_rgba(184,145,90,0.18)] flex items-center gap-[8px]`}
              >
                {isLoading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity=".75" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  'Add Variant'
                )}
              </button>
            </div>

          </div>
        </div>
      </form>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        .space-y-\\[10px\\] > * + * { margin-top: 0; }
      `}</style>
    </div>
  )
}

export default AddProductVariant
