import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Applied AI Engineer Studio",
  description:
    "A cinematic learning platform for mastering senior applied AI engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main className="app-frame flex w-full flex-1 min-h-0 flex-col px-4 pb-6 pt-3 sm:px-6 lg:px-6 lg:pb-4 lg:pt-3 xl:px-8 2xl:px-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
