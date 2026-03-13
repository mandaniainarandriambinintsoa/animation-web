"use client";

import { useRef, useCallback } from "react";

const wobbleCards = [
  {
    title: "Creative Studio",
    desc: "Build stunning interfaces with fluid motion and pixel-perfect design.",
    gradient: "linear-gradient(135deg, #E1FF6C22, #E1FF6C08)",
    accent: "#E1FF6C",
  },
  {
    title: "Motion Lab",
    desc: "Experiment with physics-based animations and interactive feedback.",
    gradient: "linear-gradient(135deg, #6CE1FF22, #6CE1FF08)",
    accent: "#6CE1FF",
  },
];

function WobbleCard({ title, desc, gradient, accent }: typeof wobbleCards[0]) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `translateX(${dx * 5}px) translateY(${dy * 5}px) scale(1.02) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "translateX(0) translateY(0) scale(1) rotateX(0) rotateY(0)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl border border-[#1a1a1a] overflow-hidden cursor-pointer"
      style={{
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        perspective: "800px",
        width: "220px",
        minHeight: "200px",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)`,
          backgroundSize: "4px 4px",
        }}
      />
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: gradient }} />
      {/* Content */}
      <div className="relative p-6 flex flex-col gap-4 bg-[#0d0d0d]/80">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accent}15` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
          <p className="text-[#737373] text-xs leading-relaxed">{desc}</p>
        </div>
        <div className="mt-auto pt-3 border-t border-[#1a1a1a]">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: accent }}>Explore →</span>
        </div>
      </div>
    </div>
  );
}

export default function PreviewWobbleCard() {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505]" style={{ perspective: "1000px" }}>
      <div className="flex gap-6">
        {wobbleCards.map((card, i) => (
          <WobbleCard key={i} {...card} />
        ))}
      </div>
      <p className="absolute bottom-5 text-xs text-[#737373]">Move cursor over cards</p>
    </div>
  );
}
