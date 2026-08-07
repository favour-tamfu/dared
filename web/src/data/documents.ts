/*
  Resource Centre content (`/resources`).

  ─────────────────────────────────────────────────────────────────────────
  HOW TO ADD A DOCUMENT

  1. Put the file in:   web/public/documents/
     Use lowercase, hyphenated names, e.g. `annual-report-2025.pdf`.
     Anything in `public/` is copied to the site root at build time, so a
     file at `web/public/documents/annual-report-2025.pdf` is served from
     `/documents/annual-report-2025.pdf`.

  2. Add an entry to the `documents` array below:

        {
          id: "annual-report-2025",
          title: "Annual Report 2025",
          category: "Reports",
          summary: "A full year of DARED's work ...",
          updated: "March 2026",
          format: "PDF",
          size: "2.4 MB",
          href: "/documents/annual-report-2025.pdf",
        },

  `href` may also be an external link (Google Drive, Dropbox, a partner site);
  those open in a new tab instead of downloading.

  Omit `href` for documents shared on request rather than published openly.
  Those render a "Request access" link that opens an email to info@idared.org.

  Categories with no entries show a friendly "nothing here yet" message, so it
  is fine to fill these in one at a time.
  ─────────────────────────────────────────────────────────────────────────
*/

export type DocumentCategory =
  | "Internal Documents"
  | "Operating Procedures"
  | "Reports";

export type DocumentFormat = "PDF" | "DOCX" | "XLSX" | "Link";

export type DaredDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  /** One or two sentences describing what the document covers */
  summary: string;
  /** Publication or last-revision date, e.g. "March 2026" */
  updated: string;
  /** Badge shown in the card meta row */
  format: DocumentFormat;
  /** Approximate file size, e.g. "1.2 MB". Omit for `Link`. */
  size?: string;
  /**
   * Public path under `public/` (e.g. "/documents/x.pdf") or an external URL.
   * Leave undefined for documents that are only shared on request.
   */
  href?: string;
};

export type DocumentCategoryMeta = {
  key: DocumentCategory;
  /** URL hash for deep linking, e.g. /resources/#reports */
  slug: string;
  blurb: string;
  /** Heading shown when this category has no documents yet */
  emptyTitle: string;
  /**
   * Marks the category visitors are most often here for. It leads the tablist
   * (and so opens by default) and is given extra weight in the tab styling.
   */
  primary?: boolean;
};

// Reports leads: it is what partners, donors, and communities come here for.
export const documentCategories: DocumentCategoryMeta[] = [
  {
    key: "Reports",
    slug: "reports",
    blurb:
      "Activity, project, and financial reporting, shared so partners and communities can see what was done and what it achieved.",
    emptyTitle: "No reports published yet",
    primary: true,
  },
  {
    key: "Internal Documents",
    slug: "internal-documents",
    blurb:
      "The founding and governance papers that set out who we are, how we are structured, and the standards we hold ourselves to.",
    emptyTitle: "No internal documents published yet",
  },
  {
    key: "Operating Procedures",
    slug: "operating-procedures",
    blurb:
      "The written procedures our staff, volunteers, and partners follow in the office, in the field, and with the communities we serve.",
    emptyTitle: "No operating procedures published yet",
  },
];

