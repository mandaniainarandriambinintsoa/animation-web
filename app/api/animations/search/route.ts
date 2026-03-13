import { NextRequest, NextResponse } from "next/server";
import { animations } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ApiTier } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const tier = (request.headers.get("x-api-tier") || "free") as ApiTier;
  const apiKey = request.headers.get("x-api-key") || "unknown";

  const rl = checkRateLimit(apiKey, tier);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000) },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const { searchParams } = request.nextUrl;
  const tags = searchParams.get("tags")?.split(",").map((t) => t.trim().toLowerCase()) || [];
  const difficulty = searchParams.get("difficulty")?.toLowerCase();
  const trigger = searchParams.get("trigger")?.toLowerCase();
  const q = searchParams.get("q")?.toLowerCase();
  const includeCode = searchParams.get("include_code") === "true";

  const canAccessCode = tier === "pro" || tier === "admin";

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

    if (includeCode && canAccessCode) {
      const snippet = getCodeSnippet(a.slug);
      return { ...base, code: snippet?.code || null, css: snippet?.css || null, instructions: snippet?.instructions || null };
    }

    return base;
  });

  return NextResponse.json({
    count: response.length,
    animations: response,
    tier,
    ...(includeCode && !canAccessCode ? { note: "Code access requires a Pro API key. include_code parameter was ignored." } : {}),
  }, {
    headers: {
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
    },
  });
}
