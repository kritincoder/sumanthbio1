import type { Metadata } from "next";
import { book } from "@/data/book";
import { author } from "@/data/author";
import { siteConfig, siteName } from "@/data/site.config";

const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: `${book.title} — ${book.author}` };

/** Per-route metadata. Canonical URLs are emitted only once the domain is confirmed. */
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
}): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: siteConfig.domain ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      siteName,
      type: path === "/the-book" ? "book" : "website",
      images: [OG_IMAGE],
      url: siteConfig.domain ? path : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

/** Book + Person structured data — verified fields only. No ratings, reviews or prices. */
export function bookJsonLd() {
  const base = siteConfig.domain ?? undefined;
  const person = {
    "@type": "Person",
    name: author.name,
    alternateName: author.altName,
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
    ...(base ? { url: `${base}/about` } : {}),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: book.title,
        alternativeHeadline: book.subtitle.replace(/\.$/, ""),
        author: person,
        publisher: { "@type": "Organization", name: book.publisher },
        datePublished: book.publishedISO,
        inLanguage: "en",
        workExample: [
          {
            "@type": "Book",
            bookFormat: "https://schema.org/Paperback",
            isbn: book.isbn13,
            numberOfPages: book.pages,
            url: "https://www.amazon.com/dp/9375008665",
          },
          {
            "@type": "Book",
            bookFormat: "https://schema.org/EBook",
            url: "https://www.amazon.in/dp/B0HJ8R9GXW",
          },
        ],
        ...(base ? { url: `${base}/the-book`, image: `${base}${book.cover.src}` } : {}),
      },
      person,
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
