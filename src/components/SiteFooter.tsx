import Link from "next/link";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site.config";
import { book } from "@/data/book";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="env-dark border-t border-ivory/10">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-3xl leading-none">Sumanth Namburi</p>
          <p className="mt-3 text-sm text-silver">
            Author of <cite className="not-italic text-ivory">{book.title}</cite>
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-silver transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm md:col-span-3">
          {siteConfig.email ? (
            <a href={`mailto:${siteConfig.email}`} className="text-silver hover:text-ivory">
              {siteConfig.email}
            </a>
          ) : null}
          {siteConfig.social.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-4">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener noreferrer" target="_blank" className="text-silver hover:text-ivory">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-ivory/10 py-6 text-xs text-silver sm:flex-row sm:justify-between">
        <p>© {year} Sumanth Namburi. All rights reserved.</p>
        <p>Published by {book.publisher}.</p>
      </div>
    </footer>
  );
}
