"use client";

import { useState } from "react";

interface ApiKey {
  id: string;
  name: string;
  tier: string;
  created_at: string;
  last_used: string | null;
  revoked: boolean;
  key_preview: string;
}

export default function DashboardClient({
  initialKeys,
  userTier,
}: {
  initialKeys: ApiKey[];
  userTier: string;
}) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateKey() {
    setLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: keyName || "Default" }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewKey(data.key);
        setKeyName("");
        // Refresh keys list
        const listRes = await fetch("/api/keys");
        const listData = await listRes.json();
        if (listRes.ok) setKeys(listData.keys);
      }
    } finally {
      setLoading(false);
    }
  }

  async function revokeKey(keyId: string) {
    const res = await fetch("/api/keys", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyId }),
    });
    if (res.ok) {
      setKeys((prev) => prev.map((k) => (k.id === keyId ? { ...k, revoked: true } : k)));
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const activeKeys = keys.filter((k) => !k.revoked);
  const revokedKeys = keys.filter((k) => k.revoked);

  return (
    <div>
      {/* New key banner */}
      {newKey && (
        <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
          <p className="mb-2 text-sm font-medium text-accent">
            Key created! Copy it now — it won&apos;t be shown again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-background px-3 py-2 font-mono text-xs text-foreground">
              {newKey}
            </code>
            <button
              onClick={() => copyToClipboard(newKey)}
              className="rounded-lg border border-border px-3 py-2 text-xs transition-colors hover:bg-background"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="mt-2 text-xs text-muted hover:text-foreground"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Generate key form */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Key name (optional)"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent"
        />
        <button
          onClick={generateKey}
          disabled={loading}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "..." : "Generate Key"}
        </button>
      </div>

      {/* Active keys */}
      {activeKeys.length === 0 ? (
        <p className="text-sm text-muted">No active keys. Generate one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Key</th>
                <th className="pb-2 font-medium">Tier</th>
                <th className="pb-2 font-medium">Created</th>
                <th className="pb-2 font-medium">Last used</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {activeKeys.map((k) => (
                <tr key={k.id} className="border-b border-border/50">
                  <td className="py-3">{k.name}</td>
                  <td className="py-3 font-mono text-xs text-muted">{k.key_preview}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-background px-2 py-0.5 text-xs uppercase">
                      {k.tier}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-muted">
                    {new Date(k.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-xs text-muted">
                    {k.last_used ? new Date(k.last_used).toLocaleDateString() : "Never"}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => revokeKey(k.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Revoked keys */}
      {revokedKeys.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer text-xs text-muted hover:text-foreground">
            {revokedKeys.length} revoked key{revokedKeys.length > 1 ? "s" : ""}
          </summary>
          <div className="mt-2 space-y-1">
            {revokedKeys.map((k) => (
              <div key={k.id} className="flex items-center gap-3 text-xs text-muted line-through">
                <span>{k.name}</span>
                <span className="font-mono">{k.key_preview}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      <p className="mt-4 text-xs text-muted">
        Your tier: <strong className="uppercase text-foreground">{userTier}</strong>
      </p>
    </div>
  );
}
