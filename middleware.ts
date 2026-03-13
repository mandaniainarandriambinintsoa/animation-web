import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // MCP discovery (GET /api/mcp) is open
  if (pathname === "/api/mcp" && request.method === "GET") {
    return NextResponse.next();
  }

  // Auth routes are open
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // API keys management — session-based, validated in route handler
  if (pathname === "/api/keys") {
    return NextResponse.next();
  }

  // Admin routes — session-based, validated in route handler
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  // All other /api/* routes require an API key
  const apiKey = request.headers.get("x-api-key") || request.nextUrl.searchParams.get("api_key");

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "API key required",
        message: "Include your API key via x-api-key header or api_key query parameter. Get your key at /signup",
        docs: "/api/mcp",
      },
      { status: 401 }
    );
  }

  // Validate key against database
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const rows = await sql`
      SELECT id, tier FROM api_keys
      WHERE key = ${apiKey} AND revoked = false
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid API key", message: "The provided API key is not valid or has been revoked." },
        { status: 403 }
      );
    }

    const { id: keyId, tier } = rows[0];

    const response = NextResponse.next();
    response.headers.set("x-api-tier", tier);
    response.headers.set("x-api-key-id", apiKey.slice(0, 12) + "...");

    // Fire-and-forget: update last_used
    sql`UPDATE api_keys SET last_used = now() WHERE id = ${keyId}`.catch(() => {});

    return response;
  } catch (error) {
    console.error("Middleware DB error:", error);
    return NextResponse.json(
      { error: "Internal error", message: "Failed to validate API key" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};
