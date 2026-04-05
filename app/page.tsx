import type { Metadata } from "next";
import { getAllPosts } from "@/lib/post";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "loserkid",
  description: "A blog about software, overthinking, and things that probably should've stayed in a draft.",
  alternates: {
    canonical: "https://loserkid.io",
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();
  return (
    <>
      {/* INTRO */}
      <div className="mt-10 mb-14 lg:mt-16 lg:mb-20">
        <p className="text-[16px] sm:text-[17px] lg:text-[18px] leading-relaxed text-(--muted) font-sans max-w-130">
          A blog about software, overthinking, and things that probably
          should've stayed in a draft.
        </p>
      </div>

      {/* POSTS */}
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-(--muted)">No posts yet.</p>
      )}
    </>
  );
}
