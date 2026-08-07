"use client";

import { type KeyboardEvent, useRef } from "react";
import { setHash } from "@/lib/hash";

/*
  The filter chip row shared by the events grid and the gallery.

  Every item stays in the DOM and non-matching ones are hidden, rather than
  being unmounted: filtering is then instant, and — more importantly for a site
  that depends on being found — every event and photo is still present in the
  static HTML for search engines and for visitors without JavaScript.
*/

export type FilterOption = {
  /** Value stored in the URL hash; "" means show everything. */
  value: string;
  label: string;
  count: number;
};

export function slugifyCategory(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function CategoryChips({
  options,
  active,
  label,
}: {
  options: FilterOption[];
  active: string;
  label: string;
}) {
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    setHash(options[next].value);
    chipRefs.current[next]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap gap-2 rounded-[1.75rem] bg-sand-100 p-1.5 ring-1 ring-sand-300 sm:inline-flex"
    >
      {options.map((option, index) => {
        const selected = option.value === active;

        return (
          <button
            key={option.value || "all"}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            type="button"
            aria-pressed={selected}
            onClick={() => setHash(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-400 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-100 ${
              selected
                ? "bg-velvet-800 text-white shadow-sm"
                : "text-ink-soft hover:bg-white/70 hover:text-velvet-700"
            }`}
          >
            {option.label}
            <span
              // Full opacity, not /70: the count carries meaning, and at 70%
              // on sand-100 it lands at 3.36:1, under the 4.5:1 AA minimum.
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                selected ? "bg-white/15 text-gold-300" : "text-ink-soft"
              }`}
            >
              {option.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Resolves the hash to an active filter value, falling back to "" (show all)
 * when the hash is empty or names something that is not one of the options.
 */
export function activeFilter(hash: string, options: FilterOption[]): string {
  return options.some((o) => o.value === hash && o.value !== "") ? hash : "";
}
