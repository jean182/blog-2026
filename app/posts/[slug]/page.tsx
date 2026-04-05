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
  const coverImage = frontmatter.cover?.src || "/og-default.png";

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.ogTitle ?? frontmatter.title,
      description: frontmatter.ogDescription ?? frontmatter.excerpt,
      type: "article",
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: frontmatter.cover?.alt ?? frontmatter.title,
        },
      ],
    },
    alternates: {
      canonical: frontmatter.canonical,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <Post post={post} />;
}
