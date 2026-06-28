// One-off: generate a branded 1200x630 Open Graph image.
// Velvet background + faint Toghu medallion motif + embroidered hem + the
// (path-based, font-independent) DARED logo composited on top.
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const W = 1200;
const H = 630;

// Embroidered hem (gold diamond zigzag + crimson beads) near the bottom.
const hemY = 548;
let up = `M0 ${hemY}`;
let down = `M0 ${hemY}`;
const beads = [];
for (let x = 0; x <= W; x += 48) {
  up += ` L${x} ${x % 96 === 0 ? hemY : hemY - 14}`;
  down += ` L${x} ${x % 96 === 0 ? hemY : hemY + 14}`;
  if (x % 96 === 0) beads.push(`<circle cx='${x}' cy='${hemY}' r='3.5'/>`);
}

const bgSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'>
  <rect width='${W}' height='${H}' fill='#0b1228'/>
  <defs>
    <pattern id='toghu' width='150' height='150' patternUnits='userSpaceOnUse'>
      <g fill='none' stroke='#d8a12a' stroke-width='1.4' opacity='0.13'>
        <circle cx='75' cy='75' r='22'/>
        <circle cx='75' cy='75' r='12'/>
        <circle cx='75' cy='75' r='3' fill='#d8a12a' stroke='none'/>
        <path d='M0 0 L10 -10 L20 0 L10 10 Z'/>
        <path d='M150 0 L160 -10 L170 0 L160 10 Z'/>
        <path d='M0 150 L10 140 L20 150 L10 160 Z'/>
        <path d='M75 0 L84 -9 L93 0 L84 9 Z'/>
        <path d='M0 75 L9 66 L18 75 L9 84 Z'/>
      </g>
    </pattern>
  </defs>
  <rect width='${W}' height='${H}' fill='url(#toghu)'/>
  <g fill='none' stroke='#d8a12a' stroke-width='3' opacity='0.9'>
    <path d='${up}'/>
    <path d='${down}'/>
  </g>
  <g fill='#b5302e'>${beads.join("")}</g>
</svg>`;

const bg = await sharp(Buffer.from(bgSvg)).png().toBuffer();

const logoSvg = await readFile("public/images/dared-logo.svg");
const logo = await sharp(logoSvg).resize({ width: 640 }).png().toBuffer();
const { width: lw = 640, height: lh = 290 } = await sharp(logo).metadata();

const out = await sharp(bg)
  .composite([
    {
      input: logo,
      top: Math.round((H - lh) / 2) - 30,
      left: Math.round((W - lw) / 2),
    },
  ])
  .png()
  .toBuffer();

await writeFile("public/og-image.png", out);
console.log(`Wrote public/og-image.png (${(out.length / 1024).toFixed(0)}KB)`);
