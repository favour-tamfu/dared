import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { Container } from "@/components/ui/Container";
import { ToghuField } from "@/components/site/ToghuField";
import { LightboxImage } from "@/components/site/Lightbox";
import { ShareButtons } from "@/components/site/ShareButtons";

export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

const categoryColors: Record<string, string> = {
  Environment: "bg-leaf-600",
  Heritage: "bg-crimson-500",
  Youth: "bg-gold-500",
  Arts: "bg-velvet-600",
  Advocacy: "bg-leaf-700",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.excerpt,
    alternates: { canonical: `/events/${slug}/` },
    openGraph: {
      title: event.title,
      description: event.excerpt,
      url: `https://idared.org/events/${slug}/`,
      type: "article",
      images: [{ url: event.image, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.excerpt,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const badge = categoryColors[event.category] ?? "bg-velvet-600";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: event.title,
    description: event.excerpt,
    image: `https://idared.org${event.image}`,
    articleSection: event.category,
    publisher: {
      "@type": "NGO",
      name: "DARED",
      url: "https://idared.org",
    },
    mainEntityOfPage: `https://idared.org/events/${slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero with the event image */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-velvet-900 pt-24">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-velvet-900 via-velvet-900/70 to-velvet-900/30" />
        <Container className="relative z-10 pb-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-velvet-100 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> Back to events
          </Link>
          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${badge}`}
          >
            {event.category}
          </span>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>
        </Container>
      </section>

      {/* Body */}
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <article className="py-14 sm:py-20">
            <Container>
              <div className="mx-auto max-w-3xl">
                <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                  {event.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="mt-8 border-t border-sand-300 pt-6">
                  <ShareButtons title={event.title} />
                </div>

                {event.gallery.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-crimson-500">
                      Photo Gallery
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {event.gallery.map((src) => (
                        <div
                          key={src}
                          className="relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-1 ring-sand-300"
                        >
                          <LightboxImage
                            src={src}
                            alt={event.title}
                            sizes="(max-width: 640px) 50vw, 20rem"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 rounded-2xl bg-velvet-800 p-6 text-center text-velvet-50 sm:p-8">
                  <p className="font-display text-xl font-semibold text-white">
                    Want to support work like this?
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/get-involved"
                      className="rounded-full bg-crimson-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-600"
                    >
                      Get Involved
                    </Link>
                    <Link
                      href="/get-involved#donate"
                      className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-velvet-900 transition-colors hover:bg-gold-300"
                    >
                      Donate
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </article>
        </div>
      </div>
    </>
  );
}
