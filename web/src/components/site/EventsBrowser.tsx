"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/site/EventCard";
import {
  CategoryChips,
  activeFilter,
  slugifyCategory,
  type FilterOption,
} from "@/components/site/CategoryFilter";
import { useHash } from "@/lib/hash";
import { activeCategories, events, localizedEvent } from "@/data/events";
import { categoryFr } from "@/data/events.fr";

type Locale = "en" | "fr";

const copy = {
  en: {
    all: "All",
    filterLabel: "Filter events by category",
    search: "Search events…",
    searchLabel: "Search events",
    none: "No events match that search.",
    showing: (n: number, total: number) => `Showing ${n} of ${total} events`,
  },
  fr: {
    all: "Tous",
    filterLabel: "Filtrer les événements par catégorie",
    search: "Rechercher un événement…",
    searchLabel: "Rechercher un événement",
    none: "Aucun événement ne correspond à cette recherche.",
    showing: (n: number, total: number) =>
      `${n} événement${n > 1 ? "s" : ""} affiché${n > 1 ? "s" : ""} sur ${total}`,
  },
} as const;

function optionsFor(locale: Locale): FilterOption[] {
  return [
    { value: "", label: copy[locale].all, count: events.length },
    ...activeCategories.map((category) => ({
      value: slugifyCategory(category),
      label: locale === "fr" ? categoryFr[category] : category,
      count: events.filter((e) => e.category === category).length,
    })),
  ];
}

/*
  Precomputed once per language: title, summary, category and body text
  flattened into a single lowercase haystack per event, so typing does not
  re-walk the content. Built from the localised event so a French search term
  matches the French text.
*/
function buildHaystacks(locale: Locale) {
  return new Map(
    events.map((source) => {
      const event = localizedEvent(source, locale);
      return [
        event.slug,
        [
          event.title,
          event.excerpt,
          locale === "fr" ? categoryFr[event.category] : event.category,
          ...(event.body ?? []),
          ...(event.sections ?? []).flatMap((s) => [
            s.heading ?? "",
            ...(s.paragraphs ?? []),
            ...(s.bullets ?? []),
          ]),
        ]
          .join(" ")
          .toLowerCase(),
      ];
    })
  );
}

const haystacksByLocale = {
  en: buildHaystacks("en"),
  fr: buildHaystacks("fr"),
};

export function EventsBrowser({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const options = useMemo(() => optionsFor(locale), [locale]);
  const haystacks = haystacksByLocale[locale];
  const active = activeFilter(useHash(), options);
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();

  const visible = useMemo(() => {
    const set = new Set<string>();
    for (const event of events) {
      const matchesCategory =
        !active || slugifyCategory(event.category) === active;
      const matchesTerm = !term || (haystacks.get(event.slug) ?? "").includes(term);
      if (matchesCategory && matchesTerm) set.add(event.slug);
    }
    return set;
  }, [active, term, haystacks]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CategoryChips
          options={options}
          active={active}
          label={t.filterLabel}
        />

        <div className="relative lg:w-72">
          <label htmlFor="event-search" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="event-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="w-full rounded-full border-0 bg-sand-100 py-2.5 pl-11 pr-4 text-sm text-ink ring-1 ring-sand-300 transition-shadow placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink-soft">
        {visible.size === 0 ? t.none : t.showing(visible.size, events.length)}
      </p>

      {/*
        Every card stays in the DOM and non-matching ones are hidden, so all
        events remain in the static HTML for search engines and for visitors
        without JavaScript, who simply see the full list.
      */}
      <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.slug}
            className="reveal"
            hidden={!visible.has(event.slug)}
          >
            <EventCard event={event} locale={locale} />
          </div>
        ))}
      </div>
    </div>
  );
}
