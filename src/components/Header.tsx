import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-800/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-semibold tracking-tight"
        >
          <span className="text-emerald-400">WPM</span>
          <span className="text-slate-100">Rush</span>
        </Link>
      </div>
    </header>
  );
}
