import React from 'react';

const AnimatedCardStack: React.FC = () => {
  return (
    <div className="relative w-56 h-80 cursor-pointer group">
      {/* Card 1 */}
      <div className="absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-white font-bold text-shadow bg-gradient-to-t from-blue-600 to-purple-600 group-hover:animate-card1 origin-bottom-left">
        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14C7.33333 14.6667 8.6 16 11 16C13.4 16 14.6667 14.6667 15 14M7.31238 8.31247H7.68738M7.31238 8.68747H7.68738M14.3124 8.31247H14.6874M14.3124 8.68747H14.6874M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11ZM8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5C7 8.22386 7.22386 8 7.5 8C7.77614 8 8 8.22386 8 8.5ZM15 8.5C15 8.77614 14.7761 9 14.5 9C14.2239 9 14 8.77614 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5Z" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <br />
        Meditation
      </div>

      {/* Card 2 */}
      <div className="absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-white font-bold text-shadow bg-gradient-to-t from-green-400 to-cyan-400 opacity-0 group-hover:animate-card2 origin-bottom-left">
        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14H14M7.31238 8.31247H7.68738M7.31238 8.68747H7.68738M14.3124 8.31247H14.6874M14.3124 8.68747H14.6874M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11ZM8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5C7 8.22386 7.22386 8 7.5 8C7.77614 8 8 8.22386 8 8.5ZM15 8.5C15 8.77614 14.7761 9 14.5 9C14.2239 9 14 8.77614 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5Z" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <br />
        Community
      </div>

      {/* Card 3 */}
      <div className="absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-white font-bold text-shadow bg-gradient-to-br from-orange-300 to-orange-100 opacity-0 group-hover:animate-card3 origin-bottom-left">
        <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.31238 8.31247H7.68738M7.31238 8.68747H7.68738M14.3124 8.31247H14.6874M14.3124 8.68747H14.6874M15 15C14.6667 14.3333 13.4 13 11 13C8.6 13 7.33333 14.3333 7 15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11ZM8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5C7 8.22386 7.22386 8 7.5 8C7.77614 8 8 8.22386 8 8.5ZM15 8.5C15 8.77614 14.7761 9 14.5 9C14.2239 9 14 8.77614 14 8.5C14 8.22386 14.2239 8 14.5 8C14.7761 8 15 8.22386 15 8.5Z" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <br />
        Wisdom
      </div>

      {/* Card 4 */}
      <div className="absolute inset-1 rounded-2xl transform-gpu transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-white font-bold text-shadow bg-gradient-to-br from-gray-600 to-gray-800 opacity-0 group-hover:animate-card4 origin-bottom-left">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C7.69494 1 5.59227 1.86656 4 3.29168M3 1V4C3 4.55228 3.44772 5 4 5H7M13 8L9.35355 11.6464C9.15829 11.8417 8.84171 11.8417 8.64645 11.6464L7 10" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
        <br />
        Growth
      </div>
    </div>
  );
};

export default AnimatedCardStack;