import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'error' | 'success' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ 
  message, 
  isVisible, 
  onClose,
  type = 'error' 
}) => {
  // Auto-hide after 4 seconds
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'error':
        return 'border-red-400/50';
      case 'success':
        return 'border-green-400/50';
      default:
        return 'border-blue-400/50';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25,
            duration: 0.4 
          }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] max-w-md w-full mx-4"
        >
          <div className={`bg-white/20 backdrop-blur-xl border ${getBorderColor()} rounded-2xl p-4 shadow-2xl`}>
            <div className="flex items-center space-x-3">
              {getIcon()}
              <p className="text-white font-medium flex-1">
                {message}
              </p>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;