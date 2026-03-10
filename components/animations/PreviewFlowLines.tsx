"use client";

const lines = [
  { viewBox: "0 0 200 120", d: "M 100 0 L 100 40 Q 100 60 80 60 L 20 60 Q 0 60 0 80 L 0 120", delay: "0s" },
  { viewBox: "0 0 100 120", d: "M 50 0 L 50 40 Q 50 60 30 60 L 10 60 Q 0 60 0 80 L 0 120", delay: "0.3s" },
  { viewBox: "0 0 100 120", d: "M 50 0 L 50 40 Q 50 60 70 60 L 90 60 Q 100 60 100 80 L 100 120", delay: "0.6s" },
  { viewBox: "0 0 200 120", d: "M 100 0 L 100 40 Q 100 60 120 60 L 180 60 Q 200 60 200 80 L 200 120", delay: "0.9s" },
];

export default function PreviewFlowLines() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#FFFCF5]">
      <div className="relative w-[400px] h-[280px]">
        {/* Top row — 4 cards */}
        <div className="flex justify-between px-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-[70px] h-[50px] rounded-lg bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center">
              <div className="w-6 h-6 rounded bg-[#f0efe8]" />
            </div>
          ))}
        </div>

        {/* Lines */}
        <div className="relative h-[120px] mx-auto" style={{ width: "360px" }}>
          {lines.map((line, i) => (
            <svg
              key={i}
              viewBox={line.viewBox}
              fill="none"
              className="absolute top-0"
              style={{
                width: `${parseInt(line.viewBox.split(" ")[2])}px`,
                height: "120px",
                left: `${i * 90}px`,
              }}
            >
              <path d={line.d} stroke="rgba(221,217,209,0.3)" strokeWidth="1" />
              <path
                d={line.d}
                stroke="rgb(138,132,114)"
                strokeWidth="1"
                pathLength={100}
                strokeDasharray="30 100"
                strokeDashoffset="30"
                className="animate-flow"
                style={{ animationDelay: line.delay }}
              />
            </svg>
          ))}
        </div>

        {/* Hub center */}
        <div className="flex justify-center">
          <div className="w-[60px] h-[60px] rounded-xl bg-[#2d6a30] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" fill="white" />
            </svg>
          </div>
        </div>

        {/* Bottom row — 4 cards */}
        <div className="relative h-[120px] mx-auto" style={{ width: "360px" }}>
          {lines.map((line, i) => (
            <svg
              key={i}
              viewBox={line.viewBox}
              fill="none"
              className="absolute top-0"
              style={{
                width: `${parseInt(line.viewBox.split(" ")[2])}px`,
                height: "120px",
                left: `${i * 90}px`,
                transform: "scaleY(-1)",
              }}
            >
              <path d={line.d} stroke="rgba(221,217,209,0.3)" strokeWidth="1" />
              <path
                d={line.d}
                stroke="rgb(138,132,114)"
                strokeWidth="1"
                pathLength={100}
                strokeDasharray="30 100"
                strokeDashoffset="30"
                className="animate-flow"
                style={{ animationDelay: `${parseFloat(line.delay) + 1.5}s` }}
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
