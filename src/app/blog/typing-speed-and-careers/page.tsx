import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("typing-speed-and-careers")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function TypingSpeedAndCareersPage() {
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
          For most office jobs, typing speed is a background skill — nobody
          asks about it, and being a little slow rarely costs you the role.
          But for a specific set of careers, WPM is a real, sometimes
          explicitly tested, factor in whether you get hired at all. The
          honest answer to &quot;does typing speed matter for my career&quot;
          depends heavily on which of those two categories your work falls
          into.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Jobs Where Typing Speed Is Directly Tested
        </h2>
        <p>
          A handful of roles still use typing tests as part of hiring,
          because the job is essentially high-volume text entry:
          transcriptionists (medical, legal, or general) are frequently
          expected to hit 60-80+ WPM with high accuracy, since transcription
          pay is often per-audio-minute and speed directly affects earnings.
          Data entry clerks are commonly screened around 40-60 WPM, sometimes
          with a numeric-entry speed test alongside a general one. Court
          reporters and captioners use specialized stenotype machines rather
          than standard keyboards, but the underlying skill — translating
          speech to text in real time — is the same idea taken to its
          extreme, often exceeding 200 words per minute on their machines.
          Customer support and live chat roles increasingly test typing
          speed too, since agents handling multiple simultaneous chats need
          to respond quickly without sacrificing clarity.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Jobs Where It Helps but Isn&apos;t Tested
        </h2>
        <p>
          Software developers rarely get typing-tested, and typing speed is
          a much smaller factor in programming productivity than people
          assume — most time is spent thinking, reading, and debugging, not
          typing. That said, a developer who can type at 70+ WPM without
          thinking about it does spend measurably less mental effort on the
          mechanical act of writing code, freeing up more attention for the
          actual problem. The same logic applies to writers, journalists,
          and content creators: nobody checks your WPM before hiring you, but
          getting a draft out of your head and onto the screen faster means
          less friction between thinking and writing, which compounds over a
          career of daily writing.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Administrative and Office Roles
        </h2>
        <p>
          Executive assistants, receptionists, and general office
          administrators often see typing speed mentioned in job postings
          (&quot;45+ WPM preferred&quot; is common), even if it&apos;s not
          formally tested in the interview. It tends to function more as a
          proxy signal — employers assume someone who types comfortably fast
          is generally comfortable with computers and can keep pace with
          email, scheduling, and documentation without becoming a bottleneck.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          What WPM Benchmark Actually Gets You Hired
        </h2>
        <p>
          For roles that do test typing speed, requirements commonly cluster
          in a few bands: 35-40 WPM for general office/admin work, 45-55 WPM
          for most data entry and customer support roles, and 60+ WPM for
          transcription or high-volume entry positions. These numbers are
          almost always quoted as net (adjusted) WPM with a minimum accuracy
          threshold, commonly 95-98% — a fast but error-prone result
          typically fails the screen even if the raw speed number looks
          impressive. For a fuller breakdown of what counts as good at each
          level, see the{" "}
          <Link
            href="/blog/average-wpm-by-age-profession"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            average WPM by age and profession
          </Link>{" "}
          benchmarks.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          How to Actually Demonstrate the Skill
        </h2>
        <p>
          If a role lists a WPM requirement, the practical move is to
          practice on a tool that reports both speed and accuracy the way a
          real screening test would — not a gamified app with forgiving
          scoring — so the number you show up with isn&apos;t a surprise.
          Some employers accept a screenshot or certificate from a
          reputable typing test as proof; others run their own screening
          during the interview process. Either way, consistency matters more
          than a single best attempt: an employer testing you live wants to
          see the number you showed on your resume, not a personal best from
          months of practice.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          If You&apos;re Below the Bar for a Role You Want
        </h2>
        <p>
          The gap is usually closable faster than people expect with focused
          practice rather than just typing more of what you already do
          daily. Structured practice sessions that target{" "}
          <Link
            href="/blog/how-to-improve-typing-speed"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            accuracy first, then speed
          </Link>
          , done in short, consistent sessions over a few weeks, tend to move
          the needle more than occasional long sessions. If you&apos;re
          starting from scratch on proper technique, it&apos;s worth building
          it correctly the first time — see{" "}
          <Link
            href="/blog/touch-typing-for-beginners"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            touch typing for beginners
          </Link>{" "}
          — since fixing bad habits later is slower than learning good ones
          from the start.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          See where your current speed and accuracy actually stand.
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
