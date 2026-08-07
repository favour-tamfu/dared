import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { GalleryBrowser } from "@/components/site/GalleryBrowser";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Photos des événements et initiatives de DARED au Cameroun et ailleurs, regroupées par événement.",
  alternates: {
    canonical: "/fr/galerie/",
    languages: { en: "/gallery/", fr: "/fr/galerie/" },
  },
};

export default function GaleriePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Instantanés"
            title="Galerie"
            subtitle="Un aperçu de nos événements, de nos partenariats et des communautés que nous accompagnons, regroupé par événement."
          />
          <div className="py-16 sm:py-20">
            <GalleryBrowser locale="fr" />
          </div>
        </div>
      </div>
    </>
  );
}
