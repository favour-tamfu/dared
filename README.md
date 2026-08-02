# DARED — idared.org

Website for **Direct Action for Rights Equity and Development (DARED)**, a Cameroonian
non-profit dedicated to community empowerment, cultural heritage preservation, and
sustainable development.

This is a modern rebuild of the original static site, using **Next.js + TypeScript +
Tailwind CSS** with a heritage-rooted **"Toghu"** design language. It builds to a fully
static site for hosting anywhere.

## Structure

- `web/` — the Next.js application (all source)
- `MAINTENANCE.md` — **how to add documents and events, and how to deploy**
- `PROGRESS.md` — rebuild progress tracker and decisions

## Develop

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
cd web
npm run build    # outputs static files to web/out/
npm run deploy   # uploads web/out/ to the live server over FTP
```

Deploying needs FTP credentials in `web/.env.local` (gitignored). Do **not**
use cPanel's zip + Extract, it silently discards files on this host. See
[MAINTENANCE.md](MAINTENANCE.md) for the full story.

---

> The original static (HTML/CSS/JS) site is preserved on the **`legacy`** branch.
