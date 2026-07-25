"use client";

import { useEffect, useRef, useState } from "react";
import { THEMES, applyTheme, getStoredTheme, type ThemeId } from "@/lib/theme";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>("emerald");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(getStoredTheme());
  }, []);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectTheme(id: ThemeId) {
    applyTheme(id);
    setCurrent(id);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change color theme"
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          className="h-[18px] w-[18px]"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 1 1 0-18c4.5 0 8.5 3.2 8.96 7.55.2 1.86-1.24 3.45-3.11 3.45h-1.9c-1.1 0-1.95 1-1.72 2.08.13.6.02 1.24-.35 1.75-.5.7-1.32 1.12-2.18 1.17-.4.02-.7 0-.7 0Z"
          />
          <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7.2" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="16.2" cy="10" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-44 rounded-xl border border-border bg-surface p-2 shadow-lg"
        >
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="menuitemradio"
              aria-checked={current === theme.id}
              onClick={() => selectTheme(theme.id)}
              className={
                "flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-background/60 " +
                (current === theme.id ? "text-foreground" : "text-muted")
              }
            >
              <span
                className="h-4 w-4 shrink-0 rounded-full border-2"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.accent,
                }}
              />
              {theme.label}
              {current === theme.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="ml-auto h-3.5 w-3.5 text-accent"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5 9-9" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
