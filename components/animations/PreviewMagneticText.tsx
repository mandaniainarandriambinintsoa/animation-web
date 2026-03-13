"use client";

import { useCallback, useRef, useEffect } from "react";

const DEMO_TEXT = "Magnetic Text";
const DEMO_SUB = "Move your cursor near the letters";

export default function PreviewMagneticText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const minWeight = 100;
  const maxWeight = 900;
  const threshold = 200;
  const colorFrom = "#ffffff";
  const colorTo = "#E1FF6C";

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const lerpColor = (from: string, to: string, t: number) => {
    const f = hexToRgb(from);
    const toC = hexToRgb(to);
    const r = Math.round(f.r + (toC.r - f.r) * t);
    const g = Math.round(f.g + (toC.g - f.g) * t);
    const b = Math.round(f.b + (toC.b - f.b) * t);
    return `rgb(${r},${g},${b})`;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (e.clientX - charCenterX) ** 2 + (e.clientY - charCenterY) ** 2
        );
        const proximity = Math.max(0, 1 - dist / threshold);
        const weight = Math.round(minWeight + proximity * (maxWeight - minWeight));
        const color = lerpColor(colorFrom, colorTo, proximity);
        span.style.fontWeight = String(weight);
        span.style.color = color;
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    spansRef.current.forEach((span) => {
      if (!span) return;
      span.style.fontWeight = String(minWeight);
      span.style.color = colorFrom;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d]">
      <div ref={containerRef} onMouseLeave={handleMouseLeave} className="text-center px-6">
        <h1
          style={{
            fontSize: "3.5rem",
            letterSpacing: "-0.02em",
            fontVariationSettings: `"wght" ${minWeight}`,
            lineHeight: 1.1,
          }}
          className="inline-flex flex-wrap justify-center"
        >
          {DEMO_TEXT.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) spansRef.current[i] = el;
              }}
              style={{
                fontWeight: minWeight,
                color: colorFrom,
                transition: "font-weight 0.15s ease, color 0.15s ease",
                display: char === " " ? "inline" : "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      <p className="text-[#737373] text-xs mt-6">{DEMO_SUB}</p>
    </div>
  );
}
