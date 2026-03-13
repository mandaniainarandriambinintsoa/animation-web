"use client";

import { useCallback, useRef } from "react";

function SpotlightBtn({
  children,
  spotlightColor = "rgba(255,255,255,0.1)",
  spotlightSize = 200,
  borderColor = "rgba(255,255,255,0.15)",
  hoverBorderColor = "rgba(255,255,255,0.3)",
  background = "transparent",
  borderRadius = "9999px",
  padding = "0.75rem 2rem",
  fontSize = "0.875rem",
  color = "#ffffff",
}: {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  borderColor?: string;
  hoverBorderColor?: string;
  background?: string;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  color?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const btn = btnRef.current;
      const glow = glowRef.current;
      if (!btn || !glow) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.opacity = "1";
      glow.style.background = `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, ${spotlightColor}, transparent)`;
    },
    [spotlightColor, spotlightSize]
  );

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.opacity = "0";
    const btn = btnRef.current;
    if (btn) btn.style.borderColor = borderColor;
  }, [borderColor]);

  const handleMouseEnter = useCallback(() => {
    const btn = btnRef.current;
    if (btn) btn.style.borderColor = hoverBorderColor;
  }, [hoverBorderColor]);

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative overflow-hidden cursor-pointer"
      style={{
        background,
        border: `1px solid ${borderColor}`,
        borderRadius,
        padding,
        fontSize,
        color,
        transition: "border-color 0.2s ease",
      }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0,
          borderRadius,
          transition: "opacity 0.3s ease",
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function PreviewSpotlightButton() {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center gap-8 rounded-2xl bg-[#0d0d0d] overflow-hidden">
      <div className="text-center mb-2">
        <h3 className="text-lg font-semibold text-white mb-1">Spotlight Buttons</h3>
        <p className="text-xs text-white/40">Move your cursor over the buttons</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <SpotlightBtn
          spotlightColor="rgba(225,255,108,0.15)"
          hoverBorderColor="rgba(225,255,108,0.4)"
          borderColor="rgba(225,255,108,0.15)"
          color="#E1FF6C"
        >
          Get Started
        </SpotlightBtn>

        <SpotlightBtn
          spotlightColor="rgba(255,255,255,0.1)"
          borderColor="rgba(255,255,255,0.12)"
          hoverBorderColor="rgba(255,255,255,0.3)"
        >
          Learn More
        </SpotlightBtn>

        <SpotlightBtn
          spotlightColor="rgba(255,255,255,0.08)"
          borderColor="rgba(255,255,255,0.08)"
          hoverBorderColor="rgba(255,255,255,0.2)"
          borderRadius="0.75rem"
          padding="0.625rem 1.5rem"
          fontSize="0.8rem"
          color="rgba(255,255,255,0.6)"
        >
          View Documentation
        </SpotlightBtn>
      </div>

      <p className="absolute bottom-5 text-xs text-white/30">Hover to see the spotlight effect</p>
    </div>
  );
}
