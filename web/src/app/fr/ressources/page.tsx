import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { DocumentTabs } from "@/components/site/DocumentTabs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/nav";

const description =
  "Les rapports d'activité et financiers de DARED, ses documents internes et ses procédures opérationnelles, réunis en un seul endroit pour notre équipe, nos bénévoles et nos partenaires.";

export const metadata: Metadata = {
  title: "Centre de ressources",
  description,
  alternates: {
    canonical: "/fr/ressources/",
    languages: { en: "/resources/", fr: "/fr/ressources/" },
  },
};

export default function RessourcesPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Transparence"
            title="Centre de ressources"
            subtitle="Nos rapports d'activité et financiers, nos documents internes et nos procédures opérationnelles, réunis pour notre équipe, nos bénévoles et les partenaires et communautés avec lesquels nous travaillons."
          />

          <section className="py-14 sm:py-20">
            <Container>
              {/*
                Said plainly: the summaries are in French, the PDFs are not.
                A partner should know that before downloading a 68-page policy.
              */}
              <p className="mb-8 rounded-2xl bg-sand-100 px-5 py-4 text-sm leading-relaxed text-ink-soft ring-1 ring-sand-300">
                Les descriptions ci-dessous sont en français. Les documents
                eux-mêmes sont rédigés en anglais.
              </p>
              <DocumentTabs locale="fr" />
            </Container>
          </section>

          <section className="pb-16 sm:pb-24">
            <Container>
              <div className="rounded-[2rem] bg-velvet-800 p-8 text-velvet-50 sm:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      Vous cherchez un document absent de cette liste ?
                    </h2>
                    <p className="mt-3 text-velvet-100">
                      Certains de nos documents sont communiqués sur demande
                      plutôt que publiés. Dites-nous ce dont vous avez besoin et
                      à quelle fin, et nous reviendrons vers vous.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                        "Demande de document"
                      )}`}
                      external
                      size="lg"
                      variant="white"
                    >
                      Écrire à {siteConfig.email}
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
