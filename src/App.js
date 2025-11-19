import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './context/CategoriesContext';
import { HomeProvider } from './context/HomeContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Preloader from './components/Preloader';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import InSeasonPage from './pages/InSeasonPage';
import FreshProducePage from './pages/FreshProducePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';
import MyAccountPage from './pages/MyAccountPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <CategoriesProvider>
      <HomeProvider>
        <Preloader />
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/inseason" element={<InSeasonPage />} />
                  <Route path="/freshproduce" element={<FreshProducePage />} />
                  <Route path="/shop-grid" element={<ShopPage />} />
                  <Route path="/shop-list" element={<ShopPage />} />
                  <Route path="/shop-grid-list" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/product-detail" element={<ProductDetailPage />} />
                  <Route path="/product-video" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/my-account" element={<MyAccountPage />} />
                  <Route path="/my-account-2" element={<MyAccountPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </HomeProvider>
    </CategoriesProvider>
  );
}

export default App;
