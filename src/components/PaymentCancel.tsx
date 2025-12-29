import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/10 via-leaf/5 to-paper flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </motion.div>

        <h1 className="text-3xl font-serif text-forest mb-4">
          Payment Cancelled
        </h1>

        <p className="text-soil mb-6 leading-relaxed">
          Your payment was cancelled or could not be completed.
          No charges have been made to your account.
        </p>

        <p className="text-soil/70 mb-8">
          If you experienced any issues, please don't hesitate to contact us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigate('/checkout')}
            className="px-8 py-3 bg-forest text-white rounded-full font-medium hover:bg-forest/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>

          <motion.button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-sage/20 text-forest rounded-full font-medium hover:bg-sage/30 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
          >
            Return to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
