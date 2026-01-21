
import React, { useEffect, useRef } from 'react';

const Balloons: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const isStoppingRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.transition = 'opacity 1s ease-out';
    canvas.style.opacity = '1';

    const balloons: any[] = [];
    const colors = [
      'rgba(244, 63, 94, 0.8)',  // rose-500
      'rgba(236, 72, 153, 0.8)', // pink-500
      'rgba(217, 70, 239, 0.8)', // fuchsia-500
      'rgba(168, 85, 247, 0.8)', // purple-500
      'rgba(99, 102, 241, 0.8)', // indigo-500
      'rgba(59, 130, 246, 0.8)', // blue-500
      'rgba(16, 185, 129, 0.8)'  // emerald-500
    ];

    const createBalloon = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 100 + Math.random() * 500,
      radius: Math.random() * 15 + 25,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1.5,
      swing: Math.random() * 2 * Math.PI,
      swingRange: Math.random() * 2 + 1,
      stringLength: 70
    });

    for (let i = 0; i < 30; i++) {
      balloons.push(createBalloon());
    }

    const drawBalloon = (b: any) => {
      ctx.save();
      
      // Draw string
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.radius);
      ctx.bezierCurveTo(
        b.x - 10 * Math.sin(b.swing), b.y + b.radius + 20,
        b.x + 10 * Math.sin(b.swing), b.y + b.radius + 40,
        b.x, b.y + b.radius + b.stringLength
      );
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw balloon body
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.radius, b.radius * 1.25, 0, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();

      // Draw highlight
      ctx.beginPath();
      ctx.ellipse(b.x - b.radius * 0.3, b.y - b.radius * 0.4, b.radius * 0.2, b.radius * 0.3, Math.PI * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fill();

      // Draw knot
      ctx.beginPath();
      ctx.moveTo(b.x - 5, b.y + b.radius * 1.2);
      ctx.lineTo(b.x + 5, b.y + b.radius * 1.2);
      ctx.lineTo(b.x, b.y + b.radius * 1.1);
      ctx.closePath();
      ctx.fillStyle = b.color;
      ctx.fill();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balloons.forEach((b) => {
        b.y -= b.speed;
        b.swing += 0.02;
        b.x += Math.sin(b.swing) * b.swingRange;

        drawBalloon(b);

        if (b.y < -b.radius - b.stringLength) {
          const newB = createBalloon();
          b.y = canvas.height + newB.radius + newB.stringLength;
          b.x = newB.x;
          b.speed = newB.speed;
          b.color = newB.color;
        }
      });

      animationRef.current = requestAnimationFrame(update);
    };

    update();

    // Auto-stop after 3 seconds
    const stopTimer = setTimeout(() => {
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }, 1000);
    }, 3000);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(stopTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[45]"
    />
  );
};

export default Balloons;
