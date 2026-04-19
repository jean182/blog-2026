import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import MDXComponents from "@/components/MdxComponents";
import TableOfContents from "@/components/TableOfContents";
import PostNavLink from "@/components/PostNavLink";
import ArticleFeedback from "@/components/ArticleFeedback";
import PostCompletionTracker from "@/components/PostCompletionTracker";
import { ArticleProvider } from "@/lib/analytics";
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
  const { frontmatter, content, readingTime, slug } = post;
  const headings = frontmatter.toc ? extractHeadings(content) : [];

  return (
    <ArticleProvider slug={slug} title={frontmatter.title} readingTime={readingTime}>
      <PostCompletionTracker />
      <article>
        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-semibold tracking-tight leading-tight text-(--heading)">
          {frontmatter.title}
        </h1>

        {/* DATE */}
        <p className="mt-3 text-sm italic text-(--muted)">
          {formatPostDate(frontmatter.date, "en")}{" "}
          <span className="text-(--accent)">·</span> {readingTime} min read
        </p>

        {/* TABLE OF CONTENTS — inline on mobile/tablet */}
        {headings.length > 0 && (
          <details className="xl:hidden mt-6 mb-8 border border-(--accent)/25 rounded-lg">
            <summary className="px-4 py-3 cursor-pointer font-sans text-sm font-medium text-(--heading) select-none">
              Table of contents
            </summary>
            <div className="px-4 pb-4">
              <TableOfContents headings={headings} />
            </div>
          </details>
        )}

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

        {/* FEEDBACK */}
        <ArticleFeedback />

        {(newerPost || olderPost) && (
          <nav
            aria-label="More posts"
            className="mt-12 border-t border-(--accent)/25 pt-8"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              {olderPost ? (
                <PostNavLink
                  href={`/${olderPost.slug}`}
                  direction="older"
                  title={olderPost.title}
                />
              ) : (
                <div className="hidden lg:block" />
              )}

              {newerPost ? (
                <PostNavLink
                  href={`/${newerPost.slug}`}
                  direction="newer"
                  title={newerPost.title}
                />
              ) : null}
            </div>
          </nav>
        )}
      </article>

      {/* TABLE OF CONTENTS — fixed in right gutter, desktop only */}
      {headings.length > 0 && (
        <aside id="toc" className="hidden xl:block fixed top-24 right-12 w-52 focus:outline-none">
          <TableOfContents headings={headings} />
        </aside>
      )}
    </ArticleProvider>
  );
}
