"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateParagraph } from "@/lib/words";

type CharState = "pending" | "correct" | "incorrect";

const PARAGRAPH_WORD_COUNT = 35;

function getCharStates(target: string, typed: string): CharState[] {
  return target.split("").map((char, i) => {
    if (i >= typed.length) return "pending";
    return typed[i] === char ? "correct" : "incorrect";
  });
}

export default function TypingTest() {
  const [target, setTarget] = useState("");
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTarget(generateParagraph(PARAGRAPH_WORD_COUNT));
  }, []);

  useEffect(() => {
    if (!startTime || endTime) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [startTime, endTime]);

  const isFinished = endTime !== null;
  const charStates = useMemo(() => getCharStates(target, typed), [target, typed]);

  const elapsedMs = startTime ? (endTime ?? now ?? startTime) - startTime : 0;
  const elapsedMinutes = elapsedMs / 60000;

  const correctChars = charStates.filter((s) => s === "correct").length;
  const typedChars = typed.length;

  const wpm = elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;
  const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isFinished || !target) return;
    let value = e.target.value;
    if (value.length > target.length) value = value.slice(0, target.length);

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setTyped(value);

    if (value.length === target.length) {
      setEndTime(Date.now());
    }
  }

  function handleRestart() {
    setTarget(generateParagraph(PARAGRAPH_WORD_COUNT));
    setTyped("");
    setStartTime(null);
    setEndTime(null);
    setNow(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  if (!target) {
    return <div className="text-center text-slate-400">Loading...</div>;
  }

  if (isFinished) {
    const totalSeconds = Math.max(1, Math.round(elapsedMs / 1000));
    return (
      <div className="mx-auto w-full max-w-2xl space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-100">Results</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="WPM" value={wpm} />
          <StatCard label="Accuracy" value={`${accuracy}%`} />
          <StatCard label="Time" value={`${totalSeconds}s`} />
        </div>
        <button
          onClick={handleRestart}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-emerald-400"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div className="flex justify-between text-sm text-slate-400">
        <span>
          WPM: <span className="font-medium text-slate-100">{wpm}</span>
        </span>
        <span>
          Accuracy: <span className="font-medium text-slate-100">{accuracy}%</span>
        </span>
      </div>

      <div
        onClick={focusInput}
        className="relative cursor-text select-none rounded-xl border border-slate-800 bg-slate-900/60 p-6 font-mono text-xl leading-relaxed tracking-wide"
      >
        {target.split("").map((char, i) => {
          const state = charStates[i];
          const isCurrent = i === typed.length;
          return (
            <span
              key={i}
              className={
                state === "correct"
                  ? "text-emerald-400"
                  : state === "incorrect"
                    ? "bg-red-500/10 text-red-400"
                    : "text-slate-500"
              }
              style={
                isCurrent
                  ? { borderLeft: "2px solid #34d399", marginLeft: "-1px" }
                  : undefined
              }
            >
              {char}
            </span>
          );
        })}
        <input
          ref={inputRef}
          value={typed}
          onChange={handleChange}
          autoFocus
          className="absolute inset-0 cursor-text opacity-0"
          style={{ fontSize: "16px" }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Typing input"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleRestart}
          className="text-sm text-slate-400 transition-colors hover:text-slate-200"
        >
          Restart with a new paragraph ↻
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="text-3xl font-semibold text-emerald-400">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}
