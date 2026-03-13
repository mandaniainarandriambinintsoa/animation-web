"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  created_at: string;
  image: string | null;
  keys_count: number;
}

export default function AdminClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [updating, setUpdating] = useState<string | null>(null);

  async function changeTier(userId: string, newTier: string) {
    setUpdating(userId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, tier: newTier }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, tier: newTier } : u))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs text-muted">
            <th className="pb-2 font-medium">Name</th>
            <th className="pb-2 font-medium">Email</th>
            <th className="pb-2 font-medium">Tier</th>
            <th className="pb-2 font-medium">Keys</th>
            <th className="pb-2 font-medium">Joined</th>
            <th className="pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-border/50">
              <td className="py-3">{u.name || "—"}</td>
              <td className="py-3 text-muted">{u.email}</td>
              <td className="py-3">
                <span className="rounded-full bg-background px-2 py-0.5 text-xs uppercase">
                  {u.tier}
                </span>
              </td>
              <td className="py-3 text-muted">{u.keys_count}</td>
              <td className="py-3 text-xs text-muted">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
              <td className="py-3">
                <select
                  value={u.tier}
                  onChange={(e) => changeTier(u.id, e.target.value)}
                  disabled={updating === u.id}
                  className="rounded border border-border bg-background px-2 py-1 text-xs outline-none"
                >
                  <option value="free">free</option>
                  <option value="pro">pro</option>
                  <option value="admin">admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-muted">{users.length} user{users.length !== 1 ? "s" : ""} total</p>
    </div>
  );
}
