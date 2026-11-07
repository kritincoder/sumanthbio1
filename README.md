# Sumanth Namburi — The Other Side Of Nine

Author website for Sumanth Namburi and his debut book. Apple-inspired editorial restraint,
opening into one cinematic idea: a single numeral that is a nine from one side and a six from the other.

**Before launch, work through [`CLIENT-CHECKLIST.md`](CLIENT-CHECKLIST.md).**

## Stack

Next.js 16 (App Router, all routes static) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger ·
React Three Fiber / three.js (signature scene only) · self-hosted Instrument Serif + Inter.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # review build (draft markers on, noindex)
npm run build:launch   # launch build (unapproved content withheld)
npm start
npm run qa             # browser QA suite against a running server (Python + Playwright)
```

## Where things live

```
src/data/          ← ALL content. Edit here, not in components.
  book.ts          book facts, synopsis (draft), themes, exact Amazon links
  author.ts        biography (draft) + researched facts, each with source and status
  philosophy.ts    OSP™, NSVBT™, PQ/PVQ (held), SELF • SHIFT • SYSTEM
  press.ts         coverage (pending verification)
  insights.ts      future articles (empty)
  site.config.ts   domain, email, phone, social, analytics — all unset; review mode switch
  glyph-nine.json  the "9" outline extracted from Instrument Serif (scripts/extract-glyph.py)
src/app/           routes: / /the-book /about /philosophy /insights /press /contact + sitemap, robots, 404
src/sections/home/ homepage sections (Hero = signature sequence)
src/components/    shared UI; three/PerspectiveScene.tsx is the WebGL scene
src/animations/    GSAP setup, reveal controller, capability detection, scene/scroll store
public/            images (book/author/press), og.jpg (scripts/make-og.py)
tests/qa.py        automated QA
```

## Review mode

`NEXT_PUBLIC_REVIEW_MODE` (default on). On: drafts and researched claims appear with dashed
"Awaiting approval" markers and the site is `noindex`. Off: anything with `status: "pending"`
is withheld — only verified facts remain. Mark content `"verified"` in `src/data/*` as the author approves it.

## The signature scene

`PerspectiveScene.tsx` casts the Instrument Serif "9" in champagne metal and lays it on the
ground between two engraved vantage points. One GSAP timeline, scrubbed by scroll, drives the
captions, a progress rail, and — through a render-free shared store — the camera: grazing
edge → reads as a nine → half-circle walk → the same form reads as a six. Rendering is
on-demand (frames only when scroll changes) and the scene is mounted at browser idle.

Fallbacks, all tested: reduced motion, no WebGL, software-only WebGL / very low-memory devices,
and no JavaScript each get a static SVG composition with the sequence as plain text.
Purchase links never depend on animation. Append `?force3d` to override detection for testing.

## Deployment

Prepared for Vercel (no config needed). Nothing has been deployed and no domain or billing has
been connected. On Vercel set `NEXT_PUBLIC_REVIEW_MODE=false` only for the approved production
deployment; set `domain` in `site.config.ts` to enable canonical URLs and the sitemap.

## Licences

Instrument Serif and Inter: SIL Open Font License 1.1. Book cover © the author/publisher —
the current file is a provisional reference only.
