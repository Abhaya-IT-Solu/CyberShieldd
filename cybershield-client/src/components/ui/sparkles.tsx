"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface SparklesProps {
  className?: string;
  /** Approximate particle count per 10,000 px². Higher = denser. */
  density?: number;
  /** Particle color as a CSS color string. */
  color?: string;
  minSize?: number;
  maxSize?: number;
  /** Twinkle speed multiplier. */
  speed?: number;
}

type Particle = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  phase: number;
  twinkle: number;
};

/**
 * Lightweight, dependency-free sparkle field rendered on a canvas.
 * Particles gently drift upward and twinkle — used for the "global reach"
 * horizon glow.
 */
export function Sparkles({
  className,
  density = 800,
  color = "#7cc4ff",
  minSize = 0.6,
  maxSize = 1.6,
  speed = 1,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      const area = rect.width * rect.height;
      const count = Math.min(
        1600,
        Math.floor((area / 10000) * (density / 100))
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: (minSize + Math.random() * (maxSize - minSize)) * dpr,
        baseOpacity: 0.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        twinkle: (0.5 + Math.random()) * 0.02 * speed,
      }));
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.phase += p.twinkle;
        p.y -= 0.05 * dpr * speed;
        if (p.y < 0) p.y = canvas.height;
        const opacity = p.baseOpacity * (0.4 + 0.6 * Math.abs(Math.sin(p.phase)));
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    build();
    render();

    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density, color, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      style={{ display: "block" }}
    />
  );
}

export default Sparkles;
