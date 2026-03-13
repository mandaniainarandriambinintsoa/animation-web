"use client";

import { useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  opacity: number;
  shape: "rect" | "circle";
}

const COLORS = ["#E1FF6C", "#6CE1FF", "#FF6CE1", "#FFB86C", "#FF6C6C", "#6CFF9E", "#C084FC"];
const GRAVITY = 0.15;
const PARTICLE_COUNT = 50;
const DURATION = 2000;

export default function PreviewConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const explode = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const btnRect = e.currentTarget.getBoundingClientRect();
    const originX = btnRect.left - rect.left + btnRect.width / 2;
    const originY = btnRect.top - rect.top + btnRect.height / 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4 - Math.random() * 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 3 + Math.random() * 5,
        opacity: 1,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }

    const startTime = performance.now();

    function animate(now: number) {
      if (!ctx || !canvas) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += GRAVITY;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - progress * 1.2);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animatingRef.current = false;
      }
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505] overflow-hidden"
    >
      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 10 }}
      />

      {/* Button */}
      <button
        onClick={explode}
        className="relative z-[5] px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer"
        style={{
          backgroundColor: "#E1FF6C",
          color: "#050505",
          boxShadow: "0 0 20px #E1FF6C33, 0 0 60px #E1FF6C11",
        }}
      >
        🎉 Celebrate!
      </button>

      {/* Decorative ring */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full border border-[#1a1a1a] pointer-events-none"
        style={{ opacity: 0.3 }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full border border-[#1a1a1a] pointer-events-none"
        style={{ opacity: 0.15 }}
      />

      <p className="absolute bottom-5 text-xs text-[#737373] z-[1]">Click the button</p>
    </div>
  );
}
