import Link from "next/link";
import { animations } from "@/lib/animations";
import AnimationCard from "@/components/ui/AnimationCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-16 sm:py-32 px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8">
          <span className="text-xs font-medium text-accent">{animations.length} animations</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center leading-tight tracking-tight max-w-2xl">
          Banque d&apos;animations
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 text-lg text-muted text-center max-w-lg leading-relaxed">
          Des animations production-ready. Preview live, code copiable, props configurables.
        </p>
        <div className="flex gap-3 mt-10">
          <Link
            href="/animations"
            className="h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium flex items-center hover:bg-foreground/90 transition-colors"
          >
            Explorer
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 rounded-full border border-border text-sm font-medium text-foreground flex items-center hover:bg-white/5 transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Featured grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-16 sm:pb-32">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider mb-8">
          Toutes les animations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {animations.map((anim) => (
            <AnimationCard key={anim.slug} animation={anim} />
          ))}
        </div>
      </section>
    </div>
  );
}
