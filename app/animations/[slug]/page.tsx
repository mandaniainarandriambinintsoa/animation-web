import { notFound } from "next/navigation";
import Link from "next/link";
import { animations, getAnimation } from "@/lib/animations";
import AnimationDetail from "./AnimationDetail";

export function generateStaticParams() {
  return animations.map((a) => ({ slug: a.slug }));
}

export default async function AnimationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const animation = getAnimation(slug);
  if (!animation) notFound();

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/animations" className="hover:text-foreground transition-colors">Animations</Link>
        <span>/</span>
        <span className="text-foreground">{animation.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{animation.name}</h1>
          <p className="text-muted max-w-lg text-sm sm:text-base">{animation.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {animation.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 text-sm">
        <div>
          <span className="text-muted">Trigger: </span>
          <span className="text-foreground">{animation.trigger}</span>
        </div>
        <div>
          <span className="text-muted">CSS requis: </span>
          <span className="text-foreground">{animation.cssRequired ? "Oui" : "Non"}</span>
        </div>
        <div>
          <span className="text-muted">Difficulte: </span>
          <span className="text-foreground capitalize">{animation.difficulty}</span>
        </div>
      </div>

      <AnimationDetail slug={slug} />
    </div>
  );
}
