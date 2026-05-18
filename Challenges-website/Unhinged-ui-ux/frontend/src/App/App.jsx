import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import ProductPage from './Pages/ProductPage';
import { CartProvider } from '../features/Cart/state/CartContext.jsx';
import { ProductProvider } from '../features/Products/state/ProductContext.jsx';
import { AuthProvider } from '../features/auth/state/authContext.jsx';
import Signin from '../features/auth/Pages/Signin';
import Signup from '../features/auth/Pages/Signup';
import Profile from '../features/auth/Pages/Profile';
import ProtectedRoute from '../features/auth/Components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
