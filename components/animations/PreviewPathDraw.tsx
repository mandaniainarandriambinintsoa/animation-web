"use client";

import { useEffect, useRef, useState } from "react";

const DEMO_PATH = "M 10 150 C 80 30, 200 30, 280 150 S 480 270, 560 150 S 680 30, 750 150";

export default function PreviewPathDraw() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-replay every 4 seconds for demo
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 100);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div ref={ref} className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0a0a0a]">
      <svg viewBox="0 0 760 300" fill="none" className="w-full max-w-[600px] px-8">
        {/* Grid lines */}
        {[60, 120, 180, 240].map((y) => (
          <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {/* Background path */}
        <path d={DEMO_PATH} stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
        {/* Animated path */}
        <path
          d={DEMO_PATH}
          stroke="#E1FF6C"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={visible ? "0" : "1"}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 2s ease-out" }}
        />
        {/* Dots at peaks */}
        {visible && (
          <>
            <circle cx="145" cy="60" r="4" fill="#E1FF6C" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 0.8s" }} />
            <circle cx="420" cy="240" r="4" fill="#E1FF6C" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 1.2s" }} />
            <circle cx="615" cy="60" r="4" fill="#E1FF6C" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.5s 1.6s" }} />
          </>
        )}
      </svg>
    </div>
  );
}
