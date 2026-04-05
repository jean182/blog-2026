import { formatPostDate } from "@/lib/post";
import { Post } from "@/types";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="divide-y divide-(--accent)/25 [&>article]:py-12 [&>article:first-child]:pt-0 [&>article:last-child]:pb-0">
      {posts.map(({ frontmatter }) => (
        <article key={frontmatter.slug}>
          <Link href={`/posts/${frontmatter.slug}`} className="group hover:underline hover:decoration-(--accent) hover:underline-offset-4">
            <h2 className="text-[24px] sm:text-[28px] lg:text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-(--heading) transition-colors duration-200 group-hover:text-(--accent)">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="mt-3 text-[15px] italic text-(--muted)">
            {formatPostDate(frontmatter.date, "en")}
          </p>

          <p className="mt-4 text-[17px] text-(--text) leading-relaxed max-w-120">
            {frontmatter.ogDescription}
          </p>
        </article>
      ))}
    </div>
  );
}
