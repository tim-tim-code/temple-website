import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured } from '../../lib/supabase';
import AnimatedButton from '../AnimatedButton';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Wait a moment for the auth state to update
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setEmail('admin@dalinsi.com');
    setPassword('temple123');
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn('admin@dalinsi.com', 'temple123');
      
      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        // Wait a moment for the auth state to update
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
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

        {/* Quick Login Button (only show if not using real Supabase) */}
        {!isSupabaseConfigured && (
          <motion.button
            onClick={handleQuickLogin}
            disabled={loading}
            className="w-full mt-4 px-6 py-3 bg-amber/20 backdrop-blur-sm border border-amber/40 rounded-xl text-forest hover:bg-amber/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ⚡ Quick Login (Demo)
          </motion.button>
        )}

        {/* Demo Credentials (only show if not using real Supabase) */}
        {!isSupabaseConfigured && (
          <motion.div
            className="mt-6 p-4 bg-gradient-to-br from-amber/10 via-sun/5 to-amber/5 backdrop-blur-sm rounded-xl border border-amber/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-amber-800 mb-2">🔧 Demo Mode</h3>
            <p className="text-xs text-amber-700 mb-3">Use these credentials to test the admin dashboard:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-amber-700 font-mono">admin@dalinsi.com</span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@dalinsi.com');
                    setPassword('temple123');
                  }}
                  className="text-xs text-amber-800 hover:text-amber-900 underline"
                >
                  Use
                </button>
              </div>
              <div className="text-xs text-amber-600 font-mono">Password: temple123</div>
            </div>
          </motion.div>
        )}

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