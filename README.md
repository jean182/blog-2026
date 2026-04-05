# loserkid

A personal blog about software, overthinking, and things that probably should've stayed in a draft.

Built with Next.js, MDX, and Tailwind CSS.

## Setup

```bash
pnpm install
pnpm dev
```

## Structure

```
app/            → Pages, layout, global styles
components/     → React components
content/posts/  → MDX posts (folder per post with index.mdx)
public/posts/   → Static assets per post (images, etc.)
lib/            → Post utilities and helpers
```

## Writing a post

1. Create `content/posts/my-post/index.mdx`
2. Add frontmatter (see existing posts for reference)
3. Optionally add images to `public/posts/my-post/`
4. Set `toc: true` in frontmatter for a table of contents
