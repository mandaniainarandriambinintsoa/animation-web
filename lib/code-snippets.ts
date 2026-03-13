export const codeSnippets: Record<string, { code: string; css?: string; instructions: string }> = {
  "3d-tilt": {
    code: `"use client";
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
    instructions: "Composant React client. Placez vos elements enfants avec des translateZ() differents pour creer de la profondeur. Ajustez l'amplitude (12) pour plus ou moins d'inclinaison.",
  },

  "path-draw": {
    code: `"use client";
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
    instructions: "Passez votre path SVG et viewBox en props. Le trait se dessine automatiquement quand la section entre dans le viewport (IntersectionObserver, threshold 0.3). Pas de CSS externe requis.",
  },

  "flow-lines": {
    code: `<svg viewBox={viewBox} fill="none">
  {/* Fond statique */}
  <path d={d} stroke="rgba(221,217,209,0.15)" strokeWidth="1" />
  {/* Dash anime */}
  <path d={d} stroke="rgb(138,132,114)" strokeWidth="1"
    pathLength={100} strokeDasharray="30 100" strokeDashoffset="30"
    className="animate-flow" />
</svg>`,
    css: `@keyframes flow {
  from { stroke-dashoffset: 130; }
  to { stroke-dashoffset: 0; }
}
.animate-flow { animation: flow 3s linear infinite; }`,
    instructions: "Ajoutez le CSS dans votre globals.css. Dupliquez le SVG pour creer plusieurs lignes avec des animationDelay differents. Utilisez des paths SVG courbes (Q, C) pour un effet organique.",
  },

  "flow-circles": {
    code: `<svg viewBox={viewBox} fill="none">
  <path d={d} stroke="rgba(221,217,209,0.15)" strokeWidth="1" />
  <path id={pathId} d={d} fill="none" stroke="none" />
  <circle r="4" fill="#E1FF6C">
    <animateMotion dur="3s" repeatCount="indefinite" begin={delay} calcMode="linear">
      <mpath href={\`#\${pathId}\`} />
    </animateMotion>
  </circle>
</svg>`,
    css: `@keyframes flow {
  from { stroke-dashoffset: 130; }
  to { stroke-dashoffset: 0; }
}
.animate-flow { animation: flow 3s linear infinite; }`,
    instructions: "Variante de flow-lines avec des cercles colores qui voyagent le long des paths. Chaque cercle a un 'begin' (delay) different pour un effet stagger. Combinez avec les dash animes pour un double effet.",
  },

  "s-curve-arrow": {
    code: `<svg viewBox="0 0 500 160" overflow="visible">
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
    instructions: "Definissez votre motionPath comme une courbe S avec des C (cubic bezier). Le polygon est la fleche qui suit le path avec rotate='auto'. Ajustez dur pour la vitesse et keySplines pour l'easing.",
  },

  "border-spin": {
    code: `<div className="group">
  <div className="relative rounded-[14px] p-[2px] animate-border-spin"
    style={{ background: "conic-gradient(from var(--border-angle), transparent 30%, #888 50%, #E1FF6C 70%, transparent 90%)" }}>
    {/* Masque au repos */}
    <div className="absolute inset-0 rounded-[14px] bg-white transition-opacity group-hover:opacity-0" />
    {/* Contenu */}
    <div className="relative rounded-[13px] bg-white p-6">...</div>
  </div>
</div>`,
    css: `@property --border-angle {
  syntax: "<angle>"; initial-value: 0deg; inherits: false;
}
@keyframes border-spin { to { --border-angle: 360deg; } }
.animate-border-spin { animation: border-spin 2s linear infinite; }`,
    instructions: "Le conic-gradient tourne via @property --border-angle. Le masque blanc cache l'effet au repos et disparait au hover du group. Ajustez les couleurs du gradient et la vitesse (2s).",
  },

  "marquee": {
    code: `const doubled = [...items, ...items];
<div className="overflow-hidden">
  <div className="flex gap-4 animate-marquee"
    style={{ width: \`\${doubled.length * ITEM_WIDTH}px\` }}>
    {doubled.map((item, i) => <div key={i}>...</div>)}
  </div>
</div>`,
    css: `@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee-scroll 30s linear infinite; }`,
    instructions: "Dupliquez les items pour creer le loop sans gap. Ajustez la duree (30s) selon le nombre d'items. La largeur totale doit etre exacte (nombre d'items * largeur) pour un scroll fluide.",
  },

  "char-spin": {
    code: `<span style={{ perspective: "500px" }}>
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
    css: `@keyframes charSpin {
  0% { transform: rotateY(90deg); opacity: 0; }
  100% { transform: rotateY(0deg); opacity: 1; }
}`,
    instructions: "Changez la key (animKey) pour re-trigger l'animation. Le delay de 20ms par caractere cree l'effet machine a ecrire. Ajustez la perspective (500px) et la duree (400ms) selon le style voulu.",
  },

  "scroll-arcs": {
    code: `"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollArcs() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        ));
        setRotation(progress * 360);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Chaque arc SVG avec son propre speed multiplier
  return (
    <svg viewBox="0 0 300 300">
      {arcs.map((arc, i) => (
        <path key={i}
          d={describeArc(150, 150, arc.radius, arc.startAngle + rotation * arc.speed, arc.startAngle + rotation * arc.speed + arc.arcLength)}
          stroke={arc.color} strokeWidth={arc.strokeWidth}
          fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
}`,
    instructions: "L'animation est pilotee par le scroll via requestAnimationFrame. Chaque arc a un speed multiplier positif ou negatif pour tourner dans des directions differentes. Ajoutez des cercles de fond subtils pour l'effet dashboard.",
  },

  "anti-grid-tabs": {
    code: `{/* Tab actif: rounded-t, pas de border-bottom */}
<button className={isActive ? "rounded-t-[42px] rounded-b-none bg-surface" : "rounded-[42px] bg-surface"}
  style={{ borderBottom: isActive ? "1.6px solid surfaceColor" : "1.6px solid borderColor" }}>
  {tab.label}
</button>

{/* Bridge avec courbes concaves */}
{isActive && (
  <div style={{ top: TAB_HEIGHT, width: "100%", height: GAP }}>
    <div className="w-full h-full bg-surface" />
    {/* Concave gauche */}
    <div className="absolute overflow-hidden"
      style={{ left: "1.6px", bottom: 0, transform: "translateX(-100%)", width: 32, height: 32 }}>
      <div style={{ borderRadius: "0 0 32px 0", boxShadow: "0 0 0 32px surfaceColor" }} />
    </div>
    {/* Concave droite */}
    <div className="absolute overflow-hidden"
      style={{ right: "1.6px", bottom: 0, transform: "translateX(100%)", width: 32, height: 32 }}>
      <div style={{ borderRadius: "0 0 0 32px", boxShadow: "0 0 0 32px surfaceColor" }} />
    </div>
  </div>
)}

{/* Content card: border-radius dynamique */}
<div style={{
  borderTopLeftRadius: activeIdx === 0 ? 0 : 42,
  borderTopRightRadius: activeIdx === lastIdx ? 0 : 42,
  borderBottomLeftRadius: 42, borderBottomRightRadius: 42,
}}>...</div>`,
    instructions: "La technique concave utilise borderRadius + boxShadow (pas clip-path). Le bridge remplit le gap entre tab et contenu. Le border-radius du content card s'adapte dynamiquement a la position du tab actif (0 sous le tab actif, 42px sinon).",
  },

  "eye-tracking": {
    code: `"use client";
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

      const rotateY = ((mouseX - elCX) / (sRect.width / 2)) * amp;
      const rotateX = ((elCY - mouseY) / (sRect.height / 2)) * amp;
      const tx = ((mouseX - elCX) / sRect.width) * amp * 3;
      const ty = ((mouseY - elCY) / sRect.height) * amp * 3;
      el.style.transform = \`perspective(800px) translate(\${tx}px, \${ty}px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

      // Pupilles suivent le curseur
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
      {/* Cards: background colore, borderRadius 16, boxShadow */}
      {/* Yeux: div 18x18 blanc rounded-full */}
      {/* Pupille: div 8x8 #1a1a2e rounded-full + glint 3x3 blanc */}
    </section>
  );
}`,
    instructions: "Chaque card a une amplitude differente pour varier l'effet. Les yeux sont des div blanches avec une pupille sombre. Le glint (point blanc) donne du realisme. Utilisez transition: transform 0.08s sur les pupilles et 0.12s sur les cards.",
  },

  "card-carousel": {
    code: `"use client";

// Fan spread: images qui s'ecartent au hover
<div className="flex -space-x-[16px] group-hover:-space-x-[24px] transition-all duration-300">
  {images.map((img, i) => <div key={i} className="w-9 h-12 rounded-lg" />)}
</div>

// Stack shift: images empilees qui se decalent
<div className="relative">
  {images.map((img, i) => (
    <div key={i} className={\`absolute inset-0 transition-all duration-300 \${hoverClasses[i]}\`} />
  ))}
</div>

// 3D Fade: perspective + rotateX/Y au mousemove + crossfade
const rotateY = ((x - centerX) / centerX) * 12;
const rotateX = ((centerY - y) / centerY) * 12;
<div style={{ transform: \`perspective(800px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\` }} />
<div className="z-10 group-hover:opacity-0 transition-opacity duration-500" />

// Colorize: crossfade entre 2 elements
<div className="z-12 group-hover:opacity-0 transition-all duration-300" />
<div className="z-13 opacity-0 group-hover:opacity-100 transition-all duration-300" />

// Camera pan: scroll horizontal au hover
<div className="flex transition-all duration-300 group-hover:-translate-x-[60px]">
  {images.map((img, i) => <div key={i} className="w-16 h-16 rounded-lg shrink-0" />)}
</div>`,
    instructions: "5 types d'effets hover pour des cards: fan (ecartement), stack (decalage), 3D fade (perspective + crossfade), colorize (crossfade simple), camera (pan horizontal). Combinez dans un carousel horizontal scrollable avec des fleches de navigation.",
  },

  "anti-grid-bento": {
    code: `/* Anti-Grid Bento — Connected cards with concave curves */

/* 1. Grid layout: 4 cols, defined rows, gap creates space for bridges */
<div className="grid gap-[28px]" style={{
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "700px 252px 252px",
}}>

  {/* Hero card — selective border-radius: connected corner = 0 */}
  <div style={{
    gridColumn: "1 / -1",
    borderRadius: "42px 42px 42px 0px",
    border: "1.6px solid #161616",
    backgroundColor: "#0d0d0d",
  }}>...</div>

  {/* Chart card — connected to hero above */}
  <div style={{
    gridColumn: "1 / span 3",
    gridRow: "2 / span 2",
    borderRadius: "0px 0px 42px 42px",
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
    <div style={{ width: 64, height: 64, clipPath: "polygon(0 100%, 100% 0, 0 0)", rotate }}>
      <div style={{ width: 66, height: 66, backgroundColor: "#0d0d0d" }} />
      <div className="absolute inset-0 rounded-full" style={{
        width: 134.5, height: 134.5,
        backgroundColor: "#020202",
        border: "1.6px solid #161616",
      }} />
    </div>
  );
}`,
    instructions: "Le bento grid utilise des bridges pour connecter visuellement les cards adjacentes. Les coins connectes ont un border-radius de 0. Les courbes concaves utilisent clipPath triangle + un cercle surdimensionne. Le gap de 28px cree l'espace pour les bridges.",
  },

  "staircase-clippath": {
    code: `"use client";
import { useCallback, useRef, useState } from "react";

// Graphe en escalier avec clipPath interactif
const greenPath = "M0,247.5L37.72,247.5...L830,0";
const orangePath = "M0,330L75.44,330...L830,55";

// ClipPath = rectangle de 0 a mouseX
<svg viewBox="0 0 830 340">
  <clipPath id="reveal"><rect x={0} y={0} width={mouseX} height={H} /></clipPath>
  <path d={greenPath} stroke="rgba(0,255,0,0.15)" />
  <g clipPath="url(#reveal)">
    <path d={greenPath} stroke="#4ade80" strokeWidth={3} />
  </g>
</svg>`,
    instructions: "Le curseur controle un clipPath rectangle qui revele progressivement les lignes colorees. Les paths SVG en escalier sont definis en dur. Le fond est une version attenuee des memes paths.",
  },

  "book-3d-tilt": {
    code: `"use client";
import { useCallback, useRef } from "react";

export default function Book3DTilt({ imageSrc, title, subtitle }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 14;
    const rotateY = x * 20;
    el.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

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
    instructions: "Le livre tilt en 3D au mousemove avec une ombre dynamique qui suit le curseur. Ajustez les amplitudes (14, 20) et l'intensite de l'ombre (40, 60px). Ajoutez onMouseLeave pour reset la position.",
  },

  "spotlight-card": {
    code: `"use client";
import { useCallback, useRef } from "react";

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
    instructions: "Wrapper simple — passez n'importe quel contenu comme children. Ajustez spotlightColor et le rayon (350px) pour l'intensite. Le gradient disparait au mouseLeave.",
  },

  "magnetic-text": {
    code: `"use client";
import { useRef, useEffect } from "react";

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
    instructions: "Necessite une font variable (ex: Inter) pour le font-weight dynamique. La distance max (200px) controle la zone d'influence. La couleur interpole de blanc vers #E1FF6C. Ajoutez transition: font-weight 0.1s sur les spans.",
  },

  "text-highlighter": {
    code: `"use client";
import { useRef, useEffect, useState } from "react";

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
    instructions: "Le scroll du container declenche le surlignage progressif mot par mot. Chaque mot passe de 0.15 a 1 d'opacite. Ajustez le padding vertical pour creer plus d'espace de scroll.",
  },

  "fluid-tabs": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
      <div style={{
        position: "absolute", bottom: 0, height: 2,
        left: indicator.left, width: indicator.width,
        background: "#E1FF6C",
        transition: "left 0.3s, width 0.3s",
      }} />
    </div>
  );
}`,
    instructions: "L'indicateur se deplace fluidement vers le tab actif en mesurant la position/largeur de chaque bouton. Style underline par defaut — changez height/borderRadius pour un style pill.",
  },

  "sparkles": {
    code: `{Array.from({ length: 40 }).map((_, i) => {
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
    css: `@keyframes sparkle-float {
  0%, 100% { opacity: var(--opacity); transform: translateY(0) translateX(0); }
  50% { opacity: 1; transform: translateY(-20px) translateX(var(--drift)); }
}`,
    instructions: "Particules CSS pures — pas de canvas. Ajoutez le keyframe sparkle-float dans globals.css. Changez les ranges (size, duration, drift) et la couleur pour personnaliser. Le parent doit etre position: relative + overflow: hidden.",
  },

  "color-swapper": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
    instructions: "Chaque section a un data-color. L'IntersectionObserver (threshold 0.5) detecte quelle section est visible et change le fond. Transition 0.8s pour un changement fluide.",
  },

  "spotlight-tabs": {
    code: `"use client";
import { useState, useRef, useEffect } from "react";

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
    instructions: "Variante de fluid-tabs avec un spotlight/glow. La pill suit le hover en priorite, puis revient au tab actif. Le boxShadow cree l'effet glow. Style pill rounded-full.",
  },

  "star-grid": {
    code: `"use client";
import { useState, useEffect } from "react";

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
    instructions: "Grille de points dont certains brillent aleatoirement toutes les 2 secondes. Ajustez cols/rows, le nombre de points brillants (10), et le gap (16px). Le boxShadow cree le glow.",
  },

  "globe-3d": {
    code: `"use client";
import { useRef, useEffect } from "react";

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: 0.3, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    let raf: number;
    const draw = () => {
      rotation.current.y += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2, cy = canvas.height / 2, r = 120;
      // Dessiner grille de meridiens et paralleles
      // Projection 3D -> 2D pour chaque point
      // ctx.arc(projX, projY, 2, 0, Math.PI * 2);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
}`,
    instructions: "Globe 3D dessine sur canvas avec rotation automatique. Ajoutez des markers (lat/lon -> x/y/z -> projection) et un drag handler pour tourner manuellement. Ajustez le rayon (120) et la vitesse (0.003).",
  },

  "accordion-details": {
    code: `"use client";
import { useState } from "react";

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
    instructions: "Technique grid-template-rows pour un expand/collapse fluide sans height fixe. L'icone + tourne a 45deg pour devenir un x. Un seul item ouvert a la fois — modifiez pour permettre plusieurs si besoin.",
  },

  "text-reveal-scroll": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
    instructions: "Le texte apparait mot par mot au scroll du container interne. Le padding vertical (200px) cree l'espace de scroll necessaire. Ajustez height (400) et le seuil de visibilite.",
  },

  "motion-text": {
    code: `"use client";
import { useState, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function MotionText({ text = "Hello World" }) {
  const [display, setDisplay] = useState(text);

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
    instructions: "Le texte se scramble puis se fixe caractere par caractere. Cliquez pour re-trigger. Ajustez la vitesse (30ms), le multiplicateur (3) et les caracteres de scramble.",
  },

  "sticky-scroll": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
      <div style={{ position: "sticky", top: 0, flex: 1 }}>
        <h2>{features[activeIdx].title}</h2>
        <p>{features[activeIdx].description}</p>
      </div>
      <div style={{ flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} ref={el => { cardRefs.current[i] = el; }}>{f.title}</div>
        ))}
      </div>
    </div>
  );
}`,
    instructions: "Layout flex: contenu sticky a gauche (position: sticky, top: 0), cards scrollables a droite. L'IntersectionObserver detecte quelle card est visible et met a jour le contenu sticky. Ideal pour product tours.",
  },

  "scroll-reveal": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
    instructions: "Wrapper utilitaire reutilisable. Wrappez chaque element avec un delay stagger (0, 100, 200ms...) pour un reveal en cascade. Ajustez le threshold (0.2), la duree (0.6s) et le translateY (20px).",
  },

  "vertical-tabs": {
    code: `"use client";
import { useState, useRef, useEffect } from "react";

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
    instructions: "Tabs empiles verticalement avec un indicateur lateral (barre de 3px) qui glisse vers le tab actif. Le contenu change a droite. Ajoutez padding-left aux boutons pour laisser de la place a l'indicateur.",
  },

  "spotlight-button": {
    code: `"use client";
import { useCallback, useRef } from "react";

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
    instructions: "Meme technique que spotlight-card mais sur un bouton. Ajustez le rayon (120px), la couleur du glow et le fond au repos (#111). Le gradient suit le curseur en temps reel.",
  },

  "grid-pattern": {
    code: `<svg width="100%" height="100%">
  <defs>
    <pattern id="grid" width={40} height={40} patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
    </pattern>
  </defs>

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
    instructions: "Pattern SVG repeatable. Ajustez la taille des cellules (40x40), la couleur/epaisseur des lignes. Le masque radial cree un fade aux bords. Position absolute derriere le contenu.",
  },

  "dot-pattern": {
    code: `<svg width="100%" height="100%">
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
    instructions: "Grille de points subtile en background. Ajustez l'espacement (20x20), la taille des dots (r=1.5) et le fade radial (offset 30%). Combinez avec un fond sombre pour un effet tech/dashboard.",
  },

  "aurora-background": {
    code: `/* Aurora Background — gradients multicouches animes */

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
  <div className="relative z-10">{children}</div>
</div>`,
    css: `@keyframes aurora1 {
  0% { background-position: 50% 50%; }
  100% { background-position: 350% 50%; }
}
@keyframes aurora2 {
  0% { background-position: 30% 60%; }
  100% { background-position: 280% 40%; }
}`,
    instructions: "2-3 couches de radial-gradient qui se deplacent lentement en alternate. Ajoutez plus de couches (rose, bleu) pour un effet plus riche. Les durees differentes (20s, 25s) creent un mouvement organique.",
  },

  "meteors": {
    code: `{Array.from({ length: 15 }).map((_, i) => (
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
))}`,
    css: `@keyframes meteor {
  0% { transform: rotate(215deg) translateX(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
}`,
    instructions: "Chaque meteore est un div 1px avec un gradient. Le rotate (215deg) donne l'angle de chute. Les durees et delays aleatoires creent un effet naturel. Le parent doit etre position: relative + overflow: hidden.",
  },

  "flip-words": {
    code: `"use client";
import { useState, useEffect } from "react";

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
    instructions: "Les mots cyclent avec un slide vertical + fade. Ajustez l'intervalle (3000ms), la vitesse de transition (0.3s) et le translateY (-20px). Passez les mots en props pour rendre le composant reutilisable.",
  },

  "typewriter": {
    code: `"use client";
import { useState, useEffect } from "react";

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
    instructions: "Tape, attend 2s, efface, puis tape la phrase suivante. Ajustez les vitesses (60ms type, 35ms delete), la pause (2000ms), et les phrases. Le curseur | utilise animate-pulse de Tailwind.",
  },

  "number-ticker": {
    code: `"use client";
import { useRef, useState, useEffect } from "react";

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
    instructions: "Compteur anime avec easeOutExpo pour un ralentissement progressif. Declenche au scroll (IntersectionObserver, threshold 0.5). Ajustez target et duration en props. toLocaleString() ajoute les separateurs de milliers.",
  },

  "border-beam": {
    code: `/* Border Beam — faisceau lumineux sur la bordure */

@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}

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
    css: `@property --beam-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}`,
    instructions: "Meme technique que border-spin mais avec un faisceau plus etroit (60%-90% transparent). Le @property CSS permet d'animer l'angle du conic-gradient. Le div interne masque le centre.",
  },

  "wobble-card": {
    code: `"use client";
import { useCallback, useRef } from "react";

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
    instructions: "Card qui oscille subtilement au mousemove avec translation + scale. Amplitude faible (5px, 1.02) pour un effet subtil. La transition (0.2s) lisse le mouvement. Wrapper generique.",
  },

  "morphing-text": {
    code: `"use client";
import { useState, useEffect } from "react";

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
    instructions: "Cross-fade blur entre les mots. Le blur (8px) + opacity 0 cree l'effet de morphing. Ajustez l'intervalle (3000ms), la duree du morph (500ms) et l'intensite du blur.",
  },

  "confetti": {
    code: `"use client";
import { useRef, useCallback } from "react";

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

  return <div ref={containerRef} onClick={fire} style={{ position: "relative", overflow: "hidden" }}><button>Celebrate!</button></div>;
}`,
    instructions: "Confetti au clic avec physique (gravite 0.5, velocite aleatoire). 50 particules avec formes mixtes (rond/carre) et 5 couleurs. Les particules s'auto-suppriment apres 60 frames. Le container doit etre position: relative.",
  },

  "blob-cursor": {
    code: `"use client";
import { useRef, useEffect } from "react";

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
    instructions: "Blob flou qui suit le curseur avec interpolation lineaire (lerp 0.08). Ajustez la taille (200px), le blur (40px), la couleur et le facteur de lerp pour plus ou moins de fluidite. Le blob doit etre pointer-events: none.",
  },

  "text-pressure": {
    code: `"use client";
// Chaque lettre reagit au curseur: poids + taille + attraction

const handleMouseMove = (e) => {
  letters.forEach((span) => {
    const rect = span.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
    const maxDist = 150;
    const t = Math.max(0, 1 - dist / maxDist);

    span.style.fontWeight = String(100 + Math.round(t * 800));
    span.style.transform = \`scale(\${1 + t * 0.3})\`;
    span.style.color = t > 0.1 ? "#E1FF6C" : "#fff";
  });
};`,
    instructions: "Necessite une font variable. La distance max (150px) controle la zone d'influence. Le poids va de 100 a 900, le scale de 1 a 1.3. Similaire a magnetic-text mais avec scale en plus.",
  },

  "blur-text": {
    code: `"use client";
// Texte qui se deblurre caractere par caractere

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
    instructions: "Chaque caractere commence avec blur(12px) + opacity 0. Le delay stagger (15ms par char) cree l'effet en cascade. Declenche par IntersectionObserver. Ajustez le blur, la duree (0.4s) et le stagger.",
  },

  "split-text": {
    code: `"use client";
// Caracteres disperses qui s'assemblent

const randomPos = chars.map(() => ({
  x: (Math.random() - 0.5) * 400,
  y: (Math.random() - 0.5) * 200,
  rotate: (Math.random() - 0.5) * 120,
}));

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
    instructions: "Les caracteres commencent disperses aleatoirement puis s'assemblent. Le cubic-bezier avec overshoot (1.56) cree un effet elastique. Le stagger (50ms) fait apparaitre les chars un par un. Declenchez avec un state toggle.",
  },

  "shiny-text": {
    code: `.shiny-text {
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
    css: `@keyframes shine-sweep {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}`,
    instructions: "Technique background-clip: text avec un gradient anime. Le gradient se deplace de gauche a droite en continu. Ajustez les couleurs, la taille (200%) et la vitesse (3s). Usage: <span className='shiny-text'>Texte</span>.",
  },

  "glitch-text": {
    code: `.glitch {
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
  color: #0ff;
  animation: glitch-1 2s infinite linear alternate;
}

.glitch::after {
  color: #f00;
  animation: glitch-2 3s infinite linear alternate;
}

/* Usage */
<span className="glitch" data-text="GLITCH">GLITCH</span>`,
    css: `@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 60% 0); transform: translate(-2px, 0); }
  20% { clip-path: inset(10% 0 85% 0); transform: translate(2px, 0); }
  40% { clip-path: inset(70% 0 5% 0); transform: translate(-1px, 0); }
  60% { clip-path: inset(30% 0 50% 0); transform: translate(3px, 0); }
  80% { clip-path: inset(80% 0 10% 0); transform: translate(-2px, 0); }
  100% { clip-path: inset(5% 0 90% 0); transform: translate(1px, 0); }
}
@keyframes glitch-2 {
  0% { clip-path: inset(20% 0 70% 0); transform: translate(2px, 0); }
  20% { clip-path: inset(60% 0 30% 0); transform: translate(-3px, 0); }
  40% { clip-path: inset(5% 0 80% 0); transform: translate(1px, 0); }
  60% { clip-path: inset(50% 0 40% 0); transform: translate(-2px, 0); }
  80% { clip-path: inset(15% 0 75% 0); transform: translate(3px, 0); }
  100% { clip-path: inset(70% 0 20% 0); transform: translate(-1px, 0); }
}`,
    instructions: "Les pseudo-elements ::before et ::after creent les copies cyan et rouge avec clip-path anime. L'attribut data-text est requis pour le content: attr(). Style cyberpunk — ajustez les couleurs et l'amplitude des translate.",
  },
};

export function getCodeSnippet(slug: string) {
  return codeSnippets[slug] || null;
}
