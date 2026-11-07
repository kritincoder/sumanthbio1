import { SplitPerspective } from "./SplitPerspective";

export function QuestionSection() {
  return (
    <section aria-labelledby="question-title" className="env-light relative py-28 md:py-44">
      <div className="shell grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6" data-reveal>
            The question
          </p>
          <h2 id="question-title" className="display text-[clamp(2.75rem,6vw,5.5rem)]" data-reveal>
            What if you’re only seeing one side?
          </h2>
          <div className="prose-body mt-8" data-reveal>
            <p>
              Two people can look at the same thing and both be right. One sees a six. The other sees a nine. The
              difference is not the object — it is where each of them is standing.
            </p>
            <p>
              The book begins with a simple shift: instead of asking whether we are right, asking what we have not yet
              seen.
            </p>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7" data-reveal>
          <SplitPerspective />
        </div>
      </div>
    </section>
  );
}
