import { useEffect, useRef, useState } from 'react';
import './cursor.css';

const COOLORS_PALETTE = [
  '#00D084', // Mint / Emerald Green
  '#FF3366', // Hot Coral Pink
  '#00B4D8', // Electric Cyan
  '#FFB800', // Marigold Amber
  '#FF6B35', // Warm Tangerine
  '#7928CA', // Royal Purple
  '#2563EB', // Cobalt Blue
  '#EC4899', // Vivid Fuchsia
  '#10B981', // Neon Green
];

const MAX_POINT_AGE = 700; // ms for tail to fully fade out

export default function PaintBrushCursor() {
  const canvasRef = useRef(null);
  const brushRef = useRef(null);

  const [currentColor, setCurrentColor] = useState(COOLORS_PALETTE[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Internal animation state kept in refs for 60-120fps performance
  const pointsRef = useRef([]);
  const particlesRef = useRef([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const colorProgressRef = useRef(0);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    // Check if device supports hover & fine pointer
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI (Retina) displays
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Movement
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const prev = mousePosRef.current;
      const dist = Math.hypot(x - prev.x, y - prev.y);

      mousePosRef.current = { x, y };

      if (!brushRef.current) return;
      // Position brush tip precisely at cursor coordinate
      brushRef.current.style.transform = `translate3d(${x - 1}px, ${y - 1}px, 0)`;

      setIsVisible(true);

      // Color shift based on distance moved
      colorProgressRef.current += dist / 180;
      const paletteIndex = Math.floor(colorProgressRef.current) % COOLORS_PALETTE.length;
      const activeColor = COOLORS_PALETTE[paletteIndex];
      setCurrentColor(activeColor);

      // Add point to paint trail
      const now = performance.now();
      const strokeWidth = isPressed ? 14 : isHovering ? 11 : 8.5;

      pointsRef.current.push({
        x,
        y,
        time: now,
        color: activeColor,
        width: strokeWidth,
      });

      // Occasional small paint splatter when moving at good speed
      if (dist > 9 && Math.random() < 0.22) {
        particlesRef.current.push({
          x: x + (Math.random() * 8 - 4),
          y: y + (Math.random() * 8 - 4),
          vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 + 0.3,
          color: activeColor,
          size: Math.random() * 2.5 + 1.2,
          alpha: 0.85,
        });
      }
    };

    // Detect hover on interactive items
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest &&
        target.closest(
          'a, button, [role="button"], input, textarea, select, .hero-char, .hero-reveal-btn, .mobile-hamburger-btn'
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      mousePosRef.current = { x: -100, y: -100 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Continuous 60-120fps Canvas Render Loop
    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Prune old trail points
      const points = pointsRef.current;
      while (points.length > 0 && now - points[0].time > MAX_POINT_AGE) {
        points.shift();
      }

      // Draw smooth fading paint ribbon
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];

          const progress = (now - p1.time) / MAX_POINT_AGE;
          if (progress >= 1) continue;

          const life = Math.max(0, 1 - progress);
          const currentWidth = p1.width * Math.pow(life, 0.65);
          const alpha = Math.pow(life, 0.85) * 0.9;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);

          // Quadratic bezier smoothing for fluid paint flow
          const midX = (p0.x + p1.x) / 2;
          const midY = (p0.y + p1.y) / 2;
          ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);

          ctx.lineWidth = Math.max(0.8, currentWidth);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = p1.color;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }

      // Render drifting paint splatters / micro particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isHovering, isPressed]);

  return (
    <>
      {/* Liquid Paint Stroke Canvas */}
      <canvas ref={canvasRef} className="paint-canvas-overlay" />

      {/* Custom Paintbrush Cursor */}
      <div
        ref={brushRef}
        className={`paint-brush-cursor ${isVisible ? 'visible' : ''} ${
          isHovering ? 'hovering' : ''
        } ${isPressed ? 'pressed' : ''}`}
      >
        <div className="paint-brush-inner">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Ferrule Gradient */}
              <linearGradient id="brushFerruleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5E7EB" />
                <stop offset="50%" stopColor="#9CA3AF" />
                <stop offset="100%" stopColor="#4B5563" />
              </linearGradient>

              {/* Wooden / Sleek Obsidian Handle Gradient */}
              <linearGradient id="brushHandleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F2937" />
                <stop offset="50%" stopColor="#111827" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>

              {/* Bristles Gradient blending into paint */}
              <linearGradient id="brushBristleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentColor} />
                <stop offset="45%" stopColor={currentColor} />
                <stop offset="70%" stopColor="#374151" />
                <stop offset="100%" stopColor="#1F2937" />
              </linearGradient>
            </defs>

            {/* Handle pointing down-right */}
            <path
              d="M12 12 L29 29 C30.5 30.5 32 29 30.5 27.5 L13.5 10.5 Z"
              fill="url(#brushHandleGrad)"
              stroke="#374151"
              strokeWidth="0.75"
            />
            {/* Glossy light streak along handle */}
            <path
              d="M13 11 L27 25"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {/* Metallic Ferrule collar */}
            <path
              d="M7 5 L12 10 L10 12 L5 7 Z"
              fill="url(#brushFerruleGrad)"
              stroke="#374151"
              strokeWidth="0.6"
            />

            {/* Bristles bundle */}
            <path
              d="M1 1 Q4 2 7 5 L5 7 Q2 4 1 1 Z"
              fill="url(#brushBristleGrad)"
            />

            {/* Paint Dip on bristles */}
            <path
              d="M1 1 Q3 1.5 4.5 3 L3 4.5 Q1.5 3 1 1 Z"
              fill={currentColor}
            />

            {/* Glowing paint droplet at the active cursor tip (1, 1) */}
            <circle cx="1.5" cy="1.5" r="2.2" fill={currentColor} />
            <circle cx="1.5" cy="1.5" r="4" fill={currentColor} opacity="0.3" />
          </svg>
        </div>
      </div>
    </>
  );
}
