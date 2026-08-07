"use client";

import { LightboxImage } from "@/components/site/Lightbox";
import { Container } from "@/components/ui/Container";
import {
  CategoryChips,
  activeFilter,
  slugifyCategory,
  type FilterOption,
} from "@/components/site/CategoryFilter";
import { useHash } from "@/lib/hash";
import {
  activeCategories,
  events,
  galleryOf,
  localizedEvent,
} from "@/data/events";
import { categoryFr } from "@/data/events.fr";

type Locale = "en" | "fr";

const copy = {
  en: {
    all: "All",
    filterLabel: "Filter photos by category",
    showing: (n: number, total: number) => `Showing ${n} of ${total} photos`,
  },
  fr: {
    all: "Toutes",
    filterLabel: "Filtrer les photos par catégorie",
    showing: (n: number, total: number) =>
      `${n} photo${n > 1 ? "s" : ""} affichée${n > 1 ? "s" : ""} sur ${total}`,
  },
} as const;

const categoryColors: Record<string, string> = {
  Environment: "bg-leaf-600",
  Heritage: "bg-crimson-500",
  Youth: "bg-gold-500",
  Arts: "bg-velvet-600",
  Advocacy: "bg-leaf-700",
};

// One photo group per event: the hero followed by its gallery, de-duplicated
// by src so a hero that also appears in the gallery is only shown once.
function buildGroups(locale: Locale) {
  return events.map((source) => {
    const event = localizedEvent(source, locale);
    const seen = new Set<string>();
    const images = [
      { src: event.image, alt: event.title },
      ...galleryOf(source, locale),
    ].filter((photo) => !seen.has(photo.src) && seen.add(photo.src));

    return {
      slug: event.slug,
      title: event.title,
      category: event.category,
      label: locale === "fr" ? categoryFr[event.category] : event.category,
      filter: slugifyCategory(event.category),
      images,
    };
  });
}

const groupsByLocale = { en: buildGroups("en"), fr: buildGroups("fr") };

function optionsFor(locale: Locale): FilterOption[] {
  const groups = groupsByLocale[locale];
  const total = groups.reduce((n, g) => n + g.images.length, 0);
  return [
    { value: "", label: copy[locale].all, count: total },
    ...activeCategories.map((category) => ({
      value: slugifyCategory(category),
      label: locale === "fr" ? categoryFr[category] : category,
      count: groups
        .filter((g) => g.category === category)
        .reduce((n, g) => n + g.images.length, 0),
    })),
  ];
}

export function GalleryBrowser({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const groups = groupsByLocale[locale];
  const options = optionsFor(locale);
  const totalPhotos = groups.reduce((n, g) => n + g.images.length, 0);
  const active = activeFilter(useHash(), options);
  const shown = active
    ? options.find((o) => o.value === active)?.count ?? 0
    : totalPhotos;

  return (
    <div>
      <Container>
        <CategoryChips
          options={options}
          active={active}
          label={t.filterLabel}
        />
        <p aria-live="polite" className="mt-6 text-sm text-ink-soft">
          {t.showing(shown, totalPhotos)}
        </p>
      </Container>

      {/*
        Separators are drawn in CSS between *visible* groups (see
        .gallery-groups in globals.css), so filtering never leaves a stray
        rule above the first result or below the last.
      */}
      <div className="gallery-groups mt-12">
        {groups.map((group) => (
          <section
            key={group.slug}
            className="reveal"
            hidden={Boolean(active) && group.filter !== active}
          >
            <Container>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    categoryColors[group.category] ?? "bg-velvet-600"
                  }`}
                >
                  {group.label}
                </span>
                <h2 className="text-2xl font-semibold text-ink">{group.title}</h2>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.images.map((photo) => (
                  <div
                    key={photo.src}
                    className="relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-1 ring-sand-300"
                  >
                    <LightboxImage
                      src={photo.src}
                      alt={photo.alt}
                      caption={"caption" in photo ? photo.caption : undefined}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>
    </div>
  );
}
