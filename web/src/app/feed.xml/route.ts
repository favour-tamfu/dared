import { events } from "@/data/events";

// Required for static export (`output: export`) — the feed is written once at
// build time alongside the pages.
export const dynamic = "force-static";

const SITE = "https://idared.org";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * "2026-07-29" -> RFC 822, which is what RSS wants. Built from parts rather
 * than `toUTCString()` so the value cannot shift with the build machine's
 * timezone.
 */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function rfc822(iso: string): string | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return undefined;
  const [, y, m, d] = match;
  const day = DAYS[new Date(Date.UTC(+y, +m - 1, +d)).getUTCDay()];
  return `${day}, ${d} ${MONTHS[+m - 1]} ${y} 00:00:00 GMT`;
}

export function GET() {
  const items = events
    .map((event) => {
      const url = `${SITE}/events/${event.slug}/`;
      const pubDate = event.date ? rfc822(event.date) : undefined;

      return [
        "    <item>",
        `      <title>${escapeXml(event.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(event.excerpt)}</description>`,
        `      <category>${escapeXml(event.category)}</category>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : null,
        `      <enclosure url="${SITE}${event.image}" type="image/jpeg" />`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DARED — Events &amp; Initiatives</title>
    <link>${SITE}/events/</link>
    <description>Events and initiatives from Direct Action for Rights Equity and Development, a Cameroonian non-profit working in cultural heritage, the environment, and youth empowerment.</description>
    <language>en</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
