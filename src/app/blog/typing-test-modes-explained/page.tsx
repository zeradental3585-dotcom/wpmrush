import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("typing-test-modes-explained")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function TypingTestModesExplainedPage() {
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
          Most typing tests offer more than one mode, and it&apos;s easy to
          just pick whichever one loads first without thinking about why it
          exists. Each mode is actually testing a slightly different skill,
          and knowing the difference helps you pick the right one depending
          on whether you&apos;re practicing, benchmarking yourself, or just
          killing five minutes.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Time-Based Tests (15s, 30s, 60s)
        </h2>
        <p>
          A time-based test runs for a fixed duration and measures how much
          you type in that window, regardless of how much text that turns
          out to be. This is the closest thing to a standardized benchmark,
          since everyone is compared against the same clock rather than the
          same passage — a 60-second test is generally considered the most
          reliable single-run number because it smooths out the small
          bursts of speed or hesitation that skew shorter tests. Shorter
          windows like 15 or 30 seconds are useful for quick warm-ups or
          rapid-fire practice reps, but they&apos;re noisier: a single
          fumbled word has a much bigger effect on your score over 15
          seconds than over 60.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Word-Count Tests (25, 50, 100 words)
        </h2>
        <p>
          Word-count tests flip the format around — instead of a fixed time,
          you have a fixed amount of text, and the clock runs until you
          finish it. These are useful when you want to compare your own
          runs apples-to-apples on identical content, or when you&apos;re
          practicing endurance and consistency rather than a quick burst.
          The tradeoff is that word-count tests can feel slower to start
          (you can see exactly how much is left, which affects pacing
          psychologically) and they&apos;re less standardized for comparing
          against other people, since finishing time varies with your speed.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Common Words Mode
        </h2>
        <p>
          This mode pulls from a pool of the most frequently used words in
          English, randomly ordered. Because the words are short and
          familiar, it tends to produce the highest speeds of any mode — it
          isolates raw finger-to-key speed with minimal thinking overhead,
          since you&apos;re not parsing unfamiliar words or complex
          sentence structure. It&apos;s a good mode for pure mechanical
          practice, but a less realistic proxy for how fast you&apos;ll type
          when writing an actual email or document.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Quote Mode
        </h2>
        <p>
          Quote mode uses real sentences — often from books, speeches, or
          famous lines — with natural grammar, punctuation, and varied word
          length. This is closer to real-world typing than common-words
          mode, since you have to process actual sentence structure, handle
          capitalization, and hit punctuation keys that don&apos;t appear in
          a stream of lowercase common words. Scores on quote mode are
          usually a few WPM lower than common-words mode for the same
          person, which is expected — it&apos;s measuring a slightly harder,
          more realistic task.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Punctuation Mode
        </h2>
        <p>
          Punctuation mode deliberately injects commas, periods, semicolons,
          quotation marks, and other symbols at a higher rate than normal
          prose. It exists to stress-test the part of typing that most
          practice ignores: reaching for number-row and shifted keys
          without breaking rhythm. If your WPM drops sharply in punctuation
          mode compared to common words, that gap is telling you something
          specific — your fundamentals are fine, but your hands aren&apos;t
          yet automatic on the keys outside the main letter block.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Code Mode
        </h2>
        <p>
          Code mode uses programming syntax — brackets, operators, indentation,
          camelCase and snake_case identifiers — instead of natural language.
          It&apos;s the most specialized mode and the one where general
          typing speed correlates the least with the actual score, since
          symbols like <code>{"{"}</code>, <code>=&gt;</code>, and{" "}
          <code>!==</code> require different finger patterns than any
          natural-language mode trains. Developers who type fast in prose
          are often surprised by how much slower they are in code mode until
          they&apos;ve specifically practiced it.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Which Mode Should You Actually Use?
        </h2>
        <p>
          If you only ever run one mode, a 60-second common-words or quote
          test gives the most representative, comparable number over time.
          If you&apos;re trying to improve a specific weakness, pick the
          mode that targets it directly — punctuation mode for symbol
          hesitation, code mode if you write software for a living, quote
          mode if you want a realistic sense of your everyday writing speed.
          Rotating between a couple of modes over a practice week also helps
          avoid the trap of{" "}
          <Link
            href="/blog/typing-games-vs-typing-tests"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            memorizing a single test&apos;s patterns
          </Link>{" "}
          rather than genuinely getting faster.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Try the different modes yourself and see where the gaps are.
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
