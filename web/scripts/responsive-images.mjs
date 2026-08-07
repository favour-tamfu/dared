/*
  Generate responsive WebP variants for every photo in public/images.

  Static export cannot use Next's on-demand image optimizer, so the site used
  to serve one full-size JPEG to every device: a phone on mobile data was
  downloading the same 1920px file as a desktop. Instead we pre-render a ladder
  of widths here at build time, and `src/lib/imageLoader.ts` points next/image
  at the right rung. The components already pass sensible `sizes`, so the
  browser picks the smallest file that will do.

  Variants land in public/images/r/ and are derived artefacts: the JPEGs in
  public/images stay the source of truth (and the fallback for anything the
  loader does not recognise).

  Run: npm run images
  Safe to re-run — existing variants are skipped unless the source is newer.
*/
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/images";
const OUT_DIR = "public/images/r";

// Must stay in sync with deviceSizes/imageSizes in next.config.ts, so the
// loader is never asked for a width we have not generated.
const WIDTHS = [384, 640, 1080, 1920];
const QUALITY = 78;

await mkdir(OUT_DIR, { recursive: true });

const files = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f));

let sourceBytes = 0;
let variantBytes = 0;
let written = 0;
let skipped = 0;

for (const file of files) {
  const srcPath = path.join(SRC_DIR, file);
  const srcStat = await stat(srcPath);
  sourceBytes += srcStat.size;

  const base = file.replace(/\.jpe?g$/i, "");
  const meta = await sharp(srcPath).metadata();
  const srcWidth = meta.width ?? Math.max(...WIDTHS);

  for (const width of WIDTHS) {
    // Never upscale: if the source is smaller than this rung, the previous
    // rung already covers it and the loader will clamp to what exists.
    if (width > srcWidth && width !== WIDTHS.find((w) => w >= srcWidth)) {
      continue;
    }

    const outPath = path.join(OUT_DIR, `${base}-${width}.webp`);
    const existing = await stat(outPath).catch(() => null);

    if (existing && existing.mtimeMs >= srcStat.mtimeMs) {
      variantBytes += existing.size;
      skipped += 1;
      continue;
    }

    const buffer = await sharp(srcPath)
      .rotate()
      .resize({ width: Math.min(width, srcWidth), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();

    await writeFile(outPath, buffer);
    variantBytes += buffer.length;
    written += 1;
  }
}

// A manifest of the widths that actually exist per image, so the loader can
// clamp a request to the largest rung we generated rather than 404.
const manifest = {};
for (const name of await readdir(OUT_DIR)) {
  const match = name.match(/^(.*)-(\d+)\.webp$/);
  if (!match) continue;
  (manifest[match[1]] ??= []).push(Number(match[2]));
}
for (const key of Object.keys(manifest)) manifest[key].sort((a, b) => a - b);

await writeFile(
  "src/lib/image-manifest.json",
  `${JSON.stringify(manifest, null, 0)}\n`
);

const mb = (n) => (n / 1048576).toFixed(2);
console.log(`sources : ${files.length} JPEGs, ${mb(sourceBytes)}MB`);
console.log(`variants: ${written} written, ${skipped} up to date`);
console.log(`          ${mb(variantBytes)}MB total across all widths`);
console.log(
  `a 384px-wide tile now costs roughly ${(
    variantBytes /
    1048576 /
    Math.max(1, Object.keys(manifest).length) /
    WIDTHS.length
  ).toFixed(3)}MB instead of the full-size JPEG`
);
