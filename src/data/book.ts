/**
 * BOOK CONTENT — single source of truth for The Other Side Of Nine.
 *
 * `verified`  = confirmed against the Google Play Books listing on 7 Nov 2026
 *               or supplied directly by the client in the project brief.
 * `pending`   = editorial draft or researched claim awaiting author approval.
 */

export type Status = "verified" | "pending";

export const book = {
  title: "The Other Side Of Nine",
  subtitle: "Discover the Hidden Truth Behind Every Perspective.",
  brandStatement: "Perspective changes everything.",
  author: "Sumanth Namburi",
  publisher: "Clever Fox Publishing",
  isbn13: "9789375008668",
  isbn13Display: "978-93-7500-866-8",
  isbn10: "9375008665",
  published: "September 2026",
  publishedISO: "2026-09",
  pages: 354,
  formats: ["Paperback", "Kindle eBook"],

  /** Provisional cover. Captured from the publisher's Google Play thumbnail — NOT print quality. */
  cover: {
    src: "/images/book/cover-provisional.jpg",
    width: 699,
    height: 1113,
    alt: "Front cover of The Other Side Of Nine by Sumanth Namburi: a bronze numeral nine above the sea, its reflection in the water reading as a six, with a figure standing on each side.",
    status: "pending" as Status,
    note: "Provisional cover from the Google Play listing. Replace with the publisher's high-resolution original.",
  },

  /**
   * The central question. Supported by the public book listing; used as a
   * creative anchor, not attributed as a quotation from a specific page.
   */
  centralQuestion: "What have I not yet seen?",

  /**
   * Draft synopsis written for the site. Replace with the author-approved
   * description before launch.
   */
  synopsis: {
    status: "pending" as Status,
    paragraphs: [
      "Most of what we believe about a situation comes from where we happen to be standing. The Other Side Of Nine is an invitation to walk around it — to notice the view we have not yet taken.",
      "Through stories, practical insight and reflections drawn from the Bhagavad Gita, Sumanth Namburi explores how perspective shapes the way we understand people, make decisions, build relationships and grow.",
      "It does not ask readers to abandon what they believe. It asks them to widen it.",
    ],
  },

  /** Broad themes from the public description. These are themes, not chapter titles. */
  themes: [
    { title: "Perception", line: "How the place we stand decides what we see." },
    { title: "Assumptions", line: "The quiet beliefs that arrive before the facts do." },
    { title: "Relationships", line: "Seeing the other person's side of the same moment." },
    { title: "Decisions", line: "Choosing better by looking beyond the obvious." },
    { title: "Personal growth", line: "Expanding beliefs rather than replacing them." },
    { title: "Reflection", line: "Practical habits for pausing and looking again." },
  ],
};

/**
 * PURCHASE LINKS — exact URLs supplied by the client. Do not substitute,
 * shorten or affiliate-wrap. Amazon blocks automated checks, so both must be
 * opened manually in a browser before launch (see CLIENT-CHECKLIST.md).
 */
export const purchaseLinks = [
  {
    id: "paperback-us",
    label: "Buy Paperback — Amazon US",
    format: "Paperback",
    store: "Amazon US",
    href: "https://www.amazon.com/dp/9375008665",
  },
  {
    id: "kindle-in",
    label: "Get Kindle Edition — Amazon India",
    format: "Kindle eBook",
    store: "Amazon India",
    href: "https://www.amazon.in/dp/B0HJ8R9GXW",
  },
] as const;
