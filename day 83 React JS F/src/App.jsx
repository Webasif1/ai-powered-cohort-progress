import React, { useContext } from 'react'
import {ProductDataContext} from './Context/ProductContext'
import { Link } from 'react-router-dom'

const App = () => {

  const productData =useContext(ProductDataContext)

  let renderUi = "Loading..."

  if(productData.length > 0){
  renderUi = productData.map((elem,idx)=>{
    return <div key={idx} className='product-card'>
      <div>
      <img src={elem.image} alt="" />
      <h2>{elem.title}</h2>
      </div>
    </div>
  })
  }

  return (
    <div className='product-container'>{renderUi}</div>
  )
}

export default App
