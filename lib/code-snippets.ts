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
};

export function getCodeSnippet(slug: string) {
  return codeSnippets[slug] || null;
}
