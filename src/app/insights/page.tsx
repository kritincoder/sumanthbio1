import { PageIntro } from "@/components/PageIntro";
import { insights } from "@/data/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Reflections and writing from Sumanth Namburi on perspective, decisions and growth.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageIntro eyebrow="Insights" title="Reflections, in time." lede="Writing from the author will appear here." />
      <section className="env-light py-24 md:py-32">
        <div className="shell">
          {insights.length === 0 ? (
            <div className="border-y hairline py-16 text-center" data-reveal>
              <p className="eyebrow">Coming soon</p>
              <p className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">The first insight is still being written.</p>
            </div>
          ) : (
            <ul className="border-t hairline">
              {insights.map((a) => (
                <li key={a.slug} className="border-b hairline py-10" data-reveal>
                  <p className="eyebrow">
                    <time dateTime={a.date}>{a.date}</time>
                  </p>
                  <h2 className="display mt-3 text-4xl">{a.title}</h2>
                  <p className="mt-3 muted">{a.dek}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
