"use client";

const cards = [
  { icon: "cube", label: "3D Motion" },
  { icon: "zap", label: "Fast Render" },
  { icon: "layers", label: "Multi-layer" },
];

function CardIcon({ type }: { type: string }) {
  if (type === "cube") return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  );
  if (type === "zap") return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="6" rx="1" /><rect x="3" y="11" width="18" height="6" rx="1" />
    </svg>
  );
}

export default function PreviewBorderSpin() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#FFFCF5]">
      <div className="group flex gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative rounded-[14px] p-[2px] animate-border-spin"
            style={{
              background: "conic-gradient(from var(--border-angle), transparent 30%, rgb(138,132,114) 50%, #E1FF6C 70%, transparent 90%)",
            }}
          >
            {/* Mask that hides border at rest */}
            <div className="absolute inset-0 rounded-[14px] bg-[#FFFCF5] transition-opacity duration-300 group-hover:opacity-0" />
            {/* Card content */}
            <div className="relative w-[130px] h-[130px] rounded-[13px] bg-white flex flex-col items-center justify-center gap-3 border border-[rgba(0,0,0,0.06)]">
              <div className="text-[#333]">
                <CardIcon type={card.icon} />
              </div>
              <span className="text-xs font-medium text-[#555]">{card.label}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="absolute bottom-6 text-xs text-[#999]">Survolez les cards</p>
    </div>
  );
}
