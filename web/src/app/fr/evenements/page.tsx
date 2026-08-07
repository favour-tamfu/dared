import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { EventsBrowser } from "@/components/site/EventsBrowser";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Événements",
  description:
    "Découvrez les événements et initiatives de DARED en matière de patrimoine culturel, d'environnement, d'autonomisation des jeunes et d'arts à travers le Cameroun.",
  alternates: {
    canonical: "/fr/evenements/",
    languages: { en: "/events/", fr: "/fr/evenements/" },
  },
};

export default function EvenementsPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Notre travail"
            title="Événements et initiatives"
            subtitle="De la plantation d'arbres à la valorisation du patrimoine, en passant par les camps de vacances pour les jeunes et le plaidoyer : un aperçu de notre action au Cameroun et au-delà."
          />
          <section className="py-14 sm:py-20">
            <Container>
              <EventsBrowser locale="fr" />
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
