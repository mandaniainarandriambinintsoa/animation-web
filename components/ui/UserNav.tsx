"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-8 w-16 animate-pulse rounded bg-border" />;
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        Dashboard
      </Link>
      {session.user.tier === "admin" && (
        <Link
          href="/admin"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Admin
        </Link>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded-lg border border-border px-3 py-1.5 text-sm transition-colors hover:bg-surface"
      >
        Sign out
      </button>
    </div>
  );
}
