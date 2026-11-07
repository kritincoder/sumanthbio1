import type { Status } from "./book";

/**
 * PRESS & RECOGNITION
 *
 * The articles below are syndicated copies of one press release (PNN / ANI),
 * so together they count as a single unverified source, not independent
 * confirmation. Every item stays `pending` until the author approves it and
 * supplies or licenses original event photographs.
 */

export type PressItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  outlets: { name: string; href: string }[];
  status: Status;
};

export const pressItems: PressItem[] = [
  {
    id: "ica-conclave-2026",
    date: "October 2026",
    title: "Book launch at ICA Conclave 2026, Goa",
    summary:
      "The Other Side Of Nine was reported as launched at the International Council of Authors Conclave 2026, with an author award and featured-author recognition.",
    outlets: [
      {
        name: "PNN Digital",
        href: "https://pnndigital.com/lifestyle/sumanth-namburi-explores-the-power-of-perspective-in-debut-book-the-other-side-of-nine/",
      },
      {
        name: "ANI (press release)",
        href: "https://aninews.in/news/business/mr-sumanth-namburi-launched-his-debut-book-the-other-side-of-nine-at-ica-conclave-202620261007143209/",
      },
      {
        name: "The Tribune (press release)",
        href: "https://www.tribuneindia.com/news/business/mr-sumanth-namburi-launched-his-debut-book-the-other-side-of-nine-at-ica-conclave-2026",
      },
    ],
    status: "pending",
  },
];

/** Event photographs — only after identities, roles and usage rights are confirmed. */
export const pressImages: { src: string; width: number; height: number; alt: string; credit: string }[] = [];
