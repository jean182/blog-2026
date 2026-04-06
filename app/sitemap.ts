import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/post";

const siteUrl = "https://loserkid.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.frontmatter.updated || post.frontmatter.date),
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    ...postEntries,
  ];
}
