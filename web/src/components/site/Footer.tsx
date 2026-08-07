"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { ToghuWatermark, ToghuTrim } from "@/components/site/ToghuMotif";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/site/Forms";
import { donateHref, localeFromPath, nav, ui } from "@/lib/i18n";

/*
  A client component only so it can read the locale off the path. The root
  layout renders one footer for every route and has no params of its own, so
  there is nothing to pass down; the alternative was splitting the layout per
  language, which would have meant moving every existing English page.
*/
export function Footer() {
  const locale = localeFromPath(usePathname());
  const navLinks = nav[locale];
  const t = ui[locale];

  return (
    <footer className="relative z-20 overflow-hidden bg-velvet-900 text-velvet-50">
      <ToghuTrim />
      <ToghuWatermark id="footer-toghu" className="text-velvet-300" opacity={0.06} />
      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo dark />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-gold-300">
              {siteConfig.fullName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-velvet-100">
              {t.footerBlurb}
            </p>
            <Link
              href={donateHref[locale]}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-velvet-900 transition-colors hover:bg-gold-300"
            >
              {t.donate}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t.explore}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-velvet-100 transition-colors hover:text-white"
                  >
                    {link.label}
                    {link.foreign && (
                      <span className="ml-1.5 text-xs text-velvet-200">
                        ({t.englishOnly})
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t.contact}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-velvet-100">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-white"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-300">
              {t.newsletter}
            </h4>
            <p className="mt-4 text-sm text-velvet-100">{t.newsletterBlurb}</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 border-t border-velvet-700 pt-6 text-center text-xs text-velvet-200">
          © {new Date().getFullYear()} {siteConfig.name}. {t.rights}
        </div>
      </Container>
    </footer>
  );
}
