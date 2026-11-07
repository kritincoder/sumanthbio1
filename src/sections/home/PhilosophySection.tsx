import Link from "next/link";
import { ConceptList } from "@/components/ConceptList";

export function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-title" className="env-dark py-28 md:py-40">
      <div className="shell">
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
          <p className="eyebrow md:col-span-3" data-reveal>
            Philosophy
          </p>
          <div className="md:col-span-8">
            <h2 id="philosophy-title" className="display text-[clamp(2.5rem,5vw,4.5rem)]" data-reveal>
              A framework for the view you haven’t taken.
            </h2>
          </div>
        </div>
        <ConceptList />
        <div className="mt-14" data-reveal>
          <Link href="/philosophy" className="group inline-flex min-h-11 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em]">
            Explore the philosophy
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
