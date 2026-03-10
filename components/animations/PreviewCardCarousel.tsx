"use client";

import { useRef, useCallback, useState } from "react";

type CardType = "fan" | "stack" | "fade" | "colorize" | "camera";

interface DemoCard {
  id: string;
  title: string;
  type: CardType;
  colors: string[];
}

const demoCards: DemoCard[] = [
  { id: "fan", title: "Fan Spread", type: "fan", colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#C9B1FF"] },
  { id: "stack", title: "Stack Shift", type: "stack", colors: ["#FF9F43", "#FF6B6B", "#E1FF6C", "#4D96FF", "#6BCB77"] },
  { id: "fade", title: "3D Fade", type: "fade", colors: ["#4D96FF", "#C9B1FF"] },
  { id: "colorize", title: "Colorize", type: "colorize", colors: ["#555", "#E1FF6C"] },
  { id: "camera", title: "Camera Pan", type: "camera", colors: ["#FF6B6B", "#FFD93D", "#4D96FF"] },
];

function FanImages({ colors }: { colors: string[] }) {
  return (
    <div className="flex items-center justify-center -space-x-[16px] group-hover:-space-x-[24px] transition-all duration-300 ease-out h-full">
      {colors.map((c, i) => (
        <div
          key={i}
          className="w-[36px] h-[48px] rounded-lg transition-all duration-300 ease-out shadow-md"
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

function StackImages({ colors }: { colors: string[] }) {
  const hoverClasses = [
    "group-hover:scale-110",
    "group-hover:translate-x-1",
    "group-hover:translate-x-2",
    "group-hover:-translate-x-2",
    "group-hover:-translate-x-1",
  ];
  return (
    <div className="relative w-full h-full">
      {colors.map((c, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-lg transition-all duration-300 ease-out ${hoverClasses[i]}`}
          style={{ background: c, zIndex: i === 0 ? 15 : 12 + i, opacity: i === 0 ? 1 : 0.7 }}
        />
      ))}
    </div>
  );
}

function FadeCard({ colors }: { colors: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-2 rounded-lg transition-transform duration-100 ease-out"
        style={{ background: colors[0], transform }}
      />
      <div
        className="absolute inset-2 rounded-lg z-10 transition-opacity duration-500 ease-out group-hover:opacity-0"
        style={{ background: colors[1] }}
      />
    </div>
  );
}

function ColorizeImages({ colors }: { colors: string[] }) {
  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-2 rounded-lg z-[12] transition-all duration-300 ease-out group-hover:opacity-0"
        style={{ background: colors[0] }}
      />
      <div
        className="absolute inset-2 rounded-lg z-[13] opacity-0 transition-all duration-300 ease-out group-hover:opacity-100"
        style={{ background: colors[1] }}
      />
    </div>
  );
}

function CameraImages({ colors }: { colors: string[] }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex w-fit gap-2 transition-all duration-300 ease-out group-hover:-translate-x-[60px] absolute top-1/2 -translate-y-1/2 left-2">
        {colors.map((c, i) => (
          <div
            key={i}
            className="w-[60px] h-[60px] rounded-lg shrink-0"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}

function CardImageArea({ card }: { card: DemoCard }) {
  switch (card.type) {
    case "fan": return <FanImages colors={card.colors} />;
    case "stack": return <StackImages colors={card.colors} />;
    case "fade": return <FadeCard colors={card.colors} />;
    case "colorize": return <ColorizeImages colors={card.colors} />;
    case "camera": return <CameraImages colors={card.colors} />;
  }
}

export default function PreviewCardCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-[400px] flex items-center rounded-2xl bg-[#0a0a0a] overflow-hidden">
      <div className="w-full px-6">
        <p className="text-lg font-bold text-white/90 mb-1">Endless possibilities</p>
        <p className="text-lg font-bold text-white/30 mb-6">Seamless workflows</p>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 w-fit">
            {demoCards.map((card) => (
              <div
                key={card.id}
                className="group w-[140px] shrink-0 rounded-2xl bg-white/5 hover:bg-white/[0.08] overflow-hidden cursor-pointer transition-colors duration-100"
                style={{ border: "0.8px solid rgba(255,255,255,0.05)" }}
              >
                <div className="h-[100px]">
                  <CardImageArea card={card} />
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-white/60">{card.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
