/*
  Bilingual support, English and French.

  The whole site exists in both languages: the institutional pages, the events
  archive with all its write-ups, and the gallery. Event translations live in
  data/events.fr.ts and fall back to English field by field, so publishing an
  event without translating it yet degrades gracefully instead of breaking.

  The organisation's name is NEVER translated. DARED is registered in English
  (REG No: 0012/19/RAG/NWR/RDAC/SAPCECI), so "Direct Action for Rights Equity
  and Development" is its legal name, not a phrase. French copy introduces it
  and then explains in French what it does.

  Routing is plain folders (src/app/fr/...) rather than a [locale] segment, so
  the existing English routes were not touched and cannot regress.
*/

export type Locale = "en" | "fr";

export function localeFromPath(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

/** English path -> French path, for the language switcher and hreflang. */
export const routePairs: Record<string, string> = {
  "/": "/fr/",
  "/about/": "/fr/a-propos/",
  "/get-involved/": "/fr/s-impliquer/",
  "/resources/": "/fr/ressources/",
  "/events/": "/fr/evenements/",
  "/gallery/": "/fr/galerie/",
};

const frenchToEnglish: Record<string, string> = Object.fromEntries(
  Object.entries(routePairs).map(([en, fr]) => [fr, en])
);

/**
 * The same page in the other language. Pages that exist in one language only
 * (the events archive, the gallery, an event article) fall back to that
 * language's home page rather than dead-ending.
 */
export function counterpart(pathname: string): string {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (localeFromPath(pathname) === "fr") {
    if (frenchToEnglish[path]) return frenchToEnglish[path];
    // An event article: /fr/evenements/<slug>/ -> /events/<slug>/
    const article = /^\/fr\/evenements\/([^/]+)\/$/.exec(path);
    return article ? `/events/${article[1]}/` : "/fr/";
  }

  if (routePairs[path]) return routePairs[path];
  const article = /^\/events\/([^/]+)\/$/.exec(path);
  return article ? `/fr/evenements/${article[1]}/` : "/fr/";
}

export type NavItem = {
  label: string;
  href: string;
  /** Marks a link that leaves the current language (shown with an EN badge). */
  foreign?: boolean;
};

export const nav: Record<Locale, NavItem[]> = {
  en: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Resources", href: "/resources" },
    { label: "Get Involved", href: "/get-involved" },
  ],
  fr: [
    { label: "Accueil", href: "/fr/" },
    { label: "À propos", href: "/fr/a-propos/" },
    { label: "Événements", href: "/fr/evenements/" },
    { label: "Galerie", href: "/fr/galerie/" },
    { label: "Ressources", href: "/fr/ressources/" },
    { label: "S'impliquer", href: "/fr/s-impliquer/" },
  ],
};

/** Chrome that appears on every page, in both languages. */
export const ui = {
  en: {
    donate: "Donate",
    getInvolved: "Get Involved",
    explore: "Explore",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterBlurb: "Get updates on our work and events.",
    footerBlurb:
      "A non-profit fostering sustainable, vibrant communities in Cameroon through hands-on engagement and meaningful collaboration.",
    rights: "All rights reserved.",
    switchTo: "Français",
    switchLabel: "Passer au français",
    englishOnly: "in English",
    menu: "Menu",
  },
  fr: {
    donate: "Faire un don",
    getInvolved: "S'impliquer",
    explore: "Explorer",
    contact: "Contact",
    newsletter: "Infolettre",
    newsletterBlurb: "Recevez nos actualités et nos événements.",
    footerBlurb:
      "Une organisation à but non lucratif qui bâtit des communautés durables et dynamiques au Cameroun, par l'action de terrain et des partenariats concrets.",
    rights: "Tous droits réservés.",
    switchTo: "English",
    switchLabel: "Switch to English",
    englishOnly: "en anglais",
    menu: "Menu",
  },
} as const;

/** The donate anchor differs per locale because the page slug differs. */
export const donateHref: Record<Locale, string> = {
  en: "/get-involved#donate",
  fr: "/fr/s-impliquer#donate",
};
