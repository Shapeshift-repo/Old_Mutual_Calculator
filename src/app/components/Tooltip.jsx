'use client';

import React, { useState } from 'react';

export default function Tooltip({ text }){
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <span
        className="cursor-pointer text-black font-bold h-[19px] w-[19px] bg-[#D9D9D9] text-[10px] leading-[19px] rounded-full flex justify-center items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        ?
      </span>
      {isVisible && (
        <div className="absolute min-w-[264px] max-w-[370xpx] right-0 top-[-75px] bg-[#252525] text-white rounded-[5px] text-[14px] leading-[25px] font-light py-2 px-4 z-10">
          {text}
          <div className="absolute bottom-[-6px] right-0 transform -translate-x-1/2 w-3 h-3 bg-[#252525] rotate-45"></div>
        </div>
      )}
    </div>
  );
}