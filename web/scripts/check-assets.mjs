/*
  Fail the build when content points at a file that is not there.

  Next validates routes, not assets: a typo in an image or document path in
  src/data compiles perfectly and only shows up as a broken image in
  production. This walks the content files and checks every referenced path
  actually exists under public/.

  It also warns (without failing) about photos that are too low-resolution for
  the slot they are used in — a hero displayed edge to edge needs far more
  pixels than a gallery thumbnail, and social-media downloads often do not
  have them.

  Run: npm run check   (also runs as part of npm run build)
*/
import sharp from "sharp";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = "public";

// A hero fills the viewport width; anything much under this is visibly soft.
const MIN_HERO_WIDTH = 1200;

const errors = [];
const warnings = [];

async function exists(publicPath) {
  const file = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  return stat(file)
    .then((s) => s.isFile())
    .catch(() => false);
}

async function widthOf(publicPath) {
  const file = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  return sharp(file)
    .metadata()
    .then((m) => m.width ?? 0)
    .catch(() => 0);
}

/* ------------------------------------------------------- collect references

   Everything under src/, not just the data files: images are referenced from
   page and component source too (the home page portrait, the hero slideshow),
   and those break just as silently.
*/

async function sourceFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await sourceFiles(full)));
    else if (/\.(ts|tsx)$/.test(entry.name)) found.push(full);
  }
  return found;
}

const files = await sourceFiles("src");

/**
 * Drops comments, so the worked examples in the "how to add a document"
 * headers are not mistaken for real references.
 */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

/** path -> the source files that reference it, for a useful error message. */
const referenced = new Map();
const heroPaths = new Set();

for (const file of files) {
  const source = stripComments(await readFile(file, "utf8"));

  for (const match of source.matchAll(/"(\/(?:images|documents)\/[^"]+)"/g)) {
    const target = match[1];
    if (!referenced.has(target)) referenced.set(target, new Set());
    referenced.get(target).add(file);
  }

  /*
    Only images actually displayed edge to edge get held to the hero bar: the
    `image:` field of an event (its article hero and card) and the home
    slideshow. Gallery photos sit in small square tiles, where 590px is fine.
  */
  for (const match of source.matchAll(/\bimage:\s*"(\/images\/[^"]+)"/g)) {
    heroPaths.add(match[1]);
  }
  if (file.endsWith("Hero.tsx")) {
    for (const match of source.matchAll(/\bsrc:\s*"(\/images\/[^"]+)"/g)) {
      heroPaths.add(match[1]);
    }
  }
}

for (const [target, sources] of referenced) {
  if (!(await exists(target))) {
    errors.push(`${target} is missing (referenced by ${[...sources].join(", ")})`);
  }
}

for (const target of heroPaths) {
  if (!target.endsWith(".jpg") && !target.endsWith(".jpeg")) continue;
  if (!(await exists(target))) continue;
  const width = await widthOf(target);
  if (width && width < MIN_HERO_WIDTH) {
    warnings.push(
      `${target} is only ${width}px wide but is displayed full width (want ${MIN_HERO_WIDTH}px+)`
    );
  }
}

const allImagePaths = [...referenced.keys()].filter((p) =>
  p.startsWith("/images/")
);
const docPaths = [...referenced.keys()].filter((p) =>
  p.startsWith("/documents/")
);

/* ----------------------------------------------------------------- report */

console.log(
  `checked ${allImagePaths.length} images and ${docPaths.length} documents`
);

for (const w of warnings) console.log(`  warning: ${w}`);

if (errors.length > 0) {
  console.error("");
  for (const e of errors) console.error(`  ERROR: ${e}`);
  console.error(`\n${errors.length} missing file(s) — build stopped.`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.log(`\n${warnings.length} low-resolution hero image(s); not fatal.`);
}
