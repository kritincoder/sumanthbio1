import { pressItems } from "@/data/press";
import { siteConfig } from "@/data/site.config";
import { DraftMark } from "./DraftMark";

export const visiblePress = () => pressItems.filter((p) => p.status === "verified" || siteConfig.reviewMode);

export function PressList({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const items = visiblePress();
  if (!items.length) return null;
  return (
    <ul className="border-t hairline">
      {items.map((item) => (
        <li key={item.id} className="grid gap-6 border-b hairline py-10 md:grid-cols-12" data-reveal>
          <p className="eyebrow md:col-span-3">{item.date}</p>
          <div className="md:col-span-8">
            {item.status === "pending" ? <DraftMark label="Pending verification" className="mb-4" /> : null}
            <H className="display text-[clamp(1.75rem,3vw,2.5rem)]">{item.title}</H>
            <p className="mt-3 max-w-2xl muted">{item.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {item.outlets.map((o) => (
                <li key={o.href}>
                  <a href={o.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[color:var(--hairline)] underline-offset-4 hover:decoration-current">
                    {o.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
