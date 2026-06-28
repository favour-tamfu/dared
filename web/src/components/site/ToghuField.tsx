"use client";

import { useEffect, useRef } from "react";

/*
  A dense, small, tightly-tiled Toghu motif "field" (sun medallions + diamonds,
  matching the footer watermark but smaller and closer together). It is meant to
  sit inside a `relative overflow-hidden` body container so it stays CONTAINED
  between the top and bottom hems, it can't escape that box on scroll.

  Motion: a calm continuous drift (CSS `background-position`) plus an eased,
  water-like response to scrolling (a lerped `transform`).
*/

const STROKE = "#2a3566"; // soft velvet; calmed by the low layer opacity

const ticks = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const x1 = (40 + Math.cos(a) * 12.5).toFixed(1);
  const y1 = (40 + Math.sin(a) * 12.5).toFixed(1);
  const x2 = (40 + Math.cos(a) * 15.5).toFixed(1);
  const y2 = (40 + Math.sin(a) * 15.5).toFixed(1);
  return `<line x1='${x1}' y1='${y1}' x2='${x2}' y2='${y2}'/>`;
}).join("");

const diamonds = (
  [
    [0, 0, 6],
    [80, 0, 6],
    [0, 80, 6],
    [80, 80, 6],
    [40, 0, 5],
    [0, 40, 5],
    [80, 40, 5],
    [40, 80, 5],
  ] as const
)
  .map(
    ([x, y, r]) =>
      `<path d='M${x} ${y - r}L${x + r} ${y}L${x} ${y + r}L${x - r} ${y}Z'/>`
  )
  .join("");

const tile = `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='none' stroke='${STROKE}' stroke-width='1.1'><circle cx='40' cy='40' r='12'/><circle cx='40' cy='40' r='6.5'/>${ticks}${diamonds}</g><circle cx='40' cy='40' r='1.8' fill='${STROKE}'/></svg>`;

const bgImage = `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;

export function ToghuField({ opacity = 0.3 }: { opacity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let cur = 0;
    const tick = () => {
      const target = window.scrollY * 0.05;
      cur += (target - cur) * 0.06; // ease toward target → water-like settle
      if (ref.current) {
        ref.current.style.transform = `translate3d(0, ${cur.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="toghu-field pointer-events-none absolute left-0 right-0 z-0"
      style={{
        top: "-15%",
        bottom: "-15%",
        backgroundImage: bgImage,
        backgroundRepeat: "repeat",
        backgroundSize: "80px 80px",
        opacity,
        animation: "toghu-field 38s ease-in-out infinite",
      }}
    />
  );
}
