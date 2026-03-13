"use client";

import { useRef, useState, useEffect } from "react";

const DEMO_TEXT =
  "Build stunning animations with pure CSS and minimal JavaScript for modern web experiences";

export default function PreviewTextRevealScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const tokens = DEMO_TEXT.split(" ");
  const stagger = 0.5;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const el = container;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight <= 0) return;
      setProgress(scrollTop / scrollHeight);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d]">
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Top spacer */}
        <div className="h-[200px]" />

        {/* Text */}
        <div className="px-8 py-12 max-w-lg mx-auto">
          <p style={{ fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
            {tokens.map((token, i) => {
              const tokenStart = (i / tokens.length) * stagger;
              const tokenEnd = tokenStart + (1 - stagger);
              const tokenProgress = Math.min(
                1,
                Math.max(0, (progress - tokenStart) / (tokenEnd - tokenStart))
              );

              return (
                <span
                  key={i}
                  style={{
                    color: "#ffffff",
                    opacity: 0.08 + tokenProgress * 0.92,
                    transition: "opacity 0.1s ease",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {token}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="h-[200px]" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div
            className="w-1 h-2 rounded-full bg-[#E1FF6C]"
            style={{
              animation: "scrollIndicator 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <span className="text-[10px] text-white/30">Scrollez</span>
      </div>

      {/* Progress bar */}
      <div className="absolute top-4 right-4 w-1 h-12 rounded-full bg-white/10 overflow-hidden">
        <div
          className="w-full rounded-full bg-[#E1FF6C]"
          style={{
            height: `${progress * 100}%`,
            transition: "height 0.1s ease",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
