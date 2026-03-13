import { NextRequest, NextResponse } from "next/server";
import { animations } from "@/lib/animations";
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
    tier,
  }, {
    headers: {
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
    },
  });
}
