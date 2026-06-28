import { Container } from "@/components/ui/Container";
import { ToghuWatermark, ToghuTrim } from "@/components/site/ToghuMotif";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-velvet-800 pt-24 pb-14 sm:pt-28 sm:pb-20">
      <ToghuWatermark id="ph-toghu" className="text-gold-300" opacity={0.08} />
      <Container className="relative">
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-velvet-100">
            {subtitle}
          </p>
        )}
      </Container>
      <div className="absolute inset-x-0 bottom-0">
        <ToghuTrim />
      </div>
    </section>
  );
}
