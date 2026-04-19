"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useCallback, useState, useMemo } from "react";
import { Post } from "@/types";
import { getPrimaryCategory } from "@/lib/post-utils";
import { trackEvent, AnalyticsEvent, notifyFirstInteraction } from "@/lib/analytics";
import PostList from "./PostList";

interface FilterablePostListProps {
  posts: Post[];
  categories: string[];
  showDraftsFilter?: boolean;
}

const DRAFTS_FILTER = "__drafts__";

export default function FilterablePostList({
  posts,
  categories,
  showDraftsFilter = false,
}: FilterablePostListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  
  const activeCategory = searchParams.get("category");
  
  // All options: null = "All posts", then categories, then optionally Drafts
  const allOptions = useMemo(() => {
    const opts: (string | null)[] = [null, ...categories];
    if (showDraftsFilter) {
      opts.push(DRAFTS_FILTER);
    }
    return opts;
  }, [categories, showDraftsFilter]);
  
  // Track focused index (separate from selected)
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isListFocused, setIsListFocused] = useState(false);

  const filteredPosts = activeCategory
    ? activeCategory === DRAFTS_FILTER
      ? posts.filter((post) => post.frontmatter.isDraft)
      : posts.filter(
          (post) =>
            getPrimaryCategory(post.frontmatter.tags).toLowerCase() ===
            activeCategory.toLowerCase()
        )
    : posts;

  const announce = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = "";
      requestAnimationFrame(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message;
        }
      });
    }
  }, []);

  const selectCategory = useCallback((category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    const query = params.toString();
    const url = query ? `/?${query}` : "/";
    router.push(url, { scroll: false });
    
    // Announce result
    let count: number;
    let label: string;
    if (category === null) {
      count = posts.length;
      label = "all categories";
    } else if (category === DRAFTS_FILTER) {
      count = posts.filter(p => p.frontmatter.isDraft).length;
      label = "drafts";
    } else {
      count = posts.filter(p => getPrimaryCategory(p.frontmatter.tags).toLowerCase() === category.toLowerCase()).length;
      label = category;
    }
    announce(`${label} selected, showing ${count} ${count === 1 ? "post" : "posts"}`);
    
    notifyFirstInteraction("click");
    trackEvent(AnalyticsEvent.CategoryFilterSelected, { 
      category: category ?? "all" 
    });
  }, [searchParams, router, posts, announce]);

  // Focus the option element at given index
  const focusOption = useCallback((index: number) => {
    const options = listboxRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]');
    options?.[index]?.focus();
    setFocusedIndex(index);
  }, [setFocusedIndex]);

  // Keyboard navigation (arrows move focus, Enter/Space select)
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const len = allOptions.length;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusOption((focusedIndex + 1) % len);
        break;
      case "ArrowUp":
        e.preventDefault();
        focusOption((focusedIndex - 1 + len) % len);
        break;
      case "Home":
        e.preventDefault();
        focusOption(0);
        break;
      case "End":
        e.preventDefault();
        focusOption(len - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectCategory(allOptions[focusedIndex]);
        break;
    }
  }, [focusedIndex, allOptions, focusOption, selectCategory]);

  const getOptionLabel = (option: string | null) => {
    if (option === null) return "All posts";
    if (option === DRAFTS_FILTER) return "Drafts";
    return option;
  };

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div 
        ref={liveRegionRef}
        role="status"
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />

      {/* CATEGORY FILTER — inline collapsible on mobile/tablet */}
      {categories.length > 0 && (
        <details className="xl:hidden mb-8 border border-(--accent)/25 rounded-lg">
          <summary className="px-4 py-3 cursor-pointer font-sans text-sm font-medium text-(--heading) select-none">
            Filter by category
          </summary>
          <div className="px-4 pb-4 flex flex-wrap gap-2">
            {allOptions.map((option) => {
              const isSelected = option === activeCategory;
              return (
                <button
                  key={option ?? "all"}
                  type="button"
                  onClick={() => selectCategory(option)}
                  className={`px-3 py-1.5 rounded-full font-sans text-sm transition-colors ${
                    isSelected
                      ? "bg-(--accent) text-(--bg)"
                      : "bg-(--surface) text-(--muted) hover:text-(--heading)"
                  }`}
                >
                  {getOptionLabel(option)}
                </button>
              );
            })}
          </div>
        </details>
      )}
      
      <PostList posts={filteredPosts} />

      {/* CATEGORY FILTER — fixed in right gutter, desktop only */}
      {categories.length > 0 && (
        <aside id="category-nav" className="hidden xl:block fixed top-24 right-12 w-52 focus:outline-none">
          <nav aria-label="Filter posts by category">
            <p id="category-filter-label" className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-(--muted)">
              Categories
            </p>
            <ul
              ref={listboxRef}
              role="listbox"
              aria-labelledby="category-filter-label"
              aria-activedescendant={`category-option-${focusedIndex}`}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsListFocused(true)}
              onBlur={() => setIsListFocused(false)}
              className="space-y-2 border-l border-(--accent)/25 pl-4 focus:outline-none"
            >
              {allOptions.map((option, index) => {
                const isSelected = option === activeCategory;
                const isFocused = isListFocused && index === focusedIndex;
                
                return (
                  <li
                    key={option ?? "all"}
                    id={`category-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    onClick={() => selectCategory(option)}
                    onFocus={() => setFocusedIndex(index)}
                    className={`block w-full text-left font-sans text-sm transition-colors cursor-pointer outline-none ${
                      isSelected || isFocused
                        ? "text-(--accent) hover:opacity-70"
                        : "text-(--muted) hover:text-(--heading)"
                    } ${isFocused ? "underline underline-offset-4 decoration-(--accent)" : ""}`}
                  >
                    {getOptionLabel(option)}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}
