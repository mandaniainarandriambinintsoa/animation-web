"use client";

import { useRef, useState, useCallback } from "react";

interface LetterState {
  weight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_STATE: LetterState = {
  weight: 400,
  scale: 1,
  offsetX: 0,
  offsetY: 0,
};

export default function PreviewTextPressure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const text = "PRESSURE";
  const [states, setStates] = useState<LetterState[]>(
    () => Array(text.length).fill(DEFAULT_STATE)
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const newStates = lettersRef.current.map((el) => {
        if (!el) return DEFAULT_STATE;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cursorX - cx;
        const dy = cursorY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;
        const proximity = Math.max(0, 1 - dist / maxDist);

        const weight = Math.round(100 + proximity * 800);
        const scale = 1 + proximity * 0.3;
        const pullStrength = proximity * 8;
        const angle = Math.atan2(dy, dx);
        const offsetX = Math.cos(angle) * pullStrength;
        const offsetY = Math.sin(angle) * pullStrength;

        return { weight, scale, offsetX, offsetY };
      });

      setStates(newStates);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setStates(Array(text.length).fill(DEFAULT_STATE));
  }, [text.length]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d] cursor-crosshair select-none overflow-hidden"
    >
      <div className="flex items-center gap-0">
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            style={{
              fontWeight: states[i]?.weight ?? 400,
              transform: `scale(${states[i]?.scale ?? 1}) translate(${states[i]?.offsetX ?? 0}px, ${states[i]?.offsetY ?? 0}px)`,
              transition: "font-weight 0.15s ease, transform 0.15s ease",
              display: "inline-block",
              fontSize: "4rem",
              lineHeight: 1,
              color: "#ffffff",
              letterSpacing: "0.04em",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <p className="absolute bottom-6 text-sm text-[#737373]">
        Move cursor over the text
      </p>
    </div>
  );
}
