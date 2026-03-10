"use client";

import { useState, useMemo } from "react";
import { animations } from "@/lib/animations";
import AnimationCard from "@/components/ui/AnimationCard";

const allTags = Array.from(
  new Set(animations.flatMap((a) => a.tags))
).sort();

const difficulties = ["easy", "medium", "hard"] as const;

export default function AnimationsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return animations;
    if (difficulties.includes(activeTag as (typeof difficulties)[number])) {
      return animations.filter((a) => a.difficulty === activeTag);
    }
    return animations.filter((a) => a.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Animations</h1>
      <p className="text-muted mb-10">
        {filtered.length} animation{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Filter tags */}
      <div className="flex flex-nowrap sm:flex-wrap gap-2 mb-8 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-none">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
            activeTag === null
              ? "bg-accent text-background"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          Tous
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
              activeTag === tag
                ? "bg-accent text-background"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {tag}
          </button>
        ))}
        {/* Difficulty filters */}
        <span className="w-px h-5 bg-border self-center mx-1" />
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setActiveTag(activeTag === d ? null : d)}
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
              activeTag === d
                ? "bg-accent text-background"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((anim) => (
          <AnimationCard key={anim.slug} animation={anim} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted py-20">
          Aucune animation pour le tag &quot;{activeTag}&quot;
        </p>
      )}
    </div>
  );
}
