import { concepts, selfShiftSystem } from "@/data/philosophy";
import { DraftMark } from "./DraftMark";
import { siteConfig } from "@/data/site.config";

/**
 * The book's named frameworks. Names always show (they are printed on the
 * cover); explanations only in review mode until the author approves wording.
 */
export function ConceptList({ detailed = false }: { detailed?: boolean }) {
  const showDrafts = siteConfig.reviewMode;
  return (
    <div>
      <div className="border-y hairline py-12 md:py-16" data-reveal>
        <p className="eyebrow mb-6">The idea at the centre</p>
        <p className="display flex flex-wrap items-baseline gap-x-[0.35em] text-[clamp(2.75rem,8vw,7.5rem)]">
          {selfShiftSystem.parts.map((part, i) => (
            <span key={part} className="inline-flex items-baseline gap-x-[0.35em]">
              {part}
              {i < selfShiftSystem.parts.length - 1 ? (
                <span aria-hidden="true" className="text-champagne">
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>
        {showDrafts ? (
          <div className="mt-6 flex flex-col items-start gap-3">
            <DraftMark label="Draft wording" />
            <p className="lede">{selfShiftSystem.draft}</p>
          </div>
        ) : (
          <p className="lede mt-6">Explained in the book.</p>
        )}
      </div>

      <ul className={`grid ${detailed ? "" : "md:grid-cols-3"}`}>
        {concepts.filter((c) => showDrafts || !c.hold).map((c) => (
          <li
            key={c.id}
            data-reveal
            className={`border-b hairline py-10 ${detailed ? "grid gap-6 md:grid-cols-12 md:py-14" : "md:pr-10 [&+&]:md:pl-10"}`}
          >
            <p className={`display text-[clamp(2.5rem,4vw,3.5rem)] text-champagne ${detailed ? "md:col-span-4" : ""}`}>
              <Mark text={c.mark} />
            </p>
            <div className={detailed ? "md:col-span-7 md:col-start-6" : "mt-4"}>
              {c.name && showDrafts ? <p className="text-lg">{c.name}</p> : null}
              {c.hold ? (
                showDrafts ? (
                  <div className="mt-2 flex flex-col items-start gap-3">
                    <DraftMark label="Terminology unconfirmed" />
                    <p className="muted">{c.hold}</p>
                  </div>
                ) : null
              ) : showDrafts && c.draft ? (
                <div className="mt-3 flex flex-col items-start gap-3">
                  <p className="muted">{c.draft}</p>
                  <DraftMark label="Draft wording" />
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Renders ™ as a small, raised mark so it does not compete with the letters. */
export function Mark({ text }: { text: string }) {
  const parts = text.split("™");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? <sup className="ml-[0.04em] align-[0.9em] font-sans text-[0.22em] tracking-normal">TM</sup> : null}
        </span>
      ))}
    </>
  );
}
