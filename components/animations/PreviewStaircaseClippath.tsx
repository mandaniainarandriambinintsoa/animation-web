"use client";

import { useCallback, useRef, useState } from "react";

const W = 600;
const H = 280;

const greenPath =
  "M0,220L30,220Q40,220,40,210L40,170Q40,160,50,160L180,160Q190,160,190,145L230,135Q240,120,250,120L290,110Q300,95,310,95L420,85Q430,70,440,70L460,60Q470,45,480,45L520,35Q530,20,540,20L600,20";
const orangePath =
  "M0,270L60,270Q70,270,70,260L70,250Q70,240,80,240L110,235Q120,225,130,225L150,215Q160,200,170,200L190,190Q200,175,210,175L290,165Q300,150,310,150L420,140Q430,100,440,100L480,85Q490,100,500,100L540,110Q550,95,560,95L600,95";

function getYatX(pathD: string, x: number): number {
  if (typeof document === "undefined") return 200;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", pathD);
  svg.appendChild(p);
  document.body.appendChild(svg);
  const len = p.getTotalLength();
  let lo = 0,
    hi = len;
  for (let i = 0; i < 25; i++) {
    const mid = (lo + hi) / 2;
    if (p.getPointAtLength(mid).x < x) lo = mid;
    else hi = mid;
  }
  const pt = p.getPointAtLength((lo + hi) / 2);
  document.body.removeChild(svg);
  return pt.y;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function PreviewStaircaseClippath() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const [clipX, setClipX] = useState(40);
  const [greenY, setGreenY] = useState(220);
  const [orangeY, setOrangeY] = useState(270);
  const [scores, setScores] = useState({ a: "5.0", b: "4.5" });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = ref.current!.getBoundingClientRect();
      const svgX = Math.max(20, Math.min(((e.clientX - rect.left) / rect.width) * W, W - 10));
      setClipX(svgX);
      setGreenY(getYatX(greenPath, svgX));
      setOrangeY(getYatX(orangePath, svgX));
      const t = (svgX - 20) / (W - 30);
      setScores({
        a: lerp(5.0, 5.9, t).toFixed(1),
        b: lerp(4.5, 5.7, t).toFixed(1),
      });
    });
  }, []);

  const onLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setClipX(40);
    setGreenY(220);
    setOrangeY(270);
    setScores({ a: "5.0", b: "4.5" });
  }, []);

  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center rounded-2xl bg-[#0d0d0d]">
      {/* Title */}
      <div className="mb-4 text-center">
        <h3 className="text-white text-lg font-semibold">Staircase Chart</h3>
        <p className="text-[#737373] text-xs mt-1">Survolez le graphe pour reveler</p>
      </div>

      {/* Chart */}
      <div
        ref={ref}
        className="relative w-[90%] max-w-[560px] cursor-crosshair"
        style={{ height: H }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <defs>
            <clipPath id="staircase-clip-l">
              <rect x="0" y="-10" width={clipX} height={H + 20} />
            </clipPath>
            <clipPath id="staircase-clip-r">
              <rect x={clipX} y="-10" width={W - clipX} height={H + 20} />
            </clipPath>
          </defs>
          {/* Green line */}
          <path d={greenPath} fill="none" stroke="#7aff78" strokeWidth="2.5" clipPath="url(#staircase-clip-l)" />
          <path d={greenPath} fill="none" stroke="#1a1a1a" strokeWidth="2" clipPath="url(#staircase-clip-r)" />
          {/* Orange line */}
          <path d={orangePath} fill="none" stroke="#fdac53" strokeWidth="2.5" opacity="0.85" clipPath="url(#staircase-clip-l)" />
          <path d={orangePath} fill="none" stroke="#1a1a1a" strokeWidth="2" clipPath="url(#staircase-clip-r)" />
          {/* Dots */}
          <circle cx={clipX} cy={greenY} r="5" fill="#7aff78" />
          <circle cx={clipX} cy={orangeY} r="5" fill="#fdac53" />
          {/* Vertical line */}
          <line x1={clipX} y1="0" x2={clipX} y2={H} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* Tooltip */}
        <div
          className="absolute pointer-events-none bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm"
          style={{
            left: `${(clipX / W) * 100}%`,
            top: `${((greenY - 100) / H) * 100}%`,
            transform: clipX > W / 2 ? "translateX(-110%)" : "translateX(10%)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#7aff78]" />
            <span className="text-white font-semibold">Score A: {scores.a}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#fdac53]" />
            <span className="text-white/70">Score B: {scores.b}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
