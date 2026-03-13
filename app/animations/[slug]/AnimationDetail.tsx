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
const PreviewStaircaseClippath = dynamic(() => import("@/components/animations/PreviewStaircaseClippath"), { ssr: false });
const PreviewBook3DTilt = dynamic(() => import("@/components/animations/PreviewBook3DTilt"), { ssr: false });
const PreviewSpotlightCard = dynamic(() => import("@/components/animations/PreviewSpotlightCard"), { ssr: false });
const PreviewMagneticText = dynamic(() => import("@/components/animations/PreviewMagneticText"), { ssr: false });
const PreviewTextHighlighter = dynamic(() => import("@/components/animations/PreviewTextHighlighter"), { ssr: false });
const PreviewFluidTabs = dynamic(() => import("@/components/animations/PreviewFluidTabs"), { ssr: false });
const PreviewSparkles = dynamic(() => import("@/components/animations/PreviewSparkles"), { ssr: false });
const PreviewColorSwapper = dynamic(() => import("@/components/animations/PreviewColorSwapper"), { ssr: false });
const PreviewSpotlightTabs = dynamic(() => import("@/components/animations/PreviewSpotlightTabs"), { ssr: false });
const PreviewStarGrid = dynamic(() => import("@/components/animations/PreviewStarGrid"), { ssr: false });
const PreviewGlobe3D = dynamic(() => import("@/components/animations/PreviewGlobe3D"), { ssr: false });
const PreviewAccordionDetails = dynamic(() => import("@/components/animations/PreviewAccordionDetails"), { ssr: false });
const PreviewTextRevealScroll = dynamic(() => import("@/components/animations/PreviewTextRevealScroll"), { ssr: false });
const PreviewMotionText = dynamic(() => import("@/components/animations/PreviewMotionText"), { ssr: false });
const PreviewStickyScroll = dynamic(() => import("@/components/animations/PreviewStickyScroll"), { ssr: false });
const PreviewScrollReveal = dynamic(() => import("@/components/animations/PreviewScrollReveal"), { ssr: false });
const PreviewVerticalTabs = dynamic(() => import("@/components/animations/PreviewVerticalTabs"), { ssr: false });
const PreviewSpotlightButton = dynamic(() => import("@/components/animations/PreviewSpotlightButton"), { ssr: false });
const PreviewGridPattern = dynamic(() => import("@/components/animations/PreviewGridPattern"), { ssr: false });
const PreviewDotPattern = dynamic(() => import("@/components/animations/PreviewDotPattern"), { ssr: false });
const PreviewAuroraBackground = dynamic(() => import("@/components/animations/PreviewAuroraBackground"), { ssr: false });
const PreviewMeteors = dynamic(() => import("@/components/animations/PreviewMeteors"), { ssr: false });
const PreviewFlipWords = dynamic(() => import("@/components/animations/PreviewFlipWords"), { ssr: false });
const PreviewTypewriter = dynamic(() => import("@/components/animations/PreviewTypewriter"), { ssr: false });
const PreviewNumberTicker = dynamic(() => import("@/components/animations/PreviewNumberTicker"), { ssr: false });
const PreviewBorderBeam = dynamic(() => import("@/components/animations/PreviewBorderBeam"), { ssr: false });
const PreviewWobbleCard = dynamic(() => import("@/components/animations/PreviewWobbleCard"), { ssr: false });
const PreviewMorphingText = dynamic(() => import("@/components/animations/PreviewMorphingText"), { ssr: false });
const PreviewConfetti = dynamic(() => import("@/components/animations/PreviewConfetti"), { ssr: false });
const PreviewBlobCursor = dynamic(() => import("@/components/animations/PreviewBlobCursor"), { ssr: false });
const PreviewTextPressure = dynamic(() => import("@/components/animations/PreviewTextPressure"), { ssr: false });
const PreviewBlurText = dynamic(() => import("@/components/animations/PreviewBlurText"), { ssr: false });
const PreviewSplitText = dynamic(() => import("@/components/animations/PreviewSplitText"), { ssr: false });
const PreviewShinyText = dynamic(() => import("@/components/animations/PreviewShinyText"), { ssr: false });
const PreviewGlitchText = dynamic(() => import("@/components/animations/PreviewGlitchText"), { ssr: false });

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
  "staircase-clippath": PreviewStaircaseClippath,
  "book-3d-tilt": PreviewBook3DTilt,
  "spotlight-card": PreviewSpotlightCard,
  "magnetic-text": PreviewMagneticText,
  "text-highlighter": PreviewTextHighlighter,
  "fluid-tabs": PreviewFluidTabs,
  "sparkles": PreviewSparkles,
  "color-swapper": PreviewColorSwapper,
  "spotlight-tabs": PreviewSpotlightTabs,
  "star-grid": PreviewStarGrid,
  "globe-3d": PreviewGlobe3D,
  "accordion-details": PreviewAccordionDetails,
  "text-reveal-scroll": PreviewTextRevealScroll,
  "motion-text": PreviewMotionText,
  "sticky-scroll": PreviewStickyScroll,
  "scroll-reveal": PreviewScrollReveal,
  "vertical-tabs": PreviewVerticalTabs,
  "spotlight-button": PreviewSpotlightButton,
  "grid-pattern": PreviewGridPattern,
  "dot-pattern": PreviewDotPattern,
  "aurora-background": PreviewAuroraBackground,
  "meteors": PreviewMeteors,
  "flip-words": PreviewFlipWords,
  "typewriter": PreviewTypewriter,
  "number-ticker": PreviewNumberTicker,
  "border-beam": PreviewBorderBeam,
  "wobble-card": PreviewWobbleCard,
  "morphing-text": PreviewMorphingText,
  "confetti": PreviewConfetti,
  "blob-cursor": PreviewBlobCursor,
  "text-pressure": PreviewTextPressure,
  "blur-text": PreviewBlurText,
  "split-text": PreviewSplitText,
  "shiny-text": PreviewShinyText,
  "glitch-text": PreviewGlitchText,
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

  "staircase-clippath": `"use client";
import { useCallback, useRef, useState } from "react";

// Graphe en escalier avec clipPath interactif
// Le curseur revele progressivement les lignes colorees

const greenPath = "M0,247.5L37.72,247.5...L830,0";
const orangePath = "M0,330L75.44,330...L830,55";

function getYatX(pathD: string, x: number): number {
  // Binary search sur le path SVG pour trouver Y a un X donne
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", pathD);
  // ... binary search sur p.getPointAtLength()
}

// ClipPath = rectangle de 0 a mouseX
<svg viewBox="0 0 830 340">
  <clipPath id="reveal"><rect x={0} y={0} width={mouseX} height={H} /></clipPath>
  <path d={greenPath} stroke="rgba(0,255,0,0.15)" /> {/* fond */}
  <g clipPath="url(#reveal)">
    <path d={greenPath} stroke="#4ade80" strokeWidth={3} />
  </g>
</svg>`,

  "book-3d-tilt": `"use client";
import { useCallback, useRef } from "react";

// Livre 3D qui tilt au mousemove avec ombre dynamique
export default function Book3DTilt({ imageSrc, title, subtitle }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 14; // amplitudeX
    const rotateY = x * 20;  // amplitudeY
    el.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

    // Ombre dynamique qui suit le curseur
    const shadowX = -x * 40;
    const shadowY = -y * 40;
    el.style.boxShadow = \`\${shadowX}px \${shadowY}px 60px rgba(0,0,0,0.8)\`;
  }, []);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.1s, box-shadow 0.3s" }}>
      <img src={imageSrc} />
      <div>{title}</div>
      <p>{subtitle}</p>
    </div>
  );
}`,

  "spotlight-card": `"use client";
import { useCallback, useRef } from "react";

// Card avec spotlight radial qui suit le curseur
export default function SpotlightCard({ children, spotlightColor = "rgba(255,255,255,0.08)" }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = \`radial-gradient(350px circle at \${x}px \${y}px, \${spotlightColor}, transparent 80%)\`;
  }, []);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => {
      if (cardRef.current) cardRef.current.style.background = "transparent";
    }}>
      {children}
    </div>
  );
}`,

  "magnetic-text": `"use client";
import { useRef, useEffect } from "react";

// Chaque lettre reagit au curseur — font-weight + couleur magnetique
export default function MagneticText({ text = "Magnetic" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const letters = containerRef.current?.querySelectorAll("span");
      letters?.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
        const maxDist = 200;
        const t = Math.max(0, 1 - dist / maxDist);

        // Interpoler font-weight (100-900) et couleur
        span.style.fontWeight = String(100 + Math.round(t * 800));
        const r = Math.round(255 + t * (225 - 255));
        const g = Math.round(255 + t * (255 - 255));
        const b = Math.round(255 + t * (108 - 255));
        span.style.color = \`rgb(\${r},\${g},\${b})\`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef}>
      {text.split("").map((char, i) => <span key={i}>{char}</span>)}
    </div>
  );
}`,

  "text-highlighter": `"use client";
import { useRef, useEffect, useState } from "react";

// Texte qui se surligne mot par mot au scroll
export default function TextHighlighter({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ overflowY: "auto" }}>
      {words.map((word, i) => {
        const wordProgress = i / words.length;
        const opacity = wordProgress < progress ? 1 : 0.15;
        return <span key={i} style={{ color: \`rgba(255,255,255,\${opacity})\`, transition: "color 0.3s" }}>{word} </span>;
      })}
    </div>
  );
}`,

  "fluid-tabs": `"use client";
import { useRef, useState, useEffect } from "react";

// Tabs avec indicateur glissant (underline ou pill)
export default function FluidTabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      const parent = el.parentElement!.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicator({ left: rect.left - parent.left, width: rect.width });
    }
  }, [active]);

  return (
    <div className="relative">
      {tabs.map((tab, i) => (
        <button key={i} ref={el => { tabRefs.current[i] = el; }}
          onClick={() => setActive(i)}>{tab}</button>
      ))}
      {/* Indicateur glissant */}
      <div style={{
        position: "absolute", bottom: 0, height: 2,
        left: indicator.left, width: indicator.width,
        background: "#E1FF6C",
        transition: "left 0.3s, width 0.3s",
      }} />
    </div>
  );
}`,

  "sparkles": `/* Particules CSS pures — pas de canvas */

/* Keyframe dans globals.css */
@keyframes sparkle-float {
  0%, 100% { opacity: var(--opacity); transform: translateY(0) translateX(0); }
  50% { opacity: 1; transform: translateY(-20px) translateX(var(--drift)); }
}

/* JSX — generer N particules avec des props aleatoires */
{Array.from({ length: 40 }).map((_, i) => {
  const size = Math.random() * 4 + 1;
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = Math.random() * 3 + 3;
  return (
    <div key={i} style={{
      position: "absolute",
      width: size, height: size,
      left: \`\${left}%\`,
      top: \`\${Math.random() * 100}%\`,
      borderRadius: "50%",
      backgroundColor: "#E1FF6C",
      animation: \`sparkle-float \${duration}s ease-in-out \${delay}s infinite\`,
      "--opacity": Math.random() * 0.5 + 0.3,
      "--drift": \`\${(Math.random() - 0.5) * 20}px\`,
    }} />
  );
})}`,

  "color-swapper": `"use client";
import { useRef, useState, useEffect } from "react";

// Fond qui change de couleur quand chaque section entre dans le viewport
const colors = ["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"];

export default function ColorSwapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState(colors[0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("[data-color]");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBgColor(entry.target.getAttribute("data-color") || colors[0]);
        }
      });
    }, { root: container, threshold: 0.5 });

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: bgColor, transition: "background-color 0.8s" }}>
      {colors.map((color, i) => (
        <section key={i} data-color={color}>Section {i + 1}</section>
      ))}
    </div>
  );
}`,

  "spotlight-tabs": `"use client";
import { useState, useRef, useEffect } from "react";

// Tabs avec spotlight/glow qui glisse vers le tab actif
export default function SpotlightTabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const idx = hovered ?? active;
    const el = tabRefs.current[idx];
    if (el) {
      const parent = el.parentElement!.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setPos({ left: rect.left - parent.left, width: rect.width });
    }
  }, [active, hovered]);

  return (
    <div className="relative inline-flex bg-[#111] rounded-full p-1">
      {/* Spotlight pill */}
      <div style={{
        position: "absolute", top: 4, height: "calc(100% - 8px)",
        left: pos.left, width: pos.width,
        background: "rgba(225,255,108,0.1)",
        boxShadow: "0 0 20px rgba(225,255,108,0.15)",
        borderRadius: 9999,
        transition: "left 0.3s, width 0.3s",
      }} />
      {tabs.map((tab, i) => (
        <button key={i} ref={el => { tabRefs.current[i] = el; }}
          onClick={() => setActive(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ color: active === i ? "#E1FF6C" : "#737373" }}>
          {tab}
        </button>
      ))}
    </div>
  );
}`,

  "star-grid": `"use client";
import { useState, useEffect } from "react";

// Grille de dots avec pulsation aleatoire
export default function StarGrid({ cols = 12, rows = 8 }) {
  const [glowing, setGlowing] = useState<Set<number>>(new Set());

  useEffect(() => {
    const total = cols * rows;
    const interval = setInterval(() => {
      const newGlowing = new Set<number>();
      for (let i = 0; i < 10; i++) {
        newGlowing.add(Math.floor(Math.random() * total));
      }
      setGlowing(newGlowing);
    }, 2000);
    return () => clearInterval(interval);
  }, [cols, rows]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: \`repeat(\${cols}, 1fr)\`, gap: 16 }}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <div key={i} style={{
          width: 4, height: 4, borderRadius: "50%",
          backgroundColor: glowing.has(i) ? "#E1FF6C" : "rgba(255,255,255,0.1)",
          boxShadow: glowing.has(i) ? "0 0 8px #E1FF6C" : "none",
          transition: "all 1s ease-in-out",
        }} />
      ))}
    </div>
  );
}`,

  "globe-3d": `"use client";
import { useRef, useEffect } from "react";

// Globe 3D interactif dessine sur canvas
// Rotation auto + drag pour tourner manuellement
export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    let raf: number;
    const draw = () => {
      rotation.current.y += 0.003; // auto-rotation
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner grille de meridiens et paralleles
      const cx = canvas.width / 2, cy = canvas.height / 2, r = 120;
      // ... projection 3D -> 2D pour chaque point
      // ctx.arc(projX, projY, 2, 0, Math.PI * 2);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
}`,

  "accordion-details": `"use client";
import { useState } from "react";

// Accordion anime avec grid-template-rows transition
export default function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            <span>{item.title}</span>
            <span style={{
              transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}>+</span>
          </button>
          {/* Smooth height transition via grid-template-rows */}
          <div style={{
            display: "grid",
            gridTemplateRows: openIdx === i ? "1fr" : "0fr",
            transition: "grid-template-rows 0.3s ease-out",
          }}>
            <div style={{ overflow: "hidden" }}>
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`,

  "text-reveal-scroll": `"use client";
import { useRef, useState, useEffect } from "react";

// Texte qui apparait mot par mot au scroll
export default function TextRevealScroll({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ overflowY: "auto", height: 400 }}>
      <div style={{ padding: "200px 0" }}>
        {words.map((word, i) => {
          const t = i / words.length;
          return (
            <span key={i} style={{
              opacity: t < progress ? 1 : 0.15,
              transition: "opacity 0.3s",
            }}>{word} </span>
          );
        })}
      </div>
    </div>
  );
}`,

  "motion-text": `"use client";
import { useState, useEffect, useRef } from "react";

// Texte scramble: les caracteres se melangent puis se fixent
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function MotionText({ text = "Hello World" }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  const scramble = () => {
    let frame = 0;
    const totalFrames = text.length * 3;
    const interval = setInterval(() => {
      frame++;
      const resolved = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text.split("").map((char, i) =>
          i < resolved ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      if (frame >= totalFrames) clearInterval(interval);
    }, 30);
  };

  useEffect(() => { scramble(); }, []);

  return (
    <div onClick={scramble} style={{ cursor: "pointer", fontFamily: "monospace" }}>
      {display}
    </div>
  );
}`,

  "sticky-scroll": `"use client";
import { useRef, useState, useEffect } from "react";

// Contenu sticky a gauche, cards qui deroulent a droite
const features = [
  { title: "Feature 1", description: "Description..." },
  { title: "Feature 2", description: "Description..." },
];

export default function StickyScroll() {
  const [activeIdx, setActiveIdx] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (idx >= 0) setActiveIdx(idx);
        }
      });
    }, { threshold: 0.5 });

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* Left: sticky */}
      <div style={{ position: "sticky", top: 0, flex: 1 }}>
        <h2>{features[activeIdx].title}</h2>
        <p>{features[activeIdx].description}</p>
      </div>
      {/* Right: scrollable cards */}
      <div style={{ flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} ref={el => { cardRefs.current[i] = el; }}>{f.title}</div>
        ))}
      </div>
    </div>
  );
}`,

  "scroll-reveal": `"use client";
import { useRef, useState, useEffect } from "react";

// Wrapper utilitaire: fade + slide au scroll
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: \`opacity 0.6s ease \${delay}ms, transform 0.6s ease \${delay}ms\`,
    }}>
      {children}
    </div>
  );
}

// Usage: wrap chaque element
<ScrollReveal delay={0}><Card /></ScrollReveal>
<ScrollReveal delay={100}><Card /></ScrollReveal>
<ScrollReveal delay={200}><Card /></ScrollReveal>`,

  "vertical-tabs": `"use client";
import { useState, useRef, useEffect } from "react";

// Tabs verticaux avec indicateur lateral anime
export default function VerticalTabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [indicatorH, setIndicatorH] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) {
      const parent = el.parentElement!.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicatorY(rect.top - parent.top);
      setIndicatorH(rect.height);
    }
  }, [active]);

  return (
    <div style={{ display: "flex", gap: 32 }}>
      <div style={{ position: "relative" }}>
        {/* Indicateur glissant */}
        <div style={{
          position: "absolute", left: 0, width: 3,
          top: indicatorY, height: indicatorH,
          background: "#E1FF6C", borderRadius: 2,
          transition: "top 0.3s, height 0.3s",
        }} />
        {tabs.map((tab, i) => (
          <button key={i} ref={el => { tabRefs.current[i] = el; }}
            onClick={() => setActive(i)}>{tab.label}</button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}`,

  "spotlight-button": `"use client";
import { useCallback, useRef } from "react";

// Bouton avec halo lumineux qui suit le curseur
export default function SpotlightButton({ children }: { children: React.ReactNode }) {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.background = \`radial-gradient(120px circle at \${x}px \${y}px, rgba(225,255,108,0.15), transparent 60%), #111\`;
  }, []);

  return (
    <button ref={btnRef} onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (btnRef.current) btnRef.current.style.background = "#111"; }}
      style={{ padding: "12px 24px", borderRadius: 8, border: "1px solid #333", color: "#fff" }}>
      {children}
    </button>
  );
}`,

  "grid-pattern": `// Grille SVG repeatable en background
// Pattern defini dans <defs>, utilise via <rect fill="url(#grid)" />

<svg width="100%" height="100%">
  <defs>
    <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
    </pattern>
  </defs>

  {/* Fond grille */}
  <rect width="100%" height="100%" fill="url(#grid)" />

  {/* Cellules highlights (optionnel) */}
  <rect x={120} y={80} width={40} height={40} fill="rgba(225,255,108,0.08)" />

  {/* Masque radial pour fade aux bords */}
  <radialGradient id="fade">
    <stop offset="0%" stopColor="white" />
    <stop offset="100%" stopColor="black" />
  </radialGradient>
  <mask id="radial-mask">
    <rect width="100%" height="100%" fill="url(#fade)" />
  </mask>
</svg>`,

  "dot-pattern": `// Grille de points SVG en background
// Pattern avec cercles + masque radial pour fade

<svg width="100%" height="100%">
  <defs>
    <pattern id="dots" width={20} height={20} patternUnits="userSpaceOnUse">
      <circle cx={10} cy={10} r={1.5} fill="rgba(255,255,255,0.15)" />
    </pattern>
    <radialGradient id="fade-mask">
      <stop offset="30%" stopColor="white" />
      <stop offset="100%" stopColor="black" />
    </radialGradient>
    <mask id="dot-mask">
      <rect width="100%" height="100%" fill="url(#fade-mask)" />
    </mask>
  </defs>

  <rect width="100%" height="100%" fill="url(#dots)" mask="url(#dot-mask)" />
</svg>

{/* Usage: position absolute derriere le contenu */}
<div className="relative">
  <svg className="absolute inset-0 w-full h-full" />
  <div className="relative z-10">Votre contenu ici</div>
</div>`,

  "aurora-background": `/* Aurora Background — gradients multicouches animes */

/* 3 couches de radial-gradient avec background-position anime */
<div style={{
  position: "relative", width: "100%", height: "100%",
  background: "#050505", overflow: "hidden",
}}>
  {/* Couche 1: bleu/violet */}
  <div style={{
    position: "absolute", inset: 0, opacity: 0.5,
    background: "radial-gradient(ellipse at 50% 50%, rgba(76,29,149,0.4), transparent 70%)",
    animation: "aurora1 20s ease-in-out infinite alternate",
  }} />
  {/* Couche 2: teal/vert */}
  <div style={{
    position: "absolute", inset: 0, opacity: 0.3,
    background: "radial-gradient(ellipse at 30% 60%, rgba(6,182,212,0.4), transparent 70%)",
    animation: "aurora2 25s ease-in-out infinite alternate",
  }} />
  {/* Contenu par-dessus */}
  <div className="relative z-10">{children}</div>
</div>

/* Keyframes */
@keyframes aurora1 {
  0% { background-position: 50% 50%; }
  100% { background-position: 350% 50%; }
}`,

  "meteors": `/* Meteors — pluie de meteores CSS */
{Array.from({ length: 15 }).map((_, i) => (
  <div key={i} style={{
    position: "absolute",
    top: \`\${Math.random() * 60}%\`,
    left: \`\${Math.random() * 100}%\`,
    width: \`\${Math.random() * 80 + 40}px\`,
    height: "1px",
    background: "linear-gradient(to right, #E1FF6C, transparent)",
    transform: "rotate(215deg)",
    animation: \`meteor \${Math.random() * 3 + 2}s linear \${Math.random() * 5}s infinite\`,
  }} />
))}

@keyframes meteor {
  0% { transform: rotate(215deg) translateX(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
}`,

  "flip-words": `"use client";
import { useState, useEffect } from "react";

// Mots qui cyclent avec animation slide
const words = ["beautiful", "modern", "amazing", "creative"];

export default function FlipWords() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setAnimating(false);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{
      display: "inline-block",
      transform: animating ? "translateY(-20px)" : "translateY(0)",
      opacity: animating ? 0 : 1,
      transition: "transform 0.3s, opacity 0.3s",
    }}>
      {words[index]}
    </span>
  );
}`,

  "typewriter": `"use client";
import { useState, useEffect, useRef } from "react";

// Typewriter avec curseur clignotant + delete/retype
const sentences = ["Build amazing websites.", "Ship faster.", "Delight users."];

export default function Typewriter() {
  const [text, setText] = useState("");
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = sentences[sentenceIdx];
    const speed = isDeleting ? 35 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setSentenceIdx((i) => (i + 1) % sentences.length);
      } else {
        setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, sentenceIdx]);

  return <span>{text}<span className="animate-pulse">|</span></span>;
}`,

  "number-ticker": `"use client";
import { useRef, useState, useEffect } from "react";

// Compteur anime avec easeOutExpo
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function NumberTicker({ target = 1234, duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          setValue(Math.round(easeOutExpo(progress) * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <div ref={ref}>{value.toLocaleString()}</div>;
}`,

  "border-beam": `/* Border Beam — faisceau lumineux sur la bordure */
/* Technique: conic-gradient anime avec @property */

@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}

/* Card avec beam */
<div style={{
  padding: "2px",
  borderRadius: "16px",
  background: \`conic-gradient(from var(--beam-angle), transparent 60%, #E1FF6C 75%, transparent 90%)\`,
  animation: "beam-rotate 3s linear infinite",
}}>
  <div style={{ borderRadius: "14px", background: "#0d0d0d", padding: "24px" }}>
    Contenu de la card
  </div>
</div>`,

  "wobble-card": `"use client";
import { useCallback, useRef } from "react";

// Card qui oscille au mousemove
export default function WobbleCard({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = \`translate(\${x * 5}px, \${y * 5}px) scale(1.02)\`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0, 0) scale(1)";
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out" }}>
      {children}
    </div>
  );
}`,

  "morphing-text": `"use client";
import { useState, useEffect } from "react";

// Texte qui morphe entre mots avec cross-fade blur
const words = ["Innovation", "Creativity", "Excellence", "Design"];

export default function MorphingText() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "morphing">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("morphing");
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("visible");
      }, 500);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{
      filter: phase === "morphing" ? "blur(8px)" : "blur(0px)",
      opacity: phase === "morphing" ? 0 : 1,
      transition: "filter 0.5s, opacity 0.5s",
    }}>
      {words[index]}
    </span>
  );
}`,

  "confetti": `"use client";
import { useRef, useCallback } from "react";

// Confetti au clic — particules avec physique
export default function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fire = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;

    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      const size = Math.random() * 8 + 4;
      const color = ["#E1FF6C", "#6CE1FF", "#FF6CE1", "#FF6C6C", "#6CFF9E"][Math.floor(Math.random() * 5)];
      el.style.cssText = \`position:absolute;width:\${size}px;height:\${size}px;background:\${color};border-radius:\${Math.random()>0.5?"50%":"2px"};left:\${originX}px;top:\${originY}px;pointer-events:none\`;
      container.appendChild(el);

      let vx = (Math.random() - 0.5) * 12;
      let vy = -Math.random() * 15 - 5;
      let frame = 0;
      const animate = () => {
        vy += 0.5; // gravity
        el.style.left = \`\${parseFloat(el.style.left) + vx}px\`;
        el.style.top = \`\${parseFloat(el.style.top) + vy}px\`;
        el.style.opacity = String(1 - frame / 60);
        if (++frame < 60) requestAnimationFrame(animate);
        else el.remove();
      };
      requestAnimationFrame(animate);
    }
  }, []);

  return <div ref={containerRef} onClick={fire}><button>Celebrate!</button></div>;
}`,

  "blob-cursor": `"use client";
import { useRef, useEffect } from "react";

// Blob gradiante qui suit le curseur avec lerp
export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 200, y: 200 });
  const pos = useRef({ x: 200, y: 200 });

  useEffect(() => {
    let raf: number;
    const lerp = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08;
      if (blobRef.current) {
        blobRef.current.style.transform = \`translate(\${pos.current.x - 100}px, \${pos.current.y - 100}px)\`;
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }}>
      <div ref={blobRef} style={{
        width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(225,255,108,0.3), transparent 70%)",
        filter: "blur(40px)", position: "absolute", pointerEvents: "none",
      }} />
    </div>
  );
}`,

  "text-pressure": `"use client";
// Chaque lettre reagit au curseur: poids + taille + attraction

const handleMouseMove = (e) => {
  letters.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
    const maxDist = 150;
    const t = Math.max(0, 1 - dist / maxDist);

    // Font weight: 100 -> 900
    span.style.fontWeight = String(100 + Math.round(t * 800));
    // Scale: 1.0 -> 1.3
    span.style.transform = \`scale(\${1 + t * 0.3})\`;
    // Color: white -> accent
    span.style.color = t > 0.1 ? "#E1FF6C" : "#fff";
  });
};`,

  "blur-text": `"use client";
// Texte qui se deblurre caractere par caractere

// Chaque caractere commence avec blur(12px) + opacity: 0
// Transition staggeree: delay = index * 15ms
{text.split("").map((char, i) => (
  <span key={i} style={{
    display: "inline-block",
    filter: visible ? "blur(0px)" : "blur(12px)",
    opacity: visible ? 1 : 0,
    transition: \`filter 0.4s ease \${i * 15}ms, opacity 0.4s ease \${i * 15}ms\`,
  }}>
    {char === " " ? "\\u00A0" : char}
  </span>
))}

// Trigger avec IntersectionObserver
useEffect(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) setVisible(true);
  }, { threshold: 0.3 });
  obs.observe(ref.current);
}, []);`,

  "split-text": `"use client";
// Caracteres disperses qui s'assemblent

// Phase 1: chaque char a une position aleatoire
const randomPos = chars.map(() => ({
  x: (Math.random() - 0.5) * 400,
  y: (Math.random() - 0.5) * 200,
  rotate: (Math.random() - 0.5) * 120,
}));

// Phase 2: transition vers position originale
{chars.map((char, i) => (
  <span style={{
    display: "inline-block",
    transform: assembled
      ? "translate(0, 0) rotate(0deg)"
      : \`translate(\${randomPos[i].x}px, \${randomPos[i].y}px) rotate(\${randomPos[i].rotate}deg)\`,
    opacity: assembled ? 1 : 0,
    transition: \`all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) \${i * 50}ms\`,
  }}>
    {char}
  </span>
))}`,

  "shiny-text": `/* Shiny Text — reflet brillant continu */
/* Technique: background-clip: text + gradient anime */

@keyframes shine-sweep {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shiny-text {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.6) 0%,
    rgba(225,255,108,0.9) 25%,
    rgba(255,255,255,0.6) 50%,
    rgba(255,255,255,0.3) 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: shine-sweep 3s linear infinite;
}`,

  "glitch-text": `/* Glitch Text — offset RGB + clip-path slicing */

.glitch {
  position: relative;
  font-weight: 900;
  color: #fff;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
}

.glitch::before {
  color: #0ff; /* cyan */
  animation: glitch-1 2s infinite linear alternate;
}

.glitch::after {
  color: #f00; /* red */
  animation: glitch-2 3s infinite linear alternate;
}

@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 60% 0); transform: translate(-2px, 0); }
  20% { clip-path: inset(10% 0 85% 0); transform: translate(2px, 0); }
  40% { clip-path: inset(70% 0 5% 0); transform: translate(-1px, 0); }
  60% { clip-path: inset(30% 0 50% 0); transform: translate(3px, 0); }
  80% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 0); }
  100% { clip-path: inset(5% 0 90% 0); transform: translate(1px, 0); }
}

/* Usage */
<span className="glitch" data-text="GLITCH">GLITCH</span>`,
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
