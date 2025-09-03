import React, { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TexturedGlassProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

const TexturedGlass: React.FC<TexturedGlassProps> = ({ 
  children, 
  className = '', 
  intensity = 1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring animations for bubble effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  // Transform for glass distortion
  const distortionX = useTransform(smoothMouseX, (value) => value * 0.2 * intensity);
  const distortionY = useTransform(smoothMouseY, (value) => value * 0.2 * intensity);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Base glass layer with texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-2xl">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
               mixBlendMode: 'overlay'
             }}
        />
      </div>
      
      {/* Glass border */}
      <div className="absolute inset-0 border border-white/20 rounded-2xl"></div>
      
      {/* Dynamic bubble light that follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ 
          x: distortionX,
          y: distortionY
        }}
      >
        <motion.div
          className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: smoothMouseX,
            top: smoothMouseY,
            background: `radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 60%)`,
            filter: 'blur(15px)'
          }}
        />
      </motion.div>
      
      {/* Secondary floating light */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-60 rounded-2xl"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%)`,
            `radial-gradient(circle at 80% 70%, rgba(255,255,255,0.15), transparent 40%)`,
            `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%)`
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Top glass highlight */}
      <div className="absolute top-0 left-4 right-4 h-8 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default TexturedGlass;