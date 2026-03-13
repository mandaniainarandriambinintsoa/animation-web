"use client";

import { useEffect, useMemo, useRef } from "react";

interface Meteor {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function PreviewMeteors() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleId = "meteor-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-500px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const meteors = useMemo<Meteor[]>(() => {
    // Seeded pseudo-random for SSR consistency
    const seed = (i: number) => {
      const x = Math.sin(i * 9301 + 49297) * 49297;
      return x - Math.floor(x);
    };
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: seed(i) * 80 - 10, // -10% to 70%
      left: seed(i + 100) * 80 + 20, // 20% to 100%
      delay: seed(i + 200) * 8, // 0-8s
      duration: 2 + seed(i + 300) * 3, // 2-5s
      size: 1 + seed(i + 400) * 2, // 1-3px
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ height: 400, background: "#050505" }}
    >
      {/* Starry background dots */}
      {Array.from({ length: 40 }, (_, i) => {
        const sx = Math.sin(i * 1234 + 5678) * 5678;
        const r = sx - Math.floor(sx);
        const sy = Math.sin(i * 4321 + 8765) * 8765;
        const r2 = sy - Math.floor(sy);
        return (
          <div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: 1 + r * 1.5,
              height: 1 + r * 1.5,
              top: `${r2 * 100}%`,
              left: `${r * 100}%`,
              background: "rgba(255,255,255,0.3)",
            }}
          />
        );
      })}

      {/* Meteors */}
      {meteors.map((m) => (
        <div
          key={m.id}
          className="absolute"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            animation: `meteor-fall ${m.duration}s linear ${m.delay}s infinite`,
          }}
        >
          {/* Meteor head */}
          <div
            className="rounded-full"
            style={{
              width: m.size,
              height: m.size,
              background: "#fff",
              boxShadow: "0 0 4px 1px rgba(255,255,255,0.6)",
            }}
          />
          {/* Meteor tail */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 80 + m.size * 20,
              height: m.size * 0.8,
              background: `linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(225,255,108,0.2) 30%, transparent 100%)`,
              transformOrigin: "left center",
              transform: "translateY(-50%)",
              borderRadius: 999,
            }}
          />
        </div>
      ))}

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3">
        <h2
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#ffffff" }}
        >
          Meteor Shower
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Randomized meteor streaks with tail gradients
        </p>
        <div
          className="mt-4 flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium"
          style={{
            border: "1px solid rgba(225,255,108,0.3)",
            color: "#E1FF6C",
            background: "rgba(225,255,108,0.05)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#E1FF6C",
              boxShadow: "0 0 6px #E1FF6C",
            }}
          />
          15 meteors &middot; CSS keyframes
        </div>
      </div>
    </div>
  );
}
