import { useEffect, useRef, useState } from 'react';

const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });
  const animationRef = useRef(0);
  const timeRef = useRef(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fadeState, setFadeState] = useState('in'); // 'in', 'out'

  // useEffect(() => {
  //   // Background image transition timer
  //   const bgInterval = setInterval(() => {
  //     setFadeState('out');

  //     setTimeout(() => {
  //       setCurrentBgIndex(
  //         prevIndex => (prevIndex + 1) % backgroundImages.length
  //       );
  //       setFadeState('in');
  //     }, 1000); // 1-second fade out before changing image
  //   }, 3000); // Change every 3 seconds

  //   return () => clearInterval(bgInterval);
  // }, [backgroundImages.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make sure the canvas has dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(
      150,
      Math.floor((window.innerWidth * window.innerHeight) / 8000)
    );

    const colors = [
      'rgba(79, 70, 229, 0.8)', // Indigo
      'rgba(16, 185, 129, 0.8)', // Emerald
      'rgba(236, 72, 153, 0.8)', // Pink
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(139, 92, 246, 0.8)', // Purple
      'rgba(245, 158, 11, 0.8)', // Amber
    ];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const speed = Math.random() * 0.3 + 0.1;
        const angle = Math.random() * Math.PI * 2;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.5,
          pulse: 0,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };

    const handleResize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(pixelRatio, pixelRatio);
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsed = timestamp - timeRef.current;
      timeRef.current = timestamp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;
        if (p.pulse > 1 || p.pulse < 0) p.pulseSpeed *= -1;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const force =
            (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          p.x -= directionX * force * 2;
          p.y -= directionY * force * 2;
        } else {
          const time = timestamp * 0.001;
          p.vx += Math.sin(time * 0.2 + i * 0.1) * 0.002;
          p.vy += Math.cos(time * 0.2 + i * 0.1) * 0.002;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.8) {
            p.vx = (p.vx / speed) * 0.8;
            p.vy = (p.vy / speed) * 0.8;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = window.innerWidth + 50;
        if (p.x > window.innerWidth + 50) p.x = -50;
        if (p.y < -50) p.y = window.innerHeight + 50;
        if (p.y > window.innerHeight + 50) p.y = -50;

        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        const pulseScale = Math.max(0.1, 1 + p.pulse * 0.3);
        const innerRadius = 0;
        const outerRadius = Math.max(0.1, p.radius * 3 * pulseScale);

        const baseColor = p.color.substring(0, p.color.lastIndexOf(',') + 1);
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          innerRadius,
          p.x,
          p.y,
          outerRadius
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.6, `${baseColor}${p.alpha * 0.4})`);
        gradient.addColorStop(1, `${baseColor}0)`);

        ctx.fillStyle = gradient;
        ctx.arc(
          p.x,
          p.y,
          Math.max(0.1, p.radius * 2 * pulseScale),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'lighter'; // Changed from 'multiply' to 'lighter' for better visibility
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.15 * (1 - distance / 150);
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const color1 = p1.color.substring(0, p1.color.lastIndexOf(',') + 1);
            const color2 = p2.color.substring(0, p2.color.lastIndexOf(',') + 1);

            gradient.addColorStop(0, `${color1}${opacity})`);
            gradient.addColorStop(1, `${color2}${opacity})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5; // Slightly thicker lines for better visibility
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background images with transitions */}

      {/* Modern glass effect overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/30"
        style={{ backdropFilter: 'blur(3px)', zIndex: 5 }}
      />

      {/* Canvas for network animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          mixBlendMode: 'screen', // Changed from 'multiply' to 'screen' for better visibility
          backgroundColor: 'transparent',
          zIndex: 10,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default NetworkAnimation;
