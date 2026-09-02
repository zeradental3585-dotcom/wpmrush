"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (status === "loading") {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-surface" />;
  }

  if (!session?.user) {
    return (
      <button
        type="button"
        onClick={() => signIn("google")}
        className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-secondary"
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-border bg-surface/60"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs font-medium text-muted">
            {session.user.name?.charAt(0)?.toUpperCase() ?? "?"}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
          <div className="truncate border-b border-border px-3 py-2 text-xs text-faint">
            {session.user.email}
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-muted transition-colors hover:text-secondary"
          >
            Dashboard
          </Link>
          <Link
            href="/learn"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-muted transition-colors hover:text-secondary"
          >
            Learn to type
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="block w-full px-3 py-2 text-left text-sm text-muted transition-colors hover:text-secondary"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
