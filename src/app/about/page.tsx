import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – WPM Rush",
  description:
    "Learn about WPM Rush, a free online typing speed test that tracks your words per minute and accuracy in real time — no signup required.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        About WPM Rush
      </h1>
      <div className="space-y-4 text-slate-400">
        <p>
          WPM Rush is a free online typing speed test. Click into the box,
          start typing, and the timer, words-per-minute (WPM), and accuracy
          are all tracked in real time as you go — no setup, no configuration.
        </p>
        <p>
          There&apos;s no signup required. WPM Rush doesn&apos;t ask for an
          account or any personal information — just open the site and start
          typing. Each test uses a fresh paragraph of common English words, so
          you can practice as many times as you like.
        </p>
        <p>
          Whether you&apos;re warming up, benchmarking your typing speed, or
          just trying to beat your last score, WPM Rush is built to be fast,
          clean, and distraction-free.
        </p>
      </div>
    </div>
  );
}
