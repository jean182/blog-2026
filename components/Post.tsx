import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import MDXComponents from "@/components/MdxComponents";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings, formatPostDate } from "@/lib/post";
import type { Post as PostType } from "@/types";

interface AdjacentPost {
  slug: string;
  title: string;
}

interface PostProps {
  post: PostType;
  newerPost?: AdjacentPost | null;
  olderPost?: AdjacentPost | null;
}

export default function BlogPost({ post, newerPost, olderPost }: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const headings = frontmatter.toc ? extractHeadings(content) : [];
  return (
    <>
      <article className="max-w-170">
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-semibold tracking-tight leading-tight text-(--heading)">
          {frontmatter.title}
        </h1>

        {/* DATE */}
        <p className="mt-3 text-sm italic text-(--muted)">
          {formatPostDate(frontmatter.date, "en")} <span className="text-(--accent)">·</span> {readingTime} min read
        </p>
        <div className="max-w-none">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  rehypeHighlight,
                ],
              },
            }}
            components={MDXComponents}
          />
        </div>

        {(newerPost || olderPost) && (
          <nav aria-label="More posts" className="mt-12 border-t border-(--accent)/25 pt-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              {olderPost ? (
                <Link href={`/posts/${olderPost.slug}`} className="group block order-2 lg:order-1">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-(--muted)">
                    Previous
                  </p>
                  <p className="mt-2 text-base leading-snug text-(--muted) transition-colors group-hover:text-(--heading) lg:text-lg">
                    {olderPost.title}
                  </p>
                </Link>
              ) : <div className="hidden lg:block" />}

              {newerPost ? (
                <Link href={`/posts/${newerPost.slug}`} className="group block order-1 lg:order-2 lg:text-right">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-(--muted)">
                    Next post
                  </p>
                  <p className="mt-2 text-lg leading-snug text-(--heading) transition-colors group-hover:text-(--accent) lg:text-xl">
                    {newerPost.title}
                  </p>
                </Link>
              ) : null}
            </div>
          </nav>
        )}
      </article>

      {/* TABLE OF CONTENTS — fixed in right gutter, desktop only */}
      {headings.length > 0 && (
        <aside className="hidden xl:block fixed top-24 right-12 w-52">
          <TableOfContents headings={headings} />
        </aside>
      )}
    </>
  );
}
