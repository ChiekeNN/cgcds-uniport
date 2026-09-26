import type { MetadataRoute } from "next";

import { PROGRAMS, SEED_ARTICLES } from "@/lib/content";
import { SITE } from "@/lib/site";

const base = SITE.domain.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/about/history",
    "/about/staff",
    "/about/gallery",
    "/programs",
    "/programs/short-courses",
    "/tuition",
    "/journals",
    "/news",
    "/admission",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/programs") ? 0.9 : 0.7,
  }));

  const programRoutes: MetadataRoute.Sitemap = PROGRAMS.map((p) => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const newsRoutes: MetadataRoute.Sitemap = SEED_ARTICLES.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...programRoutes, ...newsRoutes];
}
