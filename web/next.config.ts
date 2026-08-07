import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` so it can be uploaded to
  // Namecheap shared hosting (cPanel/FTP) — no Node server required.
  output: "export",
  // Emit `/about/index.html` style folders so Apache serves clean URLs
  // without custom rewrite rules.
  trailingSlash: true,
  // Static export can't use the default on-demand image optimizer, so widths
  // are pre-rendered by `npm run images` and picked by a custom loader. These
  // two ladders must match WIDTHS in scripts/responsive-images.mjs, or the
  // loader will be asked for a variant that was never generated.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    deviceSizes: [640, 1080, 1920],
    imageSizes: [384],
  },
  // Pin the workspace root to this folder (a stray lockfile in the home
  // directory otherwise confuses Next's root inference).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
