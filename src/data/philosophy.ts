import type { Status } from "./book";

/**
 * PHILOSOPHY — the book's named frameworks.
 *
 * Names are printed on the book cover and listing, so they are always shown.
 * Explanations are short paraphrases of the public listing and stay `pending`
 * until the author supplies approved wording.
 *
 * PQ vs PVQ is UNRESOLVED: the Google Play description says "Perspective
 * Quotient (PQ™)"; the printed cover and press releases say "PVQ™". No
 * expansion is published until the author confirms the official term.
 */

export type Concept = {
  id: string;
  mark: string;
  name: string | null;
  draft: string | null;
  status: Status;
  hold?: string;
};

export const concepts: Concept[] = [
  {
    id: "osp",
    mark: "OSP™",
    name: "The Other Side Principle",
    draft: "Seeking what may not yet have been seen.",
    status: "pending",
  },
  {
    id: "nsvbt",
    mark: "NSVBT™",
    name: "New System of Value-Based Thinking Through Perspective",
    draft: "Looking for the hidden value inside an experience.",
    status: "pending",
  },
  {
    id: "pq",
    mark: "PQ™ / PVQ™",
    name: null,
    draft: null,
    status: "pending",
    hold: "Official term and definition awaiting the author’s confirmation.",
  },
];

/** SELF • SHIFT • SYSTEM — no definitions are invented for the three parts. */
export const selfShiftSystem = {
  parts: ["Self", "Shift", "System"],
  draft:
    "A broader idea in the book: understand yourself, learn other perspectives, and apply that understanding.",
  status: "pending" as Status,
};
