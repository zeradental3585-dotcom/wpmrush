import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact – WPM Rush",
  description:
    "Get in touch with WPM Rush for feedback, bug reports, or general questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="w-full max-w-2xl space-y-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Contact
      </h1>
      <p className="text-muted">
        Found a bug, have feedback, or just want to say hi? We&apos;d love to
        hear from you.
      </p>
      <a
        href="mailto:ubsatishsingh@gmail.com"
        className="inline-block rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
      >
        ubsatishsingh@gmail.com
      </a>
    </div>
  );
}
