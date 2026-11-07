import { book, purchaseLinks } from "@/data/book";
import { BookCover } from "@/components/BookCover";
import { BookSpecs } from "@/components/BookSpecs";
import { BuyButtons } from "@/components/BuyButtons";
import { DraftMark, Gate } from "@/components/DraftMark";
import { JsonLd, bookJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Book",
  description:
    "The Other Side Of Nine by Sumanth Namburi — 354 pages, Clever Fox Publishing, September 2026. Available in paperback on Amazon US and as a Kindle eBook on Amazon India.",
  path: "/the-book",
});

export default function BookPage() {
  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <section className="env-dark pb-24 pt-[calc(var(--header-h)+4rem)] md:pb-36 md:pt-[calc(var(--header-h)+6rem)]">
        <div className="shell grid items-start gap-16 md:grid-cols-12">
          <div className="mx-auto w-[min(72vw,22rem)] md:sticky md:top-[calc(var(--header-h)+3rem)] md:col-span-5 md:w-full md:max-w-[26rem]">
            <BookCover priority sizes="(min-width: 768px) 26rem, 72vw" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow mb-6">The book · by {book.author}</p>
            <h1 className="display text-[clamp(3rem,6.5vw,6rem)]">{book.title}</h1>
            <p className="mt-5 font-display text-2xl italic text-silver md:text-3xl">{book.subtitle}</p>

            <div className="mt-12">
              <BuyButtons tone="dark" />
            </div>

            <Gate status={book.synopsis.status}>
              <div className="prose-body mt-16">
                <h2 className="eyebrow mb-6">About the book</h2>
                <DraftMark label="Draft synopsis — replace with approved text" className="mb-5" />
                {book.synopsis.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-lg">
                    {p}
                  </p>
                ))}
              </div>
            </Gate>

            <blockquote className="mt-16 border-l border-champagne/60 pl-6">
              <p className="display text-[clamp(1.75rem,3vw,2.5rem)]">“{book.centralQuestion}”</p>
              <footer className="mt-3 text-sm text-silver">The question at the heart of the book</footer>
            </blockquote>

            <div className="mt-16">
              <h2 className="eyebrow mb-4">Details</h2>
              <BookSpecs />
            </div>

            <div className="mt-16">
              <h2 className="eyebrow mb-4">Where to buy</h2>
              <ul className="border-t hairline">
                {purchaseLinks.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-6 border-b hairline py-5">
                    <div>
                      <p>{l.format}</p>
                      <p className="text-sm text-silver">{l.store}</p>
                    </div>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.14em] underline decoration-ivory/30 underline-offset-4 hover:decoration-ivory">
                      View on Amazon<span className="sr-only"> — {l.format}, {l.store} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-silver">
                Availability and pricing are set by each store and may vary by region.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
