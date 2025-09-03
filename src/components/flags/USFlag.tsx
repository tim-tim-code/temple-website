import React from 'react';

interface USFlagProps {
  className?: string;
}

const USFlag: React.FC<USFlagProps> = ({ className = "w-6 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      {/* Red stripes */}
      <rect width="60" height="40" fill="#B22234"/>
      
      {/* White stripes */}
      <rect y="3" width="60" height="3" fill="white"/>
      <rect y="9" width="60" height="3" fill="white"/>
      <rect y="15" width="60" height="3" fill="white"/>
      <rect y="21" width="60" height="3" fill="white"/>
      <rect y="27" width="60" height="3" fill="white"/>
      <rect y="33" width="60" height="3" fill="white"/>
      
      {/* Blue field */}
      <rect width="24" height="21" fill="#3C3B6E"/>
      
      {/* Stars (simplified pattern) */}
      <g fill="white">
        {/* Row 1 */}
        <circle cx="3" cy="2.5" r="0.8"/>
        <circle cx="7" cy="2.5" r="0.8"/>
        <circle cx="11" cy="2.5" r="0.8"/>
        <circle cx="15" cy="2.5" r="0.8"/>
        <circle cx="19" cy="2.5" r="0.8"/>
        <circle cx="23" cy="2.5" r="0.8"/>
        
        {/* Row 2 */}
        <circle cx="5" cy="5.5" r="0.8"/>
        <circle cx="9" cy="5.5" r="0.8"/>
        <circle cx="13" cy="5.5" r="0.8"/>
        <circle cx="17" cy="5.5" r="0.8"/>
        <circle cx="21" cy="5.5" r="0.8"/>
        
        {/* Row 3 */}
        <circle cx="3" cy="8.5" r="0.8"/>
        <circle cx="7" cy="8.5" r="0.8"/>
        <circle cx="11" cy="8.5" r="0.8"/>
        <circle cx="15" cy="8.5" r="0.8"/>
        <circle cx="19" cy="8.5" r="0.8"/>
        <circle cx="23" cy="8.5" r="0.8"/>
        
        {/* Row 4 */}
        <circle cx="5" cy="11.5" r="0.8"/>
        <circle cx="9" cy="11.5" r="0.8"/>
        <circle cx="13" cy="11.5" r="0.8"/>
        <circle cx="17" cy="11.5" r="0.8"/>
        <circle cx="21" cy="11.5" r="0.8"/>
        
        {/* Row 5 */}
        <circle cx="3" cy="14.5" r="0.8"/>
        <circle cx="7" cy="14.5" r="0.8"/>
        <circle cx="11" cy="14.5" r="0.8"/>
        <circle cx="15" cy="14.5" r="0.8"/>
        <circle cx="19" cy="14.5" r="0.8"/>
        <circle cx="23" cy="14.5" r="0.8"/>
        
        {/* Row 6 */}
        <circle cx="5" cy="17.5" r="0.8"/>
        <circle cx="9" cy="17.5" r="0.8"/>
        <circle cx="13" cy="17.5" r="0.8"/>
        <circle cx="17" cy="17.5" r="0.8"/>
        <circle cx="21" cy="17.5" r="0.8"/>
      </g>
    </svg>
  );
};

export default USFlag;