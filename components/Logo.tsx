import Image from "next/image";

/**
 * AI Flux logó — téma-tudatos.
 *
 * A logo.png "AI" felirata FEHÉR, tehát világos háttéren eltűnne. Ezért két
 * változat létezik (a világosat a scripts/make-light-logo.mjs generálja), és
 * tisztán CSS-sel váltunk köztük — így nincs hydration-eltérés és nem villan
 * rossz logó az első festéskor.
 */
export default function Logo({
  height = 36,
  priority = false,
}: {
  height?: number;
  priority?: boolean;
}) {
  const common = {
    width: 0,
    height: 0,
    sizes: "160px",
    style: { width: "auto", height: `${height}px` },
  } as const;

  return (
    <>
      {/* Mindkettőn ugyanaz az alt és priority: melyik látszik, azt a téma dönti el.
          A rejtett példány `display:none`, tehát kiesik az akadálymentességi
          fából — így sosem hangzik el kétszer a logó neve. */}
      <Image src="/logo.png" alt="AI Flux logó" className="logo-dark" priority={priority} {...common} />
      <Image src="/logo-light.png" alt="AI Flux logó" className="logo-light" priority={priority} {...common} />
    </>
  );
}
