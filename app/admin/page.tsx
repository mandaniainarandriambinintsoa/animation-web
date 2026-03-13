import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { listAllUsers } from "@/lib/db-queries";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.tier !== "admin") redirect("/dashboard");

  const users = await listAllUsers();

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Admin Panel</h1>
      <p className="mb-8 text-sm text-muted">Manage users and their tiers</p>

      <div className="rounded-xl border border-border bg-surface p-6">
        <AdminClient initialUsers={JSON.parse(JSON.stringify(users))} />
      </div>
    </main>
  );
}
