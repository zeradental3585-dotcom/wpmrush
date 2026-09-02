"use client";

import { signIn } from "next-auth/react";

export default function SignInCta({ label = "Sign in with Google" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="rounded-lg bg-accent-solid px-6 py-3 font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
    >
      {label}
    </button>
  );
}
