export interface AnimationEntry {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  trigger: string;
  difficulty: "easy" | "medium" | "hard";
  cssRequired: boolean;
}

export const animations: AnimationEntry[] = [
  {
    slug: "3d-tilt",
    name: "3D Tilt Hero",
    description: "Images eparpillees autour d'un titre. Tout tilt en 3D au passage du curseur sur la section.",
    tags: ["hover", "3D", "JS", "hero", "parallax"],
    trigger: "Mouse move",
    difficulty: "medium",
    cssRequired: false,
  },
  {
    slug: "path-draw",
    name: "SVG Path Draw",
    description: "Un trait SVG se dessine progressivement quand la section entre dans le viewport.",
    tags: ["scroll", "SVG", "reveal", "graph"],
    trigger: "Scroll (IntersectionObserver)",
    difficulty: "easy",
    cssRequired: false,
  },
  {
    slug: "flow-lines",
    name: "Flow Lines",
    description: "Lignes SVG avec dash animees qui coulent vers un hub central. Style architecture technique.",
    tags: ["auto", "SVG", "dash", "workflow", "integration"],
    trigger: "Automatique (boucle)",
    difficulty: "medium",
    cssRequired: true,
  },
  {
    slug: "flow-circles",
    name: "Flow Circles",
    description: "Cercles colores qui voyagent le long de paths SVG. Variante dynamique des flow-lines.",
    tags: ["auto", "SVG", "animateMotion", "workflow"],
    trigger: "Automatique (boucle)",
    difficulty: "medium",
    cssRequired: true,
  },
  {
    slug: "s-curve-arrow",
    name: "S-Curve Arrow",
    description: "Fleche qui parcourt une courbe S smooth entre des etapes. Rotation automatique.",
    tags: ["auto", "SVG", "animateMotion", "timeline", "process"],
    trigger: "Automatique (boucle)",
    difficulty: "medium",
    cssRequired: false,
  },
  {
    slug: "border-spin",
    name: "Border Spin",
    description: "Bordure conic-gradient rotative revelee au hover. Effet premium sur les cards.",
    tags: ["hover", "CSS", "gradient", "card", "glow"],
    trigger: "Hover",
    difficulty: "easy",
    cssRequired: true,
  },
  {
    slug: "scroll-arcs",
    name: "Scroll Arcs",
    description: "Arcs concentriques SVG qui tournent en fonction du scroll. Style dashboard/monitoring.",
    tags: ["scroll", "SVG", "JS", "dashboard"],
    trigger: "Scroll (rAF)",
    difficulty: "hard",
    cssRequired: false,
  },
  {
    slug: "marquee",
    name: "Marquee",
    description: "Defilement horizontal infini de logos ou items. Boucle sans gap.",
    tags: ["auto", "CSS", "logos", "infinite"],
    trigger: "Automatique (boucle)",
    difficulty: "easy",
    cssRequired: true,
  },
  {
    slug: "char-spin",
    name: "Char Spin",
    description: "Chaque caractere apparait avec une rotation Y. Effet machine a ecrire premium.",
    tags: ["trigger", "CSS", "text", "reveal", "code"],
    trigger: "State change",
    difficulty: "easy",
    cssRequired: true,
  },
  {
    slug: "anti-grid-tabs",
    name: "Anti-Grid Tabs",
    description: "Tabs avec courbes concaves qui fusionnent visuellement avec le contenu. Technique mastra.ai.",
    tags: ["click", "CSS", "tabs", "SaaS", "advanced"],
    trigger: "Click",
    difficulty: "hard",
    cssRequired: false,
  },
  {
    slug: "eye-tracking",
    name: "Eye Tracking Tilt",
    description: "Cards avec yeux qui suivent le curseur + tilt 3D interactif. Effet immersif type hero section.",
    tags: ["hover", "JS", "3D", "hero", "interactive"],
    trigger: "Mouse move",
    difficulty: "hard",
    cssRequired: false,
  },
  {
    slug: "card-carousel",
    name: "Card Carousel Effects",
    description: "Carousel horizontal avec differents effets hover par card : fan spread, stack shift, 3D fade, colorize, camera pan.",
    tags: ["hover", "CSS", "carousel", "cards", "SaaS"],
    trigger: "Hover + Scroll",
    difficulty: "medium",
    cssRequired: false,
  },
];

export function getAnimation(slug: string): AnimationEntry | undefined {
  return animations.find((a) => a.slug === slug);
}
