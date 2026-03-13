"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

const headline = "SPLIT APART";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export default function PreviewSplitText() {
  const [assembled, setAssembled] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const randomOffsets = useMemo(
    () =>
      headline.split("").map((_, i) => ({
        x: (seededRandom(i * 3 + animKey) - 0.5) * 600,
        y: (seededRandom(i * 7 + animKey + 1) - 0.5) * 400,
        rotate: (seededRandom(i * 11 + animKey + 2) - 0.5) * 360,
      })),
    [animKey]
  );

  useEffect(() => {
    setAssembled(false);
    const timer = setTimeout(() => setAssembled(true), 100);
    return () => clearTimeout(timer);
  }, [animKey]);

  const handleReplay = useCallback(() => {
    setAssembled(false);
    setAnimKey((k) => k + 1);
  }, []);

  const chars = headline.split("");

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505] overflow-hidden">
      <div
        key={animKey}
        className="flex items-center justify-center flex-wrap"
        style={{ perspective: "800px" }}
      >
        {chars.map((char, i) => {
          const offsets = randomOffsets[i];
          const isSpace = char === " ";
          return (
            <span
              key={`${animKey}-${i}`}
              style={{
                display: "inline-block",
                fontSize: "3.5rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.05em",
                minWidth: isSpace ? "0.4em" : undefined,
                opacity: assembled ? 1 : 0,
                transform: assembled
                  ? "translate(0, 0) rotate(0deg)"
                  : `translate(${offsets.x}px, ${offsets.y}px) rotate(${offsets.rotate}deg)`,
                transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 50}ms, opacity 0.6s ease ${i * 50}ms`,
              }}
            >
              {isSpace ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      <button
        onClick={handleReplay}
        className="absolute bottom-6 px-4 py-1.5 text-sm rounded-full border transition-colors"
        style={{
          borderColor: "#333",
          color: "#999",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#E1FF6C";
          e.currentTarget.style.color = "#E1FF6C";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#333";
          e.currentTarget.style.color = "#999";
        }}
      >
        Replay
      </button>
    </div>
  );
}
