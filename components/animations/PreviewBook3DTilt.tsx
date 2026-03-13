"use client";

import { useCallback, useRef } from "react";

export default function PreviewBook3DTilt() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 20;
    const rotateX = (0.5 - y) * 14;
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (shadowRef.current) {
      const sx = (x - 0.5) * 16;
      const sy = (y - 0.5) * 24;
      shadowRef.current.style.boxShadow = `${sx.toFixed(1)}px ${sy.toFixed(1)}px 38px 0 rgba(0,0,0,0.8)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltRef.current)
      tiltRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    if (shadowRef.current)
      shadowRef.current.style.boxShadow = `7.7px 11.6px 38px 0 rgba(0,0,0,0.8)`;
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d]">
      <div
        className="relative overflow-hidden group/book w-[280px] h-[360px]"
        style={{ backgroundColor: "#0d0d0d", borderRadius: 32, border: "1.6px solid #1a1a1a" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* Book cover - 3D tilt */}
          <div
            ref={tiltRef}
            className="mx-auto translate-y-6 scale-105"
            style={{
              transformStyle: "preserve-3d",
              transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: "transform 0.15s ease-out",
            }}
          >
            <div
              ref={shadowRef}
              className="relative"
              style={{ boxShadow: "7.7px 11.6px 38px 0 rgba(0,0,0,0.8)" }}
            >
              {/* Faux book cover */}
              <div
                className="w-[160px] h-[200px] rounded-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #E1FF6C 0%, #a3c940 50%, #6b8e23 100%)",
                }}
              >
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className="w-12 h-[2px] bg-black/30 mb-3" />
                  <p className="text-black text-sm font-bold leading-tight">The Art of Animation</p>
                  <div className="w-8 h-[1px] bg-black/20 my-2" />
                  <p className="text-black/60 text-[10px]">Vol. I</p>
                </div>
              </div>
            </div>
          </div>

          {/* Envelope text */}
          <div
            className="relative z-10 w-full transition-colors"
            style={{
              borderRadius: 16,
              padding: "14px 18px",
              backgroundColor: "#141414",
              border: "1.6px solid #1a1a1a",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#141414")}
          >
            <p className="text-[16px] text-[#f0f0f0] leading-tight" style={{ fontWeight: 540 }}>
              3D Book Tilt
            </p>
            <p className="text-[13px] text-[#737373] leading-snug mt-1">
              Shadow dynamique au curseur
            </p>
          </div>
        </div>
      </div>

      <p className="absolute bottom-4 text-xs text-[#737373]">Survolez la card</p>
    </div>
  );
}
