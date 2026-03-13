import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createApiKey, listUserKeys, revokeKey } from "@/lib/db-queries";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const keys = await listUserKeys(session.user.id);
  return NextResponse.json({ keys });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();
  const name = body.name || "Default";
  const tier = session.user.tier;

  const key = await createApiKey(session.user.id, name, tier);
  return NextResponse.json({ key: key.key, name: key.name, tier: key.tier });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const body = await request.json();
  const { keyId } = body;

  if (!keyId) {
    return NextResponse.json({ error: "keyId is required" }, { status: 400 });
  }

  const result = await revokeKey(keyId, session.user.id);
  if (!result) {
    return NextResponse.json({ error: "Key not found or not yours" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
