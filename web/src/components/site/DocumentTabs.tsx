"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import {
  documentCategories,
  documentsIn,
  type DaredDocument,
  type DocumentCategory,
} from "@/data/documents";
import { siteConfig } from "@/lib/nav";

/*
  Tabbed document library for the Resource Centre.

  Follows the ARIA tabs pattern: a roving-tabindex tablist with arrow key
  navigation, and one labelled tabpanel. The active tab is mirrored into the
  URL hash (e.g. /resources/#reports) so a tab can be linked to directly,
  using replaceState so it never pushes history entries or jumps the scroll.
*/

/** Toghu thread colors, one per category, for the document tile. */
const tileAccent: Record<DocumentCategory, string> = {
  "Internal Documents": "bg-velvet-50 text-velvet-700 ring-velvet-100",
  "Operating Procedures": "bg-leaf-50 text-leaf-600 ring-leaf-100",
  Reports: "bg-crimson-50 text-crimson-600 ring-crimson-100",
};

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      <path d="M14 2.5H7a1.5 1.5 0 0 0-1.5 1.5v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7z" />
      <path d="M14 2.5V7h4.5" />
      <path d="M9 12.5h6M9 16h4" />
    </svg>
  );
}

/*
  The active tab IS the URL hash, so it is read as external state rather than
  mirrored into React state. `replaceState` does not fire `hashchange`, so tab
  clicks notify subscribers directly. On the server the hash is unknown, which
  falls through to the first category; React re-renders with the real hash
  after hydration.
*/
let hashListeners: (() => void)[] = [];

function subscribeToHash(onChange: () => void) {
  hashListeners.push(onChange);
  window.addEventListener("hashchange", onChange);
  return () => {
    hashListeners = hashListeners.filter((l) => l !== onChange);
    window.removeEventListener("hashchange", onChange);
  };
}

const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

function setHash(slug: string) {
  window.history.replaceState(null, "", `#${slug}`);
  hashListeners.forEach((notify) => notify());
}

function requestUrl(doc: DaredDocument) {
  const subject = `Document request: ${doc.title}`;
  const body = `Hello DARED,\n\nI would like to request a copy of "${doc.title}".\n\nThank you.`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function DocumentCard({ doc }: { doc: DaredDocument }) {
  const isExternal = Boolean(doc.href?.startsWith("http"));
  const meta = [doc.format, doc.size, `Updated ${doc.updated}`].filter(Boolean);

  return (
    <article className="group relative flex h-full gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-sand-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ring-1 ${
          tileAccent[doc.category]
        }`}
      >
        <DocumentIcon />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {doc.href ? (
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm transition-colors after:absolute after:inset-0 after:rounded-3xl hover:text-velvet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-2"
            >
              {doc.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            doc.title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {doc.summary}
        </p>

        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-ink-soft">
          {meta.map((part, i) => (
            <span key={part} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-sand-300">
                  &middot;
                </span>
              )}
              {part}
            </span>
          ))}
        </p>

        {/*
          Opening the document is the primary action, so the card-wide link
          simply navigates to the file and lets the browser render it inline.
          Download is a deliberate, separate choice, raised above the card
          overlay with `z-10` so it stays clickable.
        */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {doc.href ? (
            <>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 transition-colors group-hover:text-crimson-700">
                {isExternal ? "Open document" : "View document"}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  {"→"}
                </span>
              </span>

              {/* `download` only forces a save for same-origin files. */}
              {!isExternal && (
                <a
                  href={doc.href}
                  download
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-ink-soft transition-colors hover:text-velvet-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-2"
                >
                  Download
                  <span aria-hidden>↓</span>
                  <span className="sr-only">{doc.title}</span>
                </a>
              )}
            </>
          ) : (
            <a
              href={requestUrl(doc)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-velvet-700 transition-colors after:absolute after:inset-0 after:rounded-3xl hover:text-velvet-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-2"
            >
              Request access
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                {"→"}
              </span>
              <span className="sr-only">to {doc.title} by email</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function DocumentTabs() {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);

  /*
    With no hash (including during SSR) open the first category that actually
    has documents, so visitors never land on an empty tab while content sits
    one tab over. Once every category is filled this is simply the first tab.
    Derived from static data, so the server and client always agree.
  */
  const firstPopulated = documentCategories.findIndex(
    (c) => documentsIn(c.key).length > 0
  );
  const hashIndex = documentCategories.findIndex((c) => c.slug === hash);
  const activeIndex =
    hashIndex !== -1 ? hashIndex : Math.max(0, firstPopulated);
  const activeSlug = documentCategories[activeIndex].slug;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = documentCategories.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setHash(documentCategories[next].slug);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Tablist */}
      <div
        role="tablist"
        aria-label="Document categories"
        className="flex flex-wrap gap-1.5 rounded-[1.75rem] bg-sand-100 p-1.5 ring-1 ring-sand-300 sm:inline-flex"
      >
        {documentCategories.map((category, index) => {
          const selected = category.slug === activeSlug;
          const count = documentsIn(category.key).length;

          return (
            <button
              key={category.slug}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`tab-${category.slug}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${category.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setHash(category.slug)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 sm:flex-none ${
                selected
                  ? "bg-velvet-800 text-white shadow-sm"
                  : "text-ink-soft hover:bg-white/70 hover:text-velvet-700"
              }`}
            >
              {category.key}
              {count > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    selected ? "bg-white/15 text-gold-300" : "text-ink-soft/70"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/*
        Every panel is rendered and the inactive ones are hidden, rather than
        mounting only the active one. That is what the ARIA tabs pattern calls
        for, and it also means every document is present in the static HTML,
        so search engines and visitors without JavaScript can still find them.
      */}
      {documentCategories.map((category) => {
        const categoryDocs = documentsIn(category.key);

        return (
          <div
            key={category.slug}
            id={`panel-${category.slug}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.slug}`}
            tabIndex={0}
            hidden={category.slug !== activeSlug}
            className="mt-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-4"
          >
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
              {category.blurb}
            </p>

            {categoryDocs.length > 0 ? (
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {categoryDocs.map((doc) => (
                  <DocumentCard key={doc.id} doc={doc} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-dashed border-sand-300 bg-white/60 px-6 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sand-100 text-velvet-400 ring-1 ring-sand-300">
                  <DocumentIcon />
                </div>
                <p className="mt-5 font-display text-xl font-semibold text-ink">
                  {category.emptyTitle}
                </p>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
                  We are putting this section together. Please check back soon,
                  and in the meantime we are happy to help you directly.
                </p>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    `Request: ${category.key}`
                  )}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 transition-colors hover:text-crimson-700"
                >
                  Ask us for a document
                  <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
