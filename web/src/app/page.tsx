import Image from "next/image";
import { Hero } from "@/components/site/Hero";
import { EventCard } from "@/components/site/EventCard";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ToghuWatermark, ToghuTrim } from "@/components/site/ToghuMotif";
import { featuredEvents } from "@/data/events";

const stats = [
  { value: "500", label: "Trees Planted" },
  { value: "50+", label: "Children Trained" },
  { value: "15+", label: "Countries Networked" },
  { value: "10+", label: "Community Events" },
];

const pillars = [
  {
    title: "Cultural Heritage",
    body: "Preserving Cameroon's palaces, museums, and traditions through youth-led volunteering and partnerships with UNESCO and local councils.",
  },
  {
    title: "Environment",
    body: "Restoring ecological balance through large-scale tree planting and sustainable practices that protect both nature and livelihoods.",
  },
  {
    title: "Youth Empowerment",
    body: "Equipping young people and children with creative, digital, and life skills to build confident, resilient communities.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Impact stats — on velvet, with a faint motif */}
      <section className="relative overflow-hidden bg-velvet-800">
        <ToghuWatermark id="stats-toghu" className="text-velvet-300" opacity={0.08} />
        <Container className="relative grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-gold-300 sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-velvet-100">
                {stat.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* Mission / pillars */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-sand-300">
              <Image
                src="/images/dared-team.jpg"
                alt="The DARED team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-500">
                Who we are
              </span>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Building vibrant communities through direct action
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                DARED is a Cameroonian non-profit dedicated to community
                empowerment, cultural preservation, and sustainable development.
                We turn ideas into impact through hands-on engagement and
                collaboration with communities, councils, and global partners.
              </p>
              <div className="mt-8">
                <Button href="/about" variant="secondary">
                  Learn more about us
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="relative overflow-hidden rounded-3xl bg-sand-100 p-8 ring-1 ring-sand-300"
              >
                <span className="block h-1 w-10 rounded-full bg-gold-400" />
                <h3 className="mt-5 text-xl font-semibold text-velvet-700">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ToghuTrim />

      {/* Featured events */}
      <section className="bg-sand-200 py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-500">
                Our work
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                Recent events &amp; initiatives
              </h2>
            </div>
            <Button href="/events" variant="ghost">
              View all events →
            </Button>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — crimson thread band with motif */}
      <section className="relative overflow-hidden bg-crimson-600 py-16 sm:py-24">
        <ToghuWatermark id="cta-toghu" className="text-gold-200" opacity={0.12} />
        <Container className="relative text-center">
          <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
            Join us in making a lasting difference
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-crimson-50">
            Whether you volunteer, partner, or support our work, you help protect
            heritage and empower communities across Cameroon.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/get-involved" size="lg" variant="white">
              Become a Volunteer
            </Button>
            <Button href="/about" size="lg" variant="outlineLight">
              Learn More
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
