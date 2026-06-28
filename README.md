# DARED — idared.org

Website for **Direct Action for Rights Equity and Development (DARED)**, a Cameroonian
non-profit dedicated to community empowerment, cultural heritage preservation, and
sustainable development.

This is a modern rebuild of the original static site, using **Next.js + TypeScript +
Tailwind CSS** with a heritage-rooted **"Toghu"** design language. It builds to a fully
static site for hosting anywhere.

## Structure

- `web/` — the Next.js application (all source)
- `PROGRESS.md` — rebuild progress tracker and decisions

## Develop

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
cd web
npm run build    # outputs static files to web/out/
```

Upload the contents of `web/out/` to any static host.

---

> The original static (HTML/CSS/JS) site is preserved on the **`legacy`** branch.
