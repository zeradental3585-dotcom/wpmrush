import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("common-typing-mistakes-to-fix")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function CommonTypingMistakesPage() {
  return (
    <article className="w-full max-w-2xl space-y-6">
      <JsonLd data={buildArticleSchema(post)} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-sm text-slate-500">{post.readTime}</p>
      </div>

      <div className="space-y-4 text-slate-400">
        <p>
          Most typing plateaus aren&apos;t a talent problem — they&apos;re a
          handful of habits quietly working against you every time you type.
          The five below are the ones that show up most often, and each has a
          specific, practical fix rather than just &quot;practice more.&quot;
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          1. Hunting and Pecking Past the Beginner Stage
        </h2>
        <p>
          Relying on two fingers and glancing down to find each key works
          fine at 20 WPM, but it hard-caps how fast you can ever get, because
          your eyes — not your fingers — become the bottleneck. The fix isn&apos;t
          willpower, it&apos;s starting over with{" "}
          <Link
            href="/blog/touch-typing-for-beginners"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            a proper home-row foundation
          </Link>
          , even though it will feel slower for the first week or two. Cover
          your hands or dim the screen if looking down is a hard habit to
          break — removing the option is far more effective than trying to
          resist the urge.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          2. Excessive Backspacing and Over-Correcting
        </h2>
        <p>
          Every backspace costs you the keystroke that caused the error, the
          backspace itself, and the retype — often three or four keystrokes
          of lost time for one wrong letter. Typists who over-correct tend to
          panic-fix every tiny slip mid-sentence, which breaks their rhythm
          far more than the original typo would have. The fix is to let small
          errors ride to the end of the word or sentence, then fix them in one
          pass, or better yet, slow down slightly until the error stops
          happening in the first place. Accuracy at a controlled pace beats
          speed followed by cleanup almost every time.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          3. Poor Posture and Hand Position
        </h2>
        <p>
          Resting your wrists on the desk, hunching toward the screen, or
          keeping your elbows far from a 90-degree angle all force your
          fingers to do extra work reaching for keys instead of gliding
          across the row. Fatigue from bad posture doesn&apos;t just make
          typing uncomfortable — it makes it measurably slower and sloppier
          after just a few minutes, since tired hands hit the wrong key more
          often. The fix: let your wrists float just above the desk, keep
          your screen near eye level, and keep elbows close to that right
          angle so your forearms — not your wrists — carry the small
          movements.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          4. Not Using All Ten Fingers
        </h2>
        <p>
          A lot of self-taught typists get reasonably fast using six or seven
          fingers, skipping their pinkies or crossing over with whichever
          finger is closest. It works, until it doesn&apos;t — that pattern
          plateaus lower than full ten-finger touch typing because a couple
          of fingers end up covering far more ground than they should. Fixing
          this means consciously reassigning keys to their correct fingers —
          particularly Q, A, Z, P, and the semicolon to your pinkies — and
          accepting a temporary speed dip while the new pattern sets in.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          5. Practicing Without Ever Measuring Anything
        </h2>
        <p>
          It&apos;s hard to fix a habit you can&apos;t see. Typists who never
          time themselves, or who only ever play{" "}
          <Link
            href="/blog/typing-games-vs-typing-tests"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            games with forgiving, softened scoring
          </Link>
          , often have no idea which of the above habits is actually holding
          them back. A short, honest typing test that reports both WPM and
          accuracy makes these problems visible — and gives you something
          concrete to compare against, whether that&apos;s your own past
          scores or a{" "}
          <Link
            href="/blog/average-wpm-by-age-profession"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            realistic benchmark for your age or profession
          </Link>
          .
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          How to Know You&apos;ve Actually Fixed One
        </h2>
        <p>
          Don&apos;t judge progress by a single great run — judge it by
          consistency. If your WPM and accuracy stop swinging wildly between
          attempts, and you can hold your pace through a full paragraph
          without a mid-sentence dip, the underlying habit is genuinely fixed,
          not just masked by a lucky attempt. That&apos;s also exactly the
          kind of{" "}
          <Link
            href="/blog/how-to-improve-typing-speed"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            accuracy-first, short-session practice
          </Link>{" "}
          that compounds fastest over a few weeks.
        </p>
      </div>

      <div className="border-t border-slate-800 pt-6 text-center">
        <p className="mb-4 text-slate-400">
          See which of these habits shows up in your own typing.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Try the typing test
        </Link>
      </div>
    </article>
  );
}
