import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ToghuField } from "@/components/site/ToghuField";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { VolunteerForm } from "@/components/site/Forms";
import { siteConfig } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer with DARED or support our work with a donation, help protect heritage, restore the environment, and empower communities across Cameroon.",
  alternates: { canonical: "/get-involved/" },
};

const ways = [
  {
    title: "Volunteer",
    body: "Join our events and initiatives on the ground, from tree planting to youth bootcamps.",
  },
  {
    title: "Partner",
    body: "Collaborate with us as an institution, council, or organization to amplify community impact.",
  },
  {
    title: "Donate",
    body: "Fuel our projects and help us reach more communities. Every contribution, big or small, makes a difference.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <ToghuField />
        <div className="relative z-10">
          <PageHeader
            eyebrow="Join us"
            title="Get Involved"
            subtitle="There are many ways to be part of the change. Volunteer your time, partner with us, or support our work with a donation."
          />

          <section className="py-14 sm:py-20">
            <Container>
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-semibold text-ink">
                    Ways to make an impact
                  </h2>
                  <div className="mt-8 space-y-6">
                    {ways.map((way) => (
                      <div key={way.title} className="flex gap-4">
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
                      Prefer to talk to us?
                    </h3>
                    <p className="mt-2 text-sm text-velvet-100">
                      Reach us directly at{" "}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="font-semibold text-gold-300 hover:underline"
                      >
                        {siteConfig.email}
                      </a>{" "}
                      or on WhatsApp.
                    </p>
                  </div>
                </div>

                {/* Volunteer form → Formspree (xpwrgozl) */}
                <div className="rounded-[2rem] bg-sand-100 p-8 ring-1 ring-sand-300 sm:p-10">
                  <h2 className="text-2xl font-semibold text-ink">
                    Become a volunteer
                  </h2>
                  <p className="mt-2 text-sm text-ink-soft">
                    Lend your time and skills. Fill out the form and we&apos;ll be
                    in touch.
                  </p>
                  <div className="mt-6">
                    <VolunteerForm />
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* Donation section (anchor target for footer "Donate") */}
          <section
            id="donate"
            className="relative scroll-mt-24 overflow-hidden bg-crimson-600 py-16 sm:py-20"
          >
            <Container className="relative text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-crimson-100">
                Support our work
              </span>
              <h2 className="mt-3 text-balance text-3xl font-semibold text-white sm:text-4xl">
                Make a Donation
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-crimson-50">
                Your generous contribution fuels our projects and helps us reach
                more communities. Every donation, big or small, makes a
                significant difference.
              </p>
              <div className="mt-9">
                <Button href={siteConfig.donateUrl} external size="lg" variant="white">
                  Contact for Donation Details
                </Button>
              </div>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
