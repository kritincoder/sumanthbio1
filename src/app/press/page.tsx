import { PageIntro } from "@/components/PageIntro";
import { PressList, visiblePress } from "@/components/PressList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Press",
  description: "Press coverage and recognition for Sumanth Namburi and The Other Side Of Nine.",
  path: "/press",
});

export default function PressPage() {
  const hasPress = visiblePress().length > 0;
  return (
    <>
      <PageIntro eyebrow="Press & recognition" title="Press" />
      <section className="env-dark pb-28 md:pb-40">
        <div className="shell">
          {hasPress ? (
            <PressList headingLevel={2} />
          ) : (
            <p className="lede border-t hairline pt-10">Verified coverage will be listed here.</p>
          )}
        </div>
      </section>
    </>
  );
}
