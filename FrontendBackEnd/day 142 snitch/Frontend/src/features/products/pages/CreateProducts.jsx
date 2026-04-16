import React, { useState } from 'react'
import { useProduct } from '../hooks/useProduct.js'
import { useSelector } from 'react-redux'

const CreateProducts = () => {
  const { handleCreateProduct } = useProduct()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priceAmount, setPriceAmount] = useState("")
  const [priceCurrency, setPriceCurrency] = useState("")
  const [images, setImages] = useState([])
  const { isLoading, sellerProducts } = useSelector((state) => state.product)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreateProduct({ title, description, priceAmount, priceCurrency, images })
  }
  console.log(isLoading, sellerProducts)
  console.log(title, description, priceAmount, priceCurrency, images)
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Price Amount" value={priceAmount} onChange={(e) => setPriceAmount(e.target.value)} />
        <input type="text" placeholder="Price Currency" value={priceCurrency} onChange={(e) => setPriceCurrency(e.target.value)} />
        <input type="file" placeholder="Images" value={images} onChange={(e) => setImages(e.target.files[0])} />
        <button type="submit">Create Product</button>
      </form>
    </div>
  )
}

export default CreateProducts
