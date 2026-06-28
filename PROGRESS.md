# DARED Website Rebuild — Progress Tracker

> Single source of truth for this rebuild. When resuming work, **read this file first**,
> then continue from the first unchecked item.

## Goal
Rebuild the existing static HTML/CSS/JS site (DARED Cameroon — https://idared.org) as a
modern **Next.js + TypeScript + Tailwind CSS** app. Keep all existing content; deliver a
**bold visual redesign** with a modern look and feel.

## Locked-in decisions
- **Framework:** Next.js 16 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS (v4 — theme lives in `globals.css` via `@theme`)
- **Redesign scope:** Bold redesign (same content/copy, fresh modern look)
- **Design language:** "Toghu" — rooted in Atoghu/Toghu, the embroidered regalia
  of the Northwest Grassfields. Deep **velvet navy** cloth as the foundation;
  **crimson / gold / green / white** embroidery colors as accents only.
  Sun-medallion + diamond-lattice motifs used as subtle watermarks and an
  animated "embroidered hem" divider — present but never the focus. Tone:
  serious, heritage, professional (NOT flashy or playful).
  Fonts: Fraunces (display serif) + Inter (body).
- **Output:** Static export (`output: 'export'`) — produces plain HTML/CSS/JS files
- **Hosting:** Namecheap shared hosting (upload `out/` via cPanel/FTP)
- **Domain:** registered on Hostinger → point DNS to Namecheap hosting
- **Terraform:** NOT used (Namecheap shared hosting is managed via cPanel, not IaC)
- **Forms:** keep Formspree (no backend needed). Endpoint(s) reused from legacy.

## Project layout
```
Dared/
├── .claude/        # editor/harness config (do not touch)
├── legacy/         # ORIGINAL site — content & asset reference (do not edit)
├── web/            # NEW Next.js app (all new work happens here)
└── PROGRESS.md     # this file
```

## Audit of the legacy site (Phase 0 — DONE)
**Pages:**
- `index.html` — Home: hero slideshow (3 linked images, auto-rotate 5s) + grid of ~10 event cards (Show More/Less + social share buttons) + footer
- `About.html` — About DARED
- `events.html` — Events listing
- `gallery.html` — Photo/video gallery (accordion-style)
- `GetInvolved.html` — Volunteer / get involved (form)
- `Page1.html`–`Page8.html` — individual event detail pages (consistent template)

**Tech in legacy:** Bootstrap 5, Font Awesome 6, Google Fonts (Lato + Montserrat),
vanilla JS (`slideDemo.js` + inline scripts). 6 CSS files in `legacy/Styles/`.

**Brand / styling cues:**
- Brand name: **DARED** — "Direct Action for Rights Equity and Development"
- Logo: `legacy/Images/re.jpg`; favicon same
- Fonts: Montserrat (headings), Lato (body)
- Primary accent currently Bootstrap blue `#0d6efd`; dark navbar
- Contact: info@idared.org · Facebook + WhatsApp (+237 680 899 916)
- Newsletter form: Formspree `https://formspree.io/f/xldnyoee`

**Assets:** 77 images (~16 MB) in `legacy/Images/`. Some are large (~1 MB `G-tree*.jpg`)
and should be optimized when ported.

**Cleanup note:** `legacy/index.zip` (~60 MB) is a redundant backup — ignore/exclude it.

**Reusable interactions to reimplement in React:**
- Auto-rotating hero slideshow
- "Show More / Show Less" expandable event text
- Per-card social share buttons (Facebook, Twitter/X, WhatsApp, copy link)

---

## Phase checklist

### Phase 0 — Land & audit ✅
- [x] Move extracted site into `legacy/`
- [x] Verify Node/npm available (Node v24, npm v11)
- [x] Audit pages, content, assets, interactions
- [x] Create this PROGRESS.md

### Phase 1 — Scaffold the new app ✅
- [x] `create-next-app` in `web/` (TS, Tailwind, ESLint, App Router, src dir)
- [x] Configure `next.config` for static export (`output: 'export'`, `trailingSlash`, `images.unoptimized`)
- [x] Confirm `npm run build` produces `out/` (verified: index.html + per-page folders + images)
- [x] Pin `turbopack.root` to silence stray-lockfile warning

### Phase 2 — Design system foundations ✅ (Toghu)
- [x] Tailwind theme: Toghu palette (velvet/crimson/gold/leaf/sand) + Fraunces/Inter fonts
- [x] Global layout: Header/nav (sticky, scroll-aware, mobile menu), Footer (velvet + hem)
- [x] Reusable primitives: Button, Container, PageHeader, EventCard
- [x] Toghu motif system: `ToghuWatermark` (background texture) + `ToghuTrim` (animated hem)
- [x] Visual direction approved (Toghu heritage theme)

### Phase 3 — Migrate content, page by page ✅ (core)
- [x] Home (Toghu hero slideshow, stats, pillars, featured events, CTA)
- [x] About — on-brand page; team image now `team1.jpg` (matches legacy)
- [x] Events — all **13** events from `src/data/events.ts`
- [x] Gallery — grouped by event, pulling every event photo
- [x] Get Involved (Formspree volunteer form)
- [x] Event detail content — full body text + photo gallery shown via accessible
      **modal** ("Read more") on every card (home + events), instead of separate routes
- [x] Logo recreated as crisp SVG (raised fist + DA·RED wordmark) → `Logo.tsx`,
      favicon at `src/app/icon.svg`
- [x] Move images into `web/public/images`
- [ ] Optimize large images (e.g. `G-tree*.jpg` ~1MB) — Phase 5

### Phase 3.1 — Possible follow-ups
- [ ] Per-event detail routes (`/events/[slug]`) for deep links / SEO (currently modal-only)
- [ ] Lightbox for gallery images

### Phase 3.2 — Mobile + motif patches ✅
- [x] Header is contrast-aware: light over the dark hero/page-header at top, dark
      once scrolled onto cream (fixed an invisible-logo bug)
- [x] Mobile spacing tightened (hero `svh` + smaller padding; page headers &
      sections reduced on small screens); `overflow-x: hidden` guard; cards full-width
- [x] `ToghuField.tsx` — a dense, small, tightly-tiled motif field (sun
      medallions + diamonds, like the footer watermark but smaller/closer) on the
      body of every page EXCEPT Home. CONTAINED inside a `relative overflow-hidden`
      body wrapper so it stays between the top (page header) and bottom (footer)
      hems and can't escape on scroll. Calm continuous drift (CSS
      `background-position`) + eased water-like scroll response (lerped transform).
      Respects `prefers-reduced-motion`. Opacity tunable via `ToghuField` prop
      (default 0.3); tile size 80px in the component.
      (Superseded the earlier scattered `ToghuPatches`/`ToghuShapes`, now removed.)

