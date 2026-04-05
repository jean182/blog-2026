export interface PostCover {
  src: string;
  alt: string;
}

export interface PostSchema {
  organization?: string;
  author?: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  cover?: PostCover;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
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
