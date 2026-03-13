import { randomBytes } from "crypto";
import { getDb } from "./db";

// ─── Users ───

export async function findUserByEmail(email: string) {
  const sql = getDb();
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows[0] || null;
}

export async function createUser(name: string, email: string, passwordHash: string) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO users (name, email, password_hash)
    VALUES (${name}, ${email}, ${passwordHash})
    RETURNING *
  `;
  return rows[0];
}

export async function upsertOAuthUser(
  name: string,
  email: string,
  image: string | null,
  provider: string,
  providerAccountId: string
) {
  const sql = getDb();

  // Check if user exists
  let user = (await sql`SELECT * FROM users WHERE email = ${email}`)[0];

  if (!user) {
    // Create user
    user = (
      await sql`
        INSERT INTO users (name, email, email_verified, image)
        VALUES (${name}, ${email}, now(), ${image})
        RETURNING *
      `
    )[0];

    // Generate default API key
    await createApiKey(user.id, "Default", user.tier);
  }

  // Upsert account link
  await sql`
    INSERT INTO accounts (user_id, type, provider, provider_account_id)
    VALUES (${user.id}, 'oauth', ${provider}, ${providerAccountId})
    ON CONFLICT (provider, provider_account_id) DO NOTHING
  `;

  return user;
}

// ─── API Keys ───

export async function findApiKey(key: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id, tier, user_id FROM api_keys
    WHERE key = ${key} AND revoked = false
  `;
  return rows[0] || null;
}

export async function createApiKey(userId: string, name: string, tier: string) {
  const sql = getDb();
  const key = `ak_${tier}_${randomBytes(24).toString("hex")}`;
  const rows = await sql`
    INSERT INTO api_keys (user_id, key, name, tier)
    VALUES (${userId}, ${key}, ${name}, ${tier})
    RETURNING *
  `;
  return rows[0];
}

export async function listUserKeys(userId: string) {
  const sql = getDb();
  return sql`
    SELECT id, name, tier, created_at, last_used, revoked,
           CONCAT(LEFT(key, 12), '...') as key_preview
    FROM api_keys
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
  `;
}

export async function revokeKey(keyId: string, userId: string) {
  const sql = getDb();
  const rows = await sql`
    UPDATE api_keys SET revoked = true
    WHERE id = ${keyId} AND user_id = ${userId}
    RETURNING id
  `;
  return rows[0] || null;
}

export async function updateKeyLastUsed(keyId: string) {
  const sql = getDb();
  await sql`UPDATE api_keys SET last_used = now() WHERE id = ${keyId}`;
}

// ─── Admin ───

export async function listAllUsers() {
  const sql = getDb();
  return sql`
    SELECT u.id, u.name, u.email, u.tier, u.created_at, u.image,
           COUNT(ak.id)::int as keys_count
    FROM users u
    LEFT JOIN api_keys ak ON ak.user_id = u.id AND ak.revoked = false
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `;
}

export async function updateUserTier(userId: string, tier: string) {
  const sql = getDb();
  const rows = await sql`
    UPDATE users SET tier = ${tier}
    WHERE id = ${userId}
    RETURNING id, name, email, tier
  `;
  return rows[0] || null;
}
