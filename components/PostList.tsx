"use client";

import { formatPostDate, getPrimaryCategory } from "@/lib/post-utils";
import { Post } from "@/types";
import Link from "next/link";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";

export default function PostList({ posts }: { posts: Post[] }) {
  const handlePostClick = (slug: string, title: string, position: number) => {
    trackEvent(AnalyticsEvent.PostListClicked, {
      post_slug: slug,
      post_title: title,
      position,
    });
  };

  return (
    <div className="divide-y divide-(--accent)/25 [&>article]:py-12 [&>article:first-child]:pt-0 [&>article:last-child]:pb-0">
      {posts.map(({ frontmatter, readingTime }, index) => (
        <article key={frontmatter.slug}>
          <Link
            href={`/${frontmatter.slug}`}
            onClick={() =>
              handlePostClick(frontmatter.slug, frontmatter.title, index + 1)
            }
            className="group hover:underline hover:decoration-(--accent) hover:underline-offset-4"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-(--heading) transition-colors duration-200 group-hover:text-(--accent)">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="mt-3 text-sm italic text-(--muted)">
            {formatPostDate(frontmatter.date, "en")}
            <span className="not-italic"> · </span>
            <span>{readingTime} min read</span>
            <span className="ml-3 not-italic px-2 py-0.5 rounded-full bg-(--accent)/10 text-(--accent) text-xs font-sans">
              {getPrimaryCategory(frontmatter.tags)}
            </span>
          </p>

          <p className="mt-4 max-w-120 text-base leading-relaxed text-(--text) lg:text-lg">
            {frontmatter.ogDescription}
          </p>
        </article>
      ))}
    </div>
  );
}
