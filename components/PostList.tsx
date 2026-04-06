import { formatPostDate, getPrimaryCategory } from "@/lib/post";
import { Post } from "@/types";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="divide-y divide-(--accent)/25 [&>article]:py-12 [&>article:first-child]:pt-0 [&>article:last-child]:pb-0">
      {posts.map(({ frontmatter }) => (
        <article key={frontmatter.slug}>
          <Link href={`/${frontmatter.slug}`} className="group hover:underline hover:decoration-(--accent) hover:underline-offset-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-(--heading) transition-colors duration-200 group-hover:text-(--accent)">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="mt-3 text-sm italic text-(--muted)">
            {formatPostDate(frontmatter.date, "en")}
            <span className="not-italic"> · </span>
            <span className="font-sans text-sm">
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
