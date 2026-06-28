import type { MetadataRoute } from "next";
import { events } from "@/data/events";

// Required for static export (`output: export`).
export const dynamic = "force-static";

const base = "https://idared.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about", "events", "gallery", "get-involved"].map((p) => ({
    url: p ? `${base}/${p}/` : `${base}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p ? 0.8 : 1,
  }));

  const eventPages = events.map((e) => ({
    url: `${base}/events/${e.slug}/`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...eventPages];
}
