import React from 'react';

interface GermanFlagProps {
  className?: string;
}

const GermanFlag: React.FC<GermanFlagProps> = ({ className = "w-6 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      {/* Black stripe */}
      <rect width="60" height="13.33" fill="#000000"/>
      
      {/* Red stripe */}
      <rect y="13.33" width="60" height="13.33" fill="#DD0000"/>
      
      {/* Yellow stripe */}
      <rect y="26.66" width="60" height="13.34" fill="#FFCE00"/>
    </svg>
  );
};

export default GermanFlag;