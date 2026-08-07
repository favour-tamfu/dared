"use client";

import manifest from "./image-manifest.json";

/*
  Custom next/image loader for the static export.

  `output: "export"` rules out Next's on-demand optimizer, so the widths are
  pre-rendered instead: `npm run images` writes a ladder of WebP variants into
  public/images/r/ and records which widths exist per photo in
  image-manifest.json. This maps a requested width onto the smallest variant
  that covers it, which is what turns the `sizes` props the components already
  pass into a real srcset.

  Anything we have no variant for — SVGs, files added since the last run — is
  returned untouched, so a missing variant degrades to the original JPEG rather
  than a broken image.
*/

const variants: Record<string, number[]> = manifest;

export default function daredImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const match = /^\/images\/([^/]+)\.jpe?g$/i.exec(src);
  if (!match) return src;

  const rungs = variants[match[1]];
  if (!rungs || rungs.length === 0) return src;

  // Smallest rung that still covers the requested width; if the request is
  // larger than anything we generated, the source photo was that small to
  // begin with, so the top rung is the best available.
  const rung = rungs.find((w) => w >= width) ?? rungs[rungs.length - 1];
  return `/images/r/${match[1]}-${rung}.webp`;
}
