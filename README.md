# animation.web

A curated collection of production-ready web animations. Browse, preview live, and copy the code directly into your project.

**[Live Demo](https://animation-web-orpin.vercel.app)**

## Features

- **13 animations** — hover effects, scroll-driven, SVG, CSS-only, interactive JS
- **Live preview** — each animation runs in an interactive sandbox
- **Copy-paste code** — one-click copy for every animation snippet
- **Filterable catalog** — filter by tags (hover, scroll, SVG, CSS, JS...) and difficulty (easy / medium / hard)
- **Fully static** — all pages pre-rendered at build time (SSG)
- **Dark theme** — designed for dark mode with a minimal, modern aesthetic

## Animations

| Animation | Technique | Difficulty |
|-----------|-----------|------------|
| 3D Tilt Hero | perspective + rotateX/Y on mousemove | Medium |
| SVG Path Draw | stroke-dashoffset + IntersectionObserver | Easy |
| Flow Lines | SVG dash animation loop | Medium |
| Flow Circles | SVG `<animateMotion>` along paths | Medium |
| S-Curve Arrow | `<animateMotion>` with spline easing | Medium |
| Border Spin | conic-gradient + `@property` rotation | Easy |
| Scroll Arcs | Concentric arcs rotating on scroll (rAF) | Hard |
| Marquee | Infinite horizontal scroll (CSS only) | Easy |
| Char Spin | Per-character rotateY reveal | Easy |
| Anti-Grid Tabs | Concave curves with boxShadow technique | Hard |
| Anti-Grid Bento | 2D bento grid with clipPath concave curves + bridges | Hard |
| Eye Tracking Tilt | Pupils follow cursor + 3D card tilt | Hard |
| Card Carousel | Fan spread, stack shift, 3D fade, colorize, camera pan | Medium |

## Tech Stack

- **Next.js 16** (App Router, Static Site Generation)
- **TypeScript**
- **Tailwind CSS v4**
- **Geist** font family (Sans + Mono)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                    Landing page with animation grid
  animations/
    page.tsx                  Filterable catalog
    [slug]/page.tsx           Animation detail (SSG)
components/
  animations/                 13 live preview components
  ui/                         AnimationCard, CopyButton
lib/
  animations.ts               Animation data (slug, tags, difficulty)
```

## Deployment

Deployed on **Vercel** with zero configuration. Every push to `master` triggers a new build.

## License

MIT
