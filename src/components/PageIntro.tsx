export function PageIntro({ eyebrow, title, lede, children }: { eyebrow: string; title: React.ReactNode; lede?: string; children?: React.ReactNode }) {
  return (
    <section className="env-dark pb-20 pt-[calc(var(--header-h)+5rem)] md:pb-28 md:pt-[calc(var(--header-h)+8rem)]">
      <div className="shell">
        <p className="eyebrow mb-6" data-reveal>
          {eyebrow}
        </p>
        <h1 className="display max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)]" data-reveal>
          {title}
        </h1>
        {lede ? (
          <p className="lede mt-8" data-reveal>
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
