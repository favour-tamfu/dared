/*
  Deploy the static export in `out/` straight to the web host over FTP.

  This exists because cPanel's "Extract" silently refuses to write files on
  this account: a zip uploads fine and reports success, but no file is
  actually replaced. Uploading file by file removes the extractor entirely.

  The upload is RESUMABLE. Shared hosts routinely reset the FTP control
  socket partway through a few hundred files, so this script:
    - skips files already on the server at the same size,
    - reconnects and retries a file that fails,
    - can simply be re-run after a hard failure and will pick up where it
      stopped.

  Usage:
      npm run build
      npm run deploy            # upload (resumes automatically)
      npm run deploy:dry        # list the payload, connect to nothing
      npm run deploy -- --force # re-upload everything, ignore size matches

  Credentials come from `web/.env.local` (gitignored) or the environment:

      FTP_HOST=premium250.web-hosting.com
      FTP_USER=deploy@idared.org
      FTP_PASSWORD=...
      FTP_REMOTE_DIR=/         # account rooted at public_html
      FTP_SECURE=true          # set false only if FTPS fails outright

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
const force = process.argv.includes("--force");

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
const rawRemote = process.env.FTP_REMOTE_DIR || "/public_html";
const remoteRoot = rawRemote === "/" ? "" : rawRemote.replace(/\/$/, "");
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

/** Every file under out/, as { local, remote, size }, sorted small-first. */
function collect(dir, prefix = "") {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out = out.concat(collect(full, rel));
    } else {
      out.push({
        local: full,
        remote: `${remoteRoot}/${rel}`,
        rel,
        size: statSync(full).size,
      });
    }
  }
  return out;
}

const files = collect(localDir);
const totalBytes = files.reduce((n, f) => n + f.size, 0);

if (files.length === 0) fail("`out/` is empty.", "Run `npm run build` first.");

const hasHtaccess = files.some((f) => f.rel === ".htaccess");

console.log(`\n  Local:   ${localDir}`);
console.log(`  Remote:  ${rawRemote}`);
console.log(
  `  Payload: ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MB`
);
console.log(`  .htaccess included: ${hasHtaccess ? "yes" : "NO (check public/)"}`);

if (dryRun) {
  console.log("\n  Dry run, nothing was uploaded. Sample of files:");
  for (const f of files.slice(0, 15)) console.log(`    ${f.rel}`);
  if (files.length > 15) console.log(`    ... and ${files.length - 15} more`);
  process.exit(0);
}

if (!host || !user || !password) {
  fail(
    "Missing FTP credentials.",
    "Create web/.env.local with FTP_HOST, FTP_USER and FTP_PASSWORD."
  );
}

/* ---------------------------------------------------------------- client */

let client;

async function connect() {
  client = new Client(60_000);
  client.ftp.verbose = false;

  const attempt = async (secure, rejectUnauthorized) => {
    await client.access({
      host,
      user,
      password,
      secure,
      secureOptions: secure ? { rejectUnauthorized } : undefined,
    });
  };

  if (useTls) {
    try {
      await attempt(true, true);
    } catch (err) {
      // Shared hosts often present a certificate for the server hostname
      // rather than the domain, which fails strict verification.
      if (!/certificate|self.signed|altname|CERT_/i.test(String(err))) throw err;
      client = new Client(60_000);
      client.ftp.verbose = false;
      await attempt(true, false);
    }
  } else {
    await attempt(false);
  }

  // Long sessions with many small files are the case that gets reset; a
  // keep-alive on the control socket makes idle timeouts less likely.
  client.ftp.socket?.setKeepAlive?.(true, 10_000);
}

const ensured = new Set();

async function ensureRemoteDir(dir) {
  if (!dir || dir === "/" || ensured.has(dir)) return;
  await client.ensureDir(dir);
  await client.cd("/");
  ensured.add(dir);
}

/* ---------------------------------------------------------------- upload */

let uploaded = 0;
let skipped = 0;
let reconnects = 0;
const failures = [];

function line(text) {
  process.stdout.write(`\r  ${text.slice(0, 76).padEnd(78)}`);
}

async function sendFile(file) {
  const dir = dirname(file.remote).replace(/\\/g, "/");

  // Already there at the same size? Leave it alone. This is what makes a
  // re-run after a dropped connection cheap.
  if (!force) {
    const remoteSize = await client.size(file.remote).catch(() => -1);
    if (remoteSize === file.size) {
      skipped += 1;
      return;
    }
  }

  await ensureRemoteDir(dir);
  await client.uploadFrom(file.local, file.remote);
  uploaded += 1;
}

async function sendWithRetry(file) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      await sendFile(file);
      return;
    } catch (err) {
      const message = String(err && err.message ? err.message : err);
      const recoverable =
        /ECONNRESET|EPIPE|ETIMEDOUT|closed|timeout|socket|421|425|426/i.test(
          message
        );
      if (!recoverable || attempt === 4) {
        failures.push({ rel: file.rel, message });
        return;
      }
      // The control socket died. Rebuild the session and carry on.
      reconnects += 1;
      line(`connection lost, reconnecting (${reconnects}) ...`);
      try {
        client.close();
      } catch {}
      ensured.clear();
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      try {
        await connect();
      } catch (reconnectErr) {
        failures.push({ rel: file.rel, message: String(reconnectErr) });
        return;
      }
    }
  }
}

try {
  await connect();
  console.log(
    `\n  Connected over ${useTls ? "FTPS" : "plain FTP"}. Uploading into ${rawRemote} ...\n`
  );

  let index = 0;
  for (const file of files) {
    index += 1;
    line(`[${index}/${files.length}] ${file.rel}`);
    await sendWithRetry(file);
  }

  line("");
  console.log(`\n\n  Uploaded:   ${uploaded}`);
  console.log(`  Skipped:    ${skipped} (already on server, same size)`);
  if (reconnects) console.log(`  Reconnects: ${reconnects}`);

  if (failures.length) {
    console.log(`  Failed:     ${failures.length}`);
    for (const f of failures.slice(0, 10)) {
      console.log(`    ${f.rel}  ${f.message}`);
    }
    if (failures.length > 10) {
      console.log(`    ... and ${failures.length - 10} more`);
    }
    console.log("\n  Re-run `npm run deploy` to retry just the missing files.");
    process.exitCode = 1;
  } else {
    console.log("\n  Deploy complete.");
    console.log(
      "  Verify: https://idared.org/sitemap.xml should list 23 <loc> entries."
    );
  }
} catch (err) {
  const message = String(err && err.message ? err.message : err);
  console.error(`\n\n  Deploy failed: ${message}`);
  if (/530|login|password|authentication/i.test(message)) {
    console.error("  Bad credentials. Check FTP_USER and FTP_PASSWORD.");
  } else if (/ENOTFOUND|EAI_AGAIN/i.test(message)) {
    console.error("  Host not found. Check FTP_HOST.");
  } else if (/ECONNREFUSED|ETIMEDOUT|timeout/i.test(message)) {
    console.error(
      "  Could not reach the server. Some networks block FTP; try another\n" +
        "  connection, or set FTP_SECURE=false to test plain FTP."
    );
  }
  console.error("  Re-run `npm run deploy`; finished files are skipped.");
  process.exitCode = 1;
} finally {
  try {
    client?.close();
  } catch {}
}
