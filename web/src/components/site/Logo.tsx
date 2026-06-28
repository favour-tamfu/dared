import Image from "next/image";

/*
  Brand logo: an oval fist emblem (velvet fill, crimson ring) + the "DA·RED"
  wordmark. Contrast-aware so it reads on the cream header (dark text) and the
  velvet footer (light text). The full org name lives in the footer, not here.
*/
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-11 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-[50%] bg-velvet-900 ring-2 ring-crimson-500">
        <Image
          src="/images/dared-icon.svg"
          alt=""
          width={512}
          height={512}
          priority
          className="h-7 w-7"
        />
      </span>
      <span className="font-display text-2xl font-bold leading-none tracking-tight">
        <span className={dark ? "text-white" : "text-velvet-800"}>DA</span>
        <span className={dark ? "text-crimson-300" : "text-crimson-600"}>
          RED
        </span>
      </span>
    </span>
  );
}
