"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const tabItems = [
  {
    label: "Dashboard",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    content: "Overview of your project metrics and recent activity.",
  },
  {
    label: "Analytics",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2",
    content: "Track performance, conversion rates, and user engagement.",
  },
  {
    label: "Settings",
    icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    content: "Configure your preferences, integrations, and team access.",
  },
  {
    label: "Notifications",
    icon: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    content: "Manage alerts, email preferences, and notification rules.",
  },
  {
    label: "Security",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    content: "Two-factor auth, sessions, API keys, and audit logs.",
  },
];

export default function PreviewVerticalTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateIndicator = useCallback(() => {
    const tab = tabsRef.current[active];
    const indicator = indicatorRef.current;
    const container = containerRef.current;
    if (!tab || !indicator || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    indicator.style.transform = `translateY(${tabRect.top - containerRect.top}px)`;
    indicator.style.height = `${tabRect.height}px`;
  }, [active]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden">
      <div className="flex gap-6 max-w-md w-full px-6">
        {/* Tabs */}
        <div ref={containerRef} className="relative shrink-0" style={{ width: "10rem" }}>
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute left-0 top-0"
            style={{
              width: 3,
              background: "#E1FF6C",
              borderRadius: 3,
              transition: "transform 200ms cubic-bezier(0.4,0,0.2,1), height 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />

          <div className="flex flex-col">
            {tabItems.map((item, i) => (
              <button
                key={item.label}
                ref={(el) => { tabsRef.current[i] = el; }}
                onClick={() => setActive(i)}
                className="flex items-center gap-2.5 py-2.5 text-left cursor-pointer"
                style={{
                  color: i === active ? "#ffffff" : "rgba(255,255,255,0.4)",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8rem",
                  borderRadius: "0.5rem",
                  paddingLeft: 14,
                  transition: "color 200ms ease, background 200ms ease",
                }}
                onMouseEnter={(e) => {
                  if (i !== active) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] w-full">
            <h4 className="text-sm font-semibold text-white mb-1">{tabItems[active].label}</h4>
            <p className="text-xs text-white/40 leading-relaxed">{tabItems[active].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
