"use client";

import { useRef, useEffect, useCallback } from "react";

export default function PreviewBlobCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const blobPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const initialized = useRef(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    const blob = blobRef.current;
    if (!blob) return;

    blobPos.current.x = lerp(blobPos.current.x, mousePos.current.x, 0.08);
    blobPos.current.y = lerp(blobPos.current.y, mousePos.current.y, 0.08);

    blob.style.transform = `translate(${blobPos.current.x - 100}px, ${blobPos.current.y - 100}px)`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;

      if (!initialized.current) {
        blobPos.current.x = mousePos.current.x;
        blobPos.current.y = mousePos.current.y;
        initialized.current = true;
      }
    };

    const handleMouseLeave = () => {
      // Move blob to center on leave
      const rect = container.getBoundingClientRect();
      mousePos.current.x = rect.width / 2;
      mousePos.current.y = rect.height / 2;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Initialize blob to center
    const rect = container.getBoundingClientRect();
    mousePos.current.x = rect.width / 2;
    mousePos.current.y = rect.height / 2;
    blobPos.current.x = rect.width / 2;
    blobPos.current.y = rect.height / 2;

    rafId.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#050505] overflow-hidden cursor-none"
    >
      {/* Blob */}
      <div
        ref={blobRef}
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, #E1FF6C55 0%, #E1FF6C22 40%, transparent 70%)",
          filter: "blur(30px)",
          willChange: "transform",
        }}
      />

      {/* Secondary smaller blob for depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "radial-gradient(circle, #E1FF6C33 0%, transparent 70%)",
          filter: "blur(15px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "blobPulse 4s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes blobPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.1; }
        }
      `}</style>

      {/* Content overlay */}
      <div className="relative z-10 text-center pointer-events-none select-none">
        <h2 className="text-3xl font-bold text-white mb-2">Interactive Blob</h2>
        <p className="text-[#737373] text-sm max-w-[280px] leading-relaxed">
          A soft gradient blob that follows your cursor with smooth interpolation
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="px-4 py-2 rounded-full border border-[#1a1a1a] bg-[#0d0d0d]/50 text-xs text-[#999]">
            requestAnimationFrame
          </div>
          <div className="px-4 py-2 rounded-full border border-[#1a1a1a] bg-[#0d0d0d]/50 text-xs text-[#999]">
            lerp
          </div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <p className="absolute bottom-5 text-xs text-[#737373] z-10">Move your cursor around</p>
    </div>
  );
}
