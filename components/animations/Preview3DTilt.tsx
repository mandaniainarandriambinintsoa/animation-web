"use client";

import { useCallback, useRef, useState } from "react";

const images = [
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", w: 120, h: 130, top: "5%", left: "3%", rotate: -12 },
  { src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", w: 100, h: 90, top: "8%", right: "5%", rotate: 8 },
  { src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80", w: 130, h: 110, top: "38%", left: "-2%", rotate: -6 },
  { src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80", w: 100, h: 100, top: "30%", right: "0%", rotate: 14 },
  { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80", w: 110, h: 100, bottom: "10%", left: "5%", rotate: 10 },
  { src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&q=80", w: 100, h: 120, bottom: "8%", right: "6%", rotate: -8 },
];

export default function Preview3DTilt() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    setTransform(`perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] flex items-center justify-center rounded-2xl overflow-hidden bg-black"
    >
      <div
        className="relative w-full max-w-[500px] h-[350px]"
        style={{ transformStyle: "preserve-3d", transform, transition: "transform 0.1s ease-out" }}
      >
        {images.map((img, i) => {
          const pos: React.CSSProperties = {
            position: "absolute", width: img.w, height: img.h,
            borderRadius: "12px", overflow: "hidden",
            transform: `rotate(${img.rotate}deg) translateZ(${20 + i * 8}px)`,
            opacity: 0.85, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          };
          if (img.top) pos.top = img.top;
          if (img.bottom) pos.bottom = img.bottom;
          if (img.left) pos.left = img.left;
          if (img.right) pos.right = img.right;
          return (
            <div key={i} style={pos}>
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </div>
          );
        })}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
        >
          <h2 className="text-4xl font-bold text-white text-center" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}>
            3D Tilt
          </h2>
          <p className="mt-2 text-sm text-white/50">Bougez votre curseur</p>
        </div>
      </div>
    </div>
  );
}
