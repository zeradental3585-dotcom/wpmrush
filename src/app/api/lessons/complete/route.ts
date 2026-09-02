import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveLessonProgress } from "@/lib/db";
import { getLesson } from "@/lib/lessons";

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

  const { lessonSlug, wpm, accuracy } = (body ?? {}) as Record<string, unknown>;

  if (typeof lessonSlug !== "string" || typeof wpm !== "number" || typeof accuracy !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!getLesson(lessonSlug)) {
    return NextResponse.json({ error: "Unknown lesson" }, { status: 400 });
  }

  try {
    await saveLessonProgress({ userId: session.user.id, lessonSlug, wpm, accuracy });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save lesson progress", err);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
