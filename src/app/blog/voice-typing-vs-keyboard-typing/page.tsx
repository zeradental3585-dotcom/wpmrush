import Link from "next/link";
import { getBlogPost } from "@/lib/blog";
import { buildMetadata, buildArticleSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

const post = getBlogPost("voice-typing-vs-keyboard-typing")!;

export const metadata = buildMetadata({
  title: `${post.title} – WPM Rush`,
  description: post.excerpt,
  path: `/blog/${post.slug}`,
  type: "article",
});

export default function VoiceTypingVsKeyboardTypingPage() {
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
          Modern voice dictation has gotten good enough that it&apos;s a
          legitimate question: if you can just talk to your computer at
          150+ words per minute, why bother practicing to type faster? The
          honest answer is that voice and keyboard typing solve different
          problems, and most people who rely entirely on one or the other
          are leaving something on the table.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Raw Speed: Voice Wins on Paper
        </h2>
        <p>
          Average conversational speech runs around 120-150 words per
          minute, comfortably faster than all but the quickest typists, and
          modern speech-to-text accuracy has improved enough that dictating
          a rough draft is genuinely faster than typing it for most people.
          If the goal is pure words-on-screen-per-minute with a clean first
          pass, voice dictation usually wins the raw speed comparison
          outright.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where Keyboard Typing Still Wins
        </h2>
        <p>
          Speed isn&apos;t the whole story. Typing lets you think and revise
          in the same motion — pausing mid-sentence, backspacing to rework
          a phrase, or jumping around a document — in ways that feel
          natural with a keyboard and awkward with voice commands. Typing
          is also silent and private, works in shared spaces like offices
          or libraries without disturbing anyone, and doesn&apos;t require
          you to think in complete, speakable sentences before you start
          producing text, which matters more than people expect for
          technical writing, code, or anything requiring precise
          formatting and symbols.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Accuracy and the Editing Tax
        </h2>
        <p>
          Voice dictation&apos;s headline speed numbers usually don&apos;t
          account for correction time. Homophones, punctuation commands,
          proper nouns, and technical terminology all introduce
          transcription errors that a fast, accurate typist simply
          doesn&apos;t make at the same rate — and fixing those errors by
          voice is often slower and more frustrating than fixing them by
          keyboard. This is the same net-vs-gross distinction covered in{" "}
          <Link
            href="/blog/how-wpm-is-calculated"
            className="text-accent underline underline-offset-2 hover:text-accent-strong"
          >
            how WPM is actually calculated
          </Link>
          : raw dictation speed looks impressive until you factor in the
          real time cost of cleanup.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Where Each Tool Genuinely Shines
        </h2>
        <p>
          Voice dictation is excellent for rough first drafts, brainstorming
          out loud, quick messages when your hands are busy, and
          accessibility needs where typing is physically difficult or
          impossible. Keyboard typing remains better for precise editing,
          code and technical content, anything requiring specific
          formatting or symbols, and situations where privacy or ambient
          noise rules out talking to your device. Many professional writers
          now use a hybrid workflow — dictate the rough shape of an idea,
          then switch to keyboard for the real editing pass — which plays
          to the strengths of both rather than picking one exclusively.
        </p>

        <h2 className="pt-2 text-xl font-semibold text-foreground">
          Why Keyboard Speed Is Still Worth Building
        </h2>
        <p>
          Even in a world with excellent voice tools, keyboard typing speed
          remains valuable because so much of digital work — coding,
          spreadsheets, chat, forms, precise editing — simply isn&apos;t
          well-suited to dictation, and switching tools constantly between
          voice and keyboard has its own friction cost. Treating voice
          dictation as an additional tool alongside solid typing skills,
          rather than a replacement for them, tends to produce the most
          flexible and genuinely fast overall workflow.
        </p>
      </div>

      <div className="border-t border-border pt-6 text-center">
        <p className="mb-4 text-muted">
          See how your keyboard speed actually stacks up.
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
