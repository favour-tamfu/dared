# Maintaining idared.org

A practical guide to updating the site: adding documents, adding events, and
getting changes live. No prior context needed.

Everything happens inside the `web/` folder.

```bash
cd web
npm install       # first time only
npm run dev       # preview at http://localhost:3000
npm run build     # produce the static site in web/out/
npm run deploy    # upload web/out/ to the live server
```

Content lives in plain TypeScript files under `web/src/data/`. You edit a
file, run `npm run build`, then `npm run deploy`. That is the whole loop.

---

## Add a document to the Resource Centre

The Resource Centre is at [idared.org/resources](https://idared.org/resources/)
with three tabs: **Internal Documents**, **Operating Procedures**, and
**Reports**. Empty tabs show a friendly "nothing published yet" message, so you
can fill them in one at a time.

### 1. Put the file in place

```
web/public/documents/
```

Name it lowercase with hyphens, no spaces:

- Good: `annual-report-2025.pdf`
- Bad: `Annual Report 2025.pdf`

Spaces become `%20` in the URL and behave badly on the server. Anything in
`public/` is copied to the site root at build time, so a file at
`web/public/documents/annual-report-2025.pdf` is served from
`/documents/annual-report-2025.pdf`.

### 2. Add an entry

Open `web/src/data/documents.ts` and add an object to the `documents` array:

```ts
{
  id: "annual-report-2025",
  title: "Annual Report 2025",
  category: "Reports",
  summary:
    "A full year of DARED's work: programmes delivered, communities reached, and lessons carried forward.",
  updated: "March 2026",
  format: "PDF",
  size: "2.4 MB",
  href: "/documents/annual-report-2025.pdf",
},
```

| Field | Notes |
|---|---|
| `id` | Unique, lowercase, hyphenated. Used as the React key. |
| `title` | Shown on the card and used as the link text. |
| `category` | Exactly one of `"Internal Documents"`, `"Operating Procedures"`, `"Reports"`. Anything else is a type error. |
| `summary` | One or two sentences. Also used in the page's structured data for search engines. |
| `updated` | Write it as `"Month YYYY"`. That exact shape is parsed into an ISO date for SEO, so `"March 2026"` works and `"Mar 2026"` or `"03/2026"` are silently skipped. |
| `format` | `"PDF"`, `"DOCX"`, `"XLSX"` or `"Link"`. |
| `size` | Optional, purely cosmetic, e.g. `"2.4 MB"`. |
| `href` | Optional. See below. |

### 3. Build and deploy

```bash
npm run build
npm run deploy
```

### Choosing how a document is shared

**Published openly** — set `href` to the file path. The card title opens the
file in a new browser tab, and a separate **Download** link saves it. This is
right for anything partners or funders should be able to read: safeguarding
policies, annual reports, audited accounts.

**Shared on request** — leave `href` off entirely. The card shows **Request
access**, which opens an email to info@idared.org with the document name
pre-filled. Nothing is exposed. This suits internal records you want listed for
transparency without publishing.

**Hosted elsewhere** — set `href` to a full URL (Google Drive, Dropbox, a
partner site). It opens in a new tab, with no Download link since a save can
only be forced for files on our own server.

### Which tab does it belong in?

- **Internal Documents** — governing and founding papers: constitution and
  bylaws, governance structure, strategic plan.
- **Operating Procedures** — the rules people actually follow day to day:
  safeguarding, financial procedures, volunteer onboarding, field safety.
  Board approval does not make something an internal document; ask whether it
  *governs the organisation* or *instructs the people in it*.
- **Reports** — activity, project, and financial reporting.

The Child Protection and Safeguarding Policy sits under Operating Procedures
for exactly this reason: it binds staff, volunteers, contractors, and partners
across offices, field work, and travel.

### Good to know

- The first tab shown is the first one that **has** documents, so visitors
  never land on an empty tab.
- Each tab is linkable: `/resources/#reports`,
  `/resources/#operating-procedures`, `/resources/#internal-documents`.
- Published PDFs are added to `sitemap.xml` automatically. Google indexes PDFs
  as their own search results.
- To remove a document, delete its entry from `documents.ts`. Deleting the
  entry is what matters; the file lingering on the server is harmless, since
  deploys never delete.

---

## Add an event

Events power the home page, the Events page, the Gallery, and a detail page per
event at `/events/<slug>/`.

1. Put photos in `web/public/images/` (lowercase, hyphenated, descriptive).
2. Add an entry to the `events` array in `web/src/data/events.ts`:

```ts
{
  slug: "tree-planting-bamenda",     // becomes /events/tree-planting-bamenda/
  title: "Tree Planting in Bamenda",
  category: "Environment",           // Environment | Heritage | Youth | Arts | Advocacy
  image: "/images/tree-planting-1.jpg",   // card and hero image
  excerpt: "One or two sentences shown on the card.",
  gallery: ["/images/tree-planting-2.jpg", "/images/tree-planting-3.jpg"],
  featured: true,                    // optional: also show on the home page
  body: ["First paragraph.", "Second paragraph."],
}
```

For longer write-ups use `sections` instead of `body`, which allows headings
and bullet lists:

```ts
sections: [
  { paragraphs: ["Opening paragraph."] },
  { heading: "Impact so far", bullets: ["First point.", "Second point."] },
],
```

New events appear on the Events page, in the Gallery (grouped by event), and in
`sitemap.xml` automatically. `featured: true` also surfaces it on the home page.

---

## Images

Keep photos under about 400 KB. Large phone photos will make the site slow.

To compress specific files in place (resizes anything wider than 1920px,
JPEG quality 82):

```bash
node scripts/optimize-files.mjs public/images/my-photo.jpg
```

`scripts/optimize-images.mjs` does the same across the whole folder. Both need
`sharp`, which is already available.

Originals of everything imported from the old site are preserved on the
`legacy` branch, so compression is never destructive.

### Resolution matters more than file size

`npm run build` now warns about photos that are used full width but are too
small for it:

```
warning: /images/world-theatre-day.jpg is only 720px wide but is displayed
         full width (want 1200px+)
```

This is a warning, not an error — the build continues. It means the photo
will look soft as an article hero. Compression cannot fix it; only a
higher-resolution original can. Photos saved from Facebook or WhatsApp are
usually 400–600px wide and will always trigger this.

### Responsive versions are generated for you

`npm run images` (which `npm run build` runs automatically) writes a ladder of
WebP sizes into `public/images/r/` so phones download a small file instead of
the full-size one. You never edit that folder — delete it and it regenerates.

---

## The French site

The site is bilingual. Every English page has a French counterpart:

| English | Français |
| --- | --- |
| `/` | `/fr/` |
| `/about/` | `/fr/a-propos/` |
| `/events/` | `/fr/evenements/` |
| `/events/<slug>/` | `/fr/evenements/<slug>/` |
| `/gallery/` | `/fr/galerie/` |
| `/resources/` | `/fr/ressources/` |
| `/get-involved/` | `/fr/s-impliquer/` |

**The organisation's name is never translated.** DARED is registered in English,
so "Direct Action for Rights Equity and Development" stays exactly as it is in
French copy. French text introduces the name, then explains in French what the
organisation does.

### Translating a new event

After adding an event to `web/src/data/events.ts`, add its translation to
`web/src/data/events.fr.ts`, keyed by the same slug:

```ts
"my-new-event": {
  title: "Le titre en français",
  excerpt: "Le résumé affiché sur la carte.",
  body: ["Premier paragraphe.", "Deuxième paragraphe."],
  photos: {
    "/images/my-photo.jpg": { alt: "Description", caption: "Légende" },
  },
},
```

**If you skip this, nothing breaks.** An untranslated event falls back to its
English text field by field, so the French page still works — it just shows
English for that event until you translate it.

Page furniture (menus, buttons, the footer) lives in `web/src/lib/i18n.ts`.
Document summaries live in `web/src/data/documents.fr.ts`; document *titles*
stay in English on purpose, because they name the actual English PDFs.

---

## Checking before you deploy

```bash
cd web
npm run check
```

Fails if any image or PDF referenced in the site does not exist. This runs as
part of `npm run build`, so a typo in a filename stops the build instead of
becoming a broken image on the live site.

---

## Analytics (optional, not switched on)

The site is wired for [Umami](https://umami.is) — privacy-first, cookieless,
and **no cookie banner required**, because it stores nothing on the visitor's
device and collects no personal data.

Nothing is loaded until you configure it. To switch it on:

1. Create a free account at <https://cloud.umami.is> and add `idared.org`.
2. Copy the website ID it gives you.
3. Add it to `web/.env.local`:

   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-id-here
   ```

4. `npm run build && npm run deploy`.

To turn it off again, remove the line and rebuild. To move to a self-hosted
instance later, also set `NEXT_PUBLIC_UMAMI_SRC` to your own script URL.

---

## Deploying

```bash
cd web
npm run build
npm run deploy
```

Then check **https://idared.org/sitemap.xml** and count the `<loc>` entries.
That number is server-side and immune to browser caching, which makes it the
only trustworthy way to confirm a deploy landed. Then hard-refresh the site
with **Ctrl+Shift+R**.

### Do not use cPanel's zip + Extract

**cPanel's Extract silently does nothing on this account.** A zip uploads fine,
Extract reports success, folder timestamps even update, but not one file is
actually written. Two structurally different zips both left the site untouched,
and disk quota was not the cause. This cost several hours to diagnose. Use
`npm run deploy`.

### How deploying works

`npm run deploy` (`web/scripts/deploy.mjs`) uploads `web/out/` to the server
over FTPS, file by file. It is:

- **Resumable** — files already on the server at a matching size are skipped,
  so re-running after a failure takes seconds.
- **Self-healing** — shared hosts reset long FTP sessions routinely. On a
  dropped connection it reconnects and retries, up to 4 attempts per file.
- **Non-destructive** — files are added and overwritten, never deleted. A
  failed deploy cannot take the site down.

If it fails, **just run it again.** Each pass gets further.

Useful variants:

```bash
npm run deploy:dry          # list what would upload, connect to nothing
npm run deploy -- --force   # re-upload everything, ignore size matches
```

### Credentials

FTP details live in `web/.env.local`, which is gitignored and never committed:

```
FTP_HOST=premium250.web-hosting.com
FTP_USER=deploy@idared.org
FTP_PASSWORD=...
FTP_REMOTE_DIR=/
```

`FTP_REMOTE_DIR=/` is correct because the `deploy` FTP account is rooted *at*
`public_html`. If you ever switch to the main `idarmuyi` account, which is
rooted at `/home/idarmuyi`, change it to `/public_html`.

Credentials come from cPanel → **FTP Accounts**. When creating an account, the
Directory field auto-fills with the login name; clear it and enter
`public_html`, or the account is jailed to an empty folder.

### Deleting files from the server

Deploys never delete, so a file removed from the project stays on the server
until removed by hand, via cPanel File Manager. Harmless in practice, since
nothing links to it.

---

## Conventions

**No em-dashes in site copy.** Use commas or "and" instead. If any creep in:

```bash
node scripts/dedash.mjs
```

That sweeps `.ts`, `.tsx` and `.css` files under `src/`, which is where all
visible copy lives. Markdown files like this one are not affected.

**Never edit `web/out/` directly.** It is generated by `npm run build` and is
overwritten every time. Edit `web/src/` instead.

**Never commit secrets.** `.env*` is gitignored. If a password is ever exposed,
rotate it in cPanel and update `.env.local`.

**Design language.** The "Toghu" system, velvet navy with crimson, gold, and
green accents, is defined in `web/src/app/globals.css`. Use the existing colour
tokens (`velvet-800`, `crimson-500`, `gold-300`, `leaf-600`, `sand-100`) rather
than raw hex, so new pages match automatically. Reuse `PageHeader`, `Container`,
`Button`, and `ToghuField` when building a page.

---

## Troubleshooting

**`next/font: error: Error while requesting resource` during build**
A transient failure fetching Google Fonts at build time. Run `npm run build`
again. Nothing is wrong with your setup.

**Deploy stops with `ECONNRESET`**
Normal on shared hosting. Run `npm run deploy` again; it resumes where it
stopped.

**`530` or authentication failure on deploy**
Wrong FTP credentials. Check `FTP_USER` is the full username shown in cPanel
(usually `something@idared.org`) and reset the password if unsure.

**Deploy succeeded but the site looks unchanged**
Check `https://idared.org/sitemap.xml` first. If the count is right, it is
browser cache, so hard-refresh with Ctrl+Shift+R. If the count is wrong, the
upload did not finish; run `npm run deploy` again.

**A type error mentioning `DocumentCategory` or `EventCategory`**
A `category` value does not exactly match one of the allowed strings. Check
capitalisation and spelling.

---

## Where things live

```
Dared/
├── MAINTENANCE.md      # this guide
├── PROGRESS.md         # rebuild history and decisions
└── web/
    ├── public/
    │   ├── documents/  # PDFs for the Resource Centre
    │   ├── images/     # all site photos
    │   └── .htaccess   # server config (404 page, caching, inline PDFs)
    ├── scripts/
    │   ├── deploy.mjs  # npm run deploy
    │   └── ...         # image compression, em-dash cleanup, OG image
    └── src/
        ├── app/        # one folder per page
        ├── components/ # shared UI
        ├── data/       # events.ts and documents.ts, all content
        └── lib/nav.ts  # nav links, contact details, form endpoints
```

Contact details, the newsletter and volunteer form endpoints, and the donate
link all live in `web/src/lib/nav.ts`. Changing an email address or phone
number there updates it everywhere on the site.
