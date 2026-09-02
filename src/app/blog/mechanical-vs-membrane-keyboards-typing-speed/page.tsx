import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("mechanical-vs-membrane-keyboards-typing-speed")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function MechanicalVsMembranePage() {
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
          Ask any keyboard enthusiast whether mechanical switches make you
          type faster and you&apos;ll get an immediate, confident yes. The
          real answer is more interesting: the keyboard matters less than
          the hype suggests, but not zero, and which type actually helps
          depends on what&apos;s currently limiting your typing.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What&apos;s Actually Different
        </h2>
        <p>
          A membrane keyboard uses a rubber dome under each key that
          collapses when pressed, requiring the key to bottom out against
          the circuit layer before it registers. A mechanical keyboard uses
          an individual physical switch per key, with a distinct actuation
          point partway through the keystroke — meaning the keypress can
          register before the key is fully pressed down. Mechanical
          switches also typically offer more consistent, predictable force
          curves and tactile or audible feedback at the actuation point,
          depending on the switch type (linear, tactile, or clicky).
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Case for Mechanical Helping Speed
        </h2>
        <p>
          The theoretical argument is that because mechanical switches
          register before full bottom-out, an experienced typist can
          release each key slightly earlier and move to the next one
          sooner, shaving small amounts of time off every keystroke. Over
          thousands of keystrokes in a typing test, those fractions can add
          up to a real, measurable difference — and tactile or clicky
          switches give a physical confirmation of each keypress that some
          typists find helps them trust their fingers and type with more
          confidence, indirectly improving speed by reducing hesitation.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why the Effect Is Smaller Than the Hype
        </h2>
        <p>
          In practice, controlled comparisons tend to show the keyboard
          type itself accounts for only a small slice of typing speed —
          usually a handful of WPM at most for an equally practiced typist
          on either keyboard, not the dramatic jump forum threads imply.
          The much bigger factors are technique, finger placement, and
          practice volume, all of which matter regardless of what keyboard
          you&apos;re on. A poor typist on a premium mechanical keyboard
          will still be slower than a skilled touch typist on a basic
          laptop membrane keyboard.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where Keyboard Choice Genuinely Matters
        </h2>
        <p>
          Keyboard quality has a bigger effect on comfort and consistency
          than on raw peak speed. A keyboard with mushy, inconsistent key
          travel or keys that occasionally fail to register (common on
          cheap membrane boards, especially with certain key combinations
          due to limited rollover) introduces real errors that hurt your
          net WPM regardless of how fast your fingers move. Mechanical
          keyboards generally have better key rollover — the ability to
          register multiple simultaneous keypresses accurately — which
          matters more as your raw speed increases and your fingers overlap
          keystrokes more.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Switch Type and Personal Fit
        </h2>
        <p>
          Within mechanical keyboards, switch choice is largely personal
          preference rather than a speed factor: linear switches (smooth,
          no tactile bump) are popular for fast typing and gaming since
          there&apos;s nothing to interrupt the keystroke, tactile switches
          give a bump at the actuation point that some typists use as a
          feedback cue, and clicky switches add an audible click on top of
          that bump. None of these has been shown to reliably out-speed the
          others in controlled testing — the &quot;best&quot; switch is the
          one that feels most comfortable to you over a long typing session.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          The Practical Takeaway
        </h2>
        <p>
          If you&apos;re choosing a keyboard purely to chase a higher WPM,
          time is better spent on{" "}
          <Link
            href="/blog/touch-typing-for-beginners"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            fundamentals and consistent practice
          </Link>{" "}
          than on switch shopping — the gains from technique dwarf the
          gains from hardware. That said, if your current keyboard is
          genuinely unreliable (missed keystrokes, inconsistent travel) or
          uncomfortable enough to shorten your practice sessions, upgrading
          removes a real source of friction and errors, which does show up
          in your net WPM over time.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Whatever keyboard you&apos;re on, see how you actually score.
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
