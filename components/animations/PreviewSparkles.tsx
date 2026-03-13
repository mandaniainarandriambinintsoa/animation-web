"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function PreviewSparkles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      opacity: 0.2 + Math.random() * 0.6,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 30,
    }));
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#E1FF6C",
              opacity: 0,
              "--drift": `${p.drift}px`,
              "--opacity": p.opacity,
              animationName: "sparkle-float",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Arc glow at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 -translate-x-1/2"
        style={{
          width: "80%",
          height: "40%",
          background: "radial-gradient(ellipse at 50% 100%, #E1FF6C, transparent 70%)",
          opacity: 0.15,
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <h3 className="text-2xl font-semibold text-white tracking-tight">Sparkles</h3>
        <p className="text-sm text-white/40">Floating particles in pure CSS</p>
      </div>
    </div>
  );
}
