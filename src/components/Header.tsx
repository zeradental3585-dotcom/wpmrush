import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AuthButton from "@/components/AuthButton";

export default function Header() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-semibold tracking-tight"
        >
          <span className="text-accent">WPM</span>
          <span className="text-foreground">Rush</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/learn"
            className="text-sm text-muted transition-colors hover:text-secondary"
          >
            Learn
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-secondary"
          >
            Blog
          </Link>
          <ThemeSwitcher />
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}
