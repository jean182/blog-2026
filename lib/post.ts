import type { Post, PostFrontmatter } from "@/types";
import fs from "fs";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "posts");

/**
 * Get all blog posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });

  const posts = entries
    .filter((entry) => entry.isDirectory())
    .filter((dir) => {
      const indexPath = path.join(BLOG_DIR, dir.name, "index.mdx");
      return fs.existsSync(indexPath);
    })
    .map((dir) => {
      const slug = dir.name;
      const filePath = path.join(BLOG_DIR, slug, "index.mdx");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: Math.ceil(readingTime(content).minutes),
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return posts;
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, slug, "index.mdx");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
  };
}

/**
 * Extract headings for table of contents
 */
export function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  const slugger = new GithubSlugger();

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_~]/g, "")
      .trim();
    const id = slugger.slug(text);

    headings.push({ level, text, id });
  }

  return headings;
}

export const formatPostDate = (date: string, lang: string) => {
  if (typeof Date.prototype.toLocaleDateString !== "function") {
    return date;
  }

  const newDate = new Date(date);
  return newDate.toLocaleDateString(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function getPrimaryCategory(tags: string[] = []) {
  const normalizedTags = tags.map((tag) => tag.toLowerCase());

  const matches = (keywords: string[]) =>
    normalizedTags.some((tag) => keywords.some((keyword) => tag.includes(keyword)));

  if (matches(["music", "album", "song", "vinyl"])) {
    return "Music";
  }

  if (matches(["film", "cinema", "horror", "review", "books", "physical media"])) {
    return "Film";
  }

  if (
    matches([
      "react",
      "redux",
      "redux-saga",
      "rails",
      "ruby",
      "api",
      "typescript",
      "javascript",
      "css",
      "testing",
      "jest",
      "enzyme",
      "frontend",
      "architecture",
      "android",
      "mobile development",
      "accessibility",
      "devops",
      "ci/cd",
      "heroku",
      "bitbucket",
      "documentation",
      "bootstrap",
      "aosp",
      "rooting",
      "custom roms",
      "state management",
      "web development",
    ])
  ) {
    return "Engineering";
  }

  return "Notes";
}
