# Client input & approval checklist — The Other Side Of Nine

Everything below must be supplied or approved by Sumanth Namburi before public launch.
Until then the site runs in **review mode**: researched content is shown with visible
"Awaiting approval" markers, search engines are blocked, and nothing is presented as final.

Research validated on 7 November 2026.

## Blocking launch

| # | Item | Status | Where it goes |
|---|------|--------|---------------|
| 1 | **High-resolution book cover** (and full wrap, if a 3D paperback is wanted) | Provisional 699×1113 capture of the Google Play thumbnail in use — not print quality | `public/images/book/` → `src/data/book.ts` `cover` |
| 2 | **Approved synopsis / book description** | Site shows a draft written for the site | `src/data/book.ts` `synopsis` |
| 3 | **Final biography** | Draft from the brief; facts from Google Play + press release, each with its source | `src/data/author.ts` |
| 4 | **3–5 author photographs** with usage rights | None — a typographic placeholder stands in (no AI portraits) | `public/images/author/` → `author.portraits` |
| 5 | **PQ™ or PVQ™ — which is official, and its expansion** | Unresolved: Google Play description says *Perspective Quotient (PQ™)*; the printed cover and press releases say *PVQ™* | `src/data/philosophy.ts` |
| 6 | **Approved wording for OSP™, NSVBT™ and SELF • SHIFT • SYSTEM** | Short paraphrases of the public listing, marked as drafts | `src/data/philosophy.ts` |
| 7 | **Open both Amazon links in a browser** and confirm they show the right book and format | Amazon blocks automated checks, so this could not be verified here | `src/data/book.ts` `purchaseLinks` |
| 8 | **Domain** — ownership and preferred domain | Unknown. Nothing purchased or connected | `src/data/site.config.ts` `domain` |
| 9 | **Turn review mode off** for the production build | `NEXT_PUBLIC_REVIEW_MODE=false` (or `npm run build:launch`) | Vercel env var |

## Needed for full content

| # | Item | Notes |
|---|------|-------|
| 10 | Confirm preferred name form | Google Play lists both "Sumanth Namburi" and "N. S. Sumanth Namburi" |
| 11 | Confirm each biographical fact | Hindupur; MBA; Director, NSV EDUSPACE; jewellery entrepreneur; Rotary roles incl. former Assistant Governor, District 3160; ICA Ambassador & Founding Member; art practice; influences |
| 12 | Verify ICA Conclave 2026 launch and author award | All coverage found is one syndicated PNN/ANI press release — not independent confirmation |
| 13 | Permission for the PNN event photograph | Identities, roles and usage rights unconfirmed — not used on the site |
| 14 | Original event photographs | For the Press section |
| 15 | Official social-media URLs | None verified; same-name profiles were deliberately not used |
| 16 | Official email / phone for enquiries | Contact page shows a neutral "coming soon" until supplied |
| 17 | Genuine reader reviews or testimonials, with permission | None used |
| 18 | First Insights articles (optional) | Insights is hidden from the home page until there is writing |
| 19 | Analytics choice, privacy policy and legal details | Add only with business details and applicable requirements |

## Research notes

- **Book facts verified** against the Google Play Books listing: title, subtitle, author, Clever Fox Publishing, Sept 2026, 354 pages, eBook. ISBN-13 978-93-7500-866-8 confirmed by the PNN release.
- **The cover itself prints** "OSP™ • NSVBT™ • PVQ™" and "Artist • Storyteller • Perspective Explorer" — useful for deciding item 5.
- **Press URLs from the brief** (Napa Herald, Alabama Journal, BNI India, Washington DC Despatch) could not be fetched from the build environment. Equivalent syndicated copies on PNN Digital, ANI and The Tribune were found and are listed (as pending) instead.
- Google Play's cover endpoint serves larger sizes on request, but these may be resampled; only the publisher's original should be treated as print quality.
