"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateParagraph } from "@/lib/words";

type CharState = "pending" | "correct" | "incorrect";

type Mode =
  | { key: string; label: string; kind: "time"; seconds: number }
  | { key: string; label: string; kind: "words"; count: number };

const MODES: Mode[] = [
  { key: "15s", label: "15s", kind: "time", seconds: 15 },
  { key: "30s", label: "30s", kind: "time", seconds: 30 },
  { key: "60s", label: "60s", kind: "time", seconds: 60 },
  { key: "25w", label: "25 words", kind: "words", count: 25 },
  { key: "50w", label: "50 words", kind: "words", count: 50 },
];

const DEFAULT_MODE_KEY = "30s";

// Long enough to outlast a 60s test even at very fast typing speeds.
const TIME_MODE_WORD_COUNT = 350;

function getMode(key: string): Mode {
  return MODES.find((m) => m.key === key) ?? MODES[1];
}

function wordCountForMode(mode: Mode): number {
  return mode.kind === "time" ? TIME_MODE_WORD_COUNT : mode.count;
}

function personalBestKey(modeKey: string): string {
  return `wpmrush:pb:${modeKey}`;
}

function getStoredBest(modeKey: string): number | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(personalBestKey(modeKey));
  return stored ? Number(stored) : null;
}

function getCharStates(target: string, typed: string): CharState[] {
  return target.split("").map((char, i) => {
    if (i >= typed.length) return "pending";
    return typed[i] === char ? "correct" : "incorrect";
  });
}

export default function TypingTest() {
  const [selectedModeKey, setSelectedModeKey] = useState(DEFAULT_MODE_KEY);
  const [target, setTarget] = useState("");
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [personalBest, setPersonalBest] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordedRef = useRef(false);
  const currentCharRef = useRef<HTMLSpanElement>(null);

  const mode = getMode(selectedModeKey);

  function resetForMode(modeKey: string) {
    setTarget(generateParagraph(wordCountForMode(getMode(modeKey))));
    setTyped("");
    setStartTime(null);
    setEndTime(null);
    setNow(null);
  }

  useEffect(() => {
    resetForMode(selectedModeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPersonalBest(getStoredBest(selectedModeKey));
  }, [selectedModeKey]);

  useEffect(() => {
    if (!startTime || endTime) return;
    const id = setInterval(() => {
      const nowTs = Date.now();
      setNow(nowTs);
      if (mode.kind === "time" && nowTs - startTime >= mode.seconds * 1000) {
        setEndTime(startTime + mode.seconds * 1000);
      }
    }, 100);
    return () => clearInterval(id);
  }, [startTime, endTime, mode]);

  useEffect(() => {
    currentCharRef.current?.scrollIntoView({ block: "center" });
  }, [typed]);

  const isFinished = endTime !== null;
  const charStates = useMemo(() => getCharStates(target, typed), [target, typed]);

  const elapsedMs = startTime ? (endTime ?? now ?? startTime) - startTime : 0;
  const elapsedMinutes = elapsedMs / 60000;

  const correctChars = charStates.filter((s) => s === "correct").length;
  const typedChars = typed.length;

  const wpm = elapsedMinutes > 0 ? Math.round(correctChars / 5 / elapsedMinutes) : 0;
  const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

  const timeLeft =
    mode.kind === "time" ? Math.max(0, mode.seconds - Math.floor(elapsedMs / 1000)) : null;
  const wordsTyped =
    mode.kind === "words"
      ? Math.min(mode.count, (typed.match(/ /g) || []).length + (isFinished ? 1 : 0))
      : null;

  useEffect(() => {
    if (!isFinished) {
      recordedRef.current = false;
      return;
    }
    if (recordedRef.current) return;
    recordedRef.current = true;
    const stored = getStoredBest(selectedModeKey) ?? 0;
    if (wpm > stored) {
      window.localStorage.setItem(personalBestKey(selectedModeKey), String(wpm));
      setPersonalBest(wpm);
    }
  }, [isFinished, wpm, selectedModeKey]);

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

  function handleModeSelect(modeKey: string) {
    setSelectedModeKey(modeKey);
    resetForMode(modeKey);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleRestart() {
    resetForMode(selectedModeKey);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  const modeSelector = (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => handleModeSelect(m.key)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
              (m.key === selectedModeKey
                ? "bg-emerald-500 text-slate-950"
                : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200")
            }
          >
            {m.label}
          </button>
        ))}
      </div>
      {personalBest !== null && (
        <p className="text-xs text-slate-500">
          Personal best:{" "}
          <span className="font-medium text-slate-300">{personalBest} WPM</span>
        </p>
      )}
    </div>
  );

  if (!target) {
    return <div className="text-center text-slate-400">Loading...</div>;
  }

  if (isFinished) {
    const totalSeconds = mode.kind === "time" ? mode.seconds : Math.max(1, Math.round(elapsedMs / 1000));
    return (
      <div className="mx-auto w-full max-w-2xl space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-100">Results</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="WPM" value={wpm} />
          <StatCard label="Accuracy" value={`${accuracy}%`} />
          <StatCard label="Time" value={`${totalSeconds}s`} />
          <StatCard label="Mode" value={mode.label} small />
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
      {modeSelector}

      <div className="flex justify-between text-sm text-slate-400">
        <span>
          WPM: <span className="font-medium text-slate-100">{wpm}</span>
        </span>
        {mode.kind === "time" ? (
          <span>
            Time left: <span className="font-medium text-slate-100">{timeLeft}s</span>
          </span>
        ) : (
          <span>
            Words:{" "}
            <span className="font-medium text-slate-100">
              {wordsTyped}/{mode.count}
            </span>
          </span>
        )}
        <span>
          Accuracy: <span className="font-medium text-slate-100">{accuracy}%</span>
        </span>
      </div>

      <div
        onClick={focusInput}
        className="relative cursor-text select-none overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-6 font-mono text-xl leading-relaxed tracking-wide"
        style={{ maxHeight: "9.5rem" }}
      >
        {target.split("").map((char, i) => {
          const state = charStates[i];
          const isCurrent = i === typed.length;
          return (
            <span
              key={i}
              ref={isCurrent ? currentCharRef : undefined}
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

function StatCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string | number;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div
        className={`font-semibold text-emerald-400 ${small ? "text-xl" : "text-3xl"}`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-400">{label}</div>
    </div>
  );
}
