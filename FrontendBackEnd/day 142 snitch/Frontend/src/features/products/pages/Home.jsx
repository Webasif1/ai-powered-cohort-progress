import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hooks/useProduct.js'
function Home() {
  const Product = useProduct()
  const handleGetAllProducts = Product.handleGetAllProducts;
  const allProducts = useSelector((state) => state.product.allProducts)
  console.log(handleGetAllProducts)
  console.log(allProducts)
  useEffect(() => {
    handleGetAllProducts()
  }, [])
  return (
    <div>
      {allProducts.map((product) => (
        <div key={product._id}>
          <img src={product.images[0].url} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.price.amount} {product.price.currency}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Home
