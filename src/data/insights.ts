/**
 * INSIGHTS — editorial system for future writing by the author.
 * Empty by design: articles are added only when the author supplies them.
 *
 * Shape: { slug, title, dek, date (ISO), body: string[] }
 */
export type Insight = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  body: string[];
};

export const insights: Insight[] = [];
