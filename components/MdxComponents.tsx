import type { MDXComponents } from "mdx/types";
import NextImage, { type ImageProps } from "next/image";
import VideoPlayer from "@/components/VideoPlayer";

const Components: MDXComponents = {
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-2 border-(--accent) pl-5 text-[17px] leading-relaxed text-(--text)"
      {...props}
    >
      <div className="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {props.children}
      </div>
    </blockquote>
  ),
  p: (props) => (
    <p className="text-(--text) text-lg leading-relaxed mt-6" {...props} />
  ),
  h1: (props) => (
    <h1
      className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.1] text-(--heading) mt-10 lg:mt-16 [&>a]:text-inherit [&>a]:no-underline"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-[20px] lg:text-[24px] font-semibold text-(--heading) mt-10 lg:mt-16 [&>a]:text-inherit [&>a]:no-underline"
      {...props}
    />
  ),

  a: (props) => (
    <a
      className="text-(--link) underline underline-offset-4 hover:opacity-80"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: React.ComponentProps<"code">) => {
    const isBlock =
      typeof className === "string" && className.startsWith("hljs");
    if (isBlock) {
      return (
        <code className={`${className} font-mono`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-[#1a1c22] font-mono text-[0.9em]"
        {...props}
      >
        {children}
      </code>
    );
  },
  ul: (props) => (
    <ul
      className="mt-6 ml-6 list-disc text-lg leading-relaxed text-(--text) [&>li]:mt-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-6 ml-6 list-decimal text-lg leading-relaxed text-(--text) [&>li]:mt-2"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  hr: () => <hr className="my-10 border-t border-(--accent)/25" />,
  strong: (props) => (
    <strong className="font-semibold text-(--heading)" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  h3: (props) => (
    <h3
      className="text-[18px] lg:text-[20px] font-semibold text-(--heading) mt-8 lg:mt-12 [&>a]:text-inherit [&>a]:no-underline"
      {...props}
    />
  ),
  Image: ({ className, alt = "", src, width, height, ...props }: ImageProps) => {
    if (!src) return null;

    const resolvedWidth = typeof width === "string" ? Number(width) : width;
    const resolvedHeight = typeof height === "string" ? Number(height) : height;
    const aspectRatio = resolvedWidth && resolvedHeight ? `${resolvedWidth} / ${resolvedHeight}` : "16 / 9";

    return (
      <figure className="my-8">
        <div
          className="relative w-full overflow-hidden rounded-xl border border-(--accent)/15 bg-(--surface)"
          style={{ aspectRatio }}
        >
          <NextImage
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 680px"
            className={`object-cover ${className ?? ""}`}
            {...props}
          />
        </div>
        {alt ? <figcaption className="mt-2 text-sm text-(--muted)">{alt}</figcaption> : null}
      </figure>
    );
  },
  VideoPlayer,
};

export default Components;
