import type { Metadata } from "next";
import "./globals.css";
import "./code-blocks.css";
import "highlight.js/styles/github-dark-dimmed.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashLinkFix from "@/components/HashLinkFix";

export const metadata: Metadata = {
  title: {
    default: "loserkid",
    template: "%s | loserkid",
  },
  description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
  metadataBase: new URL("https://loserkid.io"),
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
    <html lang="en">
      <body>
        <div className="min-h-screen">
          {/* HEADER */}
          <Header />
          <HashLinkFix />

          {/* MAIN */}
          <main className="px-6 mx-auto max-w-[680px] lg:mx-0 lg:ml-32 xl:ml-48">{children}</main>

          {/* FOOTER */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
