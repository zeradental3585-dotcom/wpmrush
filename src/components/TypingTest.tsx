"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateParagraph } from "@/lib/words";

type CharState = "pending" | "correct" | "incorrect";

type KeystrokeEvent = {
  /** milliseconds since the test started */
  t: number;
  expected: string;
  correct: boolean;
};

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
  const keystrokeLogRef = useRef<KeystrokeEvent[]>([]);

  const mode = getMode(selectedModeKey);

  function resetForMode(modeKey: string) {
    setTarget(generateParagraph(wordCountForMode(getMode(modeKey))));
    setTyped("");
    setStartTime(null);
    setEndTime(null);
    setNow(null);
    keystrokeLogRef.current = [];
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

    const nowTs = Date.now();
    let effectiveStart = startTime;
    if (!startTime && value.length > 0) {
      effectiveStart = nowTs;
      setStartTime(nowTs);
    }

    if (value.length > typed.length && effectiveStart) {
      for (let i = typed.length; i < value.length; i++) {
        const expected = target[i];
        keystrokeLogRef.current.push({
          t: nowTs - effectiveStart,
          expected,
          correct: value[i] === expected,
        });
      }
    }

    setTyped(value);

    if (value.length === target.length) {
      setEndTime(nowTs);
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
    const log = keystrokeLogRef.current;

    const rawWpm = elapsedMinutes > 0 ? Math.round(log.length / 5 / elapsedMinutes) : 0;

    const buckets = new Array(totalSeconds).fill(0);
    for (const k of log) {
      if (!k.correct) continue;
      const idx = Math.min(totalSeconds - 1, Math.max(0, Math.floor(k.t / 1000)));
      buckets[idx] += 1;
    }
    const wpmHistory = buckets.map((count, i) => ({
      second: i + 1,
      wpm: Math.round((count / 5) * 60),
    }));

    const consistency = computeConsistency(wpmHistory.map((p) => p.wpm));

    const missedKeyCounts = new Map<string, number>();
    for (const k of log) {
      if (k.correct) continue;
      const label = k.expected === " " ? "Space" : k.expected;
      missedKeyCounts.set(label, (missedKeyCounts.get(label) ?? 0) + 1);
    }
    const topMissedKeys = Array.from(missedKeyCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return (
      <div className="mx-auto w-full max-w-2xl space-y-8 text-center">
        <h2 className="text-2xl font-semibold text-slate-100">Results</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Adjusted WPM" value={wpm} />
          <StatCard label="Raw WPM" value={rawWpm} />
          <StatCard label="Accuracy" value={`${accuracy}%`} />
          <StatCard label="Consistency" value={`${consistency}%`} />
          <StatCard label="Time" value={`${totalSeconds}s`} />
          <StatCard label="Mode" value={mode.label} small />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-left">
          <h3 className="mb-3 text-sm font-medium text-slate-300">
            WPM over time
          </h3>
          <WpmChart data={wpmHistory} />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-left">
          <h3 className="mb-3 text-sm font-medium text-slate-300">
            Most missed keys
          </h3>
          {topMissedKeys.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {topMissedKeys.map(([key, count]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 font-mono text-sm text-red-400"
                >
                  {key}
                  <span className="text-xs text-slate-500">×{count}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No missed keys — perfect accuracy.
            </p>
          )}
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

/**
 * Consistency = 100 minus the coefficient of variation (stdDev / mean) of the
 * per-second WPM samples, clamped to 0-100. Steadier pacing across the test
 * produces a score closer to 100; wildly uneven bursts pull it down.
 */
function computeConsistency(samples: number[]): number {
  if (samples.length < 2) return 100;
  const mean = samples.reduce((a, b) => a + b, 0) / samples.length;
  if (mean <= 0) return 100;
  const variance =
    samples.reduce((a, b) => a + (b - mean) ** 2, 0) / samples.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = stdDev / mean;
  return Math.max(0, Math.min(100, Math.round((1 - coefficientOfVariation) * 100)));
}

function WpmChart({ data }: { data: { second: number; wpm: number }[] }) {
  const width = 600;
  const height = 160;
  const paddingLeft = 28;
  const paddingRight = 8;
  const paddingTop = 10;
  const paddingBottom = 20;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;
  const maxWpm = Math.max(10, ...data.map((d) => d.wpm));

  if (data.length === 0) {
    return (
      <p className="text-sm text-slate-500">Not enough data to chart.</p>
    );
  }

  const points = data.map((d, i) => {
    const x =
      paddingLeft +
      (data.length <= 1 ? innerWidth : (i / (data.length - 1)) * innerWidth);
    const y = paddingTop + innerHeight - (d.wpm / maxWpm) * innerHeight;
    return { x, y };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = [
    `${paddingLeft},${paddingTop + innerHeight}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${paddingLeft + innerWidth},${paddingTop + innerHeight}`,
  ].join(" ");

  const yTicks = [0, Math.round(maxWpm / 2), maxWpm];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      role="img"
      aria-label="Words per minute sampled every second over the course of the test"
    >
      {yTicks.map((tick) => {
        const y = paddingTop + innerHeight - (tick / maxWpm) * innerHeight;
        return (
          <g key={tick}>
            <line
              x1={paddingLeft}
              x2={width - paddingRight}
              y1={y}
              y2={y}
              stroke="#1e293b"
              strokeWidth={1}
            />
            <text x={0} y={y + 3} fontSize={10} fill="#64748b">
              {tick}
            </text>
          </g>
        );
      })}
      <polygon points={areaPoints} fill="rgba(52, 211, 153, 0.08)" stroke="none" />
      <polyline
        points={linePoints}
        fill="none"
        stroke="#34d399"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text x={paddingLeft} y={height - 4} fontSize={10} fill="#64748b">
        0s
      </text>
      <text
        x={width - paddingRight}
        y={height - 4}
        fontSize={10}
        textAnchor="end"
        fill="#64748b"
      >
        {data.length}s
      </text>
    </svg>
  );
}
