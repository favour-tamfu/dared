import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/site/Hero";
import { EventCard } from "@/components/site/EventCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ToghuWatermark, ToghuTrim } from "@/components/site/ToghuMotif";
import { StatCounter } from "@/components/site/StatCounter";
import { featuredEvents } from "@/data/events";

const description =
  "DARED est une organisation camerounaise à but non lucratif qui œuvre pour l'autonomisation des communautés, la préservation du patrimoine culturel et le développement durable dans la Région du Nord-Ouest et au-delà.";

export const metadata: Metadata = {
  title: "Accueil",
  description,
  alternates: {
    canonical: "/fr/",
    languages: { en: "/", fr: "/fr/" },
  },
  openGraph: {
    title: "DARED | Direct Action for Rights Equity and Development",
    description,
    url: "https://idared.org/fr/",
    locale: "fr_FR",
    type: "website",
  },
};

// Same figures as the English home page; see the sourcing note there.
const stats = [
  { value: 1000, suffix: "+", label: "Jeunes mobilisés" },
  { value: 865, label: "Touchés par le sport" },
  { value: 500, suffix: "+", label: "Arbres plantés" },
  { value: 250, label: "Volontaires du patrimoine" },
];

const pillars = [
  {
    title: "Patrimoine culturel",
    body: "Préserver les palais, les musées et les traditions du Cameroun grâce au volontariat des jeunes et à des partenariats avec l'UNESCO et les communes.",
  },
  {
    title: "Environnement",
    body: "Rétablir l'équilibre écologique par des plantations d'arbres à grande échelle et des pratiques durables qui protègent la nature comme les moyens de subsistance.",
  },
  {
    title: "Autonomisation des jeunes",
    body: "Doter les jeunes et les enfants de compétences créatives, numériques et pratiques pour bâtir des communautés confiantes et résilientes.",
  },
];

const HOME_EVENT_COUNT = 6;

export default function AccueilPage() {
  return (
    <>
      <Hero locale="fr" />

      <section className="relative overflow-hidden bg-velvet-800">
        <ToghuWatermark id="stats-toghu-fr" className="text-velvet-300" opacity={0.08} />
        <Container className="relative grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-sand-300">
              <Image
                src="/images/dared-team.jpg"
                alt="L'équipe de DARED"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-500">
                Qui sommes-nous
              </span>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Bâtir des communautés dynamiques par l&apos;action directe
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {/*
                  The registered name stays in English and is introduced as a
                  proper noun, then explained in French.
                */}
                Direct Action for Rights Equity and Development (DARED) est une
                organisation camerounaise à but non lucratif consacrée à
                l&apos;autonomisation des communautés, à la préservation
                culturelle et au développement durable. Nous transformons les
                idées en impact par l&apos;action de terrain et la collaboration
                avec les communautés, les communes et nos partenaires
                internationaux.
              </p>
              <div className="mt-8">
                <Button href="/fr/a-propos/" variant="secondary">
                  En savoir plus sur nous
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="reveal relative overflow-hidden rounded-3xl bg-sand-100 p-8 ring-1 ring-sand-300"
              >
                <span className="block h-1 w-10 rounded-full bg-gold-400" />
                <h3 className="mt-5 text-xl font-semibold text-velvet-700">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ToghuTrim />

      <section className="bg-sand-200 py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-500">
                Notre travail
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Événements et initiatives récents
              </h2>
            </div>
            <Button href="/fr/evenements/" variant="ghost">
              Voir tous les événements →
            </Button>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.slice(0, HOME_EVENT_COUNT).map((event) => (
              <div key={event.slug} className="reveal">
                <EventCard event={event} locale="fr" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-crimson-600 py-16 sm:py-24">
        <ToghuWatermark id="cta-toghu-fr" className="text-gold-200" opacity={0.12} />
        <Container className="relative text-center">
          <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
            Aidez-nous à faire une différence durable
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-crimson-50">
            Que vous soyez bénévole, partenaire ou donateur, vous contribuez à
            protéger le patrimoine et à renforcer les communautés du Cameroun.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/fr/s-impliquer/" size="lg" variant="white">
              Devenir bénévole
            </Button>
            <Button href="/fr/a-propos/" size="lg" variant="outlineLight">
              En savoir plus
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
