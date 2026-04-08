import { getAllPosts } from "@/lib/post";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://loserkid.io";
  const author = "Jean Aguilar";

  // Get the most recent post date for lastBuildDate
  const lastBuildDate = posts.length > 0
    ? new Date(posts[0].frontmatter.date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const categories = post.frontmatter.tags
        ?.map((tag: string) => `      <category><![CDATA[${tag}]]></category>`)
        .join("\n") ?? "";

      return `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${siteUrl}/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
      <description><![CDATA[${post.frontmatter.excerpt}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <author>hello@loserkid.io (${author})</author>
${categories}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>loserkid</title>
    <link>${siteUrl}</link>
    <description>Personal blog by Jean Aguilar</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>hello@loserkid.io (${author})</managingEditor>
    <webMaster>hello@loserkid.io (${author})</webMaster>
    <atom:link href="${siteUrl}/rss" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
