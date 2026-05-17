import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import { CartProvider } from '../features/Cart/state/CartContext.jsx';
import { ProductProvider } from '../features/Products/state/ProductContext.jsx';

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}
