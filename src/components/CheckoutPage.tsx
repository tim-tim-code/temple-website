import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AnimatedButton from './AnimatedButton';

interface DonorInfo {
  name: string;
  email: string;
  isAnonymous: boolean;
  message: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, formatPrice, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    name: '',
    email: '',
    isAnonymous: false,
    message: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      // Here you would integrate with your payment processor
      console.log('Processing donation:', {
        donorInfo,
        cart,
        total: getTotalPrice(),
      });
      
      // Clear cart and show success
      clearCart();
      setCurrentStep(4);
      setIsProcessing(false);
    }, 2000);
  };

  if (cart.items.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-paper via-sage/5 to-sun/5 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-forest mb-4">Your cart is empty</h2>
          <p className="text-soil/80 mb-6">Add some items to continue with checkout</p>
          <AnimatedButton onClick={() => navigate('/wishlist')}>
            Browse Wishlist
          </AnimatedButton>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Review Cart', description: 'Verify your donation items' },
    { number: 2, title: 'Donor Information', description: 'Tell us about yourself' },
    { number: 3, title: 'Payment', description: 'Complete your donation' },
    { number: 4, title: 'Confirmation', description: 'Thank you!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper via-sage/5 to-sun/5">
      {/* Header */}
      <div className="bg-forest/95 backdrop-blur-sm border-b border-sage/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => navigate('/wishlist')}
              className="flex items-center space-x-2 text-paper hover:text-paper/80 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Wishlist</span>
            </motion.button>

            <h1 className="text-2xl md:text-3xl font-serif text-paper">
              Checkout
            </h1>

            <div className="w-32"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-1/2 w-full h-0.5 bg-sage/30">
                    <div
                      className="h-full bg-sage transition-all duration-500"
                      style={{
                        width: currentStep > step.number ? '100%' : '0%',
                      }}
                    />
                  </div>
                )}
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors duration-300 relative z-10 ${
                    currentStep >= step.number
                      ? 'bg-sage text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {currentStep > step.number ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </motion.div>
                <div className="text-center mt-3">
                  <p className="text-sm font-medium text-forest">{step.title}</p>
                  <p className="text-xs text-soil/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-sage/20"
          >
            {/* Step 1: Review Cart */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-serif text-forest mb-6">Review Your Donation</h2>
                <div className="space-y-4 mb-8">
                  {cart.items.map((cartItem) => (
                    <div key={cartItem.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-sage/20 flex items-center justify-center">
                          {cartItem.item.image_url ? (
                            <img src={cartItem.item.image_url} alt={cartItem.item.title} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-6 h-6 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-forest">{cartItem.item.title}</h3>
                          <p className="text-sm text-soil/70">Quantity: {cartItem.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-forest">
                          {formatPrice(cartItem.price_at_time * cartItem.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-sage/20 rounded-xl p-6 mb-8">
                  <div className="flex justify-between items-center text-lg font-semibold text-forest">
                    <span>Total Donation Amount</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <AnimatedButton onClick={() => setCurrentStep(2)}>
                    Continue to Donor Info
                  </AnimatedButton>
                </div>
              </div>
            )}

            {/* Step 2: Donor Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-serif text-forest mb-6">Donor Information</h2>
                <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-forest mb-2">
                        Full Name {!donorInfo.isAnonymous && '*'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={donorInfo.name}
                        onChange={handleInputChange}
                        disabled={donorInfo.isAnonymous}
                        required={!donorInfo.isAnonymous}
                        className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/70 focus:border-sage focus:outline-none disabled:bg-gray-100"
                        placeholder={donorInfo.isAnonymous ? "Anonymous" : "Enter your name"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-forest mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/70 focus:border-sage focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="isAnonymous"
                      checked={donorInfo.isAnonymous}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-sage border-sage/30 rounded focus:ring-sage"
                    />
                    <label htmlFor="anonymous" className="text-sm text-soil/80">
                      Make this donation anonymous
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">
                      Message or Dedication (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={donorInfo.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-sage/30 bg-white/70 focus:border-sage focus:outline-none resize-none"
                      placeholder="Share a message or dedication with your donation..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 text-forest hover:text-forest/80 transition-colors duration-200 border border-forest/20 hover:border-forest/40 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back to Cart
                    </motion.button>
                    <AnimatedButton type="submit">
                      Continue to Payment
                    </AnimatedButton>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-serif text-forest mb-6">Complete Your Donation</h2>
                
                <div className="bg-gradient-to-br from-sage/20 via-sage/10 to-leaf/10 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-serif text-forest mb-4">Donation Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Items ({cart.total_items})</span>
                      <span>{formatPrice(cart.subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-sage/20 pt-2">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                  {!donorInfo.isAnonymous && (
                    <p className="text-sm text-soil/70">
                      Donor: {donorInfo.name} ({donorInfo.email})
                    </p>
                  )}
                  {donorInfo.message && (
                    <div className="mt-3 p-3 bg-white/50 rounded-lg">
                      <p className="text-sm text-soil/80 italic">"{donorInfo.message}"</p>
                    </div>
                  )}
                </div>

                {/* Payment Integration Placeholder */}
                <div className="bg-white/50 rounded-xl p-8 mb-8 text-center border-2 border-dashed border-sage/30">
                  <div className="mb-4">
                    <svg className="w-16 h-16 text-sage mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-serif text-forest mb-2">Payment Integration</h3>
                  <p className="text-soil/70 mb-6">
                    This is where your payment processor integration will be implemented.
                    <br />
                    (Shopify Buy Button, Stripe, PayPal, etc.)
                  </p>
                  <form onSubmit={handleSubmit}>
                    <AnimatedButton 
                      type="submit" 
                      disabled={isProcessing}
                      className="px-8 py-4"
                    >
                      {isProcessing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `Complete Donation - ${formatPrice(getTotalPrice())}`
                      )}
                    </AnimatedButton>
                  </form>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 text-forest hover:text-forest/80 transition-colors duration-200 border border-forest/20 hover:border-forest/40 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Info
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <h2 className="text-3xl font-serif text-forest mb-4">Thank You!</h2>
                <p className="text-xl text-soil/80 mb-8">
                  Your generous donation has been received and will directly support our temple community.
                </p>
                
                <div className="bg-sage/20 rounded-xl p-6 mb-8">
                  <p className="text-forest/80">
                    💚 You will receive a confirmation email shortly with your donation details.
                  </p>
                </div>

                <div className="space-y-4">
                  <AnimatedButton onClick={() => navigate('/wishlist')}>
                    Browse More Items
                  </AnimatedButton>
                  <div>
                    <motion.button
                      onClick={() => navigate('/')}
                      className="text-forest/70 hover:text-forest transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      Return to Home
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;