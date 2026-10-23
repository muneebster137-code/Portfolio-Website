import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import { AccentProvider } from "@/components/AccentProvider";
import { SmoothScroll } from "@/components/shell/SmoothScroll";
import { Preloader } from "@/components/shell/Preloader";
import { SiteNav } from "@/components/shell/SiteNav";
import { ChapterHud } from "@/components/shell/ChapterHud";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { Chatbot } from "@/components/Chatbot";
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

export const metadata: Metadata = {
  title: "Muhammad Muneeb Bilal | Founder and Creative Specialist",
  description:
    "Founder and creative specialist bringing visions to life: social media, video, print, branding, websites, packaging and pitch decks. 4+ years, 1,000+ creatives, 16+ brands.",
  authors: [{ name: "Muhammad Muneeb Bilal" }],
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
        <AccentProvider>
          <SmoothScroll>
            <Preloader />
            <SiteNav />
            <main>{children}</main>
            <SiteFooter />
            <ChapterHud />
            <Chatbot />
          </SmoothScroll>
        </AccentProvider>
      </body>
    </html>
  );
}
