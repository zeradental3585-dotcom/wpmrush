import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveTypingResult, getRecentResults } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { wpm, rawWpm, accuracy, consistency, modeKey, contentType } =
    (body ?? {}) as Record<string, unknown>;

  if (
    typeof wpm !== "number" ||
    typeof rawWpm !== "number" ||
    typeof accuracy !== "number" ||
    typeof consistency !== "number" ||
    typeof modeKey !== "string" ||
    typeof contentType !== "string"
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    await saveTypingResult({
      userId: session.user.id,
      wpm,
      rawWpm,
      accuracy,
      consistency,
      modeKey,
      contentType,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save typing result", err);
    return NextResponse.json({ error: "Failed to save result" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const results = await getRecentResults(session.user.id);
    return NextResponse.json({ results });
  } catch (err) {
    console.error("Failed to fetch typing results", err);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
