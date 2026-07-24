import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("how-to-improve-typing-speed")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function HowToImproveTypingSpeedPage() {
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
          Most people plateau somewhere around 35–45 words per minute and
          quietly assume they&apos;ve hit their ceiling. In almost every
          case, that ceiling is made of fixable habits, not a lack of
          talent. The techniques below are the ones that actually move the
          number — not the usual filler advice about &quot;practicing more.&quot;
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Accuracy First, Speed Second
        </h2>
        <p>
          Every mistake you correct costs more time than typing slightly
          slower would have. A backspace plus a retype is almost always
          slower than just landing the key correctly the first time, even
          if that means easing off the pace. Before you chase a higher WPM,
          get comfortable hitting 95%+ accuracy at whatever speed feels
          natural. Speed built on top of that accuracy sticks; speed chased
          without it just produces more errors to fix.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Fix Your Hand and Body Position
        </h2>
        <h3 className="text-lg font-semibold text-slate-200">
          Keep your wrists floating, not resting
        </h3>
        <p>
          Resting your wrists on the desk or a palm rest forces your
          fingers to reach up and down to hit each key instead of gliding
          side to side across the row. That extra vertical motion adds up
          over thousands of keystrokes and tires your hands faster. Let
          your wrists hover just above the desk, supported by your forearms
          and shoulders instead.
        </p>
        <h3 className="text-lg font-semibold text-slate-200">
          Elbows near 90 degrees, screen at eye level
        </h3>
        <p>
          If your chair or desk height forces your elbows well above or
          below a right angle, your shoulders end up doing extra work to
          keep your hands in position — and tired shoulders show up as
          slower, sloppier typing after just a few minutes. A screen
          that&apos;s too low also encourages slouching, which restricts
          how freely your arms can move.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Stop Looking at the Keys
        </h2>
        <p>
          Glancing down doesn&apos;t just cost you a fraction of a second —
          it interrupts the exact feedback loop that trains your fingers to
          find keys on their own. Every time you look down to confirm a
          key, you&apos;re outsourcing a job your muscle memory should be
          learning to do. If this is a hard habit to break, dim your screen
          brightness during practice or drape a light cloth over your hands
          so looking down simply doesn&apos;t help.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Train Muscle Memory With Deliberate Repetition
        </h2>
        <p>
          There&apos;s a real difference between practice and{" "}
          <em>deliberate</em> practice. Typing random paragraphs for twenty
          minutes is practice. Noticing that you consistently fumble the
          &quot;th&quot;, &quot;ing&quot;, or &quot;tion&quot; combinations, then drilling short
          words built around exactly those letter pairs for a few minutes,
          is deliberate practice — and it improves your speed far faster.
          Pay attention to which specific keys slow you down instead of
          treating every mistake as random bad luck.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Structure Practice in Short, Frequent Sessions
        </h2>
        <p>
          Ten to fifteen minutes a day consistently beats one ninety-minute
          session once a week. Typing speed gains come largely from motor
          memory consolidating between sessions, not just during them, so
          spreading practice out gives your hands time to actually absorb
          it. A simple two-week structure that works well: spend the first
          three days on untimed accuracy drills only, move to short 30-second
          timed tests once accuracy is steady, and only add longer 60-second
          tests in week two once you&apos;re consistently above 95% accuracy.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Track Progress the Right Way
        </h2>
        <p>
          Don&apos;t just watch the top-line WPM number — watch how much it
          swings between attempts. A typist who scores 55, 58, and 54 WPM
          across three tests has more reliable technique than one who
          scores 40, 70, and 45. That variance is a signal that speed is
          coming from lucky bursts rather than a habit you can count on
          under pressure.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Common Mistakes That Quietly Cap Your Speed
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Relying on two fingers (&quot;hunt and peck&quot;) well past the
            beginner stage — it feels fine at low speeds but hard-caps how
            fast you can ever get.
          </li>
          <li>
            Pressing keys harder than necessary. Extra force means extra
            travel time on every single keystroke, which adds up fast
            across a full paragraph.
          </li>
          <li>
            Tensing your shoulders or holding your breath during timed
            tests — it adds fatigue and makes your typing choppier, not
            smoother.
          </li>
          <li>
            Practicing exclusively on plain, punctuation-free text, then
            being surprised when real writing — with capitals, commas, and
            punctuation — slows you down.
          </li>
        </ul>

        <p>
          None of this requires special software or years of practice. Most
          people who switch to an accuracy-first approach with short daily
          sessions add 15–20 WPM within a month.
        </p>
      </div>

      <div className="border-t border-slate-800 pt-6 text-center">
        <p className="mb-4 text-slate-400">
          Ready to put this into practice?
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
