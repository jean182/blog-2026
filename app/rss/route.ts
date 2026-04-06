import { getAllPosts } from "@/lib/post";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://loserkid.io";

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${siteUrl}/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>loserkid</title>
    <link>${siteUrl}</link>
    <description>Personal blog by Jean Aguilar</description>
    <language>en</language>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
