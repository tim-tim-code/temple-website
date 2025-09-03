import React from 'react';

interface BritishFlagProps {
  className?: string;
}

const BritishFlag: React.FC<BritishFlagProps> = ({ className = "w-6 h-4" }) => {
  return (
    <svg className={className} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      {/* Blue background */}
      <rect width="60" height="40" fill="#012169"/>
      
      {/* White diagonal cross (St. Andrew's Cross) */}
      <g fill="white">
        <polygon points="0,0 60,40 60,35 5,0"/>
        <polygon points="0,40 60,0 60,5 5,40"/>
        <polygon points="60,40 0,0 0,5 55,40"/>
        <polygon points="60,0 0,40 0,35 55,0"/>
      </g>
      
      {/* Red diagonal cross */}
      <g fill="#C8102E">
        <polygon points="0,0 60,40 60,37 3,0"/>
        <polygon points="0,40 60,0 60,3 3,40"/>
        <polygon points="60,40 0,0 0,3 57,40"/>
        <polygon points="60,0 0,40 0,37 57,0"/>
      </g>
      
      {/* White horizontal and vertical cross (St. George's Cross) */}
      <rect x="0" y="16" width="60" height="8" fill="white"/>
      <rect x="26" y="0" width="8" height="40" fill="white"/>
      
      {/* Red horizontal and vertical cross */}
      <rect x="0" y="17" width="60" height="6" fill="#C8102E"/>
      <rect x="27" y="0" width="6" height="40" fill="#C8102E"/>
    </svg>
  );
};

export default BritishFlag;