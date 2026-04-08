import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import "./globals.css";
import "./code-blocks.css";
import "highlight.js/styles/github-dark-dimmed.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashLinkFix from "@/components/HashLinkFix";
import Analytics from "@/components/Analytics";
import ScrollTracker from "@/components/ScrollTracker";
import OutboundTracker from "@/components/OutboundTracker";
import { FirstInteractionTracker } from "@/lib/analytics";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  themeColor: "#0e0f12",
};

export const metadata: Metadata = {
  title: {
    default: "loserkid",
    template: "%s | loserkid",
  },
  description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
  metadataBase: new URL("https://loserkid.io"),
  authors: [{ name: "Jean Aguilar", url: "https://loserkid.io/about" }],
  creator: "Jean Aguilar",
  publisher: "loserkid",
  openGraph: {
    title: "loserkid",
    description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
    url: "https://loserkid.io",
    siteName: "loserkid",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        alt: "loserkid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "loserkid",
    description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
    site: "@jeanm182",
    creator: "@jeanm182",
    images: ["/og-default.png"],
  },
  alternates: {
    types: {
      "application/rss+xml": "/rss",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Analytics />
          <FirstInteractionTracker>
            <ScrollTracker />
            <OutboundTracker />
            <div className="min-h-screen flex flex-col">
              {/* HEADER */}
              <Header />
              <HashLinkFix />

              {/* MAIN */}
              <main className="flex-1 px-6 lg:max-w-reading lg:ml-32 xl:ml-48">
                <ViewTransition>{children}</ViewTransition>
              </main>

              {/* FOOTER */}
              <Footer />
            </div>
          </FirstInteractionTracker>
        </ThemeProvider>
      </body>
    </html>
  );
}
