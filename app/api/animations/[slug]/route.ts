import { NextRequest, NextResponse } from "next/server";
import { getAnimation } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ApiTier } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const tier = (request.headers.get("x-api-tier") || "free") as ApiTier;
  const apiKey = request.headers.get("x-api-key") || "unknown";

  const rl = checkRateLimit(apiKey, tier);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000) },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  const { slug } = await params;
  const animation = getAnimation(slug);
  if (!animation) {
    return NextResponse.json({ error: "Animation not found" }, { status: 404 });
  }

  const canAccessCode = tier === "pro" || tier === "admin";
  const snippet = canAccessCode ? getCodeSnippet(slug) : null;

  return NextResponse.json({
    ...animation,
    url: `/animations/${slug}`,
    previewUrl: `https://animation-web-orpin.vercel.app/animations/${slug}`,
    code: snippet?.code || null,
    css: snippet?.css || null,
    instructions: snippet?.instructions || null,
    tier,
    ...(canAccessCode ? {} : { upgrade: "Use a Pro API key to access the full code for this animation." }),
  }, {
    headers: {
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-RateLimit-Reset": String(rl.resetAt),
    },
  });
}
