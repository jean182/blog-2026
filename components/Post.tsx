import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import MDXComponents from "@/components/MdxComponents";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings, formatPostDate } from "@/lib/post";
import type { Post as PostType } from "@/types";

interface PostProps {
  post: PostType;
}

export default function BlogPost({ post }: PostProps) {
  const { frontmatter, content, readingTime } = post;
  const headings = frontmatter.toc ? extractHeadings(content) : [];
  return (
    <>
      <article className="max-w-170">
        {/* TITLE */}
        <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.1] text-(--heading)">
          {frontmatter.title}
        </h1>

        {/* DATE */}
        <p className="mt-3 text-[15px] italic text-(--muted)">
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
