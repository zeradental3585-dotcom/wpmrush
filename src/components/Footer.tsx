import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} WPM Rush</p>
        <nav className="flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
