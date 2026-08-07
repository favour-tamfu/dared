import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez DARED, Direct Action for Rights Equity and Development, une organisation camerounaise à but non lucratif dédiée au patrimoine, à l'environnement et à l'autonomisation des jeunes.",
  alternates: {
    canonical: "/fr/a-propos/",
    languages: { en: "/about/", fr: "/fr/a-propos/" },
  },
};

const values = [
  {
    title: "La communauté d'abord",
    body: "Nous travaillons main dans la main avec les communautés locales, les communes et les autorités traditionnelles pour produire un changement qui dure.",
  },
  {
    title: "Patrimoine et culture",
    body: "Nous préservons l'identité culturelle du Cameroun pour les générations futures, par la conservation et l'éducation.",
  },
  {
    title: "Durabilité",
    body: "De la restauration de l'environnement à la formation professionnelle, nous bâtissons des économies et des écosystèmes locaux résilients.",
  },
];

export default function AProposPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="À propos"
            title="Direct Action for Rights Equity and Development"
            subtitle="Une organisation à but non lucratif basée au Cameroun, dédiée à l'autonomisation des communautés, à la préservation culturelle et au développement durable."
          />

          <section className="py-14 sm:py-20">
            <Container>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-semibold text-ink">
                    Notre mission
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                    DARED bâtit des communautés durables et dynamiques au
                    Cameroun par l&apos;action de terrain et une collaboration
                    concrète. Nous réunissons les jeunes, les acteurs culturels
                    et les institutions partenaires pour protéger le patrimoine,
                    restaurer l&apos;environnement et donner à la prochaine
                    génération les moyens d&apos;agir.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                    Nos activités couvrent la préservation du patrimoine
                    culturel, la restauration environnementale,
                    l&apos;autonomisation des jeunes et des enfants ainsi que les
                    arts créatifs, souvent en partenariat avec les programmes de
                    l&apos;UNESCO, les délégations régionales et les communes.
                  </p>
                </div>
                <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-sand-300">
                  <Image
                    src="/images/dared-team.jpg"
                    alt="L'équipe de DARED"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-20 grid gap-6 md:grid-cols-3">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="reveal rounded-3xl bg-sand-100 p-8 ring-1 ring-sand-300"
                  >
                    <h3 className="text-xl font-semibold text-velvet-700">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {value.body}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
