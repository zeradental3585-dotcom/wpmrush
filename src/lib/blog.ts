export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-improve-typing-speed",
    title: "How to Improve Your Typing Speed",
    excerpt:
      "Practical, specific techniques — from hand position to practice structure — that actually move your WPM, not just generic tips.",
    readTime: "5 min read",
  },
  {
    slug: "average-wpm-by-age-profession",
    title: "Average WPM by Age and Profession: What's Actually Good?",
    excerpt:
      "Realistic typing speed benchmarks for beginners, average typists, professionals, and data entry roles, with a simple reference table.",
    readTime: "5 min read",
  },
  {
    slug: "touch-typing-for-beginners",
    title: "Touch Typing for Beginners: A Step-by-Step Guide",
    excerpt:
      "Learn proper finger placement, the home row, and a simple week-by-week routine to build touch-typing skill from scratch.",
    readTime: "6 min read",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
