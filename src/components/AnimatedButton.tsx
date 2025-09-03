import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  type = 'button',
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative inline-flex items-center justify-center 
        px-8 py-4 border-0 rounded-full 
        font-semibold text-forest 
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:bg-white/20 hover:text-forest
        transition-all duration-200 ease-out
        shadow-lg hover:shadow-2xl
        active:scale-97 overflow-hidden z-0
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Animated gradient background effect */}
      {!disabled && (
        <>
          <div className="absolute inset-0 flex items-center justify-center z-0 rounded-full overflow-hidden">
            <div className="
              w-48 h-48 rounded-full opacity-60
              bg-gradient-temple
              blur-md animate-spin-slow
              transition-all duration-500 ease-out
              group-hover:w-40 group-hover:h-40 group-hover:opacity-75
            "></div>
          </div>
          
          {/* Additional full button background for complete coverage */}
          <div className="absolute inset-0 rounded-full bg-gradient-temple opacity-15 group-hover:opacity-25 transition-opacity duration-500"></div>
        </>
      )}
    </button>
  );
};

export default AnimatedButton;