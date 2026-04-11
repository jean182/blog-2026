export interface PostCover {
  src: string;
  alt: string;
}

export interface PostSchema {
  organization?: string;
  author?: string;
}

export interface PostLinkedIn {
  previewMaxChars?: number;
  hashtags?: string[];
  utm?: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  isDraft?: boolean;
  cover?: PostCover;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  linkedin?: PostLinkedIn;
  summaryBullets?: string[];
  toc?: boolean;
  schema?: PostSchema;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: number;
}
