import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { AccentProvider } from "@/components/AccentProvider";
import { SmoothScroll } from "@/components/shell/SmoothScroll";
import { Preloader } from "@/components/shell/Preloader";
import { SiteNav } from "@/components/shell/SiteNav";
import { ChapterHud } from "@/components/shell/ChapterHud";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { DreamTransition } from "@/components/shell/DreamTransition";
import { PencilTrail } from "@/components/fx/PencilTrail";
import { SketchFilter } from "@/components/fx/SketchHover";
import { Totem } from "@/components/fx/Totem";
import { Limbo } from "@/components/fx/Limbo";
import { identity } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Founder and creative specialist bringing visions to life: social media, video, print, branding, websites, packaging and pitch decks. 4+ years, 1,000+ creatives, 16+ brands.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Muneeb Bilal | Founder and Creative Specialist",
  description,
  authors: [{ name: identity.name }],
  openGraph: { type: "website", siteName: identity.name, locale: "en_GB", title: "Muhammad Muneeb Bilal | Founder and Creative Specialist", description },
  twitter: { card: "summary_large_image", title: "Muhammad Muneeb Bilal | Founder and Creative Specialist", description },
};

// Tells search engines who the site belongs to (name, role, contact, LinkedIn).
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: identity.role,
  description: "I bring visions to life.",
  url: siteUrl,
  email: `mailto:${identity.email}`,
  telephone: identity.phone,
  address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "SZABIST Islamabad" },
  sameAs: [identity.linkedin],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#060708",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-void text-bone antialiased">
        <SketchFilter />
        <PencilTrail />
        <Totem />
        <Limbo />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <AccentProvider>
          <SmoothScroll>
            <Preloader />
            <SiteNav />
            <main>{children}</main>
            <SiteFooter />
            <ChapterHud />
            <DreamTransition />
          </SmoothScroll>
        </AccentProvider>
      </body>
    </html>
  );
}
