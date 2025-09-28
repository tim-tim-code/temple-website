import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AnimatedButton from './AnimatedButton';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    cart,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    formatPrice,
    getTotalPrice,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Cart Sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/20 backdrop-blur-xl border-l border-white/30 shadow-2xl z-50 flex flex-col"
            style={{
              borderTopLeftRadius: '32px',
              borderBottomLeftRadius: '32px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-serif text-forest">{t('wishlist.cart')}</h2>
              <motion.button
                onClick={closeCart}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <svg className="w-16 h-16 text-forest/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z" />
                  </svg>
                  <h3 className="text-lg font-serif text-forest mb-2">{t('wishlist.empty')}</h3>
                  <p className="text-soil/70 mb-6">{t('wishlist.emptyDesc')}</p>
                  <motion.button
                    onClick={closeCart}
                    className="px-4 py-2 text-forest hover:text-forest/80 transition-colors duration-200 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('wishlist.continueShopping')}
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((cartItem, index) => (
                    <motion.div
                      key={cartItem.id}
                      className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex space-x-4">
                        {/* Item Image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-sage/20 to-leaf/10 flex-shrink-0">
                          {cartItem.item.image_url ? (
                            <img
                              src={cartItem.item.image_url}
                              alt={cartItem.item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-forest truncate">{cartItem.item.title}</h4>
                          <p className="text-sm text-soil/70 mt-1">{cartItem.item.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-forest">
                              {formatPrice(cartItem.price_at_time)}
                            </span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <motion.button
                                onClick={() => handleQuantityChange(cartItem.item.id, cartItem.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center justify-center text-forest transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </motion.button>
                              
                              <span className="w-8 text-center font-medium text-forest">
                                {cartItem.quantity}
                              </span>
                              
                              <motion.button
                                onClick={() => handleQuantityChange(cartItem.item.id, cartItem.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 flex items-center justify-center text-forest transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={cartItem.quantity >= cartItem.item.inventory_remaining}
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Item Total */}
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-soil/70">
                              {t('wishlist.subtotal')}: {formatPrice(cartItem.price_at_time * cartItem.quantity)}
                            </span>
                            
                            {/* Remove Button */}
                            <motion.button
                              onClick={() => removeItem(cartItem.item.id)}
                              className="text-xs text-red-600 hover:text-red-700 transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {t('wishlist.remove')}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart Button */}
                  {cart.items.length > 0 && (
                    <motion.button
                      onClick={clearCart}
                      className="w-full text-sm text-red-600 hover:text-red-700 py-2 transition-colors duration-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: cart.items.length * 0.1 + 0.2 }}
                    >
                      {t('wishlist.clearCart')}
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <motion.div
                className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Cart Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-soil/80">
                    <span>{t('wishlist.items')} ({cart.total_items})</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-forest border-t border-sage/20 pt-3">
                    <span>{t('wishlist.total')}</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                {/* Donation Message */}
                <div className="mb-6 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl">
                  <p className="text-sm text-forest/80 text-center">
                    {t('wishlist.donationMessage')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <AnimatedButton
                    onClick={handleCheckout}
                    className="w-full py-3"
                  >
                    {t('wishlist.checkout')}
                  </AnimatedButton>
                  
                  <motion.button
                    onClick={closeCart}
                    className="w-full px-4 py-2 text-forest/70 hover:text-forest text-sm transition-colors duration-200 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('wishlist.continueShopping')}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;