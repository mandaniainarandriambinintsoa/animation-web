"use client";

import { useState, useEffect, useCallback } from "react";

const words = ["Innovation", "Creativity", "Excellence", "Design"];
const CYCLE_MS = 3000;
const TRANSITION_MS = 600;

export default function PreviewMorphingText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [phase, setPhase] = useState<"idle" | "morphing">("idle");

  const startMorph = useCallback(() => {
    setPhase("morphing");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      startMorph();
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [startMorph]);

  useEffect(() => {
    if (phase === "morphing") {
      const timeout = setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % words.length);
        setPhase("idle");
      }, TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
  }, [phase, nextIndex]);

  const currentBlur = phase === "morphing" ? "8px" : "0px";
  const currentOpacity = phase === "morphing" ? 0 : 1;
  const nextBlur = phase === "morphing" ? "0px" : "8px";
  const nextOpacity = phase === "morphing" ? 1 : 0;

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505] overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #E1FF6C08 0%, transparent 60%)",
        }}
      />

      <div className="relative h-[80px] flex items-center justify-center">
        {/* Current word (blurs out) */}
        <span
          className="absolute text-5xl sm:text-6xl font-bold text-white select-none"
          style={{
            filter: `blur(${currentBlur})`,
            opacity: currentOpacity,
            transition: `filter ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease`,
          }}
        >
          {words[currentIndex]}
        </span>

        {/* Next word (blurs in) */}
        <span
          className="absolute text-5xl sm:text-6xl font-bold select-none"
          style={{
            color: "#E1FF6C",
            filter: `blur(${nextBlur})`,
            opacity: nextOpacity,
            transition: `filter ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease`,
          }}
        >
          {words[nextIndex]}
        </span>
      </div>

      {/* Word indicators */}
      <div className="flex gap-2 mt-8">
        {words.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentIndex ? "#E1FF6C" : "#333",
              transform: i === currentIndex ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Subtitle */}
      <p className="mt-6 text-[#737373] text-sm tracking-wide">
        We build with <span className="text-[#999]">purpose</span>
      </p>

      <p className="absolute bottom-5 text-xs text-[#737373]">Text morphs every 3 seconds</p>
    </div>
  );
}
