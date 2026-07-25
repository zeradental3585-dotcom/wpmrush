import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("average-wpm-by-age-profession")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function AverageWpmPage() {
  return (
    <article className="w-full max-w-2xl space-y-6">
      <JsonLd data={buildArticleSchema(post)} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-faint">{post.readTime}</p>
      </div>

      <div className="space-y-4 text-muted">
        <p>
          &quot;Is 45 WPM good?&quot; depends entirely on who&apos;s asking. For
          someone three months into learning to type, yes — that&apos;s
          strong progress. For someone applying to a data-entry role, it
          probably falls short. Below is a breakdown of what typing speed
          actually looks like by skill level, age, and profession, so you
          can compare yourself against a relevant baseline instead of a
          vague average.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What Counts as a Good WPM by Skill Level
        </h2>
        <p>
          The general population averages somewhere around 40 WPM, but
          that number hides a wide range depending on how someone learned
          to type and how often they use a keyboard day to day:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-secondary">Beginner</strong> — 10–25
            WPM, still locating keys and relying on partial touch typing.
          </li>
          <li>
            <strong className="text-secondary">Developing typist</strong> —
            25–40 WPM, comfortable on the home row but inconsistent
            reaching for other rows.
          </li>
          <li>
            <strong className="text-secondary">Average adult typist</strong>{" "}
            — 40–55 WPM, the range most regular computer users fall into.
          </li>
          <li>
            <strong className="text-secondary">Above-average typist</strong>{" "}
            — 55–70 WPM, consistent touch typing with few corrections.
          </li>
          <li>
            <strong className="text-secondary">Professional-level</strong> —
            70–90 WPM, typical for roles where typing speed is part of the
            job.
          </li>
          <li>
            <strong className="text-secondary">Elite / competitive</strong>{" "}
            — 100+ WPM, and competitive typists occasionally hit 150+ in
            short bursts, though that&apos;s rarely sustained over a full
            passage.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          A Simple Reference Table
        </h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-secondary">
                <th className="px-4 py-2 font-semibold">Level</th>
                <th className="px-4 py-2 font-semibold">Typical WPM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="px-4 py-2">Beginner</td>
                <td className="px-4 py-2">10–25 WPM</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Developing typist</td>
                <td className="px-4 py-2">25–40 WPM</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Average adult</td>
                <td className="px-4 py-2">40–55 WPM</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Above average</td>
                <td className="px-4 py-2">55–70 WPM</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Professional</td>
                <td className="px-4 py-2">70–90 WPM</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Elite / competitive</td>
                <td className="px-4 py-2">100+ WPM</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          WPM Benchmarks by Age
        </h2>
        <p>
          Age itself correlates less with typing ability than how much
          someone actually uses a keyboard day to day. Rough ranges:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-secondary">Kids learning to type (8–12)</strong>{" "}
            — 10–20 WPM, while fine motor skills and key familiarity are
            still developing.
          </li>
          <li>
            <strong className="text-secondary">Teenagers (13–18)</strong> —
            30–45 WPM. Many grew up messaging and gaming, so they can
            sometimes outpace adults here, though often with lower
            accuracy.
          </li>
          <li>
            <strong className="text-secondary">
              Adults in keyboard-heavy jobs (20s–40s)
            </strong>{" "}
            — 45–65 WPM, since daily typing at work naturally compounds
            skill over time.
          </li>
          <li>
            <strong className="text-secondary">
              Adults in less keyboard-heavy roles or 50+
            </strong>{" "}
            — 30–45 WPM typical. This isn&apos;t a biological decline in
            ability — it&apos;s a decline in daily practice frequency.
            Someone who types 60 WPM daily will keep that speed regardless
            of age.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          WPM Benchmarks by Profession
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-secondary">General office / admin</strong>{" "}
            — 40–55 WPM.
          </li>
          <li>
            <strong className="text-secondary">Software developer</strong> —
            50–70 WPM, though raw WPM is a weaker signal here since code
            involves short bursts and heavy symbol use rather than flowing
            prose.
          </li>
          <li>
            <strong className="text-secondary">Writer / journalist</strong>{" "}
            — 60–80 WPM.
          </li>
          <li>
            <strong className="text-secondary">
              Customer support / live chat agent
            </strong>{" "}
            — 55–75 WPM, where speed under pressure matters since typos go
            out to a customer in real time.
          </li>
          <li>
            <strong className="text-secondary">
              Data entry / transcription specialist
            </strong>{" "}
            — 70–100+ WPM, usually the highest sustained speeds since the
            role specifically trains for it.
          </li>
          <li>
            <strong className="text-secondary">
              Court reporter / stenographer
            </strong>{" "}
            — 180–225 WPM, but on a stenotype machine using chorded key
            combinations, not a standard QWERTY keyboard — worth noting
            since it&apos;s often compared unfairly to regular typing.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why WPM Isn&apos;t the Whole Picture
        </h2>
        <p>
          Accuracy usually matters more than peak speed in real work. A 90
          WPM typist running at 85% accuracy spends more time correcting
          mistakes than a 65 WPM typist running at 98% accuracy. Consistency
          — not your best score on a good day — is what actually reflects
          skill.
        </p>
        <h3 className="text-lg font-semibold text-secondary">
          Why a single test result can be misleading
        </h3>
        <p>
          A single 15-second burst can flatter almost anyone — a short
          streak of easy, familiar words inflates the number well above
          what you&apos;d sustain over a full minute. If you want a number
          that actually represents your typing, take the average of three
          or four separate tests rather than reporting your single best
          run. It also matters what you&apos;re taking the test on — a
          structured typing test gives you a comparable, honest number in a
          way{" "}
          <Link
            href="/blog/typing-games-vs-typing-tests"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            gamified typing apps generally don&apos;t
          </Link>
          .
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          How to Use These Numbers
        </h2>
        <p>
          Compare yourself against the category that matches how you
          actually use a keyboard, not your age bracket alone. Treat these
          ranges as a target for your next milestone, not a judgment on
          where you are today. If you&apos;re applying for a role with a
          stated WPM requirement, aim to comfortably clear it on an average
          attempt, not just your personal best — hiring tests and on-the-job
          performance both reward consistency over a single lucky run.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Curious where you land on this scale?
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
        >
          Try the typing test
        </Link>
      </div>
    </article>
  );
}
