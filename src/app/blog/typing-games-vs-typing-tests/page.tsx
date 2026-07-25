import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("typing-games-vs-typing-tests")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function TypingGamesVsTypingTestsPage() {
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
          Typing games are everywhere — falling-word arcade clones, typing-based
          racing games, zombie-shooting spelling drills. They&apos;re genuinely
          fun, and fun matters for sticking with practice at all. But if your
          actual goal is a higher, more reliable WPM, games and structured
          typing tests train very different things, and only one of them
          transfers cleanly to real typing.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What Typing Games Actually Train
        </h2>
        <p>
          Most typing games reward speed on isolated words or short phrases,
          often with power-ups, lives, or score multipliers layered on top.
          That structure teaches you to react fast to short, predictable
          chunks of text — which is a real skill, but a narrow one. It
          doesn&apos;t teach you to sustain pace across a full paragraph, hold
          rhythm through punctuation and capitalization, or recover smoothly
          from a mistake mid-sentence, because games are built around discrete
          rounds rather than continuous, realistic text.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What Structured Tests Train Differently
        </h2>
        <p>
          A timed typing test using ordinary sentences forces you to handle
          typing the way you actually do it at work or in a chat window —
          varied word lengths, mixed punctuation, the occasional awkward
          letter combination. It also gives you one clean, comparable number
          at the end instead of a score inflated by bonus multipliers. That
          matters more than it sounds: if you can&apos;t measure a skill
          consistently, you can&apos;t tell whether you&apos;re actually
          improving or just having a lucky round. Structured practice like the{" "}
          <Link
            href="/blog/how-to-improve-typing-speed"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            deliberate-practice approach
          </Link>{" "}
          of drilling your specific weak letter combinations only works if
          you have a reliable way to see whether it&apos;s working.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Feedback Loop Problem With Games
        </h2>
        <p>
          Good skill-building depends on a tight feedback loop: you make an
          error, you notice it immediately, and you correct the underlying
          habit before it repeats. Many typing games blur this by auto-clearing
          missed words, awarding partial credit, or moving on before you&apos;ve
          registered what went wrong. That keeps the game feeling good, but it
          quietly removes the exact signal you need to improve. A structured
          test that shows you accuracy percentage and error count alongside
          your WPM gives you that signal back — which is also why{" "}
          <Link
            href="/blog/common-typing-mistakes-to-fix"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            habits like excessive backspacing or hunting and pecking
          </Link>{" "}
          tend to surface clearly in a test long before a game would ever flag
          them.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where Games Do Have a Place
        </h2>
        <p>
          None of this means games are worthless. For absolute beginners,
          especially kids, a game&apos;s reward loop can be the difference
          between practicing at all and giving up in the first week. Games
          are also fine as a warm-up or a change of pace once real technique
          is already in place. The problem is treating a game as your primary
          training tool once you&apos;re past the beginner stage — at that
          point, the fun mechanics that made it approachable start actively
          working against the precision you need to keep improving.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Signs You&apos;ve Outgrown Typing Games
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You can already touch type using{" "}
            <Link
              href="/blog/touch-typing-for-beginners"
              className="text-accent underline underline-offset-2 hover:text-accent-strong"
            >
              consistent finger-to-key assignments
            </Link>{" "}
            without looking down.
          </li>
          <li>
            You want a WPM number you can actually compare across sessions,
            or against a real-world benchmark for your job or age group.
          </li>
          <li>
            You&apos;ve noticed a specific bad habit — like relying on two
            fingers or over-correcting every small typo — that a game&apos;s
            forgiving scoring keeps hiding from you.
          </li>
          <li>
            You&apos;re practicing for something concrete: a job&apos;s typing
            requirement, a personal milestone, or just consistency you can
            trust under pressure.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Practical Verdict
        </h2>
        <p>
          Use a game if you need to build the habit of practicing at all.
          Switch to structured tests the moment you care about the number, or
          about fixing a specific weakness — because tests measure exactly
          what real typing demands, with nothing softened to keep the
          experience fun. That honesty is exactly what makes the gains stick.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Skip the power-ups and see your real number.
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
