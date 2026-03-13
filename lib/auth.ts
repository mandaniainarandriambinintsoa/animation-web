export type ApiTier = "free" | "pro" | "admin";

export function tierCanAccessCode(tier: ApiTier): boolean {
  return tier === "pro" || tier === "admin";
}
