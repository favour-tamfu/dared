# idared.org

**[idared.org](https://idared.org)** is the official website of **DARED** — *Direct Action
for Rights Equity and Development* — a Cameroonian non-profit working on community
empowerment, cultural heritage preservation, and sustainable development in the Northwest
Region and beyond.

The site is live and in production. This repository is where it is built, maintained, and
deployed from.

[![Live at idared.org](https://img.shields.io/badge/live-idared.org-C8102E?style=for-the-badge)](https://idared.org)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## What's on the site

| Page | What it does |
|---|---|
| **Home** | Hero slideshow, impact figures, the three programme pillars (Cultural Heritage, Environment, Youth Empowerment), and featured events |
| **About** | Who DARED is, what it stands for, and the team |
| **Events** | Every event DARED has run, each with its own page at `/events/<slug>/` — full write-up, photo gallery, lightbox, and share links |
| **Gallery** | The full photo archive, grouped by event |
| **Resource Centre** | A tabbed document library (Internal Documents, Operating Procedures, Reports). Files are published openly, shared on request by email, or linked out |
| **Get Involved** | Volunteer application form, donation details, and contact routes |

Sitewide: a newsletter signup in the footer, WhatsApp and Facebook contact, and a
donation link. Forms run on **Formspree**, so there is no backend to keep alive.

Currently published: **16 events**, a full photo gallery, and the board-approved Child
Protection and Safeguarding Policy. That is 23 URLs in `sitemap.xml`, PDFs included.

## The design: Toghu

The visual language is called **Toghu**, after *Atoghu* — the embroidered regalia of the
Northwest Grassfields. Deep velvet navy is the cloth; crimson, gold, green, and white are
the embroidery, used only as accents. Sun-medallion and diamond-lattice motifs run as
quiet watermarks and as an animated "embroidered hem" between sections: present, never the
focus. Type is **Fraunces** (display) over **Inter** (body).

The tone is deliberate — serious, heritage-rooted, professional. Not flashy, not playful.
Motion is slow and respects `prefers-reduced-motion`.

Palette tokens (`velvet-800`, `crimson-500`, `gold-300`, `leaf-600`, `sand-100`) live in
`web/src/app/globals.css` and should be used instead of raw hex, so new pages match
automatically.

## How it's built

| | |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5, React 19 |
| **Styling** | Tailwind CSS v4 (theme defined in `globals.css` via `@theme`) |
| **Fonts** | Fraunces + Inter, self-hosted at build time via `next/font` |
| **Content** | Typed TypeScript files under `web/src/data/` — no CMS, no database |
| **Forms** | Formspree (volunteer + newsletter) |
| **Output** | Static export (`output: 'export'`) — plain HTML, CSS, and JS |
| **Hosting** | Namecheap shared hosting (Apache / cPanel) |
| **Domain** | Registered on Hostinger, DNS pointed at Namecheap |
| **Deploy** | `npm run deploy` — resumable FTPS upload (`web/scripts/deploy.mjs`) |

There is no server process and no database. `npm run build` writes a complete static site
to `web/out/`, and the deploy script uploads it. SEO is handled at build time: generated
`sitemap.xml` and `robots.txt`, per-page canonicals and Open Graph, a branded OG image,
and JSON-LD for the organisation, each event, and each published document.

## Repository layout

```
Dared/
├── web/              # the Next.js application (all source lives here)
│   ├── public/       # images, documents, .htaccess, OG image
│   ├── scripts/      # deploy, image optimisation, OG generation
│   └── src/
│       ├── app/      # one folder per page
│       ├── components/
│       ├── data/     # events.ts and documents.ts — all site content
│       └── lib/      # nav links, contact details, form endpoints
├── MAINTENANCE.md    # how to add content and get it live
├── PROGRESS.md       # rebuild history and decisions
└── README.md
```

## Running it locally

Requires Node 20+ (built and deployed on Node 24).

```bash
git clone https://github.com/favour-tamfu/dared.git
cd dared/web
npm install
npm run dev          # http://localhost:3000
```

## Updating content

Content is plain TypeScript, so an edit is a normal code change:

- **Events** — add an entry to `web/src/data/events.ts`. It appears on the Events page,
  in the Gallery, in `sitemap.xml`, and at its own `/events/<slug>/` URL automatically.
  `featured: true` also puts it on the home page.
- **Documents** — drop the file in `web/public/documents/` and add an entry to
  `web/src/data/documents.ts`.
- **Contact details, form endpoints, donate link** — `web/src/lib/nav.ts`, changed in one
  place and reflected everywhere.

Field-by-field instructions are in **[MAINTENANCE.md](MAINTENANCE.md)**.

## Deploying

```bash
cd web
npm run build
npm run deploy
```

The uploader is resumable (files already on the server at a matching size are skipped),
self-healing (shared hosts drop long FTP sessions; it reconnects and retries), and
non-destructive (it adds and overwrites, never deletes). **If it fails, run it again** —
each pass gets further.

Confirm a deploy landed by counting `<loc>` entries at
**https://idared.org/sitemap.xml**. That number comes from the server and is immune to
browser caching, which makes it the only trustworthy check. Then hard-refresh with
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>.

> ⚠️ **Do not use cPanel's zip + Extract on this host.** The zip uploads, Extract reports
> success, folder timestamps even update — and not one file is written. Two structurally
> different zips both left the site untouched, and disk quota was not the cause. This cost
> hours to diagnose. `npm run deploy` bypasses it entirely.

FTP credentials live in `web/.env.local`, which is gitignored and never committed.

## Documentation

- **[MAINTENANCE.md](MAINTENANCE.md)** — the practical guide: adding documents and events,
  image rules, deploying, credentials, troubleshooting. Start here.
- **[PROGRESS.md](PROGRESS.md)** — how the rebuild went and why decisions were made.
- **[web/README.md](web/README.md)** — developer notes for the application itself.

## The original site

The site that ran at idared.org until August 2026 was a hand-built Bootstrap 5 static
site. It is preserved, unchanged, on the
**[`legacy`](https://github.com/favour-tamfu/dared/tree/legacy)** branch —
including the original uncompressed photography, which is why image optimisation here is
never destructive.

## License

**This project is not open source.** It is a commissioned website, built for DARED and
published for them. The source code, design, copy, photography, and the DARED name and
logo are the property of DARED, all rights reserved.

The repository is public so the work can be read and referenced. That is not permission to
copy, reuse, modify, redistribute, or deploy it, in whole or in part. See
[LICENSE](LICENSE).

## Contact

Built and maintained by **Favour Tamfu**
· [GitHub](https://github.com/favour-tamfu)
· [LinkedIn](https://www.linkedin.com/in/favour-tamfu)

DARED · [info@idared.org](mailto:info@idared.org) · [idared.org](https://idared.org)
