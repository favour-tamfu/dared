import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { EventCard } from "@/components/site/EventCard";
import { Container } from "@/components/ui/Container";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore DARED's events and initiatives in cultural heritage, environment, youth empowerment, and the arts across Cameroon.",
  alternates: { canonical: "/events/" },
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
        subtitle="From tree planting and heritage engagement to youth bootcamps and advocacy — a look at the work we do across Cameroon and beyond."
      />
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </Container>
      </section>
      </div>
      </div>
    </>
  );
}
