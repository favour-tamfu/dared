import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { hostedDocuments } from "@/data/documents";

// Required for static export (`output: export`).
export const dynamic = "force-static";

const base = "https://idared.org";

export default function sitemap(): MetadataRoute.Sitemap {
  // English path -> French path. Both are listed, and each entry declares the
  // other as its alternate so search engines serve the right language.
  const pagePairs: [string, string][] = [
    ["/", "/fr/"],
    ["/about/", "/fr/a-propos/"],
    ["/events/", "/fr/evenements/"],
    ["/gallery/", "/fr/galerie/"],
    ["/resources/", "/fr/ressources/"],
    ["/get-involved/", "/fr/s-impliquer/"],
  ];

  const pages = pagePairs.flatMap(([en, fr]) => {
    const alternates = {
      languages: { en: `${base}${en}`, fr: `${base}${fr}` },
    };
    const priority = en === "/" ? 1 : 0.8;
    return [
      {
        url: `${base}${en}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
      {
        url: `${base}${fr}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority,
        alternates,
      },
    ];
  });

  const eventPages = events.flatMap((e) => {
    const alternates = {
      languages: {
        en: `${base}/events/${e.slug}/`,
        fr: `${base}/fr/evenements/${e.slug}/`,
      },
    };
    return [
      {
        url: `${base}/events/${e.slug}/`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates,
      },
      {
        url: `${base}/fr/evenements/${e.slug}/`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates,
      },
    ];
  });

  // Search engines index PDFs as their own results, so list the files too.
  const documentFiles = hostedDocuments().map((doc) => ({
    url: `${base}${doc.href}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...eventPages, ...documentFiles];
}
