import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("one-handed-and-adaptive-typing")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function OneHandedAndAdaptiveTypingPage() {
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
          Most typing advice quietly assumes ten working fingers and a
          standard keyboard, which leaves out a large number of people
          typing with one hand, limited finger mobility, or other physical
          differences. Adaptive typing is a real, well-developed area with
          its own techniques and tools — not just a slower version of
          standard touch typing.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          One-Handed Typing Is a Distinct Skill, Not a Workaround
        </h2>
        <p>
          Dedicated one-handed typing methods exist and have been refined
          for decades, most notably layouts and techniques built
          specifically around single-hand use rather than simply typing
          slower on a standard layout with one hand. These systems
          reorganize which fingers cover which keys to minimize the travel
          distance a single hand needs, and experienced one-handed typists
          using a purpose-built method regularly reach speeds that surprise
          people who assume one hand inevitably means a fraction of
          two-handed speed.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          One-Handed Keyboard Layouts
        </h2>
        <p>
          Specialized one-handed keyboards exist in both physical and
          software-remapped forms, compressing the standard key layout into
          a smaller footprint reachable by one hand, sometimes using chorded
          input (pressing key combinations to represent letters not
          directly under the hand) to cover the full alphabet without
          requiring the hand to stretch across a full-size board. For
          people typing one-handed on a standard keyboard without
          specialized hardware, remapping frequently used keys closer
          together through OS-level accessibility settings can meaningfully
          reduce hand travel even without new hardware.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Switch Access and Eye-Tracking Input
        </h2>
        <p>
          For people with more limited motor control, switch-access
          systems (using one or a few physical switches activated by
          whatever movement is available — a hand, head, or foot — combined
          with on-screen scanning keyboards) and eye-tracking keyboards
          (where gaze position selects letters) provide text input entirely
          without conventional keystrokes. These systems measure speed very
          differently from WPM on a physical keyboard — selection time per
          character matters more than simultaneous multi-finger movement —
          and comparing their speed directly to standard typing benchmarks
          isn&apos;t meaningful or useful.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Software That Helps Beyond Hardware
        </h2>
        <p>
          Word prediction and autocomplete tools, built into most operating
          systems and heavily developed for accessibility use, can
          meaningfully increase effective text-entry speed for anyone
          typing with reduced hand mobility by cutting down the number of
          individual keystrokes needed per word. Sticky keys (letting
          modifier keys like Shift or Ctrl be pressed sequentially instead
          of held simultaneously) and adjustable key repeat rates are
          simple, often-overlooked operating system settings that remove
          real friction for people who find standard key-combination timing
          difficult.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Setting Realistic, Personal Benchmarks
        </h2>
        <p>
          Standard WPM benchmarks — including the ones in{" "}
          <Link
            href="/blog/average-wpm-by-age-profession"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            average WPM by age and profession
          </Link>{" "}
          — assume conventional two-handed typing and simply don&apos;t
          transfer meaningfully to adaptive methods. The more useful goal
          for adaptive typists is tracking personal progress over time on
          whatever method and tools fit their situation, the same principle
          covered in{" "}
          <Link
            href="/blog/build-a-daily-typing-practice-habit"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            building a practice habit
          </Link>
          , rather than measuring against benchmarks built around a
          different physical setup entirely.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where to Start
        </h2>
        <p>
          If you&apos;re new to adaptive typing, the most useful first step
          is usually checking your operating system&apos;s built-in
          accessibility settings — most support one-handed layouts, sticky
          keys, and word prediction out of the box, without needing
          specialized hardware or paid software. From there, dedicated
          one-handed typing courses and communities can help build speed
          with a structured method, the same way structured practice helps
          any typist regardless of setup.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Practice at your own pace and track your own progress.
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
