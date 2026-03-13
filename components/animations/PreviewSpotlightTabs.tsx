"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const items = ["Dashboard", "Analytics", "Settings", "Team"];

export default function PreviewSpotlightTabs() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  const hoverIndicatorRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(
    (index: number, ref: React.RefObject<HTMLDivElement | null>) => {
      const tab = tabsRef.current[index];
      const indicator = ref.current;
      if (!tab || !indicator) return;

      const parentRect = tab.parentElement?.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      if (!parentRect) return;

      indicator.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
      indicator.style.width = `${tabRect.width}px`;
      indicator.style.height = `${tabRect.height}px`;
    },
    []
  );

  useEffect(() => {
    updateIndicator(active, activeIndicatorRef);
  }, [active, updateIndicator]);

  useEffect(() => {
    if (hovered !== null) {
      updateIndicator(hovered, hoverIndicatorRef);
      if (hoverIndicatorRef.current) hoverIndicatorRef.current.style.opacity = "1";
    } else {
      if (hoverIndicatorRef.current) hoverIndicatorRef.current.style.opacity = "0";
    }
  }, [hovered, updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator(active, activeIndicatorRef);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active, updateIndicator]);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center gap-6 rounded-2xl bg-[#0d0d0d] overflow-hidden">
      {/* Spotlight tabs */}
      <div
        className="relative inline-flex items-center rounded-xl p-1"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.4)",
        }}
      >
        {/* Hover indicator */}
        <div
          ref={hoverIndicatorRef}
          className="absolute left-1 top-1"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "0.75rem",
            opacity: 0,
            transition:
              "transform 250ms cubic-bezier(0.4,0,0.2,1), width 250ms cubic-bezier(0.4,0,0.2,1), opacity 150ms ease",
            pointerEvents: "none",
          }}
        />

        {/* Active indicator */}
        <div
          ref={activeIndicatorRef}
          className="absolute left-1 top-1"
          style={{
            background: "rgba(225,255,108,0.08)",
            borderRadius: "0.75rem",
            boxShadow: "0 0 20px rgba(225,255,108,0.06)",
            transition:
              "transform 250ms cubic-bezier(0.4,0,0.2,1), width 250ms cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }}
        />

        {/* Tab buttons */}
        {items.map((item, i) => (
          <button
            key={item}
            ref={(el) => { tabsRef.current[i] = el; }}
            onClick={() => setActive(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative z-10 cursor-pointer whitespace-nowrap"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
              color: i === active ? "#E1FF6C" : "rgba(255,255,255,0.5)",
              transition: "color 250ms ease",
              background: "transparent",
              border: "none",
              borderRadius: "0.75rem",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div className="px-6 py-4 rounded-xl bg-white/[0.03] border border-white/5 min-w-[240px] text-center">
        <p className="text-sm text-white/60">
          Active: <span className="text-[#E1FF6C] font-medium">{items[active]}</span>
        </p>
      </div>

      <p className="absolute bottom-5 text-xs text-[#737373]">Cliquez ou survolez les tabs</p>
    </div>
  );
}
