import { NextResponse } from "next/server";
import { animations } from "@/lib/animations";

export async function GET() {
  return NextResponse.json({
    count: animations.length,
    animations: animations.map((a) => ({
      slug: a.slug,
      name: a.name,
      description: a.description,
      tags: a.tags,
      trigger: a.trigger,
      difficulty: a.difficulty,
      cssRequired: a.cssRequired,
      url: `/animations/${a.slug}`,
    })),
  });
}
