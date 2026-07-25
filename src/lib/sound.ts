export const SOUND_STORAGE_KEY = "wpmrush:muted";

export function getStoredMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem(SOUND_STORAGE_KEY);
    // Unset = first visit = muted by default, per product requirement.
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
}

export function setStoredMuted(muted: boolean) {
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, String(muted));
  } catch {
    // localStorage unavailable (private mode, etc.) — preference just won't persist
  }
}

let sharedContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedContext) sharedContext = new AudioContextClass();
  if (sharedContext.state === "suspended") {
    sharedContext.resume().catch(() => {});
  }
  return sharedContext;
}

function playTone({
  frequency,
  duration,
  type = "sine",
  gain = 0.05,
}: {
  frequency: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
}) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;

  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

/** Short, subtle blip for a correctly typed character. */
export function playKeyClick() {
  playTone({ frequency: 720, duration: 0.03, type: "square", gain: 0.03 });
}

/** Lower, slightly longer buzz for a mistyped character. */
export function playErrorTone() {
  playTone({ frequency: 160, duration: 0.09, type: "sawtooth", gain: 0.045 });
}
