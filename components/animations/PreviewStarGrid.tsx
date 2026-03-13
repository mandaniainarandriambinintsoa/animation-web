"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function PreviewStarGrid() {
  const columns = 12;
  const rows = 8;
  const total = columns * rows;
  const activeDots = 10;
  const duration = 2000;
  const dotSize = 2;

  const [glowing, setGlowing] = useState<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const pickRandom = useCallback(() => {
    const next = new Set<number>();
    while (next.size < Math.min(activeDots, total)) {
      next.add(Math.floor(Math.random() * total));
    }
    setGlowing(next);
  }, [activeDots, total]);

  useEffect(() => {
    pickRandom();
    intervalRef.current = setInterval(pickRandom, duration);
    return () => clearInterval(intervalRef.current);
  }, [pickRandom, duration]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden">
      {/* Dot grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 32px)`,
          gridTemplateRows: `repeat(${rows}, 32px)`,
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const isGlowing = glowing.has(i);
          return (
            <div
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                backgroundColor: isGlowing ? "#E1FF6C" : "rgba(255,255,255,0.12)",
                boxShadow: isGlowing ? "0 0 6px 2px rgba(225,255,108,0.5)" : "none",
                transition: `all ${duration * 0.4}ms ease`,
              }}
            />
          );
        })}
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl bg-[#0d0d0d]/80 backdrop-blur-sm border border-white/5">
          <h3 className="text-lg font-semibold text-white tracking-tight">Star Grid</h3>
          <p className="text-xs text-white/40">Random glowing dots</p>
        </div>
      </div>
    </div>
  );
}
