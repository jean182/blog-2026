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
  // Inline script to prevent flash on load - ALWAYS sets class + background color
  const themeScript = `
    (function() {
      var DARK_BG = '#0e0f12';
      var LIGHT_BG = '#f7f7f5';
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Always set a class - either from storage or system preference
        var theme = stored || (prefersDark ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
        document.documentElement.style.backgroundColor = theme === 'light' ? LIGHT_BG : DARK_BG;
      } catch (e) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.backgroundColor = DARK_BG;
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning style={{ backgroundColor: '#0e0f12' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Analytics />
        <FirstInteractionTracker>
          <ScrollTracker />
          <OutboundTracker />
          <div className="min-h-screen">
            {/* HEADER */}
            <Header />
            <HashLinkFix />

            {/* MAIN */}
            <main className="px-6 mx-auto max-w-170 lg:mx-0 lg:ml-32 xl:ml-48">
              <ViewTransition>{children}</ViewTransition>
            </main>

            {/* FOOTER */}
            <Footer />
          </div>
        </FirstInteractionTracker>
      </body>
    </html>
  );
}
