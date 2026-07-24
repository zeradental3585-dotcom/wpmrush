<!-- WPM Rush: a fast, clean typing speed test built on Next.js. -->

# WPM Rush

A free online typing speed test. Pick a mode (15s / 30s / 60s or 25 / 50
words), start typing, and see your live WPM and accuracy as you go.

## Stack

- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Project Structure

- `src/app/page.tsx` — homepage with the typing test
- `src/components/TypingTest.tsx` — mode selection, timing, WPM/accuracy logic
- `src/app/blog/` — typing tips and WPM benchmark articles
- `src/app/{about,privacy,contact}/` — static pages
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO metadata routes

## Build

```bash
npm run build
```
