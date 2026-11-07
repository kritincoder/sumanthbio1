import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site.config";

/** Emitted with absolute URLs only once the domain is confirmed. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.domain) return [];
  const base = siteConfig.domain.replace(/\/$/, "");
  return ["", "/the-book", "/about", "/philosophy", "/insights", "/press", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
