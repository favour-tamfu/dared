import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LightboxProvider } from "@/components/site/Lightbox";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://idared.org"),
  title: {
    default: "DARED | Direct Action for Rights Equity and Development",
    template: "%s | DARED",
  },
  description:
    "DARED is a Cameroonian non-profit dedicated to community empowerment, cultural heritage preservation, and sustainable development in the Northwest Region and beyond.",
  keywords: [
    "DARED",
    "DARED Cameroon",
    "Cameroon non-profit",
    "Cameroon NGO",
    "cultural heritage preservation",
    "Toghu",
    "Northwest Region Cameroon",
    "Bamenda",
    "youth empowerment",
    "tree planting Cameroon",
    "UNESCO heritage volunteers",
  ],
  authors: [{ name: "DARED" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DARED | Direct Action for Rights Equity and Development",
    description:
      "Community empowerment, cultural heritage preservation, and sustainable development in Cameroon.",
    url: "https://idared.org",
    siteName: "DARED",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DARED, Direct Action for Rights Equity and Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DARED | Direct Action for Rights Equity and Development",
    description:
      "Community empowerment, cultural heritage preservation, and sustainable development in Cameroon.",
    images: ["/og-image.png"],
  },
};

// Organization (NGO) structured data for rich search results.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Direct Action for Rights Equity and Development",
  alternateName: "DARED",
  url: "https://idared.org",
  logo: "https://idared.org/images/dared-logo.svg",
  email: "info@idared.org",
  description:
    "A Cameroonian non-profit dedicated to community empowerment, cultural heritage preservation, and sustainable development.",
  areaServed: { "@type": "Country", name: "Cameroon" },
  sameAs: ["https://www.facebook.com/profile.php?id=100088657673507"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LightboxProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
