"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Post } from "@/types";
import { getPrimaryCategory } from "@/lib/post-utils";
import { trackEvent, AnalyticsEvent, notifyFirstInteraction } from "@/lib/analytics";
import PostList from "./PostList";

interface FilterablePostListProps {
  posts: Post[];
  categories: string[];
}

export default function FilterablePostList({
  posts,
  categories,
}: FilterablePostListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeCategory = searchParams.get("category");

  const setActiveCategory = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
    
    notifyFirstInteraction("click");
    trackEvent(AnalyticsEvent.CategoryFilterSelected, { 
      category: category ?? "all" 
    });
  };

  const filteredPosts = activeCategory
    ? posts.filter(
        (post) =>
          getPrimaryCategory(post.frontmatter.tags).toLowerCase() ===
          activeCategory.toLowerCase()
      )
    : posts;

  return (
    <>
      <PostList posts={filteredPosts} />

      {/* CATEGORY FILTER — fixed in right gutter, desktop only */}
      {categories.length > 0 && (
        <aside className="hidden xl:block fixed top-24 right-12 w-52">
          <nav>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-(--muted)">
              Categories
            </p>
            <ul className="space-y-2 border-l border-(--accent)/25 pl-4">
              <li>
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`block w-full text-left font-sans text-sm transition-colors cursor-pointer ${
                    activeCategory === null
                      ? "text-(--accent)"
                      : "text-(--muted) hover:text-(--heading)"
                  }`}
                >
                  All posts
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`block w-full text-left font-sans text-sm transition-colors cursor-pointer ${
                      activeCategory === category
                        ? "text-(--accent)"
                        : "text-(--muted) hover:text-(--heading)"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}
