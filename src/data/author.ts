import type { Status } from "./book";

/**
 * AUTHOR CONTENT — every biographical claim lives here with its source and
 * approval status. Nothing marked `pending` is shown when review mode is off.
 */

export const author = {
  name: "Sumanth Namburi",
  /** Google Play also lists "N. S. Sumanth Namburi" — confirm preferred form. */
  altName: "N. S. Sumanth Namburi",

  /** Safe statement shown even when review mode is off. */
  safeLine:
    "Sumanth Namburi is the author of The Other Side Of Nine, a book about how perspective shapes the way we see experiences, relationships and decisions.",

  /** Provisional positioning from the project brief — editorial draft, not approved. */
  shortBio: {
    status: "pending" as Status,
    text: "Sumanth Namburi is an author, entrepreneur and artist whose work explores how perspective shapes the way people understand experiences, relationships and decisions. Drawing on experiences across business, education and community service, his debut book, The Other Side Of Nine, invites readers to pause, question assumptions and consider what they may not yet have seen.",
  },

  /** Researched facts — all require author confirmation before publication. */
  facts: [
    {
      label: "Home",
      value: "Born and raised in Hindupur, Andhra Pradesh",
      source: "Google Play author listing",
      status: "pending" as Status,
    },
    {
      label: "Education",
      value: "MBA",
      source: "Google Play author listing",
      status: "pending" as Status,
    },
    {
      label: "Education work",
      value: "Director, NSV EDUSPACE — education, skill development and value-based growth",
      source: "Google Play author listing",
      status: "pending" as Status,
    },
    {
      label: "Business",
      value: "Jewellery entrepreneur",
      source: "PNN press release (syndicated)",
      status: "pending" as Status,
    },
    {
      label: "Community",
      value: "Rotary International leadership roles; former Assistant Governor, Rotary District 3160",
      source: "Google Play listing; PNN press release",
      status: "pending" as Status,
    },
    {
      label: "Authors' council",
      value: "Ambassador and Founding Member, International Council of Authors (ICA)",
      source: "PNN press release (syndicated)",
      status: "pending" as Status,
    },
    {
      label: "Art",
      value: "Pencil sketching, Tanjore painting, craftwork and digital art",
      source: "Google Play author listing",
      status: "pending" as Status,
    },
    {
      label: "Influences",
      value: "The Bhagavad Gita, modern psychology, Inner Engineering, Ayyappa Deeksha and Art of Living programmes",
      source: "Google Play author listing",
      status: "pending" as Status,
    },
  ],

  /** Approved portraits go here: { src, width, height, alt }. Never use AI-generated portraits. */
  portraits: [] as { src: string; width: number; height: number; alt: string }[],
};
