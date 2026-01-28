
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Cake from './components/Cake';
import Confetti from './components/Confetti';
import Balloons from './components/Balloons';
import FloatingNote from './components/FloatingNote';
import TypingText from './components/TypingText';
import DynamicCounter from './components/DynamicCounter';

interface TapEffect {
  id: number;
  x: number;
  y: number;
  value: string;
}

interface Position {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [taps, setTaps] = useState<number>(0);
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const [tapEffects, setTapEffects] = useState<TapEffect[]>([]);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [instructionOpacity, setInstructionOpacity] = useState<number>(1);
  const [counterPos, setCounterPos] = useState<Position>({ x: 50, y: 50 });
  
  const contentRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = (): Position => {
    // Keep the number within reasonable screen bounds (10% to 90% of viewport)
    const margin = 100;
    const x = Math.random() * (window.innerWidth - margin * 2) + margin;
    const y = Math.random() * (window.innerHeight - margin * 2) + margin;
    return { x, y };
  };

  const handleCandleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isBlown) return;

    // Fade instruction after first tap
    if (taps === 0) {
      setInstructionOpacity(0);
    }

    const nextTaps = taps + 1;
    setTaps(nextTaps);
    
    // Update the random position for the large counter
    setCounterPos(getRandomPosition());

    // Get position for floating +1 text
    let posX = 0, posY = 0;
    if ('clientX' in e) {
      posX = e.clientX;
      posY = e.clientY;
    } else {
      posX = (e as React.TouchEvent).touches[0].clientX;
      posY = (e as React.TouchEvent).touches[0].clientY;
    }

    // Add small floating feedback
    const newEffect: TapEffect = {
      id: Date.now(),
      x: posX,
      y: posY,
      value: `+1`
    };
    setTapEffects(prev => [...prev, newEffect]);

    // Check if blown
    if (nextTaps >= 15) {
      setIsBlown(true);
      setTimeout(() => {
        setShowContent(true);
        if (window.navigator.vibrate) {
          window.navigator.vibrate([100, 50, 100]);
        }
      }, 800);
    }
  }, [taps, isBlown]);

  // Clean up old effects
  useEffect(() => {
    if (tapEffects.length > 0) {
      const timer = setTimeout(() => {
        setTapEffects(prev => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tapEffects]);

  // Handle reveal animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const birthdayMessage = "Happy birthday nirmayyyyyyy!!, Celebrate your special day with utmost joy. I will always be grateful to have you as my best friend. You have been by my side every time  we were best freinds from 7th always and helped me through my hardest moments. you will forever have a special place in my heart. i am very lucky to have you, In another life I will choose you as my friend too. I hope you have a great future ahead.stop being depressed nga, party chaiye (non-negotiable).";

  return (
    <div className="relative min-h-screen selection:bg-pink-200 bg-white">
      {/* Celebration Effects */}
      {isBlown && (
        <>
          <Confetti />
          <Balloons />
        </>
      )}

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-4 text-center overflow-hidden">
        
        {/* Large Dynamic Random Counter */}
        <DynamicCounter count={taps} x={counterPos.x} y={counterPos.y} isBlown={isBlown} />

        {/* Instruction Header */}
        <div 
          className="absolute top-12 transition-opacity duration-1000 ease-in-out z-20 pointer-events-none"
          style={{ opacity: instructionOpacity }}
        >
          <h1 className="text-2xl md:text-3xl font-medium text-indigo-900 mb-2">
            Tap 15 times to blow the candle 🎂
          </h1>
          <p className="text-gray-400">A special wish for a special year</p>
        </div>

        {/* Interactive Cake - Lowered with mt-16 */}
        <div onClick={handleCandleClick} className="cursor-pointer transition-transform hover:scale-105 active:scale-95 z-30 relative mt-16">
          <Cake taps={taps} isBlown={isBlown} />
        </div>

        {/* Floating Small Feedback */}
        {tapEffects.map(effect => (
          <FloatingNote key={effect.id} x={effect.x} y={effect.y} value={effect.value} />
        ))}

        {/* Happy Birthday Message After Blow - Changed bounce to zoom-in */}
        {isBlown && (
          <div className="mt-8 animate-zoom-in z-20">
            <h2 className="fancy-font text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
              Happy 15th Birthday! 🎉
            </h2>
          </div>
        )}

        {/* Scroll Indicator - Lowered to bottom-4 and bounce animation removed */}
        {showContent && (
          <div className="absolute bottom-1 text-indigo-400 z-20 opacity-80">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest">Scroll Down</p>
            <i className="fa-solid fa-chevron-down text-xl"></i>
          </div>
        )}
      </section>

      {/* Hidden Content revealed after celebration */}
      {showContent && (
        <main className="max-w-4xl mx-auto py-20 px-6">
          
          {/* Message Section */}
          <section className="reveal mb-24 text-center">
            <h3 className="fancy-font text-4xl text-indigo-900 mb-8">A Message for You </h3>
            <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-pink-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pink-400 to-indigo-500"></div>
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed italic min-h-[150px]">
                <TypingText 
                  text={birthdayMessage} 
                  speed={35} 
                  delay={1000} 
                />
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="reveal mb-24 flex flex-col items-center">
            <div className="relative p-8 md:p-12 text-center max-w-2xl">
              <i className="fa-solid fa-quote-left absolute top-0 left-0 text-5xl text-indigo-100 -z-10"></i>
              <p className="text-2xl md:text-3xl font-light text-indigo-900 mb-6 italic">
                "Life is not coming at you, It is coming from you"
              </p>
              <span className="text-pink-600 font-bold tracking-widest uppercase">— Unknown </span>
              <i className="fa-solid fa-quote-right absolute bottom-0 right-0 text-5xl text-indigo-100 -z-10"></i>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center text-gray-400 py-10">
            <p className="mb-2 italic">Wishing you the best 15th year yet!</p>
            <div className="flex justify-center space-x-4">
              <i className="fa-solid fa-cake-candles"></i>
              <i className="fa-solid fa-gift"></i>
              <i className="fa-solid fa-balloon"></i>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};

export default App;
