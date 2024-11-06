import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '@/components/LandingPage';
import ProductsListingPage from '@/components/ProductsListingPage';
import ProductDetailPage from '@/components/ProductDetailPage';
import CartPage from '@/components/CartPage';
import CheckoutPage from '@/components/CheckoutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductsListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;