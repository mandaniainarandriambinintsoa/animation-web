import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { listAllUsers, updateUserTier } from "@/lib/db-queries";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.tier !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const users = await listAllUsers();
  return NextResponse.json({ users });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.tier !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const body = await request.json();
  const { userId, tier } = body;

  if (!userId || !["free", "pro", "admin"].includes(tier)) {
    return NextResponse.json({ error: "Valid userId and tier required" }, { status: 400 });
  }

  const updated = await updateUserTier(userId, tier);
  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: updated });
}
