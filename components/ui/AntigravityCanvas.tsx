'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130, // Repulsion radius
    };

    // Reduced motion & mobile checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Theme color palette
    const isDark = resolvedTheme === 'dark';
    const colors = isDark
      ? ['#3B82F6', '#8B5CF6', '#60A5FA', '#A78BFA', '#94A3B8']
      : ['#2563EB', '#7C3AED', '#3B82F6', '#6D28D9', '#B8AF94'];

    // Generate particles
    const particleCount = isTouchDevice ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || isTouchDevice) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient floating motion
        p.originX += p.vx;
        p.originY += p.vy;

        // Wrap around screen bounds
        if (p.originX < -20) p.originX = width + 20;
        if (p.originX > width + 20) p.originX = -20;
        if (p.originY < -20) p.originY = height + 20;
        if (p.originY > height + 20) p.originY = -20;

        // Calculate cursor distance
        let targetX = p.originX;
        let targetY = p.originY;

        if (!prefersReducedMotion && !isTouchDevice && mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            targetX = p.originX - Math.cos(angle) * force * 50;
            targetY = p.originY - Math.sin(angle) * force * 50;
          }
        }

        // Smooth spring physics movement towards target
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70 dark:opacity-60"
      aria-hidden="true"
    />
  );
}
