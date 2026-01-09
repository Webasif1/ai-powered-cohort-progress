import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductContext from './Context/ProductContext'

createRoot(document.getElementById('root')).render(
  <ProductContext>
    <App />
  </ProductContext>
)