### Phase 4 — Interactivity & modern polish
- [ ] Hero slideshow component
- [ ] Show More/Less + social share
- [ ] Animations (e.g. Framer Motion), responsive refinements
- [ ] SEO metadata per page, favicon, Open Graph

### Phase 5 — QA & launch prep
- [ ] Accessibility pass
- [ ] Responsive/cross-browser testing
- [ ] Lighthouse performance check
- [ ] Verify `out/` static build is correct

### Phase 6 — Deploy
- [ ] Build static export
- [ ] Upload `out/` to Namecheap `public_html` (cPanel/FTP)
- [ ] Point Hostinger domain DNS to Namecheap
- [ ] (Optional) GitHub Action to auto-deploy via FTP

---

## Changelog
- 2026-06-28: SEO + UX round. AJAX Formspree forms with on-page success
  (`Forms.tsx`); fixed volunteer endpoint (xpwrgozl). Added `sitemap.ts` +
  `robots.ts` (force-static), Organization JSON-LD, richer metadata + per-page
  canonicals. Donation section on Get Involved (`#donate`, WhatsApp) + footer
  Donate button. Renamed 64 images cryptic→descriptive (originals safe in
  legacy/). Compressed images 15.9MB→11.2MB (sharp q82, cap 1920w;
  `scripts/optimize-images.mjs`). Generated branded 1200x630 OG image
  (`public/og-image.png`, `scripts/make-og.mjs`). Added per-event detail pages
  `/events/[slug]` (generateStaticParams, per-event metadata + Article JSON-LD,
  gallery lightbox, share); EventCard now links to them (modal removed). Events
  added to sitemap. Build: 23 static routes incl. 13 event pages.

- 2026-06-28: Polish round — replaced logo with supplied `dared-logo.svg`
  (recolored blue→crimson, black→velvet) in `Logo.tsx`; favicon now the supplied
  `dared-icon.svg` (`src/app/icon.svg`). Fixed header visibility (sticky header
  is in-flow over cream, so it's now always solid cream + dark nav, not
  light-on-cream). Fixed invisible white CTA button via new Button `white` /
  `outlineLight` variants (Tailwind class-precedence bug from className overrides).
  Made `ToghuField` flow fluid/wandering (multi-waypoint keyframe) + faster (38s).
  Added image **lightbox** (`Lightbox.tsx`, dialog-based) for gallery + event
  modal images. Added **share buttons** (`ShareButtons.tsx`) to event modals.

- 2026-06-28: Phase 0 complete. Site extracted to `legacy/`. Scaffolding Next.js in `web/`.
- 2026-06-28: Phases 1–2 complete. Pivoted design language to **Toghu** (velvet +
  embroidery accents + subtle motifs) per user direction. Built design system,
  Header/Footer, motif components, home page + About/Events/Gallery/Get-Involved.
  Static build verified (`out/`). Dev server: `cd web && npm run dev` → localhost:3000.
- 2026-06-28: Phase 3 round of fixes — recreated the logo as crisp SVG (fist +
  DA·RED) + favicon; ported ALL 13 events with full body text; "Read more" now
  opens a modal with full article + photo gallery (home + events); gallery
  regrouped by event using every event photo; About image → `team1.jpg`.
  Build verified.
