import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("history-of-typing-speed-records")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function HistoryOfTypingSpeedRecordsPage() {
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
          Long before online typing tests existed, speed typing was a
          competitive sport with real prize money, packed exhibition halls,
          and rivalries that got covered in newspapers. The history of
          typing speed records is a useful reminder of just how wide the
          gap is between an average typist and a trained specialist — and
          how much of that gap comes down to dedicated, deliberate practice
          rather than talent alone.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Early Typewriter Speed Contests
        </h2>
        <p>
          Competitive typing dates back to the 1880s and 1900s, when
          typewriter manufacturers sponsored public contests partly as a
          marketing exercise — a fast typist on your brand of machine was
          effectively a live advertisement. These early contests were
          covered like sporting events, with typists practicing for hours
          daily and companies recruiting and sponsoring their best
          performers the way a modern company might sponsor an athlete.
          The most famous of these typists became minor celebrities of
          their era, touring and competing in exhibition matches.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Barbara Blackburn and the Modern Peak Record
        </h2>
        <p>
          The name most associated with the all-time peak typing speed
          record is Barbara Blackburn, an American typist widely cited as
          sustaining around 150 WPM over extended stretches, with peak
          burst speeds reported as high as 212 WPM, using a Dvorak
          Simplified Keyboard layout rather than standard QWERTY. Her
          numbers stood as a widely cited benchmark for decades and remain
          one of the most commonly referenced &quot;fastest human
          typist&quot; figures, even though verification standards and
          testing conditions for historical records varied and
          weren&apos;t always as rigorous as modern competitive standards.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What Made Historical Champions So Fast
        </h2>
        <p>
          Champion typists of any era share a common thread: extremely high
          practice volume combined with near-flawless technique, often
          starting from professional stenography, court reporting, or
          secretarial backgrounds where fast, accurate typing was a daily
          job requirement rather than a hobby. Many of the fastest recorded
          typists also used alternative keyboard layouts, though — as
          covered in the comparison of{" "}
          <Link
            href="/blog/qwerty-vs-dvorak-vs-colemak"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            QWERTY, Dvorak, and Colemak
          </Link>{" "}
          — the layout advantage is smaller and more contested than the
          headline records alone might suggest; the practice volume behind
          those records mattered at least as much as the layout choice.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Modern Competitive Typing
        </h2>
        <p>
          Competitive typing didn&apos;t disappear with the typewriter — it
          moved online. Organizations and platforms now run typing
          competitions with verified, standardized digital testing
          conditions, removing a lot of the ambiguity that surrounded
          historical paper-and-typewriter records. Top competitors in these
          modern events regularly post sustained speeds well above 150 WPM
          with very high accuracy, and unlike historical records, their runs
          are typically logged with keystroke-level timing data that makes
          the results far more verifiable.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why These Records Matter for Everyday Typists
        </h2>
        <p>
          It&apos;s tempting to look at 200+ WPM numbers and feel like your
          own progress is insignificant — it isn&apos;t. Record-holders
          represent the extreme right tail of years of specialized
          practice, often professional-level daily volume, and for many,
          alternative layouts; they&apos;re not a realistic target for
          casual improvement, and treating your own progress against
          realistic benchmarks (see the{" "}
          <Link
            href="/blog/average-wpm-by-age-profession"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            average WPM by age and profession
          </Link>{" "}
          guide) is a far more useful way to gauge whether your practice is
          paying off. What the record-holders do prove, reliably, is that
          the ceiling on typing speed is set by practice and technique, not
          by some fixed biological limit most people are already bumping
          up against.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          You won&apos;t hit 200 WPM today, but see where you stand.
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
