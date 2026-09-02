export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    readTime: string;
    publishedAt: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
        slug: "how-to-improve-typing-speed",
        title: "How to Improve Your Typing Speed",
        excerpt:
                "Practical, specific techniques — from hand position to practice structure — that actually move your WPM, not just generic tips.",
        readTime: "5 min read",
        publishedAt: "2026-07-24",
  },
  {
        slug: "average-wpm-by-age-profession",
        title: "Average WPM by Age and Profession: What's Actually Good?",
        excerpt:
                "Realistic typing speed benchmarks for beginners, average typists, professionals, and data entry roles, with a simple reference table.",
        readTime: "5 min read",
        publishedAt: "2026-07-24",
  },
  {
        slug: "touch-typing-for-beginners",
        title: "Touch Typing for Beginners: A Step-by-Step Guide",
        excerpt:
                "Learn proper finger placement, the home row, and a simple week-by-week routine to build touch-typing skill from scratch.",
        readTime: "6 min read",
        publishedAt: "2026-07-24",
  },
  {
        slug: "typing-games-vs-typing-tests",
        title: "Typing Games vs. Typing Tests: Which Builds Real Skill Faster?",
        excerpt:
                "Gamified typing apps are fun, but structured typing tests train the habits that actually move your WPM. Here's the practical case why.",
        readTime: "5 min read",
        publishedAt: "2026-07-25",
  },
  {
        slug: "common-typing-mistakes-to-fix",
        title: "5 Common Typing Mistakes That Are Capping Your Speed",
        excerpt:
                "Hunting and pecking, over-correcting, poor posture, and other habits quietly limit your WPM. Here's how to diagnose and fix each one.",
        readTime: "6 min read",
        publishedAt: "2026-07-25",
  },
  {
        slug: "how-wpm-is-calculated",
        title: "How WPM Is Actually Calculated (It's Not What Most People Think)",
        excerpt:
                "The standard five-characters-per-word convention, gross vs. net WPM, and why two typists with the same 'speed' can perform very differently.",
        readTime: "7 min read",
        publishedAt: "2026-09-02",
  },
  {
        slug: "typing-ergonomics-and-injury-prevention",
        title: "Typing Ergonomics: Preventing Wrist and Hand Strain",
        excerpt:
                "Desk, chair, and keyboard positioning that actually matters, early warning signs of RSI, and simple habits that protect your hands over years of typing.",
        readTime: "8 min read",
        publishedAt: "2026-09-02",
  },
  {
        slug: "typing-speed-and-careers",
        title: "Does Typing Speed Actually Matter for Your Career?",
        excerpt:
                "Which jobs genuinely require fast, accurate typing, the WPM benchmarks employers actually screen for, and how to demonstrate the skill.",
        readTime: "7 min read",
        publishedAt: "2026-09-02",
  },
  {
        slug: "qwerty-vs-dvorak-vs-colemak",
        title: "QWERTY vs. Dvorak vs. Colemak: Is Switching Worth It?",
        excerpt:
                "An honest look at how each layout works, what the evidence actually shows, and the real time cost of relearning before you commit.",
        readTime: "8 min read",
        publishedAt: "2026-09-02",
  },
  ];

export function getBlogPost(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.slug === slug);
}
