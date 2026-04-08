import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/post";

export const runtime = "nodejs";

export const alt = "loserkid blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.frontmatter.title ?? "Post Not Found";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0e0f12 0%, #14161c 100%)",
        }}
      >
        {/* Accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #7fa38d 0%, #2f5d8a 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 48 : title.length > 40 ? 56 : 64,
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#9aa0a6",
            }}
          >
            loserkid.io
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: "#6b6f76",
            }}
          >
            Jean Aguilar
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
