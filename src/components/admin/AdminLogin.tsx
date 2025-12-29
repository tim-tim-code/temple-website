import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../AnimatedButton';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    console.log('🔐 useEffect triggered - user:', user?.email, 'isAdmin:', isAdmin);
    if (user && isAdmin) {
      console.log('🔐 Both user and isAdmin are true, navigating to dashboard...');
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log('🔐 Attempting login with:', email);

    try {
      const result = await signIn(email, password);
      console.log('🔐 SignIn result:', result);

      if (result.error) {
        console.error('🔐 Login error:', result.error);
        setError(result.error.message || 'Login failed');
        setLoading(false);
      } else {
        console.log('🔐 Login successful, waiting for auth state...');
        // Success - wait for auth state then redirect
        setTimeout(() => {
          console.log('🔐 Redirecting to dashboard...');
          window.location.href = '/admin/dashboard';
        }, 1500);
      }
    } catch (err: any) {
      console.error('🔐 Login exception:', err);
      setError(err?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-sage/20 to-leaf/10 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md bg-gradient-to-br from-paper/95 via-sage/5 to-sun/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 46, 25, 0.25), 0 20px 25px -5px rgba(181, 226, 136, 0.1)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-sage/30 to-leaf/20 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <svg className="w-8 h-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
          <h1 className="text-2xl font-serif text-forest mb-2">Dalin Si Admin</h1>
          <p className="text-soil/70">Management Portal</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
              placeholder="admin@dalinsi.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-forest mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:border-sage/50 focus:ring-2 focus:ring-sage/20 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <AnimatedButton
            type="submit"
            disabled={loading}
            className="w-full text-base py-3"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </AnimatedButton>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <motion.button
            onClick={() => navigate('/')}
            className="text-sm text-soil/70 hover:text-forest transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
          >
            ← Back to Website
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;