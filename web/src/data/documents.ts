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
};

export const documentCategories: DocumentCategoryMeta[] = [
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
  {
    key: "Reports",
    slug: "reports",
    blurb:
      "Activity, project, and financial reporting, shared so partners and communities can see what was done and what it achieved.",
    emptyTitle: "No reports published yet",
  },
];

/** Add documents here. See the instructions at the top of this file. */
export const documents: DaredDocument[] = [
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
