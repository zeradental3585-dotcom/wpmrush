import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-6 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} WPM Rush, a Zera Technologies
            property.
          </p>
          <p className="text-xs text-faint">
            Designed and developed by{" "}
            <a
              href="https://zeratech.io"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-secondary"
            >
              Zera Technologies
            </a>
          </p>
        </div>
        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
