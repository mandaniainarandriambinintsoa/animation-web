import { NextResponse } from "next/server";
import { getAnimation } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const animation = getAnimation(slug);
  if (!animation) {
    return NextResponse.json({ error: "Animation not found" }, { status: 404 });
  }

  const snippet = getCodeSnippet(slug);

  return NextResponse.json({
    ...animation,
    url: `/animations/${slug}`,
    code: snippet?.code || null,
    css: snippet?.css || null,
    instructions: snippet?.instructions || null,
  });
}
