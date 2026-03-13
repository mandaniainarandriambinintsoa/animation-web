"use client";

export default function PreviewDotPattern() {
  const size = 20;
  const dotRadius = 1;
  const dotColor = "rgba(255,255,255,0.15)";

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#050505] overflow-hidden">
      {/* Dot pattern SVG */}
      <div className="pointer-events-none absolute inset-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="preview-dots" width={size} height={size} patternUnits="userSpaceOnUse">
              <circle cx={size / 2} cy={size / 2} r={dotRadius} fill={dotColor} />
            </pattern>
            <radialGradient id="preview-dots-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="preview-dots-fade-mask">
              <rect width="100%" height="100%" fill="url(#preview-dots-fade)" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#preview-dots)"
            mask="url(#preview-dots-fade-mask)"
          />
        </svg>
      </div>

      {/* Content overlay — demo cards */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex gap-3">
          {["Components", "Patterns", "Layouts"].map((label) => (
            <div
              key={label}
              className="relative px-5 py-6 rounded-xl bg-[#0d0d0d]/80 border border-white/[0.06] backdrop-blur-sm flex flex-col items-center gap-3 hover:border-[#E1FF6C]/20 transition-colors"
            >
              {/* Inner dot pattern on card */}
              <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden opacity-40">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id={`card-dots-${label}`} width={12} height={12} patternUnits="userSpaceOnUse">
                      <circle cx={6} cy={6} r={0.6} fill="rgba(225,255,108,0.3)" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#card-dots-${label})`} />
                </svg>
              </div>
              <div className="relative w-8 h-8 rounded-lg bg-[#E1FF6C]/10 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-[#E1FF6C]/40" />
              </div>
              <span className="relative text-xs font-medium text-white/60">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-white/25 mt-2">Dot pattern with radial fade</p>
      </div>
    </div>
  );
}
