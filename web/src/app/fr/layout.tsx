/*
  The root layout owns the <html> tag and renders one shell for every route,
  so `lang` cannot be set per-route there. Marking the French subtree instead
  is valid HTML and is what screen readers and search engines actually read
  for pronunciation and language targeting.
*/
export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div lang="fr">{children}</div>;
}
