import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found – WPM Rush",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="w-full max-w-md space-y-6 text-center">
      <p className="text-sm font-semibold tracking-widest text-emerald-400">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        Page not found
      </h1>
      <p className="text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-emerald-400"
      >
        Back to the typing test
      </Link>
    </div>
  );
}
