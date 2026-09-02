"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import TypingTest, { type TypingTestFinishStats } from "@/components/TypingTest";

export default function LessonRunner({
  lessonSlug,
  practiceText,
  nextLessonSlug,
  nextLessonTitle,
}: {
  lessonSlug: string;
  practiceText: string;
  nextLessonSlug: string | null;
  nextLessonTitle: string | null;
}) {
  const { data: session } = useSession();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastStats, setLastStats] = useState<TypingTestFinishStats | null>(null);

  function handleFinish(stats: TypingTestFinishStats) {
    setLastStats(stats);
    if (!session?.user) {
      setStatus("idle");
      return;
    }
    setStatus("saving");
    fetch("/api/lessons/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonSlug, wpm: stats.wpm, accuracy: stats.accuracy }),
    })
      .then((res) => setStatus(res.ok ? "saved" : "error"))
      .catch(() => setStatus("error"));
  }

  return (
    <div className="w-full space-y-6">
      <TypingTest customText={practiceText} onFinish={handleFinish} />

      {lastStats && (
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 text-center">
          {!session?.user && (
            <div className="rounded-xl border border-border bg-surface/60 px-5 py-4">
              <p className="mb-3 text-sm text-muted">
                Sign in to save your lesson progress and unlock streaks.
              </p>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
              >
                Sign in with Google
              </button>
            </div>
          )}

          {session?.user && (
            <p className="text-sm text-faint">
              {status === "saving" && "Saving progress…"}
              {status === "saved" && "✓ Lesson progress saved."}
              {status === "error" && "Couldn't save progress — check your connection."}
            </p>
          )}

          {nextLessonSlug && (
            <Link
              href={`/learn/${nextLessonSlug}`}
              className="rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
            >
              Next lesson: {nextLessonTitle} →
            </Link>
          )}
          {!nextLessonSlug && (
            <Link
              href="/"
              className="rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
            >
              You finished the curriculum — try the full typing test →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
