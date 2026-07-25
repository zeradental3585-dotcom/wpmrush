import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found – WPM Rush",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-accent">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Page not found
      </h1>
      <p className="text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
      >
        Back to the typing test
      </Link>
    </div>
  );
}
