import { animations, getAnimation } from "@/lib/animations";
import { getCodeSnippet } from "@/lib/code-snippets";

// ── MCP Protocol (JSON-RPC 2.0) for Next.js App Router ──

const SERVER_INFO = {
  name: "animation-web",
  version: "1.0.0",
};

const TOOLS = [
  {
    name: "list_animations",
    description:
      "Liste toutes les animations disponibles dans la banque. Retourne slug, nom, description, tags, trigger, difficulte. Filtrable par difficulte et tag.",
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
          description: "Filtrer par tag (ex: hover, CSS, SVG, scroll)",
        },
      },
    },
  },
  {
    name: "get_animation",
    description:
      "Recupere le code complet et les instructions d'integration pour une animation specifique. Utilisez le slug obtenu via list_animations.",
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
          description: "Mot-cle de recherche (ex: hover, SVG, carousel, scroll, 3D)",
        },
        include_code: {
          type: "boolean",
          description: "Inclure le code dans les resultats",
          default: false,
        },
      },
      required: ["query"],
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

function handleGetAnimation(args: Record<string, unknown>) {
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

  const snippet = getCodeSnippet(slug);
  let response = `# ${animation.name}\n\n`;
  response += `${animation.description}\n\n`;
  response += `- **Trigger**: ${animation.trigger}\n`;
  response += `- **Difficulte**: ${animation.difficulty}\n`;
  response += `- **CSS requis**: ${animation.cssRequired ? "oui" : "non"}\n`;
  response += `- **Tags**: ${animation.tags.join(", ")}\n\n`;

  if (snippet) {
    response += `## Code JSX/TSX\n\n\`\`\`tsx\n${snippet.code}\n\`\`\`\n\n`;
    if (snippet.css) {
      response += `## CSS requis (a ajouter dans globals.css)\n\n\`\`\`css\n${snippet.css}\n\`\`\`\n\n`;
    }
    response += `## Instructions d'integration\n\n${snippet.instructions}\n`;
  }

  return [{ type: "text", text: response }];
}

function handleSearchAnimations(args: Record<string, unknown>) {
  const query = (args.query as string).toLowerCase();
  const includeCode = args.include_code === true;

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
        text: `Aucune animation trouvee pour "${query}". Essayez: hover, scroll, auto, SVG, CSS, JS, 3D, cards, tabs...`,
      },
    ];
  }

  let text = `${results.length} animation(s) pour "${query}":\n\n`;

  for (const a of results) {
    text += `### ${a.name} (\`${a.slug}\`)\n`;
    text += `${a.description}\n`;
    text += `Tags: ${a.tags.join(", ")} | ${a.trigger} | ${a.difficulty}\n`;

    if (includeCode) {
      const snippet = getCodeSnippet(a.slug);
      if (snippet) {
        text += `\n\`\`\`tsx\n${snippet.code}\n\`\`\`\n`;
        if (snippet.css) text += `\n\`\`\`css\n${snippet.css}\n\`\`\`\n`;
        text += `\n${snippet.instructions}\n`;
      }
    }
    text += "\n";
  }

  return [{ type: "text", text }];
}

// ── JSON-RPC handler ──

function handleJsonRpc(method: string, params?: Record<string, unknown>) {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      };

    case "notifications/initialized":
      return null; // No response for notifications

    case "tools/list":
      return { tools: TOOLS };

    case "tools/call": {
      const toolName = params?.name as string;
      const args = (params?.arguments as Record<string, unknown>) || {};

      switch (toolName) {
        case "list_animations":
          return { content: handleListAnimations(args) };
        case "get_animation":
          return { content: handleGetAnimation(args) };
        case "search_animations":
          return { content: handleSearchAnimations(args) };
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
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Handle batch requests
    if (Array.isArray(body)) {
      const responses = body
        .map((req) => {
          try {
            const result = handleJsonRpc(req.method, req.params);
            if (result === null) return null; // Notification
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
    const result = handleJsonRpc(body.method, body.params);
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

// ── GET: server discovery ──
export async function GET() {
  return new Response(
    JSON.stringify({
      ...SERVER_INFO,
      description:
        "Banque d'animations web production-ready. 12 animations avec code copiable, CSS, et instructions d'integration pour AI agents.",
      protocolVersion: "2025-03-26",
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
