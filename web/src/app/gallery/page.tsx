import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { GalleryBrowser } from "@/components/site/GalleryBrowser";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from DARED's events and initiatives across Cameroon and beyond, grouped by event.",
  alternates: {
    canonical: "/gallery/",
    languages: { en: "/gallery/", fr: "/fr/galerie/" },
  },
};

export default function GalleryPage() {
  return (
    <>
      <div className="relative overflow-hidden">
      <ToghuField />
      <div className="relative z-10">
      <PageHeader
        eyebrow="Moments"
        title="Gallery"
        subtitle="A glimpse into our events, partnerships, and the communities we serve, grouped by event."
      />

      <div className="py-16 sm:py-20">
        <GalleryBrowser />
      </div>
      </div>
      </div>
    </>
  );
}
