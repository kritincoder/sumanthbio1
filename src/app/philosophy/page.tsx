import { ConceptList } from "@/components/ConceptList";
import { PageIntro } from "@/components/PageIntro";
import { book } from "@/data/book";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Philosophy",
  description:
    "The ideas behind The Other Side Of Nine — SELF • SHIFT • SYSTEM, the Other Side Principle (OSP™) and NSVBT™ — and the question at their centre.",
  path: "/philosophy",
});

export default function PhilosophyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Philosophy"
        title={
          <>
            Not <span className="italic text-silver">“Am I right?”</span>
          </>
        }
        lede={`A different question: “${book.centralQuestion}”`}
      />
      <section className="env-dark pb-28 md:pb-40">
        <div className="shell">
          <ConceptList detailed />
        </div>
      </section>
    </>
  );
}
