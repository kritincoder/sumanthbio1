import { Hero } from "@/sections/home/Hero";
import { QuestionSection } from "@/sections/home/QuestionSection";
import { BookShowcase } from "@/sections/home/BookShowcase";
import { ExploresSection } from "@/sections/home/ExploresSection";
import { PhilosophySection } from "@/sections/home/PhilosophySection";
import { AuthorSection } from "@/sections/home/AuthorSection";
import { PressSection } from "@/sections/home/PressSection";
import { ClosingSection } from "@/sections/home/ClosingSection";
import { visiblePress } from "@/components/PressList";
import { JsonLd, bookJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Other Side Of Nine — Sumanth Namburi",
  description:
    "Sumanth Namburi’s debut book, The Other Side Of Nine: Discover the Hidden Truth Behind Every Perspective. Published by Clever Fox Publishing in paperback and Kindle.",
  path: "/",
  absolute: true,
});

export default function HomePage() {
  const hasPress = visiblePress().length > 0;
  return (
    <>
      <JsonLd data={bookJsonLd()} />
      <Hero />
      <QuestionSection />
      <BookShowcase />
      <ExploresSection />
      <PhilosophySection />
      <AuthorSection />
      <PressSection />
      {/* Insights is omitted from the home page until the author publishes writing. */}
      <ClosingSection tone={hasPress ? "light" : "dark"} />
    </>
  );
}
