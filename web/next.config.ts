import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` so it can be uploaded to
  // Namecheap shared hosting (cPanel/FTP) — no Node server required.
  output: "export",
  // Emit `/about/index.html` style folders so Apache serves clean URLs
  // without custom rewrite rules.
  trailingSlash: true,
  // Static export can't use the default on-demand image optimizer.
  images: {
    unoptimized: true,
  },
  // Pin the workspace root to this folder (a stray lockfile in the home
  // directory otherwise confuses Next's root inference).
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
