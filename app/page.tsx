import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/post";
import { getPrimaryCategory } from "@/lib/post-utils";
import FilterablePostList from "@/components/FilterablePostList";

export const metadata: Metadata = {
  title: "loserkid",
  description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
  alternates: {
    canonical: "https://loserkid.io",
  },
  openGraph: {
    title: "loserkid",
    description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
    url: "https://loserkid.io",
    siteName: "loserkid",
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
};

export default async function HomePage() {
  const posts = await getAllPosts();
  
  // Extract unique categories from all posts
  const categories = [...new Set(
    posts.map((post) => getPrimaryCategory(post.frontmatter.tags))
  )].sort();

  return (
    <>
      {/* INTRO */}
      <div className="mb-10 lg:mb-12">
        <p className="max-w-130 text-base leading-relaxed text-(--muted) font-sans lg:text-lg">
          A blog about software, overthinking, and things that probably
          should&apos;ve stayed in a draft.
        </p>
      </div>

      {/* POSTS */}
      {posts.length > 0 ? (
        <Suspense fallback={null}>
          <FilterablePostList posts={posts} categories={categories} />
        </Suspense>
      ) : (
        <p className="text-(--muted)">No posts yet.</p>
      )}
    </>
  );
}
