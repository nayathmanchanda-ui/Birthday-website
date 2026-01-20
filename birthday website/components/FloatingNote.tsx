
import React from 'react';

interface FloatingNoteProps {
  x: number;
  y: number;
  value: string;
}

const FloatingNote: React.FC<FloatingNoteProps> = ({ x, y, value }) => {
  return (
    <div 
      className="floating-tap fixed pointer-events-none z-[100] font-bold text-indigo-600 drop-shadow-md select-none"
      style={{ left: x, top: y }}
    >
      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-indigo-200">
        {value}
      </div>
    </div>
  );
};

export default FloatingNote;
