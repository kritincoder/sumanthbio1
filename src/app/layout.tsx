import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealController } from "@/animations/RevealController";
import { siteConfig } from "@/data/site.config";
import { book } from "@/data/book";

const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  // Absolute URLs for share images: the confirmed domain, else the Vercel preview URL.
  ...(siteConfig.domain
    ? { metadataBase: new URL(siteConfig.domain) }
    : process.env.VERCEL_URL
      ? { metadataBase: new URL(`https://${process.env.VERCEL_URL}`) }
      : {}),
  title: {
    default: `${book.title} — Sumanth Namburi`,
    template: "%s — Sumanth Namburi",
  },
  description:
    "The official home of Sumanth Namburi and his debut book, The Other Side Of Nine — an exploration of how perspective shapes what we see, decide and become.",
  applicationName: "Sumanth Namburi",
  authors: [{ name: "Sumanth Namburi" }],
  // Keep preview builds out of search engines until launch.
  robots: siteConfig.reviewMode ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#101114",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${instrument.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: enable motion-dependent initial states only when JS runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;d.classList.add('js-motion');try{if(sessionStorage.getItem('osn-intro')){d.classList.add('intro-seen')}else{sessionStorage.setItem('osn-intro','1')}}catch(e){}var s=function(){d.classList.add('intro-skip');removeEventListener('keydown',s);removeEventListener('pointerdown',s)};addEventListener('keydown',s);addEventListener('pointerdown',s);setTimeout(s,1600)})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealController />
      </body>
    </html>
  );
}
