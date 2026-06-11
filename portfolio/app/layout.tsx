import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/layout/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dries Van den Brande — Software & Data Engineer",
    template: "%s — Dries Van den Brande",
  },
  description:
    "Software engineer focused on ML systems, data engineering, full-stack development, and developer tooling. Based in Belgium.",
  keywords: [
    "software engineer",
    "data engineer",
    "ML systems",
    "full-stack",
    "TypeScript",
    "Python",
    "Next.js",
    "Databricks",
    "Belgium",
  ],
  authors: [{ name: "Dries Van den Brande", url: "https://github.com/dvdbdev" }],
  creator: "Dries Van den Brande",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Dries Van den Brande — Software & Data Engineer",
    description:
      "Software engineer focused on ML systems, data engineering, full-stack development, and developer tooling.",
    siteName: "dvdb.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dries Van den Brande — Software & Data Engineer",
    description:
      "Software engineer focused on ML systems, data engineering, full-stack development, and developer tooling.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
