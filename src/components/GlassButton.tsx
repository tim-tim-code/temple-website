import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'glass' | 'green-glass';
}

const GlassButton: React.FC<GlassButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '',
  disabled = false,
  variant = 'glass'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Spring animations for bubble effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Base glass layer */}
      <div className={`absolute inset-0 backdrop-blur-xl rounded-xl ${
        variant === 'green-glass' 
          ? 'bg-gradient-to-br from-sage/60 to-forest/40' 
          : 'bg-gradient-to-br from-white/25 to-white/10'
      }`}>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-8"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
               mixBlendMode: 'overlay'
             }}
        />
      </div>
      
      {/* Glass border */}
      <div className={`absolute inset-0 border rounded-xl ${
        variant === 'green-glass' 
          ? 'border-sage/50' 
          : 'border-white/30'
      }`}></div>
      
      {/* Dynamic light that follows cursor */}
      <motion.div
        className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          background: variant === 'green-glass' 
            ? `radial-gradient(circle at center, rgba(181,226,136,0.6), transparent 50%)`
            : `radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 50%)`,
          filter: 'blur(10px)'
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'green-glass'
            ? 'linear-gradient(105deg, transparent 30%, rgba(181,226,136,0.4) 50%, transparent 70%)'
            : 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
        }}
        animate={{
          x: [-200, 200],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      />
      
      {/* Top highlight */}
      <div className={`absolute top-1 left-2 right-2 h-3 bg-gradient-to-b to-transparent rounded-full blur-sm ${
        variant === 'green-glass' 
          ? 'from-sage/40' 
          : 'from-white/30'
      }`}></div>
      
      {/* Content */}
      <span className={`relative z-10 block px-8 py-3 font-medium ${
        variant === 'green-glass' 
          ? 'text-forest' 
          : 'text-white'
      }`}>
        {children}
      </span>
    </motion.button>
  );
};

export default GlassButton;