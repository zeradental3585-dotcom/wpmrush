import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";

export const SITE_URL = "https://wpmrush.com";
export const SITE_NAME = "WPM Rush";
export const OG_IMAGE_PATH = "/og-image.png";

export function buildMetadata({
  title,
  description,
  path = "",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${OG_IMAGE_PATH}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} – Free Online Typing Speed Test`,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildArticleSchema(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: "Zera Technologies",
      url: "https://zeratech.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: `${SITE_URL}${OG_IMAGE_PATH}`,
  };
}
