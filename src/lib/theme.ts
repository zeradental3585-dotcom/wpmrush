export type ThemeId = "emerald" | "violet" | "amber" | "light";

export const THEME_STORAGE_KEY = "wpmrush:theme";
export const DEFAULT_THEME: ThemeId = "emerald";

export const THEMES: {
  id: ThemeId;
  label: string;
  /** page background, used as the swatch fill */
  bg: string;
  /** accent color, used as the swatch ring */
  accent: string;
}[] = [
  { id: "emerald", label: "Emerald", bg: "#020617", accent: "#10b981" },
  { id: "violet", label: "Violet", bg: "#0a0716", accent: "#8b5cf6" },
  { id: "amber", label: "Amber", bg: "#120c02", accent: "#f59e0b" },
  { id: "light", label: "Light", bg: "#f8fafc", accent: "#059669" },
];

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return value === "emerald" || value === "violet" || value === "amber" || value === "light";
}

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeId(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(id: ThemeId) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // localStorage unavailable (private mode, etc.) — theme just won't persist
  }
}

/**
 * Inlined verbatim into a blocking <script> in <head> so the stored theme
 * applies before first paint (no flash of the default theme). Keep this
 * self-contained — it runs outside the React/module graph.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    var valid = ['emerald', 'violet', 'amber', 'light'];
    document.documentElement.setAttribute('data-theme', valid.indexOf(t) !== -1 ? t : '${DEFAULT_THEME}');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', '${DEFAULT_THEME}');
  }
})();
`;
