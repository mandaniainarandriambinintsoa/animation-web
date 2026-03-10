"use client";

import { useCallback, useRef } from "react";

const cards = [
  { emoji: "😀", bg: "#FFD93D", w: 80, h: 90, top: "5%", left: "5%", rotate: -12, amplitude: 30 },
  { emoji: "🤩", bg: "#FF6B6B", w: 70, h: 70, top: "8%", right: "8%", rotate: 8, amplitude: 25 },
  { emoji: "😎", bg: "#6BCB77", w: 90, h: 80, top: "38%", left: "2%", rotate: -6, amplitude: 32 },
  { emoji: "🤖", bg: "#4D96FF", w: 70, h: 70, top: "35%", right: "5%", rotate: 14, amplitude: 28 },
  { emoji: "👻", bg: "#C9B1FF", w: 75, h: 75, bottom: "10%", left: "8%", rotate: 10, amplitude: 35 },
  { emoji: "🦊", bg: "#FF9F43", w: 70, h: 80, bottom: "8%", right: "10%", rotate: -8, amplitude: 30 },
];

const eyeSize = 18;
const pupilSize = 8;
const maxPupilMove = 5;

export default function PreviewEyeTracking() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyeRefs = useRef<(HTMLDivElement | null)[][]>(cards.map(() => []));

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;
    const sRect = section.getBoundingClientRect();
    const mouseX = e.clientX - sRect.left;
    const mouseY = e.clientY - sRect.top;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elCX = rect.left + rect.width / 2 - sRect.left;
      const elCY = rect.top + rect.height / 2 - sRect.top;
      const amp = cards[i].amplitude;

      const rotateY = ((mouseX - elCX) / (sRect.width / 2)) * amp;
      const rotateX = ((elCY - mouseY) / (sRect.height / 2)) * amp;
      const tx = ((mouseX - elCX) / sRect.width) * amp * 3;
      const ty = ((mouseY - elCY) / sRect.height) * amp * 3;
      const baseRotate = cards[i].rotate;
      el.style.transform = `perspective(800px) translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotate(${baseRotate}deg) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg)`;

      const eyes = eyeRefs.current[i];
      eyes.forEach((pupil) => {
        if (!pupil) return;
        const eyeRect = pupil.parentElement!.getBoundingClientRect();
        const eyeCX = eyeRect.left + eyeRect.width / 2;
        const eyeCY = eyeRect.top + eyeRect.height / 2;
        const dx = e.clientX - eyeCX;
        const dy = e.clientY - eyeCY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const clamp = Math.min(dist, maxPupilMove * 4) / 4;
        const angle = Math.atan2(dy, dx);
        const px = Math.cos(angle) * clamp;
        const py = Math.sin(angle) * clamp;
        pupil.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `perspective(800px) translate(0px, 0px) rotate(${cards[i].rotate}deg) rotateX(0deg) rotateY(0deg)`;
    });
    eyeRefs.current.forEach((eyes) => {
      eyes.forEach((pupil) => {
        if (pupil) pupil.style.transform = "translate(0px, 0px)";
      });
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] flex items-center justify-center rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      {/* Cards with eyes */}
      {cards.map((card, i) => {
        const pos: React.CSSProperties = {
          position: "absolute",
          width: card.w,
          height: card.h,
          borderRadius: 16,
          overflow: "hidden",
          transform: `perspective(800px) rotate(${card.rotate}deg) rotateX(0deg) rotateY(0deg)`,
          transition: "transform 0.12s ease-out",
          boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
          background: card.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        };
        if (card.top) (pos as Record<string, unknown>).top = card.top;
        if (card.bottom) (pos as Record<string, unknown>).bottom = card.bottom;
        if (card.left) (pos as Record<string, unknown>).left = card.left;
        if (card.right) (pos as Record<string, unknown>).right = card.right;

        return (
          <div key={i} ref={(el) => { itemRefs.current[i] = el; }} style={pos}>
            {/* Eyes */}
            <div style={{ display: "flex", gap: 10, marginBottom: 2 }}>
              {[0, 1].map((eyeIdx) => (
                <div
                  key={eyeIdx}
                  style={{
                    width: eyeSize,
                    height: eyeSize,
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    ref={(el) => {
                      if (!eyeRefs.current[i]) eyeRefs.current[i] = [];
                      eyeRefs.current[i][eyeIdx] = el;
                    }}
                    style={{
                      width: pupilSize,
                      height: pupilSize,
                      borderRadius: "50%",
                      background: "#1a1a2e",
                      transition: "transform 0.08s ease-out",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <span style={{ fontSize: Math.min(card.w, card.h) * 0.35, lineHeight: 1 }}>
              {card.emoji}
            </span>
          </div>
        );
      })}

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <p
          className="text-2xl font-bold text-white text-center"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          Eye Tracking
        </p>
      </div>
    </div>
  );
}
