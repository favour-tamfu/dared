/*
  Umami analytics — privacy-first, cookieless, no consent banner required.

  Chosen over Plausible because Umami's Hobby tier is permanently free at a
  volume this site will not approach, and it is MIT-licensed, so it can be
  self-hosted later without changing anything but the src below.

  Nothing renders unless NEXT_PUBLIC_UMAMI_WEBSITE_ID is set at build time,
  so no third-party script ships until an account actually exists. To enable,
  put this in web/.env.local and rebuild:

      NEXT_PUBLIC_UMAMI_WEBSITE_ID=<the id from your Umami dashboard>

  Optionally point at a self-hosted instance:

      NEXT_PUBLIC_UMAMI_SRC=https://analytics.example.org/script.js

  `defer` keeps it off the critical path — it will not delay first paint,
  which matters on the mobile connections most of our visitors are on.
*/

const DEFAULT_SRC = "https://cloud.umami.is/script.js";

export function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  return (
    <script
      defer
      src={process.env.NEXT_PUBLIC_UMAMI_SRC || DEFAULT_SRC}
      data-website-id={websiteId}
    />
  );
}
