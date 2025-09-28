import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartIcon: React.FC = () => {
  const { cart, toggleCart } = useCart();

  return (
    <motion.button
      onClick={toggleCart}
      className="fixed top-6 right-6 z-30 bg-gradient-to-br from-forest via-forest/90 to-sage/80 text-paper p-3 rounded-full shadow-2xl border border-sage/30 backdrop-blur-sm"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        boxShadow: '0 10px 40px rgba(0, 46, 25, 0.3), 0 4px 20px rgba(181, 226, 136, 0.2)'
      }}
    >
      {/* Cart Icon */}
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="absolute -top-2 -right-2 bg-sun text-forest text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-paper"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          key={cart.total_items} // Re-animate when count changes
        >
          {cart.total_items > 99 ? '99+' : cart.total_items}
        </motion.div>
      )}

      {/* Pulse animation when items are added */}
      {cart.total_items > 0 && (
        <motion.div
          className="absolute inset-0 bg-sage rounded-full"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
        />
      )}
    </motion.button>
  );
};

export default CartIcon;