"use client";

import dynamic from "next/dynamic";
import CopyButton from "@/components/ui/CopyButton";
import { getCodeSnippet } from "@/lib/code-snippets";

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

export default function AnimationDetail({ slug }: { slug: string }) {
  const PreviewComponent = previews[slug];
  const snippet = getCodeSnippet(slug);
  const code = snippet?.code || "// Code a venir...";
  const css = snippet?.css;

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

      {/* CSS (if any) */}
      {css && (
        <div>
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">CSS requis</h2>
          <div className="relative rounded-2xl border border-border bg-[#0a0a0a] overflow-hidden">
            <CopyButton text={css} />
            <pre className="p-6 pt-12 overflow-x-auto text-sm leading-relaxed">
              <code className="text-white/70 font-mono">{css}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Instructions */}
      {snippet?.instructions && (
        <div>
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-4">Instructions</h2>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm text-muted leading-relaxed">{snippet.instructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
