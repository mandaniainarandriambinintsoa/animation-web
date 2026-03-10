"use client";

import { useEffect, useRef, useState } from "react";

const arcs = [
  { radius: 120, strokeWidth: 3, startAngle: 0, arcLength: 90, color: "#E1FF6C", speed: 1 },
  { radius: 100, strokeWidth: 2.5, startAngle: 45, arcLength: 120, color: "#888", speed: -0.8 },
  { radius: 80, strokeWidth: 2, startAngle: 90, arcLength: 70, color: "#E1FF6C", speed: 1.2 },
  { radius: 60, strokeWidth: 2, startAngle: 180, arcLength: 100, color: "#555", speed: -0.6 },
  { radius: 40, strokeWidth: 1.5, startAngle: 270, arcLength: 60, color: "#E1FF6C", speed: 1.5 },
];

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const startRad = (startDeg * Math.PI) / 180;
  const endRad = (endDeg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function PreviewScrollArcs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      const el = containerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height))
        );
        setRotation(progress * 360);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = 150;
  const cy = 150;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0a0a0a]"
    >
      <svg width="300" height="300" viewBox="0 0 300 300">
        {/* Background circles */}
        {arcs.map((arc, i) => (
          <circle
            key={`bg-${i}`}
            cx={cx}
            cy={cy}
            r={arc.radius}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={arc.strokeWidth}
          />
        ))}

        {/* Animated arcs */}
        {arcs.map((arc, i) => {
          const angle = rotation * arc.speed;
          const startDeg = arc.startAngle + angle;
          const endDeg = startDeg + arc.arcLength;
          return (
            <path
              key={i}
              d={describeArc(cx, cy, arc.radius, startDeg, endDeg)}
              fill="none"
              stroke={arc.color}
              strokeWidth={arc.strokeWidth}
              strokeLinecap="round"
              opacity={0.8}
            />
          );
        })}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill="#E1FF6C" />
      </svg>

      {/* Label */}
      <div className="absolute bottom-6 left-6 text-xs text-[#555] font-mono">
        scroll: {Math.round(rotation)}deg
      </div>
    </div>
  );
}
