/**
 * CLIENT CONFIGURATION — contact, social, domain and analytics.
 *
 * Everything here is deliberately UNSET. No verified official domain, social
 * handles or contact details were found during research (see CLIENT-CHECKLIST.md).
 * Fill a value only after the author confirms it. Unset values are hidden on
 * the site — nothing is invented in their place.
 */

export type SocialLink = { label: string; href: string };

export const siteConfig = {
  /** e.g. "https://www.example.com" — leave null until domain ownership is confirmed. */
  domain: null as string | null,

  /** Official enquiries email, once confirmed. */
  email: null as string | null,

  /** Official phone, once confirmed (optional). */
  phone: null as string | null,

  /** Official social profiles, once confirmed. Do NOT add same-name profiles found online. */
  social: [] as SocialLink[],

  /** Analytics ID, once the client chooses a provider. */
  analyticsId: null as string | null,

  /**
   * REVIEW MODE
   * true  → researched-but-unapproved content is shown with visible
   *         "Awaiting approval" markers, so the author can review it in context.
   * false → unapproved content is withheld entirely (launch setting).
   *
   * Controlled by NEXT_PUBLIC_REVIEW_MODE. Must be "false" for public launch.
   */
  reviewMode: process.env.NEXT_PUBLIC_REVIEW_MODE !== "false",
};

export const siteName = "Sumanth Namburi";
