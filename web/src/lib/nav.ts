export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
];

export const siteConfig = {
  name: "DARED",
  fullName: "Direct Action for Rights Equity and Development",
  email: "info@idared.org",
  whatsapp: "237680899916",
  facebook: "https://www.facebook.com/profile.php?id=100088657673507",
  // Formspree endpoints (same accounts the original site used).
  newsletterAction: "https://formspree.io/f/xldnyoee",
  volunteerAction: "https://formspree.io/f/xpwrgozl",
  // Donations: WhatsApp contact with a pre-filled message (as on the original).
  donateUrl:
    "https://wa.me/237680899916?text=Hello!%20I'm%20interested%20in%20donating%20to%20DARED.%20Could%20you%20please%20provide%20more%20details?",
};
