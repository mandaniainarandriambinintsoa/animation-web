"use client";

import { useEffect, useRef } from "react";

const beamCards = [
  { label: "Analytics", desc: "Real-time insights", color: "#E1FF6C", speed: 3 },
  { label: "Security", desc: "End-to-end encrypted", color: "#6CE1FF", speed: 4 },
  { label: "Scale", desc: "Global edge network", color: "#FF6CE1", speed: 2.5 },
];

function BeamCard({ label, desc, color, speed }: { label: string; desc: string; color: string; speed: number }) {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = beamRef.current;
    if (!el) return;
    el.style.setProperty("--beam-color", color);
    el.style.setProperty("--beam-speed", `${speed}s`);
  }, [color, speed]);

  return (
    <div className="relative rounded-xl overflow-hidden" ref={beamRef}>
      {/* Animated beam border */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          padding: "1px",
          background: `conic-gradient(from var(--beam-angle, 0deg), transparent 0%, transparent 35%, ${color} 50%, transparent 65%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `beamRotate ${speed}s linear infinite`,
        }}
      />
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-30 blur-md"
        style={{
          background: `conic-gradient(from var(--beam-angle, 0deg), transparent 0%, transparent 40%, ${color} 50%, transparent 60%, transparent 100%)`,
          animation: `beamRotate ${speed}s linear infinite`,
        }}
      />
      {/* Card content */}
      <div className="relative rounded-xl bg-[#0d0d0d] p-6 h-full flex flex-col justify-between min-h-[140px]">
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">{label}</h3>
          <p className="text-[#737373] text-xs">{desc}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
          <span className="text-[10px] uppercase tracking-wider" style={{ color }}>Active</span>
        </div>
      </div>
    </div>
  );
}

export default function PreviewBorderBeam() {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505]">
      <style>{`
        @property --beam-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes beamRotate {
          from { --beam-angle: 0deg; }
          to { --beam-angle: 360deg; }
        }
      `}</style>
      <div className="grid grid-cols-3 gap-4 px-6 w-full max-w-[520px]">
        {beamCards.map((card, i) => (
          <BeamCard key={i} {...card} />
        ))}
      </div>
      <p className="absolute bottom-5 text-xs text-[#737373]">Light beam travels along card borders</p>
    </div>
  );
}
