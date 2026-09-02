import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("typing-ergonomics-and-injury-prevention")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function TypingErgonomicsPage() {
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
          Chasing a higher WPM is worth nothing if it costs you your hands.
          Repetitive strain problems from typing build up slowly, often over
          months or years, which is exactly why they&apos;re easy to ignore
          until they&apos;re painful and hard to fix. None of this is medical
          advice — if you&apos;re already experiencing persistent pain,
          numbness, or tingling, see a doctor or physical therapist rather
          than trying to self-treat. What follows is general, preventive
          guidance on the setup and habits that reduce risk in the first
          place.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Wrist Position: The Single Biggest Factor
        </h2>
        <p>
          The most common mistake is resting your wrists heavily on the desk
          or a wrist rest while typing, rather than only while pausing. A
          wrist that&apos;s bent upward or pressed down against a hard edge
          for hours compresses the same tendons and nerves that make your
          fingers work, and that compression — not the typing itself — is
          usually the actual source of strain. The fix is to let your wrists
          float just above the keyboard while actively typing, keeping them
          roughly level with your forearms, and only rest them during
          breaks. A wrist rest can still help, but as a pause point, not a
          typing platform.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Keyboard and Desk Height
        </h2>
        <p>
          Your elbows should sit close to a 90-degree angle, with your
          forearms roughly parallel to the floor when your hands are on the
          home row. If your desk is too high, your shoulders creep up toward
          your ears to compensate — a posture that fatigues your neck and
          upper back long before your hands feel anything. If it&apos;s too
          low, your wrists bend upward to reach the keys. Adjustable chairs
          are the cheapest fix here: raise or lower the chair until your
          elbow angle is right, then use a footrest if your feet no longer
          reach the floor comfortably.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Screen Position and Neck Strain
        </h2>
        <p>
          Ergonomics for typing doesn&apos;t stop at the hands. A monitor
          that&apos;s too low forces your neck into a forward-tilted position
          for hours, which indirectly affects your shoulders and upper arms
          — and tension anywhere in that chain tends to translate into
          tighter, less precise hand movements. The top of your screen should
          sit roughly at or just below eye level, about an arm&apos;s length
          away, so your neck stays close to neutral.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Early Warning Signs Worth Taking Seriously
        </h2>
        <p>
          Mild, occasional stiffness after a long session is common and
          usually harmless. What&apos;s worth paying attention to is anything
          that&apos;s persistent, recurring, or spreading — tingling or
          numbness in your fingers (especially the thumb, index, and middle
          finger, which can point toward carpal tunnel-related nerve
          compression), a dull ache that lingers well after you stop typing,
          or pain that starts appearing during other everyday tasks like
          holding a phone or opening a jar. Any of those are a signal to
          reduce typing volume and see a professional, not to push through
          and hope it resolves on its own.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Simple Habits That Actually Help
        </h2>
        <p>
          A handful of low-effort habits do most of the preventive work:
          taking a short break every 20-30 minutes to let your hands fully
          relax, gently stretching your fingers and wrists (spreading your
          fingers wide, then making a loose fist, a few times) between
          sessions, and avoiding marathon typing sessions when you&apos;re
          already sore. None of these require special equipment, and all of
          them matter more than any specific keyboard or mouse purchase.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where Practice Habits and Ergonomics Overlap
        </h2>
        <p>
          Good ergonomics and good typing technique reinforce each other more
          than people expect. Poor hand position doesn&apos;t just risk
          injury — it also makes you measurably less accurate and consistent,
          since tired or awkwardly-angled fingers hit the wrong key more
          often. If you&apos;re working through the fundamentals covered in{" "}
          <Link
            href="/blog/touch-typing-for-beginners"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            touch typing for beginners
          </Link>
          , building correct hand position in from the start is both the
          faster path to speed and the safer one long-term. And if
          you&apos;re typing heavily for work, it&apos;s worth reading how
          different{" "}
          <Link
            href="/blog/typing-speed-and-careers"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            careers put different demands on typing volume
          </Link>{" "}
          — the more hours a role involves at the keyboard, the more these
          habits compound.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          Practice with good form — short, focused sessions beat long ones.
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
