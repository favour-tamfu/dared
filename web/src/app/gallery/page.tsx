import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { LightboxImage } from "@/components/site/Lightbox";
import { Container } from "@/components/ui/Container";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from DARED's events and initiatives across Cameroon and beyond, grouped by event.",
  alternates: { canonical: "/gallery/" },
};

const categoryColors: Record<string, string> = {
  Environment: "bg-leaf-600",
  Heritage: "bg-crimson-500",
  Youth: "bg-gold-500",
  Arts: "bg-velvet-600",
  Advocacy: "bg-leaf-700",
};

export default function GalleryPage() {
  // Build one photo group per event (hero + gallery), de-duplicated.
  const groups = events.map((event) => ({
    title: event.title,
    category: event.category,
    images: Array.from(new Set([event.image, ...event.gallery])),
  }));

  return (
    <>
      <div className="relative overflow-hidden">
      <ToghuField />
      <div className="relative z-10">
      <PageHeader
        eyebrow="Moments"
        title="Gallery"
        subtitle="A glimpse into our events, partnerships, and the communities we serve — grouped by event."
      />

      <div className="space-y-16 py-16 sm:py-20">
        {groups.map((group, gi) => (
          <section key={group.title}>
            <Container>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    categoryColors[group.category] ?? "bg-velvet-600"
                  }`}
                >
                  {group.category}
                </span>
                <h2 className="text-2xl font-semibold text-ink">
                  {group.title}
                </h2>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.images.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-1 ring-sand-300"
                  >
                    <LightboxImage
                      src={src}
                      alt={group.title}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </Container>

            {gi < groups.length - 1 && (
              <div className="mx-auto mt-16 h-px w-full max-w-6xl bg-sand-300" />
            )}
          </section>
        ))}
      </div>
      </div>
      </div>
    </>
  );
}
