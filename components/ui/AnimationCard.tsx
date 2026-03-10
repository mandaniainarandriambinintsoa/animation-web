"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { AnimationEntry } from "@/lib/animations";

const difficultyColor = {
  easy: "bg-green-500/10 text-green-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  hard: "bg-red-500/10 text-red-400",
};

const previews: Record<string, React.ComponentType> = {
  "3d-tilt": dynamic(() => import("@/components/animations/Preview3DTilt"), { ssr: false }),
  "path-draw": dynamic(() => import("@/components/animations/PreviewPathDraw"), { ssr: false }),
  "flow-lines": dynamic(() => import("@/components/animations/PreviewFlowLines"), { ssr: false }),
  "flow-circles": dynamic(() => import("@/components/animations/PreviewFlowCircles"), { ssr: false }),
  "s-curve-arrow": dynamic(() => import("@/components/animations/PreviewSCurve"), { ssr: false }),
  "border-spin": dynamic(() => import("@/components/animations/PreviewBorderSpin"), { ssr: false }),
  "scroll-arcs": dynamic(() => import("@/components/animations/PreviewScrollArcs"), { ssr: false }),
  "marquee": dynamic(() => import("@/components/animations/PreviewMarquee"), { ssr: false }),
  "char-spin": dynamic(() => import("@/components/animations/PreviewCharSpin"), { ssr: false }),
  "anti-grid-tabs": dynamic(() => import("@/components/animations/PreviewAntiGridTabs"), { ssr: false }),
  "eye-tracking": dynamic(() => import("@/components/animations/PreviewEyeTracking"), { ssr: false }),
  "card-carousel": dynamic(() => import("@/components/animations/PreviewCardCarousel"), { ssr: false }),
};

export default function AnimationCard({ animation }: { animation: AnimationEntry }) {
  const Preview = previews[animation.slug];

  return (
    <Link href={`/animations/${animation.slug}`}>
      <div className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all hover:border-white/10 hover:bg-white/[0.03]">
        {/* Preview live */}
        <div className="relative w-full h-[200px] overflow-hidden pointer-events-none">
          {Preview ? (
            <div className="w-full h-full [&>div]:!h-full [&>div]:!rounded-none">
              <Preview />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/[0.02] text-muted text-sm">
              Preview bientot disponible
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 pt-4 border-t border-border">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
              {animation.name}
            </h3>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${difficultyColor[animation.difficulty]}`}>
              {animation.difficulty}
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">
            {animation.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {animation.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/40">
                {tag}
              </span>
            ))}
            {animation.tags.length > 4 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/40">
                +{animation.tags.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
