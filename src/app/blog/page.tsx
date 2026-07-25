import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog – WPM Rush",
  description:
    "Tips, benchmarks, and guides to help you type faster — from touch typing basics to realistic WPM targets.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Blog
        </h1>
        <p className="text-muted">
          Tips, benchmarks, and guides to help you type faster.
        </p>
      </div>

      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-border-hover hover:bg-surface"
          >
            <h2 className="text-xl font-semibold text-foreground">
              {post.title}
            </h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
            <p className="mt-4 text-xs text-faint">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
