import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("qwerty-vs-dvorak-vs-colemak")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function QwertyVsDvorakVsColemakPage() {
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
          Every so often, someone deep in a typing-speed rabbit hole
          discovers that QWERTY wasn&apos;t designed for speed at all, and
          starts wondering if switching layouts is the secret to breaking
          through a plateau. The honest answer is more nuanced than either
          the &quot;QWERTY is a conspiracy against fast typists&quot; camp or
          the &quot;alternative layouts are pointless&quot; camp usually
          admits.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why QWERTY Looks the Way It Does
        </h2>
        <p>
          The popular story is that QWERTY was deliberately designed to slow
          typists down and prevent mechanical typewriters from jamming.
          The more accurate version is subtler: it was arranged to separate
          commonly-paired letters that would otherwise cause adjacent-key
          jams on early typewriter mechanisms, which had the side effect of
          putting a lot of high-frequency letters in awkward positions. It
          wasn&apos;t optimized for jamming prevention over ergonomics by
          malicious design so much as it was optimized for a mechanical
          constraint that stopped mattering once electric typewriters and
          then computers removed the jamming problem entirely — but by then,
          it was already the entrenched standard everyone had learned.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          How Dvorak Is Different
        </h2>
        <p>
          The Dvorak Simplified Keyboard, designed in the 1930s, puts the
          most frequently used English letters on the home row — all five
          vowels plus the most common consonants sit directly under your
          fingers, and the design specifically aims to alternate between
          hands more often and reduce finger travel distance compared to
          QWERTY. In principle, this should mean less finger movement per
          word and, over enough practice, higher achievable ceiling speeds.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          How Colemak Is Different
        </h2>
        <p>
          Colemak, a more modern layout, takes a middle path: it keeps many
          QWERTY keys in familiar spots (Z, X, C, V, and most punctuation
          stay put) while remapping the rest to reduce finger travel, making
          it noticeably easier to partially transition from QWERTY than a
          full Dvorak switch. It&apos;s popular specifically among people who
          want ergonomic benefits without relearning the entire keyboard
          from zero.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What the Evidence Actually Shows
        </h2>
        <p>
          This is where enthusiasm usually outruns the data. Controlled
          comparisons of typing speed between QWERTY and Dvorak typists have
          generally found much smaller real-world differences than
          layout advocates claim — often within the range of normal
          individual variation, rather than a clear, consistent speed
          advantage for either layout. Some of the most-cited historical
          studies favoring Dvorak turned out to have been run or funded by
          Dvorak&apos;s own inventor, which is a significant conflict of
          interest that later, more neutral analyses have pointed out.
          That doesn&apos;t mean alternative layouts are worthless — some
          typists genuinely do report less finger fatigue — but the case for
          a dramatic WPM improvement from switching layouts alone is weaker
          than the enthusiast communities around them usually suggest.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Real Cost: Relearning Time
        </h2>
        <p>
          Switching layouts effectively means becoming a beginner typist
          again for weeks to months, since your muscle memory for QWERTY
          doesn&apos;t transfer. Most people who switch report a significant
          speed drop for the first several weeks, with a gradual climb back
          toward (and eventually sometimes past) their old QWERTY speed —
          but &quot;eventually&quot; can mean months of reduced productivity
          in the meantime, which is a real cost if you type for work. There&apos;s
          also a practical friction cost: shared and public computers default
          to QWERTY, so switching layouts full-time means either carrying
          your own settings, remapping every new machine you use, or
          maintaining the ability to type reasonably on both.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          A More Useful Question Than &quot;Which Layout Is Fastest&quot;
        </h2>
        <p>
          For most people chasing a higher WPM, the more effective lever
          isn&apos;t switching layouts — it&apos;s fixing the fundamentals
          within the layout they already know. Proper{" "}
          <Link
            href="/blog/touch-typing-for-beginners"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            touch typing technique
          </Link>{" "}
          on QWERTY, combined with fixing{" "}
          <Link
            href="/blog/common-typing-mistakes-to-fix"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            common habits that quietly cap your speed
          </Link>
          , tends to produce bigger, faster gains than the layout switch
          alone — without the multi-month regression period. Switching
          layouts is worth considering mainly if you&apos;re experiencing
          genuine hand or wrist discomfort that proper ergonomics and
          technique haven&apos;t resolved (see{" "}
          <Link
            href="/blog/typing-ergonomics-and-injury-prevention"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            typing ergonomics and injury prevention
          </Link>{" "}
          first), or if you&apos;re simply curious and willing to accept a
          temporary speed hit as the price of experimenting.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          If You Do Want to Try Switching
        </h2>
        <p>
          Colemak is generally the gentler entry point given how much QWERTY
          muscle memory it preserves, while Dvorak is the more complete
          departure. Either way, commit to a real trial window (most people
          suggest at least 4-6 weeks of regular use) before judging the
          result, since the early weeks will look worse than your old QWERTY
          speed no matter which layout you pick.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Whichever layout you use, see where your speed and accuracy stand.
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
