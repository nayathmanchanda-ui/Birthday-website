
import React from 'react';

interface CakeProps {
  taps: number;
  isBlown: boolean;
}

const Cake: React.FC<CakeProps> = ({ taps, isBlown }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Candle */}
      <div className="relative mb-[-10px] z-10">
        {!isBlown && (
          <div className="flame absolute -top-10 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent rounded-full shadow-[0_0_15px_rgba(255,165,0,0.8)]"></div>
        )}
        {isBlown && (
          <div className="smoke absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full"></div>
        )}
        <div className="w-3 h-16 bg-gradient-to-b from-indigo-300 to-indigo-500 rounded-sm border-b-2 border-indigo-700 shadow-md flex flex-col justify-around py-1">
            <div className="w-full h-0.5 bg-white/30"></div>
            <div className="w-full h-0.5 bg-white/30"></div>
            <div className="w-full h-0.5 bg-white/30"></div>
        </div>
      </div>

      {/* Top Layer */}
      <div className="relative w-48 h-20 bg-pink-100 rounded-t-xl border-x-4 border-t-4 border-pink-200 shadow-inner z-[5]">
        {/* Frosting drips */}
        <div className="absolute top-0 left-0 w-full flex justify-around">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-6 h-8 bg-pink-200 rounded-b-full"></div>
            ))}
        </div>
        {/* Sprinkles */}
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute w-1 h-3 rounded-full"
                    style={{
                        backgroundColor: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#f43f5e' : '#fbbf24',
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 90}%`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                ></div>
            ))}
        </div>
      </div>

      {/* Bottom Layer */}
      <div className="w-64 h-28 bg-white rounded-t-xl border-x-4 border-t-4 border-indigo-50 shadow-lg relative z-[2]">
        {/* Frosting drips bottom layer */}
        <div className="absolute top-0 left-0 w-full flex justify-around">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-7 h-10 bg-indigo-50 rounded-b-full shadow-sm"></div>
            ))}
        </div>
        {/* Sprinkles bottom layer */}
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute w-1 h-3 rounded-full"
                    style={{
                        backgroundColor: i % 4 === 0 ? '#6366f1' : i % 4 === 1 ? '#f43f5e' : i % 4 === 2 ? '#10b981' : '#fbbf24',
                        top: `${Math.random() * 80}%`,
                        left: `${Math.random() * 90}%`,
                        transform: `rotate(${Math.random() * 360}deg)`
                    }}
                ></div>
            ))}
        </div>
      </div>

      {/* Plate */}
      <div className="w-80 h-10 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[50%] border-b-8 border-gray-300 shadow-2xl"></div>
    </div>
  );
};

export default Cake;
