import { generateLessonText, generateText } from "@/lib/words";

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  order: number;
  group: string;
  /** "drill" = restricted-key practice text, otherwise reuses an existing
   * TypingTest content generator for a more realistic, unrestricted mode. */
  mode: "drill" | "words" | "punctuation" | "quotes";
  targetKeys: string[];
  wordCount: number;
};

const HOME_LEFT = ["a", "s", "d", "f"];
const HOME_RIGHT = ["j", "k", "l", ";"];
const HOME_ALL = [...HOME_LEFT, ...HOME_RIGHT];
const TOP_ROW = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const BOTTOM_ROW = ["z", "x", "c", "v", "b", "n", "m"];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const LESSONS: Lesson[] = [
  {
    slug: "home-row-left",
    title: "Home Row: Left Hand",
    description: "Get comfortable with A, S, D, F — where your left fingers rest.",
    order: 1,
    group: "Home Row",
    mode: "drill",
    targetKeys: HOME_LEFT,
    wordCount: 35,
  },
  {
    slug: "home-row-right",
    title: "Home Row: Right Hand",
    description: "Now the right hand: J, K, L, and the semicolon.",
    order: 2,
    group: "Home Row",
    mode: "drill",
    targetKeys: HOME_RIGHT,
    wordCount: 35,
  },
  {
    slug: "home-row-full",
    title: "Home Row: Both Hands",
    description: "Combine all eight home row keys, alternating hands.",
    order: 3,
    group: "Home Row",
    mode: "drill",
    targetKeys: HOME_ALL,
    wordCount: 40,
  },
  {
    slug: "top-row",
    title: "Top Row",
    description: "Reach up to Q W E R T Y U I O P without looking down.",
    order: 4,
    group: "Top Row",
    mode: "drill",
    targetKeys: [...TOP_ROW, ...HOME_ALL],
    wordCount: 40,
  },
  {
    slug: "bottom-row",
    title: "Bottom Row",
    description: "Down to Z X C V B N M — the trickiest row for most beginners.",
    order: 5,
    group: "Bottom Row",
    mode: "drill",
    targetKeys: [...BOTTOM_ROW, ...HOME_ALL],
    wordCount: 40,
  },
  {
    slug: "numbers-row",
    title: "Numbers",
    description: "The number row, 1 through 0, without breaking your rhythm.",
    order: 6,
    group: "Numbers & Symbols",
    mode: "drill",
    targetKeys: NUMBERS,
    wordCount: 30,
  },
  {
    slug: "full-alphabet",
    title: "Full Alphabet",
    description: "All 26 letters together — real short words, no restrictions.",
    order: 7,
    group: "Full Keyboard",
    mode: "words",
    targetKeys: [],
    wordCount: 45,
  },
  {
    slug: "capitals-and-punctuation",
    title: "Capitals & Punctuation",
    description: "Shift for capitals, plus commas, periods, and apostrophes.",
    order: 8,
    group: "Full Keyboard",
    mode: "punctuation",
    targetKeys: [],
    wordCount: 45,
  },
  {
    slug: "real-world-practice",
    title: "Real-World Practice",
    description: "Full quotes and sentences — everything you've learned, combined.",
    order: 9,
    group: "Full Keyboard",
    mode: "quotes",
    targetKeys: [],
    wordCount: 50,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export function getNextLesson(order: number): Lesson | undefined {
  return LESSONS.find((l) => l.order === order + 1);
}

/** Generates fresh practice text for a lesson using the right generator for its mode. */
export function buildLessonText(lesson: Lesson): string {
  switch (lesson.mode) {
    case "words":
      return generateText("words", lesson.wordCount);
    case "punctuation":
      return generateText("punctuation", lesson.wordCount);
    case "quotes":
      return generateText("quotes", lesson.wordCount);
    case "drill":
    default:
      return generateLessonText(lesson.targetKeys, lesson.wordCount);
  }
}

/** Groups lessons by their curriculum group, preserving lesson order. */
export function groupLessons(lessons: Lesson[]): { group: string; lessons: Lesson[] }[] {
  const groups: { group: string; lessons: Lesson[] }[] = [];
  for (const lesson of lessons) {
    let bucket = groups.find((g) => g.group === lesson.group);
    if (!bucket) {
      bucket = { group: lesson.group, lessons: [] };
      groups.push(bucket);
    }
    bucket.lessons.push(lesson);
  }
  return groups;
}
