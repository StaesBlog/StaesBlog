export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown content
  publishedAt: Date;
}
