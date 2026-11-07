import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";

export default function robots(): MetadataRoute.Robots {
  // Preview/review builds stay out of search engines.
  if (siteConfig.reviewMode) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.domain ? { sitemap: `${siteConfig.domain.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
