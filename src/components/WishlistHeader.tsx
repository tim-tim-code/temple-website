import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const WishlistHeader: React.FC = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useCart();
  const { t } = useLanguage();

  return (
    <div className="fixed top-4 left-0 right-0 flex justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative"
      >
        {/* Main Navigation Pill - Exact copy of homepage navbar */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-6">
            
            {/* Back Button Pill */}
            <motion.button
              onClick={() => navigate('/')}
              className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium text-sm">{t('wishlist.back')}</span>
            </motion.button>

            {/* Center Title */}
            <h1 className="text-xl font-serif font-medium text-forest/90 px-4">
              {t('wishlist.title')}
            </h1>

            {/* Cart Pill */}
            <motion.button
              onClick={toggleCart}
              className="bg-white/15 backdrop-blur-2xl border border-white/20 rounded-full px-4 py-2.5 flex items-center space-x-2 text-forest/80 hover:text-forest hover:bg-white/25 transition-all duration-300 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6"
                  />
                </svg>
                
                {/* Item Count Badge */}
                {cart.total_items > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-sun text-forest text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    key={cart.total_items}
                  >
                    {cart.total_items > 99 ? '99+' : cart.total_items}
                  </motion.div>
                )}
              </div>
              
              <span className="font-medium text-sm">
                {cart.total_items === 0 ? t('wishlist.cart') : `${t('wishlist.cart')} (${cart.total_items})`}
              </span>

              {/* Pulse animation when items are added */}
              {cart.total_items > 0 && (
                <motion.div
                  className="absolute inset-0 bg-sun/20 rounded-full"
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                />
              )}
            </motion.button>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WishlistHeader;