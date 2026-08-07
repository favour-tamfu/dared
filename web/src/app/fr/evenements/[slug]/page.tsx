import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, galleryOf, localizedEvent } from "@/data/events";
import { categoryFr } from "@/data/events.fr";
import { formatDate } from "@/components/site/EventCard";
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
  const source = events.find((e) => e.slug === slug);
  if (!source) return {};
  const event = localizedEvent(source, "fr");

  return {
    title: event.title,
    description: event.excerpt,
    alternates: {
      canonical: `/fr/evenements/${slug}/`,
      languages: {
        en: `/events/${slug}/`,
        fr: `/fr/evenements/${slug}/`,
      },
    },
    openGraph: {
      title: event.title,
      description: event.excerpt,
      url: `https://idared.org/fr/evenements/${slug}/`,
      type: "article",
      locale: "fr_FR",
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

export default async function ArticleEvenementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const source = events.find((e) => e.slug === slug);
  if (!source) notFound();

  const event = localizedEvent(source, "fr");
  const badge = categoryColors[event.category] ?? "bg-velvet-600";
  const when = event.date ? formatDate(event.date, "fr") : undefined;
  const photos = galleryOf(source, "fr");
  const categoryLabel = categoryFr[event.category];

  const others = events.filter((e) => e.slug !== event.slug);
  const related = [
    ...others.filter((e) => e.category === event.category),
    ...others.filter((e) => e.category !== event.category),
  ]
    .slice(0, 3)
    .map((e) => localizedEvent(e, "fr"));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: event.title,
    description: event.excerpt,
    image: `https://idared.org${event.image}`,
    articleSection: categoryLabel,
    inLanguage: "fr",
    ...(event.date ? { datePublished: event.date } : {}),
    publisher: {
      "@type": "NGO",
      name: "DARED",
      url: "https://idared.org",
    },
    mainEntityOfPage: `https://idared.org/fr/evenements/${slug}/`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

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
            href="/fr/evenements/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-velvet-100 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> Retour aux événements
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${badge}`}
            >
              {categoryLabel}
            </span>
            {when && (
              <time
                dateTime={event.date}
                className="text-sm font-medium text-velvet-100"
              >
                {when}
              </time>
            )}
          </div>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            {event.title}
          </h1>
        </Container>
      </section>

      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <article className="py-14 sm:py-20">
            <Container>
              <div className="mx-auto max-w-3xl">
                {event.sections ? (
                  <div className="space-y-8">
                    {event.sections.map((section, i) => (
                      <section key={i}>
                        {section.heading && (
                          <h2 className="font-display text-2xl font-semibold text-ink">
                            {section.heading}
                          </h2>
                        )}
                        {section.paragraphs?.map((para, j) => (
                          <p
                            key={j}
                            className="mt-3 text-lg leading-relaxed text-ink-soft"
                          >
                            {para}
                          </p>
                        ))}
                        {section.bullets && (
                          <ul className="mt-4 space-y-2.5">
                            {section.bullets.map((b, j) => (
                              <li key={j} className="flex gap-3">
                                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-crimson-500" />
                                <span className="text-lg leading-relaxed text-ink-soft">
                                  {b}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                    {event.body?.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                <div className="mt-8 border-t border-sand-300 pt-6">
                  <ShareButtons title={event.title} />
                </div>

                {photos.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-crimson-500">
                      Galerie photo
                    </h2>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {photos.map((photo) => (
                        <div
                          key={photo.src}
                          className="reveal relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-1 ring-sand-300"
                        >
                          <LightboxImage
                            src={photo.src}
                            alt={photo.alt}
                            caption={photo.caption}
                            sizes="(max-width: 640px) 50vw, 20rem"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {related.length > 0 && (
                  <div className="mt-14">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-crimson-500">
                      À découvrir également
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      {related.map((other) => (
                        <Link
                          key={other.slug}
                          href={`/fr/evenements/${other.slug}/`}
                          className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={other.image}
                              alt=""
                              fill
                              sizes="(max-width: 640px) 100vw, 15rem"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                              {categoryFr[other.category]}
                            </span>
                            <h3 className="mt-1.5 font-display text-sm font-semibold leading-snug text-ink group-hover:text-velvet-700">
                              {other.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-12 rounded-2xl bg-velvet-800 p-6 text-center text-velvet-50 sm:p-8">
                  <p className="font-display text-xl font-semibold text-white">
                    Envie de soutenir ce travail ?
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/fr/s-impliquer/"
                      className="rounded-full bg-crimson-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-600"
                    >
                      S&apos;impliquer
                    </Link>
                    <Link
                      href="/fr/s-impliquer#donate"
                      className="rounded-full bg-gold-400 px-6 py-2.5 text-sm font-semibold text-velvet-900 transition-colors hover:bg-gold-300"
                    >
                      Faire un don
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
