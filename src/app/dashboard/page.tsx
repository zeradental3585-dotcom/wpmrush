import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getLessonProgress, getRecentResults, type TypingResultRow } from "@/lib/db";
import { LESSONS } from "@/lib/lessons";
import { buildMetadata } from "@/lib/seo";
import SignInCta from "@/components/SignInCta";

export const metadata = buildMetadata({
  title: "Your Progress – WPM Rush",
  description: "Track your typing speed, accuracy, and lesson progress over time.",
  path: "/dashboard",
});

export const dynamic = "force-dynamic";

function computeStreak(results: TypingResultRow[]): number {
  if (results.length === 0) return 0;
  const days = new Set(
    results.map((r) => new Date(r.created_at).toISOString().slice(0, 10)),
  );
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayKey = today.toISOString().slice(0, 10);
  const cursor = new Date(today);
  if (!days.has(todayKey)) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

function ProgressChart({ points }: { points: { label: string; wpm: number }[] }) {
  const width = 600;
  const height = 180;
  const paddingLeft = 32;
  const paddingRight = 8;
  const paddingTop = 12;
  const paddingBottom = 24;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;
  const maxWpm = Math.max(10, ...points.map((p) => p.wpm));

  if (points.length === 0) {
    return <p className="text-sm text-faint">Take a test to start your progress chart.</p>;
  }

  const coords = points.map((p, i) => {
    const x =
      paddingLeft +
      (points.length <= 1 ? innerWidth : (i / (points.length - 1)) * innerWidth);
    const y = paddingTop + innerHeight - (p.wpm / maxWpm) * innerHeight;
    return { x, y };
  });

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const areaPoints = [
    `${paddingLeft},${paddingTop + innerHeight}`,
    ...coords.map((c) => `${c.x},${c.y}`),
    `${paddingLeft + innerWidth},${paddingTop + innerHeight}`,
  ].join(" ");
  const yTicks = [0, Math.round(maxWpm / 2), maxWpm];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Your WPM across recent tests, oldest to newest"
    >
      {yTicks.map((tick) => {
        const y = paddingTop + innerHeight - (tick / maxWpm) * innerHeight;
        return (
          <g key={tick}>
            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={y}
              y2={y}
              stroke="rgb(var(--border))"
              strokeWidth={1}
            />
            <text x={0} y={y + 3} fontSize={10} fill="rgb(var(--faint))">
              {tick}
            </text>
          </g>
        );
      })}
      <polygon points={areaPoints} fill="rgb(var(--accent) / 0.08)" stroke="none" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text x={paddingLeft} y={height - 6} fontSize={10} fill="rgb(var(--faint))">
        {points[0]?.label}
      </text>
      <text
        x={width - paddingRight}
        y={height - 6}
        fontSize={10}
        textAnchor="end"
        fill="rgb(var(--faint))"
      >
        {points[points.length - 1]?.label}
      </text>
    </svg>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-5">
      <div className="text-2xl font-semibold text-accent sm:text-3xl">{value}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Track Your Progress
        </h1>
        <p className="text-muted">
          Sign in with Google to save your typing test results and lesson progress, and
          see how your speed improves over time.
        </p>
        <SignInCta />
      </div>
    );
  }

  let results: TypingResultRow[] = [];
  let dbError = false;
  try {
    results = await getRecentResults(session.user.id);
  } catch (err) {
    console.error("Failed to load results for dashboard", err);
    dbError = true;
  }

  let lessonsCompleted = 0;
  try {
    const progress = await getLessonProgress(session.user.id);
    lessonsCompleted = progress.length;
  } catch (err) {
    console.error("Failed to load lesson progress for dashboard", err);
  }

  if (dbError) {
    return (
      <div className="w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Your Progress
        </h1>
        <p className="text-muted">
          We couldn&apos;t load your data right now. Try refreshing in a moment.
        </p>
      </div>
    );
  }

  const testsCount = results.length;
  const bestWpm = testsCount > 0 ? Math.max(...results.map((r) => r.wpm)) : 0;
  const recentForAvg = results.slice(0, 20);
  const avgWpm =
    recentForAvg.length > 0
      ? Math.round(recentForAvg.reduce((a, r) => a + r.wpm, 0) / recentForAvg.length)
      : 0;
  const avgAccuracy =
    recentForAvg.length > 0
      ? Math.round(recentForAvg.reduce((a, r) => a + r.accuracy, 0) / recentForAvg.length)
      : 0;
  const streak = computeStreak(results);

  const chartPoints = [...results]
    .slice(0, 30)
    .reverse()
    .map((r) => ({
      label: new Date(r.created_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      wpm: r.wpm,
    }));

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted">Here&apos;s how your typing has progressed.</p>
      </div>

      {testsCount === 0 ? (
        <div className="rounded-xl border border-border bg-surface/60 p-8 text-center">
          <p className="mb-4 text-muted">
            You haven&apos;t saved any results yet — take a test to get started.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
          >
            Try the typing test
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Tests taken" value={testsCount} />
            <StatCard label="Best WPM" value={bestWpm} />
            <StatCard label="Avg WPM (recent)" value={avgWpm} />
            <StatCard label="Avg accuracy" value={`${avgAccuracy}%`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Day streak" value={streak} />
            <StatCard label="Lessons completed" value={`${lessonsCompleted}/${LESSONS.length}`} />
          </div>

          <div className="rounded-xl border border-border bg-surface/60 p-6">
            <h2 className="mb-3 text-sm font-medium text-secondary">
              WPM over your last {chartPoints.length} tests
            </h2>
            <ProgressChart points={chartPoints} />
          </div>

          <div className="rounded-xl border border-border bg-surface/60 p-6">
            <h2 className="mb-4 text-sm font-medium text-secondary">Recent tests</h2>
            <div className="space-y-2">
              {results.slice(0, 10).map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-faint">
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="text-muted">
                    {r.mode_key} · {r.content_type}
                  </span>
                  <span className="font-medium text-foreground">{r.wpm} WPM</span>
                  <span className="text-muted">{r.accuracy}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {lessonsCompleted < LESSONS.length && (
        <div className="rounded-xl border border-border bg-surface/60 p-6 text-center">
          <p className="mb-4 text-muted">
            {lessonsCompleted === 0
              ? "New to touch typing? Start the free lesson curriculum."
              : "Keep going with the lesson curriculum."}
          </p>
          <Link
            href="/learn"
            className="inline-block rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-hover"
          >
            Go to Learn to Type
          </Link>
        </div>
      )}
    </div>
  );
}
