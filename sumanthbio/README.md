# Sumanth Namburi — website

## Run it

Double-click `index.html`. No install, no build, no server.
Keep `index.html` and the `assets` folder side by side. The scroll animations load
GSAP from the jsDelivr CDN; offline, the site still shows every word and image, just without motion.

To publish: upload `index.html` and `assets/` to any host (GitHub Pages: Settings → Pages → deploy from `main`, root).

## Files

```
index.html                       the whole site — HTML, CSS and JavaScript
assets/images/book-cover.jpg     front cover (1003 × 1617, from the publisher's Google Play listing)
assets/images/cover-detail.jpg   detail crop of the same cover, used in The Book section
assets/images/ica-conclave-2026.jpg   ICA Conclave 2026 photo from the PNN press release (review only)
assets/images/og.jpg             image shown when the link is shared
assets/fonts/                    Newsreader + Instrument Sans (SIL Open Font License, licences included)
```

## Review mode (on now)

`<html class="review">` shows everything still awaiting Sumanth's approval, marked with a small †.
Before going public:

1. Remove `class="review"` from `<html>` and delete the `<meta name="robots" content="noindex, nofollow">` line.
   Everything with `class="pending"` then disappears automatically (press-only facts, the PQ/PVQ term,
   the Recognition section and the launch quote).
2. As Sumanth approves an item, delete its `pending` class so it stays at launch.
3. Once the domain is known, make the `og:image` URL absolute.

## Needed from Sumanth

- **Author portrait** — 3–5 high-resolution photographs he owns or is licensed to use. Replace the
  "Portrait to come" block in the About section.
- **Original cover file** from Clever Fox Publishing (the current one is the best available from the
  Google Play listing, but not print quality).
- **Confirm or correct**: jewellery entrepreneur; former Assistant Governor, Rotary District 3160; Best
  Assistant Governor recognition; ICA Ambassador & Founding Member; ICA anthology; Author Award and
  featured-author recognition at ICA Conclave 2026.
- **PQ™ or PVQ™** — which is the official term (the listing says PQ™, the printed cover says PVQ™).
- **Approve wording** for SELF • SHIFT • SYSTEM and the book synopsis, or supply his own.
- **ICA event photo** — who is pictured, and permission to publish it.
- **Contact details** and official social links.
- **Insights** — his first article, when ready.

## Sources used

Google Play Books listing (book facts, author biography); PNN Digital press release, 7 Oct 2026,
also carried by ANI, The Tribune, Punjab Kesari and LatestLY (launch, award, Rotary and ICA roles, quotes).
