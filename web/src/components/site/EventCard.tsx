import Image from "next/image";
import Link from "next/link";
import {
  eventHref,
  formatEventDate,
  localizedEvent,
  type DaredEvent,
} from "@/data/events";
import { categoryFr } from "@/data/events.fr";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** "2026-07-29" -> "29 juillet 2026", parsed by hand to stay timezone-proof. */
export function formatEventDateFr(iso: string): string | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return undefined;
  const month = MONTHS_FR[Number(match[2]) - 1];
  if (!month) return undefined;
  const day = Number(match[3]);
  // French ordinals: the first of the month is "1er", the rest are plain.
  return `${day === 1 ? "1er" : day} ${month} ${match[1]}`;
}

export function formatDate(iso: string, locale: "en" | "fr") {
  return locale === "fr" ? formatEventDateFr(iso) : formatEventDate(iso);
}

const categoryColors: Record<string, string> = {
  Environment: "bg-leaf-600",
  Heritage: "bg-crimson-500",
  Youth: "bg-gold-500",
  Arts: "bg-velvet-600",
  Advocacy: "bg-leaf-700",
};

export function EventCard({
  event: source,
  locale = "en",
}: {
  event: DaredEvent;
  locale?: "en" | "fr";
}) {
  const event = localizedEvent(source, locale);
  const badge = categoryColors[event.category] ?? "bg-velvet-600";
  const when = event.date ? formatDate(event.date, locale) : undefined;
  const categoryLabel =
    locale === "fr" ? categoryFr[event.category] : event.category;

  return (
    <Link
      href={eventHref(event.slug, locale)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${badge}`}
        >
          {categoryLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {when && (
          <time
            dateTime={event.date}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft/80"
          >
            {when}
          </time>
        )}
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {event.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 transition-colors group-hover:text-crimson-700">
          {locale === "fr" ? "Lire la suite" : "Read more"}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
