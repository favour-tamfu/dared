import type { DocumentCategory } from "./documents";

/*
  French strings for the Resource Centre.

  Document TITLES stay in English on purpose: they name real PDFs whose covers
  read "2025 ANNUAL REPORT" and "AUDITED FINANCIAL STATEMENT", and a partner
  looking for a file should see the name that is actually on it. The summaries
  are translated so a French reader knows what each file contains before
  downloading, and the page says plainly that the documents themselves are in
  English.
*/

export const categoryFr: Record<
  DocumentCategory,
  { label: string; blurb: string; emptyTitle: string }
> = {
  Reports: {
    label: "Rapports",
    blurb:
      "Rapports d'activité, de projet et rapports financiers, publiés afin que nos partenaires et les communautés puissent voir ce qui a été fait et ce que cela a produit.",
    emptyTitle: "Aucun rapport publié pour le moment",
  },
  "Internal Documents": {
    label: "Documents internes",
    blurb:
      "Les textes fondateurs et de gouvernance qui définissent qui nous sommes, comment nous sommes organisés et les normes que nous nous imposons.",
    emptyTitle: "Aucun document interne publié pour le moment",
  },
  "Operating Procedures": {
    label: "Procédures opérationnelles",
    blurb:
      "Les procédures écrites que suivent notre personnel, nos bénévoles et nos partenaires au bureau, sur le terrain et auprès des communautés.",
    emptyTitle: "Aucune procédure publiée pour le moment",
  },
};

/** Document id -> French summary. Titles deliberately stay in English. */
export const summaryFr: Record<string, string> = {
  "annual-report-2025":
    "Une année complète d'activités en 2025, préparée par le Directeur : la campagne des Volontaires du patrimoine mondial à Bafut, l'atelier MadEx sur le patrimoine et le climat à Madagascar, le camp de vacances pour enfants, les plantations d'arbres et le football au service de la cohésion sociale, ainsi que les difficultés de financement et de sécurité rencontrées.",
  "annual-report-2024":
    "Bilan de l'année 2024 : le projet du Fonds des Volontaires du patrimoine mondial de l'UNESCO au Palais royal de Bafut, les formations en gestion de projet et en rédaction de demandes de subvention pour les artistes de Bamenda, les ateliers d'arts plastiques pour enfants, et le travail de l'année en conservation du patrimoine et en arts de la scène.",
  "financial-audit-2025":
    "États financiers audités de façon indépendante pour l'exercice clos le 31 décembre 2025, établis conformément aux Normes internationales d'audit et présentés au Conseil exécutif de DARED.",
  "financial-audit-2024":
    "États financiers audités de façon indépendante pour l'exercice clos le 31 décembre 2024, établis conformément aux Normes internationales d'audit et présentés au Conseil exécutif de DARED.",
  "financial-audit-2023":
    "États financiers audités de façon indépendante pour l'exercice clos le 31 décembre 2023, établis conformément aux Normes internationales d'audit et présentés au Conseil exécutif de DARED.",
  "organizational-ethics-charter":
    "Les valeurs et les règles de conduite auxquelles adhère toute personne agissant au nom de DARED : normes de tolérance zéro, protection de l'enfance, conflits d'intérêts, lutte contre la fraude et la corruption, PSEA, confidentialité, et modalités de signalement et d'enquête.",
  "financial-management-policy":
    "La gestion financière de DARED : budgétisation, contrôles, passation de marchés et reporting. Approuvée par le Conseil d'administration et établie conformément au droit camerounais, aux Actes uniformes OHADA dont le SYCEBNL, à la réglementation CEMAC, au cadre de contrôle interne COSO, à la Norme humanitaire fondamentale et aux exigences des bailleurs institutionnels.",
  "child-protection-policy":
    "Nos normes de tolérance zéro en matière de protection de l'enfance, applicables à toute personne agissant au nom de DARED : conduite, recrutement sécurisé, sécurité numérique, canaux de signalement et réponse. Alignées sur la Convention relative aux droits de l'enfant, les normes de sauvegarde de l'UNICEF et le droit camerounais.",
};

/** Interface strings for the document cards and tabs. */
export const documentUiFr = {
  tabsLabel: "Catégories de documents",
  view: "Consulter le document",
  open: "Ouvrir le document",
  download: "Télécharger",
  request: "Demander l'accès",
  requestSuffix: "par e-mail",
  updated: "Mis à jour",
  newTab: "(s'ouvre dans un nouvel onglet)",
  emptyBody:
    "Cette section est en préparation. Revenez bientôt — en attendant, nous pouvons vous aider directement.",
  emptyCta: "Demandez-nous un document",
};
