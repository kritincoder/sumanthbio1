import { BuyButtons } from "@/components/BuyButtons";
import { book } from "@/data/book";

export function ClosingSection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const words = book.brandStatement.split(" ");
  return (
    <section aria-labelledby="closing-title" className={`${tone === "light" ? "env-light" : "env-dark border-t border-ivory/10"} py-32 md:py-48`}>
      <div className="shell text-center">
        <p className="eyebrow mb-8" data-reveal>
          {book.title}
        </p>
        <h2 id="closing-title" className="display mx-auto max-w-[14ch] text-[clamp(3.25rem,9vw,8.5rem)]" data-reveal>
          {words.slice(0, 1).join(" ")} <span className="italic muted">{words.slice(1).join(" ")}</span>
        </h2>
        <p className="lede mx-auto mt-8" data-reveal>
          Available in paperback and on Kindle.
        </p>
        <div className="mt-12" data-reveal>
          <BuyButtons tone={tone === "light" ? "light" : "dark"} align="center" />
        </div>
      </div>
    </section>
  );
}
