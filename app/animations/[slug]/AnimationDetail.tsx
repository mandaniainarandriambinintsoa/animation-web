"use client";

import dynamic from "next/dynamic";
import CopyButton from "@/components/ui/CopyButton";

const Preview3DTilt = dynamic(() => import("@/components/animations/Preview3DTilt"), { ssr: false });
const PreviewPathDraw = dynamic(() => import("@/components/animations/PreviewPathDraw"), { ssr: false });
const PreviewFlowLines = dynamic(() => import("@/components/animations/PreviewFlowLines"), { ssr: false });
const PreviewFlowCircles = dynamic(() => import("@/components/animations/PreviewFlowCircles"), { ssr: false });
const PreviewBorderSpin = dynamic(() => import("@/components/animations/PreviewBorderSpin"), { ssr: false });
const PreviewMarquee = dynamic(() => import("@/components/animations/PreviewMarquee"), { ssr: false });
const PreviewCharSpin = dynamic(() => import("@/components/animations/PreviewCharSpin"), { ssr: false });
const PreviewSCurve = dynamic(() => import("@/components/animations/PreviewSCurve"), { ssr: false });
const PreviewScrollArcs = dynamic(() => import("@/components/animations/PreviewScrollArcs"), { ssr: false });
const PreviewAntiGridTabs = dynamic(() => import("@/components/animations/PreviewAntiGridTabs"), { ssr: false });
const PreviewEyeTracking = dynamic(() => import("@/components/animations/PreviewEyeTracking"), { ssr: false });
const PreviewAntiGridBento = dynamic(() => import("@/components/animations/PreviewAntiGridBento"), { ssr: false });
const PreviewCardCarousel = dynamic(() => import("@/components/animations/PreviewCardCarousel"), { ssr: false });

const previews: Record<string, React.ComponentType> = {
  "3d-tilt": Preview3DTilt,
  "path-draw": PreviewPathDraw,
  "flow-lines": PreviewFlowLines,
  "flow-circles": PreviewFlowCircles,
  "border-spin": PreviewBorderSpin,
  "marquee": PreviewMarquee,
  "char-spin": PreviewCharSpin,
  "s-curve-arrow": PreviewSCurve,
  "scroll-arcs": PreviewScrollArcs,
  "anti-grid-tabs": PreviewAntiGridTabs,
  "eye-tracking": PreviewEyeTracking,
  "anti-grid-bento": PreviewAntiGridBento,
  "card-carousel": PreviewCardCarousel,
};

