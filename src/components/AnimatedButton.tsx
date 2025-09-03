import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  type = 'button' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center 
        px-8 py-4 border-0 rounded-full 
        font-semibold cursor-pointer text-forest 
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:bg-white/20 hover:text-forest
        transition-all duration-200 ease-out
        shadow-lg hover:shadow-2xl
        active:scale-97 overflow-hidden z-0
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Animated gradient background effect */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="
          w-40 h-40 rounded-full opacity-60
          bg-gradient-to-r from-sage via-leaf to-emerald-600
          blur-xl animate-spin-slow
          transition-all duration-500 ease-out
          group-hover:w-32 group-hover:h-32 group-hover:opacity-80
        "></div>
      </div>
    </button>
  );
};

export default AnimatedButton;