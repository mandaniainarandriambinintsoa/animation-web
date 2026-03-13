"use client";

import { useRef, useState, useEffect } from "react";

const sections = [
  {
    title: "Design System",
    description: "Composants consistants avec tokens de design partages.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    color: "#E1FF6C",
  },
  {
    title: "Animations",
    description: "Transitions fluides et micro-interactions engageantes.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: "#E1FF6C",
  },
  {
    title: "Performance",
    description: "Optimise pour 60fps avec will-change et GPU compositing.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: "#E1FF6C",
  },
  {
    title: "Responsive",
    description: "Adaptatif du mobile au desktop, sans compromis.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E1FF6C" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" />
      </svg>
    ),
    color: "#E1FF6C",
  },
];

export default function PreviewStickyScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      let closest = 0;
      let closestDist = Infinity;

      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const refTop = ref.offsetTop - container.offsetTop;
        const center = refTop + ref.offsetHeight / 2;
        const viewCenter = containerTop + containerHeight / 2;
        const dist = Math.abs(center - viewCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-2xl bg-[#0d0d0d] overflow-hidden">
      <div
        ref={scrollRef}
        className="w-full h-full overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        <div className="flex min-h-full" style={{ gap: "1.5rem" }}>
          {/* Left: sticky panel */}
          <div
            className="w-[45%] shrink-0 flex flex-col justify-center px-5"
            style={{
              position: "sticky",
              top: 0,
              height: "400px",
            }}
          >
            <div>
              <p
                className="text-xs font-medium mb-3 uppercase tracking-wider"
                style={{ color: "#E1FF6C" }}
              >
                Features
              </p>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: 0,
                  transition: "all 0.3s ease",
                  lineHeight: 1.3,
                }}
              >
                {sections[activeIndex]?.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  marginTop: "0.75rem",
                  transition: "all 0.3s ease",
                }}
              >
                {sections[activeIndex]?.description}
              </p>

              {/* Progress dots */}
              <div className="mt-6 flex gap-2">
                {sections.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      borderRadius: 3,
                      background:
                        i === activeIndex ? "#E1FF6C" : "rgba(255,255,255,0.15)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: scrollable cards */}
          <div className="flex-1 flex flex-col py-6 pr-4" style={{ gap: "1rem" }}>
            {/* Top spacer */}
            <div className="h-[140px] shrink-0" />

            {sections.map((section, i) => (
              <div
                key={i}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                className="shrink-0 flex items-center justify-center rounded-xl p-6"
                style={{
                  height: "200px",
                  background:
                    i === activeIndex
                      ? "rgba(225,255,108,0.04)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${
                    i === activeIndex
                      ? "rgba(225,255,108,0.15)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  transition: "all 0.3s ease",
                }}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div
                    style={{
                      opacity: i === activeIndex ? 1 : 0.4,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {section.icon}
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        i === activeIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {section.title}
                  </span>
                </div>
              </div>
            ))}

            {/* Bottom spacer */}
            <div className="h-[140px] shrink-0" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="text-[10px] text-white/30">Scrollez</span>
      </div>
    </div>
  );
}
