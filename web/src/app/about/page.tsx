import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about DARED, Direct Action for Rights Equity and Development, a Cameroonian non-profit for heritage, environment, and youth empowerment.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    title: "Community First",
    body: "We work hand-in-hand with local communities, councils, and traditional authorities to create change that lasts.",
  },
  {
    title: "Heritage & Culture",
    body: "We safeguard Cameroon's cultural identity for future generations through preservation and education.",
  },
  {
    title: "Sustainability",
    body: "From environmental restoration to skills training, we build resilient local economies and ecosystems.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden">
      <ToghuField />
      <div className="relative z-10">
      <PageHeader
        eyebrow="About us"
        title="Direct Action for Rights Equity and Development"
        subtitle="A non-profit organization based in Cameroon, dedicated to community empowerment, cultural preservation, and sustainable development."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold text-ink">Our mission</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                DARED fosters sustainable and vibrant communities in Cameroon
                through hands-on engagement and meaningful collaboration. We
                bring together young people, cultural stakeholders, and partner
                institutions to protect heritage, restore the environment, and
                empower the next generation.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Our work spans cultural heritage preservation, environmental
                restoration, youth and children empowerment, and the creative
                arts, often in partnership with UNESCO programs, regional
                delegations, and local councils.
              </p>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-sand-300">
              <Image
                src="/images/dared-team.jpg"
                alt="The DARED team"
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
                className="rounded-3xl bg-sand-100 p-8 ring-1 ring-sand-300"
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
