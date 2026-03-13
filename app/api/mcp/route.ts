import { NextRequest } from "next/server";
import { animations, getAnimation } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ApiTier } from "@/lib/auth";

// ── MCP Protocol (JSON-RPC 2.0) for Next.js App Router ──

const SERVER_INFO = {
  name: "animation-web",
  version: "2.0.0",
};

const BASE_URL = "https://animation-web-orpin.vercel.app";

const TOOLS = [
  {
    name: "list_animations",
    description:
      "Liste toutes les animations disponibles dans la banque (48 animations). Retourne slug, nom, description, tags, trigger, difficulte. Filtrable par difficulte et tag.",
    inputSchema: {
      type: "object" as const,
      properties: {
        difficulty: {
          type: "string",
          enum: ["easy", "medium", "hard"],
          description: "Filtrer par difficulte",
        },
        tag: {
          type: "string",
          description: "Filtrer par tag (ex: hover, CSS, SVG, scroll, 3D, text, card)",
        },
      },
    },
  },
  {
    name: "get_animation",
    description:
      "Recupere les details et le code complet d'une animation specifique. Le code n'est disponible qu'avec une cle Pro.",
    inputSchema: {
      type: "object" as const,
      properties: {
        slug: {
          type: "string",
          description: "Le slug de l'animation (ex: marquee, border-spin, 3d-tilt)",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "search_animations",
    description:
      "Recherche des animations par mot-cle dans le nom, la description ou les tags.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Mot-cle de recherche (ex: hover, SVG, carousel, scroll, 3D, text, tabs)",
        },
        include_code: {
          type: "boolean",
          description: "Inclure le code dans les resultats (Pro uniquement)",
          default: false,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_preview_url",
    description:
      "Retourne l'URL de la preview live d'une animation sur le site deploye.",
    inputSchema: {
      type: "object" as const,
      properties: {
        slug: {
          type: "string",
          description: "Le slug de l'animation",
        },
      },
      required: ["slug"],
    },
  },
];

// ── Tool handlers ──

function handleListAnimations(args: Record<string, unknown>) {
  let results = [...animations];

  if (args.difficulty) {
    results = results.filter((a) => a.difficulty === args.difficulty);
  }
  if (args.tag) {
    const tagLower = (args.tag as string).toLowerCase();
    results = results.filter((a) =>
      a.tags.some((t) => t.toLowerCase().includes(tagLower))
    );
  }

  const text = results
    .map(
      (a) =>
        `**${a.name}** (\`${a.slug}\`)\n  ${a.description}\n  Tags: ${a.tags.join(", ")} | Trigger: ${a.trigger} | Difficulte: ${a.difficulty} | CSS requis: ${a.cssRequired ? "oui" : "non"}`
    )
    .join("\n\n");

  return [{ type: "text", text: `${results.length} animation(s) trouvee(s):\n\n${text}` }];
}

function handleGetAnimation(args: Record<string, unknown>, tier: ApiTier) {
  const slug = args.slug as string;
  const animation = getAnimation(slug);
  if (!animation) {
    return [
      {
        type: "text",
        text: `Animation "${slug}" non trouvee. Utilisez list_animations pour voir les slugs disponibles.`,
      },
    ];
  }

  const canAccessCode = tier === "pro" || tier === "admin";
  const snippet = canAccessCode ? getCodeSnippet(slug) : null;

  let response = `# ${animation.name}\n\n`;
  response += `${animation.description}\n\n`;
  response += `- **Trigger**: ${animation.trigger}\n`;
  response += `- **Difficulte**: ${animation.difficulty}\n`;
  response += `- **CSS requis**: ${animation.cssRequired ? "oui" : "non"}\n`;
  response += `- **Tags**: ${animation.tags.join(", ")}\n`;
  response += `- **Preview**: ${BASE_URL}/animations/${slug}\n\n`;

  if (snippet) {
    response += `## Code JSX/TSX\n\n\`\`\`tsx\n${snippet.code}\n\`\`\`\n\n`;
    if (snippet.css) {
      response += `## CSS requis (a ajouter dans globals.css)\n\n\`\`\`css\n${snippet.css}\n\`\`\`\n\n`;
    }
    response += `## Instructions d'integration\n\n${snippet.instructions}\n`;
  } else if (!canAccessCode) {
    response += `> **Code non disponible** — Utilisez une cle API Pro pour acceder au code complet de cette animation.\n`;
  }

  return [{ type: "text", text: response }];
}

function handleSearchAnimations(args: Record<string, unknown>, tier: ApiTier) {
  const query = (args.query as string).toLowerCase();
  const includeCode = args.include_code === true;
  const canAccessCode = tier === "pro" || tier === "admin";

  const results = animations.filter(
    (a) =>
      a.name.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.tags.some((t) => t.toLowerCase().includes(query)) ||
      a.trigger.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    return [
      {
        type: "text",
        text: `Aucune animation trouvee pour "${query}". Essayez: hover, scroll, auto, SVG, CSS, JS, 3D, cards, tabs, text, background...`,
      },
    ];
  }

  let text = `${results.length} animation(s) pour "${query}":\n\n`;

  for (const a of results) {
    text += `### ${a.name} (\`${a.slug}\`)\n`;
    text += `${a.description}\n`;
    text += `Tags: ${a.tags.join(", ")} | ${a.trigger} | ${a.difficulty}\n`;
    text += `Preview: ${BASE_URL}/animations/${a.slug}\n`;

    if (includeCode && canAccessCode) {
      const snippet = getCodeSnippet(a.slug);
      if (snippet) {
        text += `\n\`\`\`tsx\n${snippet.code}\n\`\`\`\n`;
        if (snippet.css) text += `\n\`\`\`css\n${snippet.css}\n\`\`\`\n`;
        text += `\n${snippet.instructions}\n`;
      }
    }
    text += "\n";
  }

  if (includeCode && !canAccessCode) {
    text += `\n> **Note**: Le code n'est pas inclus — utilisez une cle API Pro pour acceder au code.\n`;
  }

  return [{ type: "text", text }];
}

function handleGetPreviewUrl(args: Record<string, unknown>) {
  const slug = args.slug as string;
  const animation = getAnimation(slug);
  if (!animation) {
    return [
      {
        type: "text",
        text: `Animation "${slug}" non trouvee. Utilisez list_animations pour voir les slugs disponibles.`,
      },
    ];
  }

  return [
    {
      type: "text",
      text: `**${animation.name}** — Preview live:\n${BASE_URL}/animations/${slug}`,
    },
  ];
}

// ── JSON-RPC handler ──

function handleJsonRpc(method: string, tier: ApiTier, params?: Record<string, unknown>) {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      };

    case "notifications/initialized":
      return null;

    case "tools/list":
      return { tools: TOOLS };

    case "tools/call": {
      const toolName = params?.name as string;
      const args = (params?.arguments as Record<string, unknown>) || {};

      switch (toolName) {
        case "list_animations":
          return { content: handleListAnimations(args) };
        case "get_animation":
          return { content: handleGetAnimation(args, tier) };
        case "search_animations":
          return { content: handleSearchAnimations(args, tier) };
        case "get_preview_url":
          return { content: handleGetPreviewUrl(args) };
        default:
          throw { code: -32601, message: `Tool not found: ${toolName}` };
      }
    }

    case "ping":
      return {};

    default:
      throw { code: -32601, message: `Method not found: ${method}` };
  }
}

// ── POST: MCP endpoint ──
export async function POST(request: NextRequest) {
  const tier = (request.headers.get("x-api-tier") || "free") as ApiTier;
  const apiKey = request.headers.get("x-api-key") || "unknown";

  const rl = checkRateLimit(apiKey, tier);
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32000, message: "Rate limit exceeded" },
      }),
      { status: 429, headers: { "Content-Type": "application/json", "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const body = await request.json();

    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = body
        .map((req) => {
          try {
            const result = handleJsonRpc(req.method, tier, req.params);
            if (result === null) return null;
            return { jsonrpc: "2.0", id: req.id, result };
          } catch (err) {
            const error = err as { code?: number; message?: string };
            return {
              jsonrpc: "2.0",
              id: req.id,
              error: { code: error.code || -32603, message: error.message || "Internal error" },
            };
          }
        })
        .filter(Boolean);

      return new Response(JSON.stringify(responses), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Single request
    const result = handleJsonRpc(body.method, tier, body.params);
    if (result === null) {
      return new Response(null, { status: 204 });
    }

    return new Response(
      JSON.stringify({ jsonrpc: "2.0", id: body.id, result }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    const error = err as { code?: number; message?: string };
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: error.code || -32603, message: error.message || "Internal error" },
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ── GET: server discovery (open, no auth required) ──
export async function GET() {
  return new Response(
    JSON.stringify({
      ...SERVER_INFO,
      description:
        "Banque de 48 animations web production-ready. Code copiable, CSS, et instructions d'integration pour AI agents. Tiers: free (metadata), pro (full code).",
      protocolVersion: "2025-03-26",
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      authentication: {
        type: "api-key",
        header: "x-api-key",
        tiers: {
          free: "Metadata, search, list — no code access",
          pro: "Full code access + all tools",
        },
      },
      configuration: {
        claude_desktop: {
          mcpServers: {
            "animation-web": {
              command: "npx",
              args: ["-y", "mcp-remote", `${BASE_URL}/api/mcp`],
              env: { API_KEY: "your-api-key-here" },
            },
          },
        },
        claude_code: `claude mcp add animation-web -- npx -y mcp-remote ${BASE_URL}/api/mcp`,
      },
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
