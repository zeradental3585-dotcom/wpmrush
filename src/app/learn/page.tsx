import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLessonProgress, type LessonProgressRow } from "@/lib/db";
import { LESSONS, groupLessons } from "@/lib/lessons";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Learn to Type – WPM Rush",
  description:
    "A free, step-by-step typing curriculum — from the home row to full sentences — with progress tracking when you sign in.",
  path: "/learn",
});

export default async function LearnPage() {
  const session = await getServerSession(authOptions);

  let progress: LessonProgressRow[] = [];
  if (session?.user?.id) {
    try {
      progress = await getLessonProgress(session.user.id);
    } catch (err) {
      console.error("Failed to load lesson progress", err);
    }
  }
  const progressBySlug = new Map(progress.map((p) => [p.lesson_slug, p]));
  const groups = groupLessons(LESSONS);
  const completedCount = progress.length;

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Learn to Type
        </h1>
        <p className="text-muted">
          A step-by-step path from the home row to full sentences. Free, no account
          required to practice — sign in to save your progress.
        </p>
        {session?.user && (
          <p className="text-sm text-faint">
            {completedCount} of {LESSONS.length} lessons completed
          </p>
        )}
        {!session?.user && (
          <p className="text-sm text-faint">
            Your progress isn&apos;t being saved right now — sign in with the button in
            the header to track it.
          </p>
        )}
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.group} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-faint">
              {group.group}
            </h2>
            <div className="space-y-3">
              {group.lessons.map((lesson) => {
                const done = progressBySlug.get(lesson.slug);
                return (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${lesson.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 p-5 transition-colors hover:border-border-hover hover:bg-surface"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {lesson.order}. {lesson.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{lesson.description}</p>
                    </div>
                    {done ? (
                      <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        ✓ {done.best_wpm} WPM
                      </span>
                    ) : (
                      <span className="shrink-0 text-faint">→</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
