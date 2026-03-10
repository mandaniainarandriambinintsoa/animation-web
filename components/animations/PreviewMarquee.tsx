"use client";

const items = [
  "React", "Next.js", "Tailwind", "TypeScript", "Framer Motion",
  "GSAP", "Three.js", "Vite", "Vercel", "Figma",
];

export default function PreviewMarquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0a0a0a] overflow-hidden">
      {/* Row 1 */}
      <div className="w-full overflow-hidden mb-3">
        <div
          className="flex gap-3 animate-marquee"
          style={{ width: `${doubled.length * 140}px` }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 px-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              style={{ width: "128px" }}
            >
              <span className="text-sm font-medium text-white/60">{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Row 2 (reverse) */}
      <div className="w-full overflow-hidden">
        <div
          className="flex gap-3 animate-marquee"
          style={{ width: `${doubled.length * 140}px`, animationDirection: "reverse", animationDuration: "25s" }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-12 px-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              style={{ width: "128px" }}
            >
              <span className="text-sm font-medium text-white/60">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
