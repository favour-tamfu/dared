"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ToghuWatermark, ToghuTrim } from "@/components/site/ToghuMotif";

const slides = [
  { src: "/images/bafut-palace-visit.jpg", alt: "Visit to the Bafut Palace" },
  { src: "/images/tree-planting-bafut-2.jpg", alt: "Tree planting at the Bafut Royal Palace" },
  { src: "/images/world-heritage-event.jpg", alt: "World Heritage Volunteers event" },
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[82svh] items-center overflow-hidden bg-velvet-900 sm:min-h-[90vh]">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        {/* Velvet readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-velvet-900/95 via-velvet-900/75 to-velvet-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-velvet-900 via-velvet-900/20 to-transparent" />
      </div>

      {/* Subtle Toghu motif watermark in gold */}
      <ToghuWatermark
        id="hero-toghu"
        className="text-gold-300 animate-toghu-drift"
        opacity={0.1}
      />

      <Container className="relative z-10 py-24 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-medium text-gold-200 ring-1 ring-gold-300/30">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Northwest Cameroon · Heritage in Action
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Protecting heritage.
            <br />
            Empowering communities.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-velvet-100">
            Direct Action for Rights Equity and Development drives cultural
            preservation, environmental restoration, and youth empowerment across
            Cameroon — through hands-on action and meaningful partnerships.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/get-involved" size="lg">
              Get Involved
            </Button>
            <Button href="/events" size="lg" variant="outlineLight">
              See Our Work
            </Button>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="mt-14 flex gap-2.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-10 bg-gold-400" : "w-5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </Container>

      {/* Embroidered hem */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <ToghuTrim animated />
      </div>
    </section>
  );
}
