"use client";

import { useEffect, useState } from "react";

const ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export type KeyFlashEvent = {
  key: string;
  correct: boolean;
  id: number;
};

export default function KeyboardVisualizer({
  nextChar,
  flashEvent,
}: {
  nextChar: string | null;
  flashEvent: KeyFlashEvent | null;
}) {
  const [flash, setFlash] = useState<{ key: string; correct: boolean } | null>(
    null,
  );

  useEffect(() => {
    if (!flashEvent) return;
    setFlash({ key: flashEvent.key.toLowerCase(), correct: flashEvent.correct });
    const id = setTimeout(() => setFlash(null), 150);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flashEvent?.id]);

  const normalizedNext = nextChar ? nextChar.toLowerCase() : null;

  function keyClasses(key: string) {
    if (flash && flash.key === key) {
      return flash.correct
        ? "border-accent bg-accent/25 text-accent"
        : "border-danger bg-danger/25 text-danger";
    }
    if (normalizedNext === key) {
      return "border-accent bg-accent/10 text-accent";
    }
    return "border-border bg-surface/40 text-faint";
  }

  return (
    <div
      className="flex flex-col items-center gap-1.5"
      aria-hidden="true"
    >
      {ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((key) => (
            <div
              key={key}
              className={
                "flex h-7 w-7 items-center justify-center rounded-md border font-mono text-[11px] uppercase transition-colors duration-100 sm:h-8 sm:w-8 " +
                keyClasses(key)
              }
            >
              {key}
            </div>
          ))}
        </div>
      ))}
      <div
        className={
          "flex h-7 w-40 items-center justify-center rounded-md border font-mono text-[10px] uppercase tracking-widest transition-colors duration-100 sm:h-8 sm:w-48 " +
          keyClasses(" ")
        }
      >
        space
      </div>
    </div>
  );
}
