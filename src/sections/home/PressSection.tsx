import { PressList, visiblePress } from "@/components/PressList";

/** Rendered only when there is verified press (or in review mode). */
export function PressSection() {
  if (!visiblePress().length) return null;
  return (
    <section aria-labelledby="press-title" className="env-dark py-28 md:py-40">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3" data-reveal>
            Press &amp; recognition
          </p>
          <h2 id="press-title" className="display text-[clamp(2.5rem,5vw,4.5rem)] md:col-span-8" data-reveal>
            In the news.
          </h2>
        </div>
        <PressList />
      </div>
    </section>
  );
}
