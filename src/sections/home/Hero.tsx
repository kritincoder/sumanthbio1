"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { setPerspectiveProgress } from "@/animations/perspectiveStore";
import { useMediaQuery, useMotionMode } from "@/animations/useCinematic";
import { StaticPerspective } from "@/components/StaticPerspective";
import { Preloader } from "./Preloader";
import { book } from "@/data/book";

const PerspectiveScene = dynamic(() => import("@/components/three/PerspectiveScene"), { ssr: false });

/** The story told by the scroll sequence. Site copy — not quotations from the book. */
const sequence = [
  { at: 0.17, out: 0.33, kicker: "One", text: "Stand here, and it is a nine." },
  { at: 0.39, out: 0.57, kicker: "Two", text: "Now walk around it." },
  { at: 0.66, out: 0.81, kicker: "Three", text: "From the other side, it was always a six." },
];

export function Hero() {
  const mode = useMotionMode();
  const compact = useMediaQuery("(max-width: 767px)");
  const cinematic = mode === "cinematic";
  const [ready, setReady] = useState(false);
  // Defer the WebGL scene until the browser is idle after load, so the 3D
  // setup never competes with first paint or the first interaction.
  const [mountScene, setMountScene] = useState(false);
  useEffect(() => {
    if (!cinematic) return;
    const go = () => setMountScene(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(go, 600);
    return () => clearTimeout(t);
  }, [cinematic]);
  const root = useRef<HTMLElement>(null);

  // Kinetic title entrance (runs once per mount, in both modes unless reduced motion).
  useGSAP(
    () => {
      if (!cinematic) return;
      const cls = document.documentElement.classList;
      const veiled = !cls.contains("intro-seen") && !cls.contains("intro-skip");
      // Only choreograph the entrance while the veil hides the first paint;
      // on return visits the title is simply there.
      if (!veiled || performance.now() > 900) return;
      const d = Math.max(0.1, 1.05 - performance.now() / 1000);
      gsap.from("[data-line]", { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.09, delay: d });
      gsap.from("[data-fade]", { autoAlpha: 0, y: 14, duration: 1.2, ease: "expo.out", stagger: 0.08, delay: d + 0.35 });
    },
    { scope: root, dependencies: [cinematic] },
  );

  // Scroll-linked perspective sequence. One timeline drives captions, the
  // progress rail, and (via the shared store) the WebGL camera.
  useGSAP(
    () => {
      if (!cinematic) return;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
        onUpdate: () => setPerspectiveProgress(tl.progress()),
      });
      tl.to("[data-intro]", { autoAlpha: 0, y: -56, duration: 0.07, ease: "power2.in" }, 0.015);
      tl.to("[data-cue]", { autoAlpha: 0, duration: 0.04 }, 0.01);
      sequence.forEach((s, i) => {
        tl.fromTo(
          `[data-caption="${i}"]`,
          { autoAlpha: 0, y: 28, filter: "blur(6px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.06, ease: "power2.out" },
          s.at,
        ).to(`[data-caption="${i}"]`, { autoAlpha: 0, y: -28, filter: "blur(6px)", duration: 0.05, ease: "power2.in" }, s.out);
      });
      tl.fromTo("[data-finale] [data-word]", { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.07, stagger: 0.012, ease: "power3.out" }, 0.86);
      tl.fromTo("[data-rail]", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
      tl.set({}, {}, 1);
      setPerspectiveProgress(0);
    },
    { scope: root, dependencies: [cinematic, compact], revertOnUpdate: true },
  );

  const finale = book.brandStatement.split(" ");

  return (
    <section
      ref={root}
      aria-label="The Other Side Of Nine — introduction"
      className={`env-dark relative ${cinematic ? (compact ? "h-[340vh]" : "h-[480vh]") : ""}`}
    >
      <Preloader />

      <div className={`${cinematic ? "sticky top-0" : "relative"} h-svh min-h-[600px] w-full overflow-hidden`}>
        {/* Static composition: always present for first paint, fallback, and no-JS. */}
        <div
          className={`absolute inset-0 flex items-start justify-center pt-[14svh] transition-opacity duration-[1400ms] ease-(--ease-out-quint) md:items-center md:justify-end md:pr-[10vw] md:pt-0 ${
            cinematic && ready ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={cinematic && ready ? true : undefined}
        >
          <StaticPerspective className="h-[44svh] w-auto opacity-90 md:h-[78svh]" />
        </div>

        {cinematic && mountScene ? (
          <div className={`absolute inset-0 transition-opacity duration-[1600ms] ease-(--ease-out-quint) ${ready ? "opacity-100" : "opacity-0"}`}>
            <PerspectiveScene compact={compact} onReady={() => setReady(true)} />
          </div>
        ) : null}

        {/* Legibility veil */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(16_17_20/0.96)_0%,rgb(16_17_20/0.75)_45%,transparent_70%)] md:bg-[linear-gradient(to_top,rgb(16_17_20/0.92)_0%,rgb(16_17_20/0.35)_38%,transparent_62%)]" />

        {/* Intro */}
        <div data-intro className="absolute inset-x-0 bottom-0 pb-[max(2.5rem,7svh)]">
          <div className="shell">
            <p data-fade className="eyebrow mb-6 text-champagne!">
              {book.brandStatement}
            </p>
            <h1 className="display text-[clamp(3.25rem,11vw,10.5rem)]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span data-line className="block">
                  The Other Side
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span data-line className="block italic text-silver">
                  Of Nine
                </span>
              </span>
            </h1>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p data-fade className="lede text-ivory/80!">
                {book.subtitle}
              </p>
              <div data-fade className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  href="/the-book"
                  className="inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-obsidian transition-colors duration-300 hover:bg-white"
                >
                  Discover the Book
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex min-h-12 items-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em] text-ivory"
                >
                  Meet the Author
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {cinematic ? (
          <>
            {/* Sequence captions */}
            <div className="pointer-events-none absolute inset-0" aria-live="off">
              {sequence.map((s, i) => (
                <div key={s.kicker} data-caption={i} className="invisible absolute inset-x-0 top-[13svh] text-center opacity-0 md:top-[12svh]">
                  <p className="eyebrow mb-4">{s.kicker}</p>
                  <p className="display mx-auto max-w-[18ch] px-6 text-[clamp(2rem,4.6vw,4.25rem)]">{s.text}</p>
                </div>
              ))}
              <p data-finale className="absolute inset-x-0 bottom-[10svh] px-6 text-center">
                <span className="display block text-[clamp(2.4rem,6.4vw,6.5rem)]">
                  {finale.map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                      <span data-word className="invisible inline-block opacity-0">
                        {w}
                        {i < finale.length - 1 ? " " : ""}
                      </span>
                    </span>
                  ))}
                </span>
              </p>
            </div>

            {/* Progress rail */}
            <div aria-hidden="true" className="absolute right-[var(--gutter)] top-1/2 hidden h-40 w-px -translate-y-1/2 bg-ivory/15 md:block">
              <div data-rail className="h-full w-full origin-top scale-y-0 bg-champagne" />
            </div>

            <p data-cue aria-hidden="true" className="eyebrow absolute bottom-6 right-[var(--gutter)] hidden md:block">
              Scroll to change perspective
            </p>
          </>
        ) : null}
      </div>

      {/* Sequence as plain content when motion is off or WebGL is unavailable. */}
      {!cinematic ? (
        <div className="shell border-t border-ivory/10 py-16 md:py-24">
          <ol className="grid gap-10 md:grid-cols-3">
            {sequence.map((s) => (
              <li key={s.kicker}>
                <p className="eyebrow mb-3">{s.kicker}</p>
                <p className="display text-[2rem]">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="display mt-14 text-[clamp(2.4rem,6vw,5rem)]">{book.brandStatement}</p>
        </div>
      ) : (
        <p className="sr-only">
          Stand on one side and the numeral reads as a nine. Walk around to the other side and the same form reads as a six.
          {book.brandStatement}
        </p>
      )}
    </section>
  );
}
