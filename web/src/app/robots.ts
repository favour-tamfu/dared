import type { MetadataRoute } from "next";

// Required for static export (`output: export`).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://idared.org/sitemap.xml",
    host: "https://idared.org",
  };
}
