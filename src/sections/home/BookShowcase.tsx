import { book } from "@/data/book";
import { BookCover } from "@/components/BookCover";
import { BookSpecs } from "@/components/BookSpecs";
import { BuyButtons } from "@/components/BuyButtons";
import { DraftMark, Gate } from "@/components/DraftMark";
import { ParallaxCover } from "./ParallaxCover";

export function BookShowcase() {
  return (
    <section id="book" aria-labelledby="book-title" className="env-dark relative overflow-hidden py-28 md:py-44">
      {/* A single soft pool of light behind the book — the only gradient on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(189_164_125/0.16),transparent)]"
      />
      <div className="shell relative grid items-center gap-16 md:grid-cols-12 md:gap-8">
        <div className="mx-auto w-[min(72vw,24rem)] md:col-span-5 md:w-full md:max-w-[26rem]">
          <ParallaxCover>
            <BookCover sizes="(min-width: 768px) 26rem, 72vw" />
          </ParallaxCover>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-6" data-reveal>
            The book
          </p>
          <h2 id="book-title" className="display text-[clamp(2.75rem,5.4vw,5rem)]" data-reveal>
            {book.title}
          </h2>
          <p className="mt-4 font-display text-2xl italic text-silver" data-reveal>
            {book.subtitle}
          </p>

          <Gate status={book.synopsis.status}>
            <div className="prose-body mt-10" data-reveal>
              <DraftMark label="Draft synopsis" className="mb-5" />
              {book.synopsis.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Gate>

          <div data-reveal>
            <BookSpecs className="mt-12" />
          </div>

          <div className="mt-12" data-reveal>
            <BuyButtons tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
