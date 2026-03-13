import { ApiTier } from "./auth";

const LIMITS: Record<ApiTier, number> = {
  free: 60,
  pro: 300,
  admin: 1000,
};

const WINDOW_MS = 60_000; // 1 minute

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 300_000);

export function checkRateLimit(
  key: string,
  tier: ApiTier
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const limit = LIMITS[tier];
  let entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    store.set(key, entry);
  }

  entry.count++;

  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}
