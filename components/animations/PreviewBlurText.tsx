"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const paragraph =
  "The future of web animation is here. Every character reveals itself through a soft blur transition, creating an elegant reading experience that captures attention.";

export default function PreviewBlurText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animKey]);

  const handleReplay = useCallback(() => {
    setTriggered(false);
    setAnimKey((k) => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTriggered(true);
      });
    });
  }, []);

  const chars = paragraph.split("");

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden px-8"
    >
      <p
        key={animKey}
        className="text-lg leading-relaxed text-center max-w-md"
        style={{ fontFamily: "var(--font-geist-sans, sans-serif)" }}
      >
        {chars.map((char, i) => (
          <span
            key={`${animKey}-${i}`}
            style={{
              display: "inline-block",
              color: "#e5e5e5",
              filter: triggered ? "blur(0px)" : "blur(12px)",
              opacity: triggered ? 1 : 0,
              transition: `filter 0.5s ease ${i * 15}ms, opacity 0.5s ease ${i * 15}ms`,
              minWidth: char === " " ? "0.3em" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

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
