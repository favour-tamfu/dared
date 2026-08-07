import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { EventsBrowser } from "@/components/site/EventsBrowser";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore DARED's events and initiatives in cultural heritage, environment, youth empowerment, and the arts across Cameroon.",
  alternates: {
    canonical: "/events/",
    languages: { en: "/events/", fr: "/fr/evenements/" },
  },
};

export default function EventsPage() {
  return (
    <>
      <div className="relative overflow-hidden">
      <ToghuField />
      <div className="relative z-10">
      <PageHeader
        eyebrow="Our work"
        title="Events & Initiatives"
        subtitle="From tree planting and heritage engagement to youth bootcamps and advocacy, a look at the work we do across Cameroon and beyond."
      />
      <section className="py-14 sm:py-20">
        <Container>
          <EventsBrowser />
        </Container>
      </section>
      </div>
      </div>
    </>
  );
}
