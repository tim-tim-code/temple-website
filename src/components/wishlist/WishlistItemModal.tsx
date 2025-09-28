import React from 'react';
import { motion } from 'framer-motion';
import { WishlistItem } from '../../types/wishlist';
import { useLanguage } from '../../context/LanguageContext';
import AnimatedButton from '../AnimatedButton';

interface WishlistItemModalProps {
  item: WishlistItem;
  onClose: () => void;
}

const WishlistItemModal: React.FC<WishlistItemModalProps> = ({ item, onClose }) => {
  const { t } = useLanguage();
  
  const handleBuyClick = () => {
    window.open(item.purchase_link, '_blank');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden border border-sage/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 46, 25, 0.25), 0 20px 25px -5px rgba(181, 226, 136, 0.1)'
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white border border-sage/30 flex items-center justify-center text-forest hover:bg-sage/10 transition-colors duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header Image */}
          <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-sage/20 to-leaf/10">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-16 h-16 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Status and Priority Badges */}
            <div className="absolute top-6 left-6 flex space-x-2">
              {item.priority <= 3 && (
                <div className="bg-forest/80 text-paper text-sm px-3 py-1 rounded-full font-medium">
                  Priority {item.priority}
                </div>
              )}
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.status === 'needed' 
                  ? 'bg-amber/20 text-amber-800' 
                  : item.status === 'in_progress'
                  ? 'bg-blue/20 text-blue-800'
                  : 'bg-green/20 text-green-800'
              }`}>
                {item.status === 'needed' && '🎯 Needed'}
                {item.status === 'in_progress' && '⏳ In Progress'}
                {item.status === 'purchased' && '✅ Purchased'}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <motion.h1
              className="text-3xl md:text-4xl font-serif text-forest mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {item.title}
            </motion.h1>

            {/* Description Sections */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2 className="text-xl font-serif text-forest mb-4">{t('wishlist.description')}</h2>
                <p className="text-soil/80 leading-relaxed">
                  {item.full_description}
                </p>
              </motion.div>

              {/* Why We Need It */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <h2 className="text-xl font-serif text-forest mb-4">{t('wishlist.whyWeNeedThis')}</h2>
                <p className="text-soil/80 leading-relaxed">
                  {item.why_we_need_it}
                </p>
              </motion.div>
            </div>

            {/* Action Section */}
            {item.status === 'needed' && (
              <motion.div
                className="bg-gradient-to-br from-sage/15 via-sage/8 to-leaf/8 rounded-2xl p-6 border border-sage/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="text-center">
                  <h3 className="text-xl font-serif text-forest mb-4">
                    {t('wishlist.helpUsGetThis')}
                  </h3>
                  <p className="text-soil/80 mb-6">
                    {t('wishlist.contributionMessage')}
                  </p>
                  <div className="max-w-xs mx-auto">
                    <AnimatedButton
                      onClick={handleBuyClick}
                      className="w-full px-8 py-3 text-base font-medium"
                    >
                      {t('wishlist.buyForTemple')}
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            )}

            {item.status === 'purchased' && (
              <motion.div
                className="bg-gradient-to-br from-green/15 via-green/8 to-sage/8 rounded-2xl p-6 border border-green/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="text-center">
                  <h3 className="text-xl font-serif text-forest mb-4">
                    ✅ {t('wishlist.alreadyPurchased')}
                  </h3>
                  <p className="text-soil/80">
                    {t('wishlist.thankYouMessage')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WishlistItemModal;