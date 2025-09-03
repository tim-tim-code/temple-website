import React from 'react';

interface FrenchFlagProps {
  className?: string;
}

const FrenchFlag: React.FC<FrenchFlagProps> = ({ className = "w-6 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      {/* Blue stripe */}
      <rect width="20" height="40" fill="#0055A4"/>
      
      {/* White stripe */}
      <rect x="20" width="20" height="40" fill="#FFFFFF"/>
      
      {/* Red stripe */}
      <rect x="40" width="20" height="40" fill="#EF4135"/>
    </svg>
  );
};

export default FrenchFlag;