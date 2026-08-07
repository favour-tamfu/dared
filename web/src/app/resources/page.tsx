import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { DocumentTabs } from "@/components/site/DocumentTabs";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/nav";
import { documents, isoMonth, mimeFor } from "@/data/documents";

const SITE = "https://idared.org";
const description =
  "DARED's activity and financial reports, internal documents, and operating procedures, gathered in one place for our team, volunteers, and partners.";

export const metadata: Metadata = {
  title: "Resource Centre",
  description,
  alternates: {
    canonical: "/resources/",
    languages: { en: "/resources/", fr: "/fr/ressources/" },
  },
  openGraph: {
    title: "Resource Centre | DARED",
    description,
    url: `${SITE}/resources/`,
    siteName: "DARED",
    type: "website",
  },
};

// Structured data: the page as a document collection, so each published file
// is described (title, summary, format, date) rather than left as a bare link.
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Resource Centre",
  description,
  url: `${SITE}/resources/`,
  isPartOf: { "@type": "WebSite", name: "DARED", url: SITE },
  hasPart: documents
    .filter((doc) => doc.href)
    .map((doc) => {
      const date = isoMonth(doc.updated);
      return {
        "@type": "DigitalDocument",
        name: doc.title,
        description: doc.summary,
        url: doc.href!.startsWith("/") ? `${SITE}${doc.href}` : doc.href,
        encodingFormat: mimeFor(doc.format),
        about: doc.category,
        inLanguage: "en",
        publisher: {
          "@type": "NGO",
          name: siteConfig.fullName,
          url: SITE,
        },
        ...(date ? { dateModified: date } : {}),
      };
    }),
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Transparency"
            title="Resource Centre"
            subtitle="Our activity and financial reports, internal documents, and operating procedures, gathered in one place for our team, our volunteers, and the partners and communities we work with."
          />

          <section className="py-14 sm:py-20">
            <Container>
              <DocumentTabs />
            </Container>
          </section>

          <section className="pb-16 sm:pb-24">
            <Container>
              <div className="rounded-[2rem] bg-velvet-800 p-8 text-velvet-50 sm:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                      Looking for a document that is not here?
                    </h2>
                    <p className="mt-3 text-velvet-100">
                      Some of our records are shared on request rather than
                      published openly. Tell us what you need and what it is for,
                      and we will get back to you.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                        "Document request"
                      )}`}
                      external
                      size="lg"
                      variant="white"
                    >
                      Email {siteConfig.email}
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
