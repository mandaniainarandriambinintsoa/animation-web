"use client";

import { useEffect, useRef } from "react";

export default function PreviewAuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const styleId = "aurora-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes aurora-shift-1 {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.6;
          }
          25% {
            background-position: 50% 100%;
            opacity: 0.8;
          }
          50% {
            background-position: 100% 50%;
            opacity: 0.5;
          }
          75% {
            background-position: 50% 0%;
            opacity: 0.7;
          }
        }
        @keyframes aurora-shift-2 {
          0%, 100% {
            background-position: 100% 0%;
            opacity: 0.5;
          }
          33% {
            background-position: 0% 100%;
            opacity: 0.7;
          }
          66% {
            background-position: 50% 50%;
            opacity: 0.4;
          }
        }
        @keyframes aurora-shift-3 {
          0%, 100% {
            background-position: 50% 0%;
            opacity: 0.4;
          }
          50% {
            background-position: 0% 100%;
            opacity: 0.6;
          }
        }
        @keyframes aurora-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ height: 400, background: "#050505" }}
    >
      {/* Aurora layer 1 - deep blue to purple */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(30,60,160,0.5) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(100,40,180,0.4) 0%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "aurora-shift-1 20s ease-in-out infinite",
        }}
      />
      {/* Aurora layer 2 - teal to green */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 30%, rgba(0,180,160,0.35) 0%, transparent 70%), radial-gradient(ellipse 50% 70% at 30% 70%, rgba(40,200,100,0.3) 0%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "aurora-shift-2 25s ease-in-out infinite",
        }}
      />
      {/* Aurora layer 3 - green-yellow accent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(225,255,108,0.12) 0%, transparent 60%), radial-gradient(ellipse 80% 30% at 40% 20%, rgba(60,100,200,0.25) 0%, transparent 60%)",
          backgroundSize: "200% 200%",
          animation: "aurora-shift-3 30s ease-in-out infinite",
        }}
      />
      {/* Noise texture overlay for realism */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-conic-gradient(rgba(255,255,255,0.01) 0% 25%, transparent 0% 50%) 0 0 / 4px 4px",
          mixBlendMode: "overlay",
        }}
      />
      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3">
        <h2
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
        >
          Aurora Background
        </h2>
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Layered gradient animation with hue shifting
        </p>
        <div
          className="mt-4 rounded-full px-5 py-2 text-xs font-medium"
          style={{
            border: "1px solid rgba(225,255,108,0.3)",
            color: "#E1FF6C",
            backdropFilter: "blur(8px)",
            background: "rgba(225,255,108,0.05)",
          }}
        >
          Pure CSS gradients
        </div>
      </div>
    </div>
  );
}