const codeSnippets: Record<string, string> = {
  "3d-tilt": `"use client";
import { useCallback, useRef, useState } from "react";

export default function HeroTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)"
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 12;
    const rotateX = ((rect.height / 2 - (e.clientY - rect.top)) / (rect.height / 2)) * 12;
    setTransform(\`perspective(800px) rotateX(\${rotateX.toFixed(2)}deg) rotateY(\${rotateY.toFixed(2)}deg)\`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  }, []);

  return (
    <section ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="w-full min-h-screen flex items-center justify-center">
      <div style={{ transformStyle: "preserve-3d", transform, transition: "transform 0.1s ease-out" }}>
        {/* Vos elements ici — chaque enfant avec translateZ() pour la profondeur */}
      </div>
    </section>
  );
}`,

  "path-draw": `"use client";
import { useEffect, useRef, useState } from "react";

export default function PathDraw({ path, viewBox }: { path: string; viewBox: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <svg viewBox={viewBox} fill="none">
        <path d={path} stroke="currentColor" strokeWidth="2"
          pathLength={1} strokeDasharray="1 1"
          strokeDashoffset={visible ? "0" : "1"}
          style={{ transition: "stroke-dashoffset 2s ease-out" }} />
      </svg>
    </div>
  );
}`,

  "flow-lines": `/* CSS requis dans globals.css */
@keyframes flow {
  from { stroke-dashoffset: 130; }
  to { stroke-dashoffset: 0; }
}
.animate-flow { animation: flow 3s linear infinite; }

/* JSX */
<svg viewBox={viewBox} fill="none">
  {/* Fond statique */}
  <path d={d} stroke="rgba(221,217,209,0.15)" strokeWidth="1" />
  {/* Dash anime */}
  <path d={d} stroke="rgb(138,132,114)" strokeWidth="1"
    pathLength={100} strokeDasharray="30 100" strokeDashoffset="30"
    className="animate-flow" />
</svg>`,

  "flow-circles": `<svg viewBox={viewBox} fill="none">
  <path d={d} stroke="rgba(221,217,209,0.15)" strokeWidth="1" />
  <path id={pathId} d={d} fill="none" stroke="none" />
  <circle r="4" fill="#E1FF6C">
    <animateMotion dur="3s" repeatCount="indefinite" begin={delay} calcMode="linear">
      <mpath href={\`#\${pathId}\`} />
    </animateMotion>
  </circle>
</svg>`,

  "s-curve-arrow": `<svg viewBox="0 0 500 160" overflow="visible">
  <defs><path id="s-path" d={motionPath} /></defs>
  <g>
    <animateMotion dur="20s" repeatCount="indefinite" rotate="auto"
      keyPoints="0;1" keyTimes="0;1"
      calcMode="spline" keySplines="0.42 0 0.58 1">
      <mpath href="#s-path" />
    </animateMotion>
    <polygon points="-4.5,4 4.5,0 -4.5,-4" fill="currentColor" />
  </g>
</svg>`,

  "border-spin": `/* CSS requis */
@property --border-angle {
  syntax: "<angle>"; initial-value: 0deg; inherits: false;
}
@keyframes border-spin { to { --border-angle: 360deg; } }
.animate-border-spin { animation: border-spin 2s linear infinite; }

/* JSX */
<div className="group">
  <div className="relative rounded-[14px] p-[2px] animate-border-spin"
    style={{ background: "conic-gradient(from var(--border-angle), transparent 30%, #888 50%, #E1FF6C 70%, transparent 90%)" }}>
    {/* Masque au repos */}
    <div className="absolute inset-0 rounded-[14px] bg-white transition-opacity group-hover:opacity-0" />
    {/* Contenu */}
    <div className="relative rounded-[13px] bg-white p-6">...</div>
  </div>
</div>`,

  "marquee": `/* CSS requis */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee-scroll 30s linear infinite; }

/* JSX — dupliquer les items pour le loop */
const doubled = [...items, ...items];
<div className="overflow-hidden">
  <div className="flex gap-4 animate-marquee"
    style={{ width: \`\${doubled.length * ITEM_WIDTH}px\` }}>
    {doubled.map((item, i) => <div key={i}>...</div>)}
  </div>
</div>`,

  "char-spin": `/* CSS requis */
@keyframes charSpin {
  0% { transform: rotateY(90deg); opacity: 0; }
  100% { transform: rotateY(0deg); opacity: 1; }
}

/* JSX — changer key pour re-trigger */
<span style={{ perspective: "500px" }}>
  {text.split("").map((char, i) => (
    <span key={\`\${animKey}-\${i}\`} className="inline-block"
      style={{
        animation: "charSpin 400ms ease-out forwards",
        animationDelay: \`\${i * 20}ms\`,
        opacity: 0,
      }}>
      {char === " " ? "\\u00A0" : char}
    </span>
  ))}
</span>`,

  "scroll-arcs": `"use client";
// Rotation pilotee par le scroll via requestAnimationFrame
useEffect(() => {
  let raf: number;
  const loop = () => {
    const rect = el.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
    ));
    const angle = startAngle + (endAngle - startAngle) * progress;
    setRotation(angle);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}, []);

// Chaque arc avec son offset
<img src={arcSvg} style={{ transform: \`rotate(\${rotation + offset}deg)\` }} />`,

  "anti-grid-tabs": `{/* Technique concave: borderRadius + boxShadow */}
{isActive && (
  <div className="absolute" style={{ top: TAB_HEIGHT, left: 0, width: "100%", height: GAP }}>
    <div className="w-full h-full bg-[#0d0d0d]" />
    {/* Concave gauche */}
    <div className="absolute overflow-hidden"
      style={{ left: "1.6px", bottom: 0, transform: "translateX(-100%)", width: 32, height: 32 }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "0 0 32px 0", boxShadow: "0 0 0 32px #0d0d0d" }} />
    </div>
    {/* Concave droite */}
    <div className="absolute overflow-hidden"
      style={{ right: "1.6px", bottom: 0, transform: "translateX(100%)", width: 32, height: 32 }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "0 0 0 32px", boxShadow: "0 0 0 32px #0d0d0d" }} />
    </div>
  </div>
)}

{/* Content card — border-radius dynamique selon activeIdx */}
<div style={{
  borderTopLeftRadius: activeIdx === 0 ? 0 : 42,
  borderTopRightRadius: activeIdx === lastIdx ? 0 : 42,
  borderBottomLeftRadius: 42, borderBottomRightRadius: 42,
}}>...</div>`,

  "eye-tracking": `"use client";
import { useCallback, useRef } from "react";

export default function EyeTrackingTilt() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyeRefs = useRef<(HTMLDivElement | null)[][]>([]);

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
      const amp = 30;

      // Tilt 3D
      const rotateY = ((mouseX - elCX) / (sRect.width / 2)) * amp;
      const rotateX = ((elCY - mouseY) / (sRect.height / 2)) * amp;
      const tx = ((mouseX - elCX) / sRect.width) * amp * 3;
      const ty = ((mouseY - elCY) / sRect.height) * amp * 3;
      el.style.transform = \`perspective(800px) translate(\${tx}px, \${ty}px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

      // Yeux suivent le curseur
      eyeRefs.current[i]?.forEach((pupil) => {
        if (!pupil) return;
        const eyeRect = pupil.parentElement!.getBoundingClientRect();
        const dx = e.clientX - (eyeRect.left + eyeRect.width / 2);
        const dy = e.clientY - (eyeRect.top + eyeRect.height / 2);
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 20) / 4;
        pupil.style.transform = \`translate(\${Math.cos(angle) * dist}px, \${Math.sin(angle) * dist}px)\`;
      });
    });
  }, []);

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove}>
      {/* Cards avec yeux: <div style={{ background: color, borderRadius: 16 }}> */}
      {/* Yeux: <div style={{ width: 18, height: 18, borderRadius: "50%", bg: "#fff" }}> */}
      {/* Pupille: <div ref={...} style={{ width: 8, height: 8, borderRadius: "50%", bg: "#1a1a2e" }}> */}
    </section>
  );
}`,

  "anti-grid-bento": `/* Anti-Grid Bento — Connected cards with concave curves */

/* 1. Grid layout: 4 cols, defined rows, gap creates space for bridges */
<div className="grid gap-[28px]" style={{
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "700px 252px 252px",
}}>

  {/* Hero card — selective border-radius: connected corner = 0 */}
  <div style={{
    gridColumn: "1 / -1",
    borderRadius: "42px 42px 42px 0px", /* bottom-left = 0 (connected) */
    border: "1.6px solid #161616",
    backgroundColor: "#0d0d0d",
  }}>...</div>

  {/* Chart card — connected to hero above */}
  <div style={{
    gridColumn: "1 / span 3",
    gridRow: "2 / span 2",
    borderRadius: "0px 0px 42px 42px", /* top corners = 0 (connected) */
  }}>...</div>

  {/* Feature cards — standalone, full radius */}
  <div style={{ borderRadius: 42 }}>...</div>
</div>

/* 2. Bridge: fills the gap between connected cards */
<div className="pointer-events-none relative z-10"
  style={{ gridColumn: "1 / span 3", gridRow: "2 / span 2" }}>
  <div className="absolute bg-[#0d0d0d]"
    style={{ top: -32, left: -2, width: "calc(100% + 4px)", height: 34 }} />
</div>

/* 3. Concave curve: clipPath triangle + oversized circle */
function AntiGridCurve({ rotate = "0deg" }) {
  return (
    <div style={{
      width: 64, height: 64,
      clipPath: "polygon(0 100%, 100% 0, 0 0)",
      rotate,
    }}>
      {/* Background fill */}
      <div style={{ width: 66, height: 66, backgroundColor: "#0d0d0d" }} />
      {/* Circle creates the concave illusion */}
      <div className="absolute inset-0 rounded-full" style={{
        width: 134.5, height: 134.5,
        backgroundColor: "#020202",
        border: "1.6px solid #161616",
      }} />
    </div>
  );
}`,

  "card-carousel": `"use client";
// Carousel horizontal avec differents effets hover par card

// Fan spread: -space-x-[16px] -> group-hover:-space-x-[24px]
<div className="flex -space-x-[16px] group-hover:-space-x-[24px] transition-all duration-300">
  {images.map((img, i) => <div key={i} className="w-9 h-12 rounded-lg" style={{ background: img.color }} />)}
</div>

// Stack shift: group-hover:scale-110 / group-hover:translate-x-{n}
<div className="relative">
  {images.map((img, i) => (
    <div key={i} className={\`absolute inset-0 transition-all duration-300 \${hoverClasses[i]}\`} />
  ))}
</div>

// 3D Fade: perspective + rotateX/Y au mousemove + crossfade opacity
const rotateY = ((x - centerX) / centerX) * 12;
const rotateX = ((centerY - y) / centerY) * 12;
<div style={{ transform: \`perspective(800px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\` }} />
<div className="z-10 group-hover:opacity-0 transition-opacity duration-500" />

// Colorize: crossfade 2 elements
<div className="z-12 group-hover:opacity-0 transition-all duration-300" />
<div className="z-13 opacity-0 group-hover:opacity-100 transition-all duration-300" />

// Camera pan: translateX au hover
<div className="flex transition-all duration-300 group-hover:-translate-x-[60px]">
  {images.map((img, i) => <div key={i} className="w-16 h-16 rounded-lg shrink-0" />)}
</div>`,
};

export default function AnimationDetail({ slug }: { slug: string }) {
  const PreviewComponent = previews[slug];
  const code = codeSnippets[slug] || "// Code a venir...";

  return (
    <div className="space-y-8">
      {/* Preview live */}
      <div>
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">Preview live</h2>
        <div className="rounded-2xl border border-border overflow-hidden">
          {PreviewComponent ? <PreviewComponent /> : (
            <div className="w-full h-[400px] flex items-center justify-center bg-surface text-muted">
              Preview bientot disponible
            </div>
          )}
        </div>
      </div>

      {/* Code */}
      <div>
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">Code</h2>
        <div className="relative rounded-2xl border border-border bg-[#0a0a0a] overflow-hidden">
          <CopyButton text={code} />
          <pre className="p-6 pt-12 overflow-x-auto text-sm leading-relaxed">
            <code className="text-white/70 font-mono">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
