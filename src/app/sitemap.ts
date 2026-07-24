import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = ["", "/about", "/privacy", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
  return [...STATIC_ROUTES, ...blogRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
