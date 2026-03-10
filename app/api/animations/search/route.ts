import { NextRequest, NextResponse } from "next/server";
import { animations } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tags = searchParams.get("tags")?.split(",").map((t) => t.trim().toLowerCase()) || [];
  const difficulty = searchParams.get("difficulty")?.toLowerCase();
  const trigger = searchParams.get("trigger")?.toLowerCase();
  const q = searchParams.get("q")?.toLowerCase();
  const includeCode = searchParams.get("include_code") === "true";

  let results = [...animations];

  if (tags.length > 0) {
    results = results.filter((a) =>
      tags.some((tag) => a.tags.map((t) => t.toLowerCase()).includes(tag))
    );
  }

  if (difficulty) {
    results = results.filter((a) => a.difficulty === difficulty);
  }

  if (trigger) {
    results = results.filter((a) =>
      a.trigger.toLowerCase().includes(trigger)
    );
  }

  if (q) {
    results = results.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const response = results.map((a) => {
    const base = {
      slug: a.slug,
      name: a.name,
      description: a.description,
      tags: a.tags,
      trigger: a.trigger,
      difficulty: a.difficulty,
      cssRequired: a.cssRequired,
      url: `/animations/${a.slug}`,
    };

    if (includeCode) {
      const snippet = getCodeSnippet(a.slug);
      return { ...base, code: snippet?.code || null, css: snippet?.css || null, instructions: snippet?.instructions || null };
    }

    return base;
  });

  return NextResponse.json({ count: response.length, animations: response });
}
