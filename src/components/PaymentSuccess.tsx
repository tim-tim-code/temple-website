import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { clearCart } = useCart();

  // Clear cart on successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/10 via-leaf/5 to-paper flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-serif text-forest mb-4">
          Thank You!
        </h1>

        <p className="text-soil mb-6 leading-relaxed">
          Your donation has been received successfully. Your generosity helps us continue our mission
          and care for all beings at the temple.
        </p>

        <p className="text-sage font-medium mb-8">
          A confirmation email will be sent to you shortly.
        </p>

        <motion.button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-forest text-white rounded-full font-medium hover:bg-forest/90 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          Return to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
