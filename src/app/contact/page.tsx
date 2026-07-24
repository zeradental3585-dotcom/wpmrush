import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – WPM Rush",
  description:
    "Get in touch with WPM Rush for feedback, bug reports, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-2xl space-y-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        Contact
      </h1>
      <p className="text-slate-400">
        Found a bug, have feedback, or just want to say hi? We&apos;d love to
        hear from you.
      </p>
      <a
        href="mailto:ubsatishsingh@gmail.com"
        className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-emerald-400"
      >
        ubsatishsingh@gmail.com
      </a>
    </div>
  );
}
