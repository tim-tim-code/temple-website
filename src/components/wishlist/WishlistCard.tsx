import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WishlistItem } from '../../types/wishlist';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedButton from '../AnimatedButton';

interface WishlistCardProps {
  item: WishlistItem;
  onClick: () => void;
  delay?: number;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item, onClick, delay = 0 }) => {
  const { addItem, getItemQuantity, formatPrice, openCart } = useCart();
  const { t } = useLanguage();
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const itemQuantity = getItemQuantity(item.id);
  
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsAdding(true);
    
    // Add to cart
    addItem(item, quantity);
    
    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 800);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setQuantity(parseInt(e.target.value));
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage/30 via-sage/20 to-leaf/20 backdrop-blur-sm cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onClick}
      style={{
        boxShadow: '0 10px 40px rgba(0, 46, 25, 0.1), 0 4px 20px rgba(181, 226, 136, 0.15)'
      }}
    >
      {/* Subtle border gradient */}
      <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
      
      {/* Content */}
      <div className="relative p-6 flex flex-col h-full">
        {/* Image Placeholder */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-200 to-gray-300">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage/20 to-leaf/10">
              <svg className="w-12 h-12 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {item.is_featured && (
              <div className="bg-sun/90 text-forest text-xs px-2 py-1 rounded-full font-medium">
                ⭐ {t('wishlist.featured')}
              </div>
            )}
            {item.is_urgent && (
              <div className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full font-medium">
                🚨 {t('wishlist.urgent')}
              </div>
            )}
            {item.priority <= 3 && (
              <div className="bg-forest/80 text-paper text-xs px-2 py-1 rounded-full font-medium">
                Priority {item.priority}
              </div>
            )}
          </div>

        </div>
        
        {/* Title */}
        <h3 className="text-xl font-serif text-forest mb-2 group-hover:text-forest/80 transition-colors duration-200">
          {item.title}
        </h3>
        
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs text-forest/60 uppercase tracking-wider font-medium">
            {t(`category.${item.category}`) || item.category}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-soil/80 leading-relaxed mb-3 flex-grow">
          {item.short_description}
        </p>

        {/* Pricing */}
        <div className="mb-3">
          {item.price ? (
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-forest">
                {formatPrice(item.price)}
              </span>
              {item.minimum_price && item.minimum_price > 0 && (
                <span className="text-sm text-soil/60">
                  {t('wishlist.minPrice')}: {formatPrice(item.minimum_price)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-forest/70 text-sm">Price varies</span>
          )}
        </div>

        {/* Funding Progress (if applicable) */}
        {item.funding_goal && (
          <div className="mb-3">
            <div className="flex justify-between text-sm text-soil/70 mb-1">
              <span>{t('wishlist.fundingProgress')}</span>
              <span>{Math.round((item.funding_raised / item.funding_goal) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-sage h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((item.funding_raised / item.funding_goal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            item.status === 'needed' 
              ? 'bg-amber/20 text-amber-800' 
              : item.status === 'in_progress'
              ? 'bg-blue/20 text-blue-800'
              : item.status === 'purchased'
              ? 'bg-green/20 text-green-800'
              : 'bg-sage/20 text-sage-800'
          }`}>
            {item.status === 'needed' && '🎯 Needed'}
            {item.status === 'in_progress' && '⏳ In Progress'}
            {item.status === 'purchased' && '✅ Purchased'}
            {item.status === 'funded' && '💰 Funded'}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          {/* View Details Button (Card Click) */}
          <motion.button
            className="w-full px-4 py-2 text-forest/70 hover:text-forest text-sm transition-colors duration-200 border border-forest/20 hover:border-forest/40 rounded-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('wishlist.viewDetails') || 'View Details'}
          </motion.button>
          
          {/* Add to Cart Section */}
          {item.status === 'needed' && item.inventory_remaining > 0 && (
            <div onClick={(e) => e.stopPropagation()} className="space-y-2">
              {/* Quantity Selector */}
              {item.inventory > 1 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-soil/70">{t('wishlist.quantity') || 'Quantity'}:</span>
                  <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="bg-white/50 border border-forest/20 rounded px-2 py-1 text-sm focus:outline-none focus:border-forest/40"
                  >
                    {Array.from({ length: Math.min(item.inventory_remaining, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add to Cart Button */}
              <AnimatedButton
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full text-sm py-2"
              >
                {isAdding ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('wishlist.adding') || 'Adding...'}</span>
                  </div>
                ) : itemQuantity > 0 ? (
                  `${t('wishlist.addMore') || 'Add More'} (${itemQuantity} ${t('wishlist.inCart') || 'in cart'})`
                ) : (
                  t('wishlist.addToCart')
                )}
              </AnimatedButton>

              {/* Cart Indicator */}
              {itemQuantity > 0 && !isAdding && (
                <div className="text-center">
                  <span className="text-xs text-sage-700 bg-sage/20 px-2 py-1 rounded-full">
                    ✓ {itemQuantity} {t('wishlist.inCart') || 'in cart'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Out of Stock */}
          {item.status === 'needed' && item.inventory_remaining === 0 && (
            <div className="text-center py-2">
              <span className="text-sm text-amber-700 bg-amber/20 px-3 py-1 rounded-full">
                {t('wishlist.outOfStock')}
              </span>
            </div>
          )}

          {/* Already Purchased/Funded */}
          {(item.status === 'purchased' || item.status === 'funded') && (
            <div className="text-center py-2">
              <span className="text-sm text-green-700 bg-green/20 px-3 py-1 rounded-full">
                {item.status === 'purchased' ? `✅ ${t('wishlist.purchased') || 'Already Purchased'}` : `💰 ${t('wishlist.funded')}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 right-6 w-1 h-1 bg-sage/40 rounded-full"></div>
    </motion.div>
  );
};

export default WishlistCard;