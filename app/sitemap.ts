import type { MetadataRoute } from "next";
import { pressItems } from "@/data/press";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/hakkinda", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "/hizmetler", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/kentsel-donusum", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/basinda", priority: 0.75, changeFrequency: "weekly" as const },
    { path: "/iletisim", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/gizlilik-politikasi", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/kvkk-aydinlatma-metni", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cerez-politikasi", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pressRoutes = pressItems
    .filter((p) => p.body)
    .map((p) => ({
      url: `${base}/basinda/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...serviceRoutes, ...pressRoutes];
}
