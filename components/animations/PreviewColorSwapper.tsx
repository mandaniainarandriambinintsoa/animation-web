"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { color: "#0d0d0d", label: "Section 1", subtitle: "Dark base" },
  { color: "#1a1a2e", label: "Section 2", subtitle: "Deep blue" },
  { color: "#2d1b69", label: "Section 3", subtitle: "Purple haze" },
  { color: "#0f2027", label: "Section 4", subtitle: "Ocean dark" },
  { color: "#1a0a0a", label: "Section 5", subtitle: "Warm ember" },
];

export default function PreviewColorSwapper() {
  const [activeColor, setActiveColor] = useState(sections[0].color);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const blocks = container.querySelectorAll<HTMLElement>("[data-swap-color]");

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let topColor = sections[0].color;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            topColor = (entry.target as HTMLElement).dataset.swapColor || sections[0].color;
          }
        });
        if (maxRatio > 0.3) setActiveColor(topColor);
      },
      {
        root: container,
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
      }
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/5">
      {/* Animated background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: activeColor,
          transition: "background-color 500ms ease",
        }}
      />

      {/* Scroll indicator */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
        <span className="text-[10px] font-mono text-white/50">Scroll down</span>
      </div>

      {/* Color badge */}
      <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
        <span className="text-[10px] font-mono text-[#E1FF6C]">{activeColor}</span>
      </div>

      {/* Scrollable sections */}
      <div ref={containerRef} className="relative z-10 h-full overflow-y-auto scrollbar-none">
        {sections.map((section, i) => (
          <div
            key={i}
            data-swap-color={section.color}
            className="h-full flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl font-semibold text-white tracking-tight">{section.label}</span>
              <span className="text-sm text-white/40">{section.subtitle}</span>
              <div
                className="mt-3 w-8 h-8 rounded-lg border border-white/20"
                style={{ backgroundColor: section.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
