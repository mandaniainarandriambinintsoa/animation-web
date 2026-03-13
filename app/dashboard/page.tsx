import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listUserKeys } from "@/lib/db-queries";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const keys = await listUserKeys(session.user.id);

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{session.user.name}</h1>
          <p className="text-sm text-muted">{session.user.email}</p>
        </div>
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-wider">
          {session.user.tier}
        </span>
      </div>

      {/* API Keys */}
      <div className="rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">API Keys</h2>
        </div>
        <DashboardClient initialKeys={JSON.parse(JSON.stringify(keys))} userTier={session.user.tier} />
      </div>

      {/* Usage info */}
      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-3 text-lg font-semibold">Usage</h2>
        <div className="space-y-2 text-sm text-muted">
          <p>
            <strong className="text-foreground">Free tier:</strong> Animation metadata only. 60 requests/min.
          </p>
          <p>
            <strong className="text-foreground">Pro tier:</strong> Full code snippets + metadata. 300 requests/min.
          </p>
          <p>
            Include your key via <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">x-api-key</code> header
            or <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">api_key</code> query parameter.
          </p>
        </div>
      </div>
    </main>
  );
}
