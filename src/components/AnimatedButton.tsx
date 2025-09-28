import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'default' | 'dark' | 'bright' | 'medium' | 'darker' | 'amber';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'default'
}) => {
  const buttonClass = variant === 'amber' ? 'neu-button-amber' : 'neu-button';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;