// Compress specific image files passed as args (same settings as optimize-images).
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";

const MAX_W = 1920;
const QUALITY = 82;

for (const p of process.argv.slice(2)) {
  const input = await readFile(p);
  const orig = (await stat(p)).size;
  const meta = await sharp(input).metadata();
  let pipe = sharp(input).rotate();
  if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
  const out = await pipe.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
  if (out.length < orig) {
    await writeFile(p, out);
    console.log(`${p}: ${(orig / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`);
  } else {
    console.log(`${p}: kept (${(orig / 1024).toFixed(0)}KB)`);
  }
}
