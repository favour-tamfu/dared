"use client";

import { useEffect, useRef, useState } from "react";

/*
  Counts a stat up from zero the first time it scrolls into view.

  The final value is rendered on the server and is what sits in the static
  HTML, so the number is correct for search engines, for visitors without
  JavaScript, and for anyone who prefers reduced motion — the animation only
  ever replaces a value that is already there.
*/
export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const DURATION = 1400;
        let raf = 0;
        let start: number | null = null;

        const step = (now: number) => {
          start ??= now;
          const progress = Math.min(1, (now - start) / DURATION);
          // Ease-out cubic: quick off the mark, gentle at the finish.
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(Math.round(value * eased));
          if (progress < 1) raf = requestAnimationFrame(step);
        };

        setShown(0);
        raf = requestAnimationFrame(step);
        cleanup = () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 }
    );

    let cleanup = () => {};
    observer.observe(el);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [value]);

  return (
    <div className="text-center">
      <p
        ref={ref}
        className="font-display text-4xl font-semibold text-gold-300 tabular-nums sm:text-5xl"
      >
        {shown.toLocaleString("en-GB")}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-velvet-100">
        {label}
      </p>
    </div>
  );
}
