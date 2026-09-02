import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("how-wpm-is-calculated")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function HowWpmIsCalculatedPage() {
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
          &quot;Words per minute&quot; sounds like it should be obvious: count
          the words, divide by the minutes. In practice, almost no typing
          test actually does that, and the gap between what people assume WPM
          means and how it&apos;s actually computed causes a lot of confusion
          when two tools report different numbers for what feels like the
          same performance.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Five-Character Word
        </h2>
        <p>
          Real words vary wildly in length — &quot;a&quot; and
          &quot;antidisestablishmentarianism&quot; are both one word, but
          typing them takes wildly different effort. To make WPM comparable
          across different pieces of text, the typing-test industry
          standardized decades ago on a simple convention: one &quot;word&quot;
          equals five characters, including spaces and punctuation. So if you
          type 250 characters in a minute, that&apos;s treated as 50 words,
          regardless of what the actual words were. This is why WPM Rush and
          similar tools can score a test on random common words, a quote, or
          a punctuation-heavy passage using the same formula — the character
          count is what actually matters, not the dictionary words
          themselves.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Gross WPM vs. Net (Adjusted) WPM
        </h2>
        <p>
          This is where most of the confusion lives. <strong>Gross WPM</strong>{" "}
          (sometimes shown as &quot;Raw WPM&quot;) counts every character you
          typed, including ones that were wrong — it measures raw keyboard
          throughput. <strong>Net WPM</strong> (&quot;Adjusted WPM&quot;)
          subtracts a penalty for errors, usually by removing the incorrect
          words or characters before dividing by time. Net WPM is almost
          always the more meaningful number, because gross WPM rewards typing
          fast and sloppy — someone who bashes out 400 characters with 40
          mistakes has a very different practical skill level than someone
          who types 360 characters with two mistakes, even though their gross
          speed looks similar.
        </p>
        <p>
          On WPM Rush&apos;s results screen, this is exactly why{" "}
          <Link
            href="/"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            Raw WPM and Adjusted WPM
          </Link>{" "}
          are shown as two separate numbers rather than one blended score —
          collapsing them into a single figure would hide whether your speed
          is actually clean or just fast.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why Accuracy Changes the Real Number More Than People Expect
        </h2>
        <p>
          Because net WPM penalizes errors, accuracy has an outsized effect
          on your real score. Someone typing at a blistering pace with 80%
          accuracy will often net out slower than someone typing moderately
          fast at 98% accuracy, once errors are subtracted out — and that
          gap gets worse the faster you go, since more characters typed also
          means more opportunities for mistakes. This is part of why chasing
          raw speed before accuracy tends to backfire; it inflates the number
          that doesn&apos;t matter (gross WPM) while doing little or nothing
          for the number that does.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          A Worked Example
        </h2>
        <p>
          Say you type for 30 seconds and produce 150 characters total, but 10
          of those characters were mistakes that got left uncorrected (or
          counted as errors even if fixed, depending on the tool). Gross WPM
          treats all 150 characters as valid: 150 ÷ 5 = 30 &quot;words,&quot;
          and since it&apos;s a 30-second test, that&apos;s doubled to a
          per-minute rate of 60 gross WPM. Net WPM instead starts from the
          correct characters only — 140 of them — giving 140 ÷ 5 = 28 words,
          doubled to 56 net WPM. A four-point gap between the two numbers
          might not sound like much here, but it grows fast as error rates
          climb, which is exactly why{" "}
          <Link
            href="/blog/average-wpm-by-age-profession"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            realistic WPM benchmarks
          </Link>{" "}
          are almost always quoted as net, adjusted figures rather than raw
          ones.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why Different Tools Give You Different Numbers
        </h2>
        <p>
          If you&apos;ve ever typed at what felt like the same pace on two
          different sites and gotten two different scores, this is usually
          why: some tools count gross, some count net, some count only fully
          correct words rather than characters, and some apply their error
          penalty differently (per-character vs. per-word). None of these are
          &quot;wrong&quot; exactly — they&apos;re just different conventions
          — but it means WPM is only directly comparable between runs on the
          <em> same</em> tool, using the same method. Comparing your score on
          one site to a benchmark or a friend&apos;s score from a different
          site is close to meaningless unless you know both are measuring the
          same way.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What This Means for Practice
        </h2>
        <p>
          If your goal is to actually get faster rather than just watch a
          number go up, track net WPM and accuracy together, on the same
          tool, over time — and treat a big gap between your gross and net
          numbers as a signal to slow down and clean up errors before pushing
          pace again. That sequencing (accuracy first, speed second) is the
          same core idea covered in more depth in{" "}
          <Link
            href="/blog/how-to-improve-typing-speed"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            how to actually improve your typing speed
          </Link>
          .
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          See your own raw vs. adjusted WPM side by side.
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
