"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Settles `.reveal` elements into place as they scroll into view.

  Mounted once in the root layout. Two deliberate constraints:

  - Only elements *below the fold* are hidden, and only after this runs. What
    is already on screen at hydration is left alone, so nothing flickers, and
    a visitor without JavaScript simply sees a static page.
  - Honours prefers-reduced-motion by doing nothing at all.

  Re-scans on navigation because the root layout survives client-side route
  changes, so a fresh page's elements would otherwise never be observed.
*/
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-reveal");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    for (const el of elements) {
      // Already revealed by an earlier pass on this page.
      if (el.dataset.revealDone === "1") continue;

      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight) {
        // On screen already: leave it be, and don't animate it later.
        el.dataset.revealDone = "1";
        continue;
      }

      el.dataset.reveal = "pending";
      el.dataset.revealDone = "1";
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
