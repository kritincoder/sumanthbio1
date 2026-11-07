import { book } from "@/data/book";

export function ExploresSection() {
  return (
    <section aria-labelledby="explores-title" className="env-light py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-3" data-reveal>
            What the book explores
          </p>
          <h2 id="explores-title" className="display text-[clamp(2.5rem,5vw,4.5rem)] md:col-span-8" data-reveal>
            Six ways of looking again.
          </h2>
        </div>
        <ol className="mt-16 grid border-t hairline sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
          {book.themes.map((t, i) => (
            <li
              key={t.title}
              data-reveal
              className="group border-b hairline py-10 sm:pr-10 lg:[&:nth-child(3n+2)]:px-10 lg:[&:nth-child(3n)]:pl-10"
            >
              <span className="eyebrow tabular-nums">0{i + 1}</span>
              <h3 className="display mt-6 text-[2.25rem] transition-transform duration-700 ease-(--ease-out-quint) group-hover:translate-x-1">
                {t.title}
              </h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed muted">{t.line}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-xs muted">Themes drawn from the book’s description — not chapter titles.</p>
      </div>
    </section>
  );
}
