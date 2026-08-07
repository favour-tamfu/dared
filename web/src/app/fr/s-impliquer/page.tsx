import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VolunteerForm } from "@/components/site/Forms";
import { siteConfig } from "@/lib/nav";

export const metadata: Metadata = {
  title: "S'impliquer",
  description:
    "Devenez bénévole chez DARED ou soutenez notre action par un don : protégez le patrimoine, restaurez l'environnement et renforcez les communautés du Cameroun.",
  alternates: {
    canonical: "/fr/s-impliquer/",
    languages: { en: "/get-involved/", fr: "/fr/s-impliquer/" },
  },
};

const ways = [
  {
    title: "Devenir bénévole",
    body: "Rejoignez nos événements et nos actions sur le terrain, de la plantation d'arbres aux camps de vacances pour les jeunes.",
  },
  {
    title: "Devenir partenaire",
    body: "Collaborez avec nous en tant qu'institution, commune ou organisation pour amplifier l'impact au sein des communautés.",
  },
  {
    title: "Faire un don",
    body: "Soutenez nos projets et aidez-nous à toucher davantage de communautés. Chaque contribution, petite ou grande, compte.",
  },
];

export default function SImpliquerPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Rejoignez-nous"
            title="S'impliquer"
            subtitle="Il existe plusieurs façons de participer au changement : donnez de votre temps, devenez partenaire ou soutenez notre action par un don."
          />

          <section className="py-14 sm:py-20">
            <Container>
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-semibold text-ink">
                    Comment agir avec nous
                  </h2>
                  <div className="mt-8 space-y-6">
                    {ways.map((way) => (
                      <div key={way.title} className="reveal flex gap-4">
                        <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-crimson-500" />
                        <div>
                          <h3 className="text-lg font-semibold text-velvet-700">
                            {way.title}
                          </h3>
                          <p className="mt-1 text-ink-soft">{way.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 rounded-2xl bg-velvet-800 p-6 text-velvet-50">
                    <h3 className="font-display text-lg font-semibold text-white">
                      Vous préférez nous parler ?
                    </h3>
                    <p className="mt-2 text-sm text-velvet-100">
                      Écrivez-nous directement à{" "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="font-semibold text-gold-300 hover:underline"
                      >
                        {siteConfig.email}
                      </a>{" "}
                      ou sur WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Volunteer form → Formspree (xpwrgozl), same endpoint as EN */}
                <div className="rounded-[2rem] bg-sand-100 p-8 ring-1 ring-sand-300 sm:p-10">
                  <h2 className="text-2xl font-semibold text-ink">
                    Devenir bénévole
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    Offrez votre temps et vos compétences. Remplissez le
                    formulaire et nous vous recontacterons.
                  </p>
                  <div className="mt-6">
                    <VolunteerForm locale="fr" />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Donation section (anchor target for the footer "Faire un don") */}
          <section
            id="donate"
            className="relative scroll-mt-24 overflow-hidden bg-crimson-600 py-16 sm:py-20"
          >
            <Container className="relative text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-100">
                Soutenez notre action
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl">
                Faire un don
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-crimson-50">
                Votre générosité finance nos projets et nous aide à toucher
                davantage de communautés. Chaque don, petit ou grand, fait une
                réelle différence.
              </p>
              <div className="mt-9">
                <Button href={siteConfig.donateUrl} external size="lg" variant="white">
                  Nous contacter pour faire un don
                </Button>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
