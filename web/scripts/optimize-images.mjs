// One-off: recompress public/images JPEGs at high quality, downscaling only
// images wider than MAX_W. Originals remain in ../legacy/Images as backup.
import sharp from "sharp";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const dir = "public/images";
const MAX_W = 1920;
const QUALITY = 82;

const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f));
let before = 0;
let after = 0;

for (const f of files) {
  const p = path.join(dir, f);
  const input = await readFile(p);
  const origSize = (await stat(p)).size;
  before += origSize;

  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).rotate(); // bake in EXIF orientation
  if (meta.width && meta.width > MAX_W) {
    pipeline = pipeline.resize({ width: MAX_W });
  }
  const out = await pipeline
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  if (out.length < origSize) {
    await writeFile(p, out);
    after += out.length;
    console.log(
      `${f}: ${(origSize / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
    );
  } else {
    after += origSize;
    console.log(`${f}: kept (${(origSize / 1024).toFixed(0)}KB)`);
  }
}

console.log("----");
console.log(
  `TOTAL: ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB`
);
