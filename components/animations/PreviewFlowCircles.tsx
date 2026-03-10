"use client";

const TOP_FAR_LEFT =
  "M 1 0 L 1 30 C 1 40 8 47 18 47 L 150 47 C 160 47 167 54 167 64 L 167 100";
const TOP_CENTER_LEFT =
  "M 1 0 L 1 20 C 1 30 8 37 18 37 L 50 37 C 60 37 67 44 67 54 L 67 100";
const TOP_CENTER_RIGHT =
  "M 66 0 L 66 20 C 66 30 59 37 49 37 L 18 37 C 8 37 1 44 1 54 L 1 100";
const TOP_FAR_RIGHT =
  "M 166 0 L 166 30 C 166 40 159 47 149 47 L 18 47 C 8 47 1 54 1 64 L 1 100";

const BOTTOM_FAR_LEFT =
  "M 166 0 L 166 20 C 166 30 159 37 149 37 L 18 37 C 8 37 1 44 1 54 L 1 100";
const BOTTOM_CENTER_LEFT =
  "M 66 0 L 66 35 C 66 45 59 52 49 52 L 18 52 C 8 52 1 59 1 69 L 1 100";
const BOTTOM_CENTER_RIGHT =
  "M 1 0 L 1 35 C 1 45 8 52 18 52 L 49 52 C 59 52 66 59 66 69 L 66 100";
const BOTTOM_FAR_RIGHT =
  "M 1 0 L 1 20 C 1 30 8 37 18 37 L 149 37 C 159 37 166 44 166 54 L 166 100";

function FlowLineWithCircle({
  viewBox,
  d,
  pathId,
  delay = "0s",
}: {
  viewBox: string;
  d: string;
  pathId: string;
  delay?: string;
}) {
  return (
    <svg viewBox={viewBox} fill="none" className="w-full h-full">
      <path d={d} stroke="rgba(221,217,209,0.15)" strokeWidth="1" fill="none" />
      <path
        d={d}
        stroke="rgb(138,132,114)"
        strokeWidth="1"
        fill="none"
        pathLength={100}
        strokeDasharray="30 100"
        strokeDashoffset="30"
        className="animate-flow"
      />
      <path id={pathId} d={d} fill="none" stroke="none" />
      <circle r="3" fill="#E1FF6C">
        <animateMotion dur="3s" repeatCount="indefinite" begin={delay} calcMode="linear">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </svg>
  );
}

function ToolCard({ icon }: { icon: string }) {
  return (
    <div className="w-[48px] h-[48px] rounded-lg bg-white border border-[rgba(0,0,0,0.08)] shadow-sm flex items-center justify-center">
      <span className="text-sm font-bold text-[#333]">{icon}</span>
    </div>
  );
}

export default function PreviewFlowCircles() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center rounded-2xl bg-[#FFFCF5]">
      <div className="flex flex-col items-center">
        {/* Top tools */}
        <div className="flex items-center gap-[72px]">
          {["W", "bw", "in", "A"].map((icon) => (
            <ToolCard key={icon} icon={icon} />
          ))}
        </div>

        {/* Top lines with circles */}
        <div className="relative" style={{ width: 340, height: 100 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 168, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 168 100" d={TOP_FAR_LEFT} pathId="fc-tfl" delay="0s" />
          </div>
          <div className="absolute" style={{ left: 86, top: 0, width: 68, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 68 100" d={TOP_CENTER_LEFT} pathId="fc-tcl" delay="0.5s" />
          </div>
          <div className="absolute" style={{ left: 186, top: 0, width: 68, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 68 100" d={TOP_CENTER_RIGHT} pathId="fc-tcr" delay="1s" />
          </div>
          <div className="absolute" style={{ left: 172, top: 0, width: 168, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 168 100" d={TOP_FAR_RIGHT} pathId="fc-tfr" delay="1.5s" />
          </div>
        </div>

        {/* Hub */}
        <div className="w-[50px] h-[50px] rounded-xl bg-[#E1FF6C] flex items-center justify-center shadow-md">
          <span className="text-xl font-black text-[#222] select-none">&#8976;</span>
        </div>

        {/* Bottom lines with circles */}
        <div className="relative" style={{ width: 340, height: 100 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 168, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 168 100" d={BOTTOM_FAR_LEFT} pathId="fc-bfl" delay="3s" />
          </div>
          <div className="absolute" style={{ left: 86, top: 0, width: 68, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 68 100" d={BOTTOM_CENTER_LEFT} pathId="fc-bcl" delay="3.5s" />
          </div>
          <div className="absolute" style={{ left: 186, top: 0, width: 68, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 68 100" d={BOTTOM_CENTER_RIGHT} pathId="fc-bcr" delay="4s" />
          </div>
          <div className="absolute" style={{ left: 172, top: 0, width: 168, height: 100 }}>
            <FlowLineWithCircle viewBox="0 0 168 100" d={BOTTOM_FAR_RIGHT} pathId="fc-bfr" delay="4.5s" />
          </div>
        </div>

        {/* Bottom tools */}
        <div className="flex items-center gap-[72px]">
          {["p", "sf", "#", "hs"].map((icon) => (
            <ToolCard key={icon} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
