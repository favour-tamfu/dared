import Image from "next/image";
import Link from "next/link";
import { type DaredEvent } from "@/data/events";

const categoryColors: Record<string, string> = {
  Environment: "bg-leaf-600",
  Heritage: "bg-crimson-500",
  Youth: "bg-gold-500",
  Arts: "bg-velvet-600",
  Advocacy: "bg-leaf-700",
};

export function EventCard({ event }: { event: DaredEvent }) {
  const badge = categoryColors[event.category] ?? "bg-velvet-600";

  return (
    <Link
      href={`/events/${event.slug}/`}
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
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {event.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 transition-colors group-hover:text-crimson-700">
          Read more
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