/** Add documents here. See the instructions at the top of this file. */
export const documents: DaredDocument[] = [
  {
    id: "annual-report-2025",
    title: "Annual Report 2025",
    category: "Reports",
    summary:
      "A full year of DARED's work in 2025, prepared by the Director: the World Heritage Volunteers campaign at Bafut, the MadEx heritage and climate workshop in Madagascar, the children's holiday bootcamp, tree planting, and football for social cohesion, alongside the funding and security challenges met along the way.",
    updated: "January 2026",
    format: "PDF",
    size: "2.8 MB",
    href: "/documents/annual-report-2025.pdf",
  },
  {
    id: "annual-report-2024",
    title: "Annual Report 2024",
    category: "Reports",
    summary:
      "The 2024 year in review, covering the UNESCO World Heritage Volunteer Fund project at the Bafut Royal Palace, grant writing and project management training for artists in Bamenda, arts and craft training for children, and the year's work in heritage conservation and the theatre arts.",
    updated: "2024",
    format: "PDF",
    size: "1.3 MB",
    href: "/documents/annual-report-2024.pdf",
  },
  {
    id: "financial-audit-2025",
    title: "Audited Financial Statements 2025",
    category: "Reports",
    summary:
      "Independently audited financial statements for the year ended 31 December 2025, prepared in accordance with International Standards on Auditing and reported to DARED's Executive Board.",
    updated: "January 2026",
    format: "PDF",
    size: "665 KB",
    href: "/documents/financial-audit-2025.pdf",
  },
  {
    id: "financial-audit-2024",
    title: "Audited Financial Statements 2024",
    category: "Reports",
    summary:
      "Independently audited financial statements for the year ended 31 December 2024, prepared in accordance with International Standards on Auditing and reported to DARED's Executive Board.",
    updated: "January 2025",
    format: "PDF",
    size: "665 KB",
    href: "/documents/financial-audit-2024.pdf",
  },
  {
    id: "financial-audit-2023",
    title: "Audited Financial Statements 2023",
    category: "Reports",
    summary:
      "Independently audited financial statements for the year ended 31 December 2023, prepared in accordance with International Standards on Auditing and reported to DARED's Executive Board.",
    updated: "January 2024",
    format: "PDF",
    size: "661 KB",
    href: "/documents/financial-audit-2023.pdf",
  },
  {
    id: "organizational-ethics-charter",
    title: "Organizational Ethics Charter",
    category: "Internal Documents",
    summary:
      "The values and conduct standards everyone acting for DARED signs up to, covering zero-tolerance standards, safeguarding, conflict of interest, anti-fraud and anti-corruption, PSEA, confidentiality, and how ethical concerns are reported and investigated.",
    updated: "2025",
    format: "PDF",
    size: "244 KB",
    href: "/documents/organizational-ethics-charter-2025.pdf",
  },
  {
    id: "financial-management-policy",
    title: "Financial Management Policy",
    category: "Operating Procedures",
    summary:
      "How DARED handles money: budgeting, controls, procurement, and reporting. Board-approved and prepared in line with Cameroonian law, the OHADA Uniform Acts including SYCEBNL, CEMAC regulations, the COSO internal control framework, the Core Humanitarian Standard, and institutional donor requirements.",
    updated: "March 2025",
    format: "PDF",
    size: "1.3 MB",
    href: "/documents/financial-management-policy.pdf",
  },
  {
    id: "child-protection-policy",
    title: "Child Protection and Safeguarding Policy",
    category: "Operating Procedures",
    summary:
      "Our zero-tolerance safeguarding standards for everyone acting on DARED's behalf, covering conduct, safe recruitment, digital safety, reporting channels, and response. Aligned with the UN Convention on the Rights of the Child, UNICEF safeguarding standards, and Cameroonian child protection law.",
    updated: "March 2026",
    format: "PDF",
    size: "565 KB",
    href: "/documents/child-protection-and-safeguarding-policy.pdf",
  },
];

export function documentsIn(category: DocumentCategory): DaredDocument[] {
  return documents.filter((doc) => doc.category === category);
}

/** Documents hosted on our own site (i.e. not external links). */
export function hostedDocuments(): DaredDocument[] {
  return documents.filter((doc) => doc.href?.startsWith("/"));
}

const MIME: Record<DocumentFormat, string> = {
  PDF: "application/pdf",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  Link: "text/html",
};

export function mimeFor(format: DocumentFormat): string {
  return MIME[format];
}

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * Turn an `updated` label such as "March 2026" into an ISO 8601 month
 * ("2026-03") for structured data. Returns undefined if the label is not in
 * that shape, in which case the date is simply left out of the markup rather
 * than guessed at.
 */
export function isoMonth(updated: string): string | undefined {
  const match = updated.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return undefined;
  const index = MONTHS.indexOf(match[1].toLowerCase());
  return index === -1
    ? undefined
    : `${match[2]}-${String(index + 1).padStart(2, "0")}`;
}
