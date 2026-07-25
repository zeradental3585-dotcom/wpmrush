const COMMON_WORDS = [
  "the", "of", "and", "a", "to", "in", "is", "you", "that", "it",
  "he", "was", "for", "on", "are", "as", "with", "his", "they", "at",
  "be", "this", "have", "from", "or", "one", "had", "by", "word", "but",
  "not", "what", "all", "were", "we", "when", "your", "can", "said", "there",
  "use", "an", "each", "which", "she", "do", "how", "their", "if", "will",
  "up", "other", "about", "out", "many", "then", "them", "these", "so", "some",
  "her", "would", "make", "like", "him", "into", "time", "has", "look", "two",
  "more", "write", "go", "see", "number", "no", "way", "could", "people", "my",
  "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find",
  "long", "down", "day", "did", "get", "come", "made", "may", "part", "over",
  "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live",
  "me", "back", "give", "most", "very", "after", "thing", "our", "just", "name",
  "good", "sentence", "man", "think", "say", "great", "where", "help", "through", "much",
  "before", "line", "right", "too", "mean", "old", "any", "same", "tell", "boy",
  "follow", "came", "want", "show", "also", "around", "form", "three", "small", "set",
  "put", "end", "why", "again", "turn", "here", "off", "went", "old", "number",
];

// Public-domain / widely-attributed short quotes. Kept to plain ASCII
// punctuation (straight apostrophes, no em/en dashes) so every character is
// reachable on a standard keyboard.
const QUOTES = [
  "The only way to do great work is to love what you do.",
  "In the middle of difficulty lies opportunity.",
  "Life is what happens when you're busy making other plans.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Whether you think you can or you think you can't, you're right.",
  "The way to get started is to quit talking and begin doing.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only thing we have to fear is fear itself.",
  "Be yourself; everyone else is already taken.",
  "Two roads diverged in a wood, and I took the one less traveled by.",
  "That which does not kill us makes us stronger.",
  "You must be the change you wish to see in the world.",
  "I think, therefore I am.",
  "Not all those who wander are lost.",
  "The unexamined life is not worth living.",
  "An investment in knowledge pays the best interest.",
  "Give me liberty, or give me death.",
];

// Short, single-line snippets (no literal newlines, since the typing input
// is a single-line field) mixing JS, Python, and simple SQL/shell syntax to
// exercise symbol-heavy typing.
const CODE_SNIPPETS = [
  "const sum = arr.reduce((a, b) => a + b, 0);",
  "function isEven(n) { return n % 2 === 0; }",
  'const user = { name: "Alex", age: 30 };',
  "if (x > 0 && y > 0) { return true; }",
  "for (let i = 0; i < items.length; i++) { total += items[i]; }",
  "const doubled = numbers.map((n) => n * 2);",
  "try { doWork(); } catch (err) { console.error(err); }",
  "export default function App() { return <div>Hello</div>; }",
  "const [count, setCount] = useState(0);",
  "array.filter((x) => x !== null).length;",
  "def is_even(n): return n % 2 == 0",
  "squares = [x * x for x in range(10)]",
  'def greet(name="World"): print(f"Hello, {name}!")',
  'with open("data.txt") as f: lines = f.readlines()',
  "class Point: def __init__(self, x, y): self.x = x",
  "total = sum(item.price for item in cart if item.active)",
  "result = {k: v for k, v in data.items() if v > 0}",
  "SELECT name, age FROM users WHERE age > 18;",
  'git commit -m "fix: handle null pointer exception"',
  "npm install --save-dev eslint prettier",
];

export type ContentType = "words" | "quotes" | "punctuation" | "code";

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomDistinct<T>(arr: readonly T[], exclude?: T): T {
  if (arr.length <= 1) return arr[0];
  let choice = pickRandom(arr);
  while (choice === exclude) choice = pickRandom(arr);
  return choice;
}

function capitalize(word: string): string {
  return word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export function generateParagraph(wordCount = 35): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(pickRandom(COMMON_WORDS));
  }
  return words.join(" ");
}

/** Joins random quotes until at least targetWordCount words are covered. */
function generateQuotesText(targetWordCount: number): string {
  const parts: string[] = [];
  let total = 0;
  let last: string | undefined;
  while (total < targetWordCount) {
    const quote = pickRandomDistinct(QUOTES, last);
    parts.push(quote);
    total += quote.split(" ").length;
    last = quote;
  }
  return parts.join(" ");
}

/** Joins random snippets until at least targetWordCount tokens are covered. */
function generateCodeText(targetWordCount: number): string {
  const parts: string[] = [];
  let total = 0;
  let last: string | undefined;
  while (total < targetWordCount) {
    const snippet = pickRandomDistinct(CODE_SNIPPETS, last);
    parts.push(snippet);
    total += snippet.split(" ").length;
    last = snippet;
  }
  return parts.join(" ");
}

function terminalPunctuation(): string {
  const r = Math.random();
  if (r < 0.08) return "?";
  if (r < 0.14) return "!";
  return ".";
}

/**
 * Reuses the common-word pool but groups it into pseudo-sentences with
 * capitalization, commas, terminal punctuation, and the occasional
 * possessive apostrophe or quoted word — for testing accuracy on
 * non-letter characters without changing the underlying word count.
 */
function generatePunctuationText(targetWordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < targetWordCount; i++) {
    words.push(pickRandom(COMMON_WORDS));
  }

  const sentences: string[] = [];
  let i = 0;
  while (i < words.length) {
    const len = Math.min(words.length - i, 6 + Math.floor(Math.random() * 7));
    const sentence = words.slice(i, i + len);
    i += len;
    if (sentence.length === 0) continue;

    sentence[0] = capitalize(sentence[0]);

    const decorable = sentence.length - 1; // leave the last word for terminal punctuation
    if (decorable > 1) {
      const commaIdx = 1 + Math.floor(Math.random() * (decorable - 1));
      sentence[commaIdx] = sentence[commaIdx] + ",";

      if (Math.random() < 0.25) {
        const apIdx = Math.floor(Math.random() * decorable);
        if (apIdx !== commaIdx) {
          sentence[apIdx] = sentence[apIdx] + "'s";
        }
      }

      if (Math.random() < 0.15) {
        const qIdx = Math.floor(Math.random() * decorable);
        if (qIdx !== commaIdx && !sentence[qIdx].includes("'")) {
          sentence[qIdx] = `"${sentence[qIdx]}"`;
        }
      }
    }

    sentence[sentence.length - 1] = sentence[sentence.length - 1] + terminalPunctuation();
    sentences.push(sentence.join(" "));
  }

  return sentences.join(" ");
}

export function generateText(contentType: ContentType, wordCount: number): string {
  switch (contentType) {
    case "quotes":
      return generateQuotesText(wordCount);
    case "punctuation":
      return generatePunctuationText(wordCount);
    case "code":
      return generateCodeText(wordCount);
    case "words":
    default:
      return generateParagraph(wordCount);
  }
}
