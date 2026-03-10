"use client";

const MOTION_PATH = "M 10 20 L 120 20 C 135 20 145 35 145 50 L 145 110 C 145 125 155 140 170 140 L 310 140 C 325 140 335 125 335 110 L 335 50 C 335 35 345 20 360 20 L 490 20";

export default function PreviewSCurve() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#FFFCF5]">
      <div className="relative" style={{ width: "500px", height: "200px" }}>
        {/* Step cards */}
        {["Audit", "Design", "Build", "Ship"].map((label, i) => (
          <div
            key={i}
            className="absolute top-0 flex flex-col items-center gap-2"
            style={{ left: `${10 + i * 130}px` }}
          >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#888] bg-[#E1FF6C] px-2 py-1 rounded">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold text-[#222]">{label}</span>
          </div>
        ))}

        {/* S-curve path */}
        <svg
          viewBox="0 0 500 160"
          fill="none"
          className="absolute"
          style={{ top: "60px", width: "500px", height: "160px" }}
        >
          <path d={MOTION_PATH} stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        </svg>

        {/* Animated arrow */}
        <svg
          viewBox="0 0 500 160"
          fill="none"
          overflow="visible"
          className="absolute pointer-events-none"
          style={{ top: "60px", width: "500px", height: "160px" }}
        >
          <defs>
            <path id="demo-s-path" d={MOTION_PATH} />
          </defs>
          <g>
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href="#demo-s-path" />
            </animateMotion>
            <polygon points="-4,3.5 4,0 -4,-3.5" fill="#333" />
          </g>
        </svg>
      </div>
    </div>
  );
}
