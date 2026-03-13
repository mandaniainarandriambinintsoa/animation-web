"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const tabSets = {
  underline: ["Overview", "Features", "Pricing", "Docs"],
  pill: ["All", "Design", "Code", "Motion"],
};

export default function PreviewFluidTabs() {
  const [activeUnderline, setActiveUnderline] = useState(0);
  const [activePill, setActivePill] = useState(0);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center gap-12 rounded-2xl bg-[#0d0d0d] overflow-hidden">
      {/* Underline variant */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Underline</span>
        <FluidTabsDemo
          items={tabSets.underline}
          active={activeUnderline}
          onSelect={setActiveUnderline}
          variant="underline"
        />
      </div>

      {/* Pill variant */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Pill</span>
        <FluidTabsDemo
          items={tabSets.pill}
          active={activePill}
          onSelect={setActivePill}
          variant="pill"
        />
      </div>

      <p className="absolute bottom-5 text-xs text-[#737373]">Cliquez sur les tabs</p>
    </div>
  );
}

function FluidTabsDemo({
  items,
  active,
  onSelect,
  variant,
}: {
  items: string[];
  active: number;
  onSelect: (i: number) => void;
  variant: "underline" | "pill";
}) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const tab = tabsRef.current[active];
    const indicator = indicatorRef.current;
    if (!tab || !indicator) return;

    const parentRect = tab.parentElement?.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    if (!parentRect) return;

    const left = tabRect.left - parentRect.left;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${tabRect.width}px`;

    if (variant === "pill") {
      indicator.style.height = `${tabRect.height}px`;
    }
  }, [active, variant]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="relative inline-flex">
      <div
        className="relative flex items-center"
        style={{
          gap: "0.5rem",
          borderBottom: variant === "underline" ? "1px solid rgba(255,255,255,0.1)" : undefined,
        }}
      >
        {items.map((item, i) => (
          <button
            key={item}
            ref={(el) => { tabsRef.current[i] = el; }}
            onClick={() => onSelect(i)}
            className="relative z-10 cursor-pointer whitespace-nowrap px-4 py-2"
            style={{
              fontSize: "0.875rem",
              color: i === active ? "#ffffff" : "rgba(255,255,255,0.5)",
              transition: "color 250ms ease",
              background: "transparent",
              border: "none",
            }}
          >
            {item}
          </button>
        ))}

        <div
          ref={indicatorRef}
          className="absolute left-0"
          style={{
            bottom: variant === "underline" ? -1 : 0,
            top: variant === "pill" ? 0 : undefined,
            height: variant === "underline" ? "2px" : undefined,
            background: variant === "pill" ? "rgba(255,255,255,0.08)" : "#E1FF6C",
            borderRadius: variant === "pill" ? "0.5rem" : "2px",
            transition:
              "transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}
