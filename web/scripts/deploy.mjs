/*
  Deploy the static export in `out/` straight to the web host over FTP.

  This exists because cPanel's "Extract" silently refuses to write files on
  this account, so zip-and-extract deploys appear to succeed while changing
  nothing. Uploading file by file removes the extractor from the loop.

  Usage:
      npm run build
      npm run deploy           # upload
      npm run deploy:dry       # list what would upload, connect to nothing

  Credentials come from `web/.env.local` (gitignored) or the environment:

      FTP_HOST=premium250.web-hosting.com
      FTP_USER=your_cpanel_or_ftp_user
      FTP_PASSWORD=your_password
      FTP_REMOTE_DIR=/public_html      # optional, this is the default
      FTP_SECURE=true                  # optional, set false only if FTPS fails

  Nothing on the server is deleted; files are added and overwritten in place.
*/

import { Client } from "basic-ftp";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, "..");
const localDir = join(webRoot, "out");
const dryRun = process.argv.includes("--dry-run");

/* ---------------------------------------------------------------- config */

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(webRoot, ".env.local"));

const host = process.env.FTP_HOST;
const user = process.env.FTP_USER;
const password = process.env.FTP_PASSWORD;
const remoteDir = process.env.FTP_REMOTE_DIR || "/public_html";
const useTls = (process.env.FTP_SECURE || "true").toLowerCase() !== "false";

/* ------------------------------------------------------------ pre-flight */

function fail(message, hint) {
  console.error(`\n  ${message}`);
  if (hint) console.error(`  ${hint}`);
  process.exit(1);
}

if (!existsSync(localDir)) {
  fail("No `out/` folder found.", "Run `npm run build` first.");
}

function walk(dir) {
  let files = [];
  let bytes = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = walk(full);
      files = files.concat(sub.files);
      bytes += sub.bytes;
    } else {
      files.push(full);
      bytes += statSync(full).size;
    }
  }
  return { files, bytes };
}

const { files, bytes } = walk(localDir);
const mb = (bytes / 1024 / 1024).toFixed(1);

if (files.length === 0) {
  fail("`out/` is empty.", "Run `npm run build` first.");
}

// Guard against the classic silent breakage: a build that dropped .htaccess.
const hasHtaccess = existsSync(join(localDir, ".htaccess"));

console.log(`\n  Local:   ${localDir}`);
console.log(`  Remote:  ${remoteDir}`);
console.log(`  Payload: ${files.length} files, ${mb} MB`);
console.log(`  .htaccess included: ${hasHtaccess ? "yes" : "NO (check public/)"}`);

if (dryRun) {
  console.log("\n  Dry run, nothing was uploaded. Sample of files:");
  for (const f of files.slice(0, 15)) {
    console.log(`    ${f.slice(localDir.length + 1).replace(/\\/g, "/")}`);
  }
  if (files.length > 15) console.log(`    ... and ${files.length - 15} more`);
  process.exit(0);
}

if (!host || !user || !password) {
  fail(
    "Missing FTP credentials.",
    "Create web/.env.local with FTP_HOST, FTP_USER and FTP_PASSWORD.\n" +
      "  Get them from cPanel > FTP Accounts (use the account's full username)."
  );
}

/* ---------------------------------------------------------------- upload */

async function connect(client, secure, rejectUnauthorized) {
  await client.access({
    host,
    user,
    password,
    secure,
    secureOptions: secure ? { rejectUnauthorized } : undefined,
  });
}

const client = new Client(30_000);
client.ftp.verbose = false;

let uploaded = 0;
client.trackProgress((info) => {
  if (info.type === "upload" && info.name) {
    uploaded += 1;
    const name = info.name.replace(/\\/g, "/");
    process.stdout.write(`\r  [${uploaded}/${files.length}] ${name.slice(-60).padEnd(62)}`);
  }
});

try {
  if (useTls) {
    try {
      await connect(client, true, true);
      console.log("\n  Connected over FTPS (certificate verified).");
    } catch (err) {
      // Shared hosts often present a certificate for the server hostname
      // rather than the domain, which fails strict verification.
      if (/certificate|self.signed|altname|CERT_/i.test(String(err))) {
        console.log(
          "\n  Certificate not verifiable, retrying FTPS without strict checking."
        );
        await connect(client, true, false);
        console.log("  Connected over FTPS (encrypted, certificate unverified).");
      } else {
        throw err;
      }
    }
  } else {
    await connect(client, false);
    console.log("\n  Connected over plain FTP (credentials sent unencrypted).");
  }

  await client.ensureDir(remoteDir);
  console.log(`  Uploading into ${remoteDir} ...\n`);

  // Mirrors the directory: creates folders, overwrites files, and never
  // deletes anything already on the server.
  await client.uploadFromDir(localDir, remoteDir);

  console.log(`\n\n  Done. ${uploaded} files uploaded.`);
  console.log("  Verify with: https://idared.org/sitemap.xml (expect 23 <loc> entries)");
} catch (err) {
  const message = String(err && err.message ? err.message : err);
  console.error(`\n\n  Upload failed: ${message}`);
  if (/530|login|password|authentication/i.test(message)) {
    console.error(
      "  That looks like bad credentials. In cPanel > FTP Accounts, use the\n" +
        "  FULL username shown there (often user@idared.org) and reset the\n" +
        "  password if unsure."
    );
  } else if (/ENOTFOUND|EAI_AGAIN/i.test(message)) {
    console.error("  Host not found. Check FTP_HOST in web/.env.local.");
  } else if (/ECONNREFUSED|ETIMEDOUT|timeout/i.test(message)) {
    console.error(
      "  Could not reach the server. Some networks block FTP; try again on\n" +
        "  another connection, or set FTP_SECURE=false to test plain FTP."
    );
  } else if (/quota|storage|451|552/i.test(message)) {
    console.error("  The account may be out of disk space. Check cPanel > Disk Usage.");
  }
  process.exit(1);
} finally {
  client.close();
}
