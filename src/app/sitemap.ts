import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL = "https://wpmrush.com";
const STATIC_ROUTES = ["", "/about", "/privacy", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes = BLOG_POSTS.map((post) => `/blog/${post.slug}`);
  return [...STATIC_ROUTES, ...blogRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
