import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/data/site.config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Professional enquiries for Sumanth Namburi — speaking, media and events.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, social } = siteConfig;
  const hasAny = Boolean(email || phone || social.length);
  return (
    <>
      <PageIntro eyebrow="Contact" title="Professional enquiries" lede="For speaking, media, events and bulk orders." />
      <section className="env-light py-24 md:py-32">
        <div className="shell">
          {hasAny ? (
            <dl className="grid border-t hairline md:grid-cols-3">
              {email ? (
                <div className="border-b hairline py-8 md:pr-8">
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-3 text-xl">
                    <a href={`mailto:${email}`} className="underline underline-offset-4">
                      {email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {phone ? (
                <div className="border-b hairline py-8 md:px-8">
                  <dt className="eyebrow">Phone</dt>
                  <dd className="mt-3 text-xl">
                    <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                  </dd>
                </div>
              ) : null}
              {social.length ? (
                <div className="border-b hairline py-8 md:pl-8">
                  <dt className="eyebrow">Elsewhere</dt>
                  <dd className="mt-3 flex flex-wrap gap-4 text-xl">
                    {social.map((s) => (
                      <a key={s.href} href={s.href} target="_blank" rel="me noopener noreferrer" className="underline underline-offset-4">
                        {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <div className="border-y hairline py-16 text-center">
              <p className="display text-[clamp(2rem,4vw,3.25rem)]">Contact details will be published here soon.</p>
              <p className="mt-4 muted">Official channels are being confirmed.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
