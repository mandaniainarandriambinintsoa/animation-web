"use client";

import { useEffect, useRef, useState } from "react";

function ScrollRevealItem({
  children,
  direction = "up",
  distance = 30,
  duration = 600,
  delay = 0,
  once = false,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  easing?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  const getTranslate = () => {
    switch (direction) {
      case "up": return `translateY(${distance}px)`;
      case "down": return `translateY(-${distance}px)`;
      case "left": return `translateX(${distance}px)`;
      case "right": return `translateX(-${distance}px)`;
      case "none": return "none";
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!once || !hasTriggered.current) {
              hasTriggered.current = true;
              setIsVisible(true);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTranslate(),
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const features = [
  { icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8", label: "Lightning Fast" },
  { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Secure" },
  { icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z", label: "Modular" },
  { icon: "M12 3v18M3 12h18", label: "Extensible" },
  { icon: "M22 12h-4l-3 9L9 3l-3 9H2", label: "Analytics" },
  { icon: "M12 2a10 10 0 100 20 10 10 0 000-20z", label: "Global" },
];

export default function PreviewScrollReveal() {
  const [key, setKey] = useState(0);

  const replay = () => {
    setKey((k) => k + 1);
  };

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d] overflow-hidden">
      <div key={key} className="w-full max-w-sm px-6">
        <ScrollRevealItem direction="up" delay={0} duration={500}>
          <h3 className="text-lg font-semibold text-white mb-1">Features</h3>
          <p className="text-xs text-white/40 mb-4">Each card reveals on scroll</p>
        </ScrollRevealItem>

        <div className="grid grid-cols-3 gap-3">
          {features.map((feat, i) => (
            <ScrollRevealItem key={i} direction="up" delay={i * 100} duration={500}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#E1FF6C]/30 transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E1FF6C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={feat.icon} />
                </svg>
                <span className="text-[11px] text-white/60 font-medium">{feat.label}</span>
              </div>
            </ScrollRevealItem>
          ))}
        </div>
      </div>

      <button
        onClick={replay}
        className="absolute bottom-5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50 hover:text-white/80 hover:border-white/20 transition-colors cursor-pointer"
      >
        Replay
      </button>
    </div>
  );
}
