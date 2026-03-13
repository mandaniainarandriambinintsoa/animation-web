"use client";

import { useCallback, useRef, useState, useEffect } from "react";

const DEMO_TEXT =
  "Great animations elevate user experience beyond aesthetics. They guide attention, create flow, and make digital interfaces feel alive and intentional.";

export default function PreviewTextHighlighter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = DEMO_TEXT.split(" ");

  const handleScroll = useCallback(() => {
    const scrollEl = scrollRef.current;
    const container = containerRef.current;
    if (!scrollEl || !container) return;
    const scrollTop = scrollEl.scrollTop;
    const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
    if (scrollHeight <= 0) return;
    const p = Math.min(1, Math.max(0, scrollTop / scrollHeight));
    setProgress(p);
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d]">
      <h3 className="text-white text-lg font-semibold mb-1">Text Highlighter</h3>
      <p className="text-[#737373] text-xs mb-4">Scrollez dans la zone ci-dessous</p>

      <div
        ref={scrollRef}
        className="w-[85%] max-w-[480px] h-[250px] overflow-y-auto rounded-xl border border-[#1a1a1a] px-6"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#333 transparent",
        }}
      >
        {/* Top spacer */}
        <div className="h-[120px]" />

        <div ref={containerRef}>
          <p
            style={{
              fontSize: "1.6rem",
              lineHeight: "1.5",
              fontWeight: 500,
            }}
          >
            {words.map((word, i) => {
              const wordProgress = i / words.length;
              const isActive = progress > wordProgress;
              return (
                <span
                  key={i}
                  style={{
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.15)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {/* Bottom spacer */}
        <div className="h-[120px]" />
      </div>

      {/* Progress bar */}
      <div className="w-[85%] max-w-[480px] h-[3px] bg-[#1a1a1a] rounded-full mt-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${progress * 100}%`,
            background: "#E1FF6C",
          }}
        />
      </div>
    </div>
  );
}
