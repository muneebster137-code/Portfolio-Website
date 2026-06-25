import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { AccentProvider } from "@/components/AccentProvider";
import { LenisScroll } from "@/components/LenisScroll";
import { PageLoader } from "@/components/PageLoader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap"
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Muhammad Muneeb Bilal — Visual Designer & Digital Strategist",
  description: "Personal portfolio of Muhammad Muneeb Bilal, exhibiting visual identity systems, digital branding strategy, dynamic video campaigns, and user interface designs.",
  keywords: ["Visual Design", "Digital Strategy", "Brand Identity", "Islamabad", "Social Media Marketing", "Content Strategy"],
  authors: [{ name: "Muhammad Muneeb Bilal" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans bg-paper text-ink selection:bg-accent-primary/20 selection:text-ink antialiased`}
      >
        <AccentProvider>
          <LenisScroll>
            {/* Morphing Loader Reveal */}
            <PageLoader />
            
            {/* Organic Grain Texture Overlay */}
            <div className="grain-overlay" />

            {/* Main Framework Grid */}
            <div className="min-h-screen flex flex-col justify-between">
              <div>
                <Nav />
                <main>{children}</main>
              </div>
              <Footer />
            </div>
          </LenisScroll>
        </AccentProvider>
      </body>
    </html>
  );
}
