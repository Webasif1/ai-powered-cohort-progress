import React, { createContext, useEffect, useState } from 'react'
import axios from "axios"

export const ProductDataContext = createContext()



const ProductContext = (props) => {
  const [productData, setProductData] = useState([])
  // const [ProductUrl, setProductUrl] = useState('https://fakestoreapi.com/products')


  const products = async () => {
    const respond = await axios.get('https://fakestoreapi.com/products')
    const data = respond.data
    setProductData(data)
  }

  useEffect(() => {
    products()
  },[])


  return (
    <div>
      <ProductDataContext.Provider value={productData}>
        {props.children}
      </ProductDataContext.Provider>
    </div>
  )
}
export default ProductContext
