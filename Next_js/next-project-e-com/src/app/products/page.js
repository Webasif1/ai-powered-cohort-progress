import ProductCard from '@/Components/ProductCart';
import React from 'react'

const page = async () => {
  // const [products, setProducts] = useState([])
  let res = await fetch("https://fakestoreapi.com/products");
  let products = await res.json()
  console.log(products)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </div>
  )
}

export default page
