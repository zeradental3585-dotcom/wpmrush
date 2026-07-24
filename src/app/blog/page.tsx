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
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Blog
        </h1>
        <p className="text-slate-400">
          Tips, benchmarks, and guides to help you type faster.
        </p>
      </div>

      <div className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-colors hover:border-slate-700 hover:bg-slate-900"
          >
            <h2 className="text-xl font-semibold text-slate-100">
              {post.title}
            </h2>
            <p className="mt-2 text-slate-400">{post.excerpt}</p>
            <p className="mt-4 text-xs text-slate-500">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
