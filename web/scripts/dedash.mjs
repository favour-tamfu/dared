// Replace em-dashes (U+2014) with a comma across the site source.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(ts|tsx|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

let total = 0;
for (const f of await walk("src")) {
  const before = await readFile(f, "utf8");
  const count = (before.match(/—/g) || []).length;
  if (!count) continue;
  const after = before.replace(/ *— */g, ", ");
  await writeFile(f, after);
  total += count;
  console.log(`${f}: ${count}`);
}
console.log("em-dashes replaced:", total);
