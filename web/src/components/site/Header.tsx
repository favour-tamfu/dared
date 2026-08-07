"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { counterpart, localeFromPath, nav, ui } from "@/lib/i18n";

/** Small badge marking a nav link that leads to an English-only section. */
function ForeignBadge({ label }: { label: string }) {
  return (
    <span className="ml-1.5 rounded px-1 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-ink-soft ring-1 ring-sand-300">
      {label}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const locale = localeFromPath(pathname);
  const navLinks = nav[locale];
  const t = ui[locale];
  const other = counterpart(pathname);
  const homeHref = locale === "fr" ? "/fr/" : "/";
  const volunteerHref = locale === "fr" ? "/fr/s-impliquer/" : "/get-involved";
  const volunteerLabel = locale === "fr" ? "Devenir bénévole" : "Volunteer";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
    Close the mobile menu when the route changes. Adjusted during render
    rather than in an effect: React re-runs this component immediately with
    the new state, before anything is painted, so the open menu never flashes
    on the incoming page the way a post-commit effect would allow.
  */
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Both home routes are exact matches: "/fr/" is a prefix of every other
  // French route, so a startsWith test would light up the whole French nav.
  const isActive = (href: string) =>
    href === "/" || href === "/fr/"
      ? pathname === href || pathname === href.replace(/\/$/, "")
      : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-sand-300 bg-cream/95 shadow-sm backdrop-blur"
          : "border-transparent bg-cream/85 backdrop-blur"
      }`}
    >
      <Container className="flex items-center justify-between py-2.5">
        <Link href={homeHref} aria-label="DARED home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-velvet-50 text-velvet-700"
                  : "text-ink-soft hover:bg-velvet-50 hover:text-velvet-700"
              }`}
            >
              {link.label}
              {link.foreign && <ForeignBadge label="EN" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={other}
            lang={locale === "fr" ? "en" : "fr"}
            aria-label={t.switchLabel}
            className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-velvet-50 hover:text-velvet-700"
          >
            {t.switchTo}
          </Link>
          <Button href={volunteerHref} size="md">
            {volunteerLabel}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full text-velvet-700 transition-colors hover:bg-velvet-50 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-t border-sand-300" : "max-h-0"
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center rounded-xl px-4 py-3 text-base font-medium ${
                isActive(link.href)
                  ? "bg-velvet-50 text-velvet-700"
                  : "text-ink hover:bg-sand-100"
              }`}
            >
              {link.label}
              {link.foreign && <ForeignBadge label="EN" />}
            </Link>
          ))}
          <Link
            href={other}
            lang={locale === "fr" ? "en" : "fr"}
            aria-label={t.switchLabel}
            className="rounded-xl px-4 py-3 text-base font-semibold text-velvet-700 hover:bg-sand-100"
          >
            {t.switchTo}
          </Link>
          <Button href={volunteerHref} className="mt-2 w-full">
            {volunteerLabel}
          </Button>
        </Container>
      </div>
    </header>
  );
}
