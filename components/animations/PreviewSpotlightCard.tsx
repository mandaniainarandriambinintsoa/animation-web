"use client";

import { useCallback, useRef } from "react";

const demoCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Layers",
    desc: "Stack multiple effects",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Fast",
    desc: "Zero re-renders on hover",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Smooth",
    desc: "CSS transition driven",
  },
];

function SpotlightCardInner({
  children,
  spotlightColor = "rgba(225,255,108,0.07)",
  spotlightSize = 300,
}: {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const card = cardRef.current;
      const overlay = overlayRef.current;
      if (!card || !overlay) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      overlay.style.opacity = "1";
      overlay.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent)`;
    },
    [spotlightColor, spotlightSize]
  );

  const handleMouseLeave = useCallback(() => {
    const overlay = overlayRef.current;
    if (overlay) overlay.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden"
      style={{
        background: "#111111",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{ opacity: 0, borderRadius: "1rem" }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}

export default function PreviewSpotlightCard() {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#050505]">
      <h3 className="text-white text-lg font-semibold mb-2">Spotlight Cards</h3>

      <div className="flex gap-3 px-4">
        {demoCards.map((card, i) => (
          <SpotlightCardInner key={i}>
            <div className="p-5 w-[150px] h-[140px] flex flex-col gap-3">
              {card.icon}
              <div>
                <p className="text-white text-sm font-medium">{card.title}</p>
                <p className="text-[#737373] text-xs mt-1">{card.desc}</p>
              </div>
            </div>
          </SpotlightCardInner>
        ))}
      </div>

      <p className="text-[#737373] text-xs mt-2">Survolez les cards</p>
    </div>
  );
}
