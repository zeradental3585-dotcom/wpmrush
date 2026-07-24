import type { MetadataRoute } from "next";

const BASE_URL = "https://wpmrush.com";
const ROUTES = ["", "/about", "/privacy", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
