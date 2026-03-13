"use client";

export default function PreviewGridPattern() {
  const size = 48;
  const strokeColor = "rgba(255,255,255,0.06)";
  const highlightColor = "rgba(225,255,108,0.04)";
  const highlightCells: [number, number][] = [
    [1, 2], [2, 3], [3, 4], [2, 5], [4, 2], [1, 6], [5, 5], [3, 1],
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#050505] overflow-hidden">
      {/* Grid pattern SVG */}
      <div className="pointer-events-none absolute inset-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="preview-grid" width={size} height={size} patternUnits="userSpaceOnUse">
              <path
                d={`M ${size} 0 L 0 0 0 ${size}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={1}
              />
            </pattern>
            <radialGradient id="preview-grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="preview-grid-fade-mask">
              <rect width="100%" height="100%" fill="url(#preview-grid-fade)" />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#preview-grid)"
            mask="url(#preview-grid-fade-mask)"
          />

          {highlightCells.map(([row, col], i) => (
            <rect
              key={i}
              x={col * size + 0.5}
              y={row * size + 0.5}
              width={size - 1}
              height={size - 1}
              fill={highlightColor}
              rx={2}
            />
          ))}
        </svg>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
          <div className="w-2 h-2 rounded-full bg-[#E1FF6C] animate-pulse" />
          <span className="text-xs text-white/50 font-medium">Grid Pattern</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Background Pattern</h3>
        <p className="text-sm text-white/30 max-w-xs">
          SVG-based repeating grid with highlighted cells and radial fade
        </p>
      </div>
    </div>
  );
}
