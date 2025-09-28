import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ScrollNavigation from './components/ScrollNavigation';
import Hero from './components/Hero';
import About from './components/About';
import ForWhom from './components/ForWhom';
import Animals from './components/Animals';
import Supporters from './components/Supporters';
import FAQPage from './components/FAQPage';
import SupportTheTemple from './components/SupportTheTemple';
import FAQPreview from './components/FAQPreview';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import FloatingNewsletterIcon from './components/FloatingNewsletterIcon';
import WishlistPage from './components/wishlist/WishlistPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CheckoutPage from './components/CheckoutPage';
import Cart from './components/Cart';

function HomePage() {
  return (
    <div className="App w-full max-w-full overflow-x-hidden">
      <Header />
      <ScrollNavigation />
      <Hero />
      <About />
      <ForWhom />
      <Animals />
      <Supporters />
      <SupportTheTemple />
      <FAQPreview />
      <Newsletter />
      <Footer />
      <FloatingNewsletterIcon />
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Cart />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
