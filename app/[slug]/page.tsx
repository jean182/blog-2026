import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import Post from "@/components/Post";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const { frontmatter } = post;
  const title = frontmatter.ogTitle ?? frontmatter.title;
  const description = frontmatter.ogDescription ?? frontmatter.excerpt;
  const canonical = frontmatter.canonical ?? `https://loserkid.io/${slug}`;
  const author = frontmatter.schema?.author ?? "Jean Aguilar";
  const publisher = frontmatter.schema?.organization ?? "loserkid";
  const coverImage = frontmatter.cover?.src || "/og-default.png";

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags,
    authors: [{ name: author, url: "https://loserkid.io/about" }],
    creator: author,
    publisher,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "loserkid",
      type: "article",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated ?? frontmatter.date,
      authors: [author],
      tags: frontmatter.tags,
      images: [
        {
          url: coverImage,
          alt: frontmatter.cover?.alt ?? frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@jeanm182",
      creator: "@jeanm182",
      images: [coverImage],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

  if (!post) {
    notFound();
  }

  const { frontmatter } = post;
  const currentIndex = posts.findIndex((entry) => entry.slug === slug);
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const olderPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.cover?.src || "/og-default.png",
    datePublished: frontmatter.date,
    dateModified: frontmatter.updated ?? frontmatter.date,
    author: {
      "@type": "Person",
      name: "Jean Aguilar",
      url: "https://loserkid.io/about",
    },
    publisher: {
      "@type": "Organization",
      name: "loserkid",
      url: "https://loserkid.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://loserkid.io/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Post
        post={post}
        newerPost={newerPost ? { slug: newerPost.slug, title: newerPost.frontmatter.title } : null}
        olderPost={olderPost ? { slug: olderPost.slug, title: olderPost.frontmatter.title } : null}
      />
    </>
  );
}
