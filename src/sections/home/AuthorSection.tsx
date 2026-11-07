import Link from "next/link";
import { author } from "@/data/author";
import { AuthorPortrait } from "@/components/AuthorPortrait";
import { DraftMark } from "@/components/DraftMark";
import { siteConfig } from "@/data/site.config";

export function AuthorSection() {
  return (
    <section aria-labelledby="author-title" className="env-light py-28 md:py-44">
      <div className="shell grid items-center gap-14 md:grid-cols-12">
        <div className="md:col-span-5" data-reveal>
          <AuthorPortrait />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-6" data-reveal>
            The author
          </p>
          <h2 id="author-title" className="display text-[clamp(3rem,6vw,5.5rem)]" data-reveal>
            {author.name}
          </h2>
          <div className="prose-body mt-8" data-reveal>
            {siteConfig.reviewMode ? (
              <>
                <DraftMark label="Draft biography" className="mb-5" />
                <p>{author.shortBio.text}</p>
              </>
            ) : (
              <p>{author.safeLine}</p>
            )}
          </div>
          <div className="mt-10" data-reveal>
            <Link href="/about" className="group inline-flex min-h-11 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em]">
              Read his story
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
