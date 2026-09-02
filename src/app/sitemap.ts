import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { LESSONS } from "@/lib/lessons";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = ["", "/about", "/privacy", "/contact", "/blog", "/learn"];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
  const lessonRoutes = LESSONS.map((lesson) => `/learn/${lesson.slug}`);
  return [...STATIC_ROUTES, ...blogRoutes, ...lessonRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
