import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("touch-typing-for-beginners")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function TouchTypingForBeginnersPage() {
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
          Touch typing means typing without looking at the keyboard, using
          the same finger for the same key every single time. It feels
          slower than your old habits for the first week, and then it
          compounds fast. Here&apos;s how to build it from scratch, without
          skipping the steps that make it actually stick.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          What Touch Typing Actually Requires
        </h2>
        <p>
          You don&apos;t memorize the whole keyboard at once. You build out
          from a fixed base position — the home row — and expand outward a
          row at a time. Expect it to feel awkward and slow at first;
          that&apos;s normal and temporary. The one habit that undoes the
          whole method is glancing down &quot;just this once&quot; when you get
          stuck. It&apos;s better to type slowly and correctly than quickly
          while peeking, because every glance resets the muscle-memory
          progress you&apos;re trying to build.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Find the Home Row
        </h2>
        <h3 className="text-lg font-semibold text-slate-200">
          Left hand: A S D F
        </h3>
        <p>
          Your left pinky, ring, middle, and index fingers rest on A, S, D,
          and F.
        </p>
        <h3 className="text-lg font-semibold text-slate-200">
          Right hand: J K L ;
        </h3>
        <p>
          Your right index, middle, ring, and pinky fingers rest on J, K,
          L, and the semicolon key. Most keyboards have small raised bumps
          on F and J specifically so you can find this position by feel
          alone, without looking down. Rest your thumbs lightly on the
          spacebar.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Map Each Finger to Its Keys
        </h2>
        <p>
          Every finger is responsible for a fixed set of keys, reached by
          moving that finger alone — not by shifting your whole hand:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-slate-200">Left pinky</strong> — Q, A,
            Z, plus Tab and Shift.
          </li>
          <li>
            <strong className="text-slate-200">Left ring</strong> — W, S, X.
          </li>
          <li>
            <strong className="text-slate-200">Left middle</strong> — E, D,
            C.
          </li>
          <li>
            <strong className="text-slate-200">Left index</strong> — R, F,
            V and T, G, B (index fingers each cover two columns).
          </li>
          <li>
            <strong className="text-slate-200">Right index</strong> — Y, H,
            N and U, J, M.
          </li>
          <li>
            <strong className="text-slate-200">Right middle</strong> — I,
            K, comma.
          </li>
          <li>
            <strong className="text-slate-200">Right ring</strong> — O, L,
            period.
          </li>
          <li>
            <strong className="text-slate-200">Right pinky</strong> — P,
            semicolon, slash, plus Enter and Shift.
          </li>
        </ul>
        <p>
          Exact zone boundaries vary slightly between typing courses, but
          the point isn&apos;t precision — it&apos;s picking one mapping and
          staying consistent so your fingers stop having to think about it.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          A Beginner Practice Routine (4 Weeks)
        </h2>
        <h3 className="text-lg font-semibold text-slate-200">
          Week 1: Home row only
        </h3>
        <p>
          Practice short home-row-only words — &quot;dad,&quot; &quot;sad,&quot; &quot;ask,&quot;
          &quot;fall&quot; — for 10–15 minutes a day. Don&apos;t time yourself yet.
          The only goal is returning each finger to its home key
          immediately after every keystroke.
        </p>
        <h3 className="text-lg font-semibold text-slate-200">
          Week 2: Add the top row
        </h3>
        <p>
          Introduce Q W E R T Y U I O P. The most common mistake here is
          drifting your whole hand upward instead of stretching just the
          one finger that needs to reach — watch for that and correct it
          early, since it&apos;s a hard habit to unlearn later.
        </p>
        <h3 className="text-lg font-semibold text-slate-200">
          Week 3: Add the bottom row and numbers
        </h3>
        <p>
          Bring in Z X C V B N M, then the number row. Start typing full
          short sentences that use the whole keyboard instead of isolated
          drills.
        </p>
        <h3 className="text-lg font-semibold text-slate-200">
          Week 4: Real sentences, light timing
        </h3>
        <p>
          Switch to normal paragraphs and introduce short 30-second timed
          tests. At this stage the timer is just there to build awareness
          of pace — you&apos;re not chasing a score yet.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          Common Beginner Mistakes
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Looking down &quot;just this once&quot; — it resets more progress
            than people expect, because it breaks the touch-based feedback
            loop you&apos;re trying to build.
          </li>
          <li>
            Using whichever finger feels easiest in the moment instead of
            the assigned one. It feels faster short-term and quietly caps
            your speed long-term.
          </li>
          <li>
            Tensing your shoulders or wrists out of unfamiliarity with the
            new positions. Take breaks and shake your hands out between
            drills.
          </li>
          <li>
            Skipping the home-row basics to jump straight into full
            paragraphs, which leads to inconsistent finger assignment
            that&apos;s genuinely hard to unlearn once it sets in.
          </li>
        </ul>

        <h2 className="pt-2 text-xl font-semibold text-slate-100">
          When to Start Measuring Speed
        </h2>
        <p>
          Hold off until you can type full sentences at roughly 95%+
          accuracy without looking down. Measuring too early just reinforces
          whatever bad habits get you there fastest. Once accuracy is
          solid, a short timed test is a genuinely useful way to track real
          progress week over week — and a more reliable one than a typing
          game, for reasons covered in{" "}
          <Link
            href="/blog/typing-games-vs-typing-tests"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            typing games vs. typing tests
          </Link>
          . If your speed stalls even after the basics are solid, it&apos;s
          worth checking whether one of the{" "}
          <Link
            href="/blog/common-typing-mistakes-to-fix"
            className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
          >
            common mistakes that cap typing speed
          </Link>{" "}
          has crept back in.
        </p>
      </div>

      <div className="border-t border-slate-800 pt-6 text-center">
        <p className="mb-4 text-slate-400">
          Once you&apos;ve got the basics down, put them to the test.
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
