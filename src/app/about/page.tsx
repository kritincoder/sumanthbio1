import Link from "next/link";
import { author } from "@/data/author";
import { AuthorPortrait } from "@/components/AuthorPortrait";
import { DraftMark } from "@/components/DraftMark";
import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/data/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Author",
  description: "About Sumanth Namburi, author of The Other Side Of Nine.",
  path: "/about",
});

export default function AboutPage() {
  const review = siteConfig.reviewMode;
  return (
    <>
      <PageIntro eyebrow="The author" title={author.name} />
      <section className="env-light py-24 md:py-36">
        <div className="shell grid items-start gap-16 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal>
            <AuthorPortrait priority />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="prose-body" data-reveal>
              {review ? <DraftMark label="Draft biography" className="mb-5" /> : null}
              <p className="text-xl leading-relaxed text-obsidian!">{review ? author.shortBio.text : author.safeLine}</p>
            </div>

            {review ? (
              <div className="mt-16" data-reveal>
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="eyebrow">Researched details</h2>
                  <DraftMark label="All require confirmation" />
                </div>
                <dl className="border-t hairline">
                  {author.facts.map((f) => (
                    <div key={f.label} className="grid gap-2 border-b hairline py-5 sm:grid-cols-3">
                      <dt className="eyebrow pt-1">{f.label}</dt>
                      <dd className="sm:col-span-2">
                        {f.value}
                        <span className="mt-1 block text-xs muted">Source: {f.source}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            <div className="mt-14" data-reveal>
              <Link href="/the-book" className="group inline-flex min-h-11 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em]">
                Discover the book
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
