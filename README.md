# idared.org — the original site (archived)

![Archived](https://img.shields.io/badge/status-archived-6b7280?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

This branch is a **frozen snapshot of the first website built for DARED** — *Direct Action
for Rights Equity and Development*, a Cameroonian non-profit working on community
empowerment, cultural heritage preservation, and sustainable development.

It was hand-built as a multi-page Bootstrap 5 static site and served
**[idared.org](https://idared.org)** until **August 2026**, when it was replaced by a
Next.js rebuild.

> ### ⚠️ This is not the live site
> The site running at **[idared.org](https://idared.org)** today is built from the
> **[`main`](https://github.com/favour-tamfu/dared/tree/main)** branch. Nothing on this
> branch is deployed, and changes made here will never reach the web.

## Why it's kept

- **Content of record.** Every page of copy the organisation originally published.
- **Original photography.** All 77 images in `Images/` are the untouched originals. The
  rebuild ships compressed versions, so this branch is the master copy and the reason
  image optimisation over there is never destructive.
- **Provenance.** It's where the site started, and it should stay readable.

It is a reference archive. It is not maintained, and it takes no fixes.

## What the site was

A fully responsive, mobile-first static site — no build step, no framework, no backend.

| File | Page |
|---|---|
| `index.html` | Home: auto-rotating hero slideshow (3 slides, 5s) over a grid of event cards with Show More / Show Less and per-card social sharing |
| `About.html` | About DARED |
| `events.html` | Events listing |
| `gallery.html` | Photo and video gallery, accordion-style so nothing left the page |
| `GetInvolved.html` | Volunteer and get-involved form |
| `Page1.html` – `Page8.html` | Individual event detail pages, all on one template |

Supporting files: six stylesheets in `Styles/`, `slideDemo.js` plus inline scripts for the
slideshow and card interactions, and `Images/` for the photography.

**Built with:** HTML5 · CSS3 · Bootstrap 5 · vanilla JavaScript · Font Awesome 6 ·
Google Fonts (Montserrat for headings, Lato for body) · Formspree for the newsletter and
volunteer forms, which is what let a purely static site take submissions with no server.

## Viewing it locally

No install, no build, no dependencies.

```bash
git clone --branch legacy --single-branch --depth 1 \
  https://github.com/favour-tamfu/dared.git dared-legacy
cd dared-legacy
```

Then open `index.html` in a browser. For working relative paths and live reload, serve the
folder instead — VS Code's **Live Server** extension, or:

```bash
npx serve .
```

Note that the Formspree endpoints in the forms are the organisation's real ones and are
still live. **Don't submit the forms while testing.**

## The site today

The current site is a Next.js 16 + TypeScript + Tailwind CSS static export with a
heritage-rooted *Toghu* design language, a Resource Centre for published documents, and
per-event pages. Source, documentation, and deployment live on
**[`main`](https://github.com/favour-tamfu/dared/tree/main)**.

## License

**This project is not open source.** It was built for DARED, and the source code, design,
copy, photography, and the DARED name and logo are the property of DARED, all rights
reserved. Readable for reference; not licensed for reuse. See [LICENSE](LICENSE).

## Contact

Built by **Favour Tamfu**
· [GitHub](https://github.com/favour-tamfu)
· [LinkedIn](https://www.linkedin.com/in/favour-tamfu)

DARED · [info@idared.org](mailto:info@idared.org) · [idared.org](https://idared.org)
