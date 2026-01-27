
import React from 'react';

interface DynamicCounterProps {
  count: number;
  x: number;
  y: number;
  isBlown: boolean;
}

const DynamicCounter: React.FC<DynamicCounterProps> = ({ count, x, y, isBlown }) => {
  if (count === 0 || isBlown) return null;

  // Calculate font size: starts at 2rem and grows with each tap
  const fontSize = 2 + (count * 0.4); // e.g., tap 15 is 2 + 6 = 8rem
  
  return (
    <div 
      className="fixed pointer-events-none z-[40] transition-all duration-300 ease-out select-none font-black text-indigo-700/50"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        fontSize: `${fontSize}rem`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {count}
    </div>
  );
};

export default DynamicCounter;
