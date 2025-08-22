export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string; // Will store PDF data as base64 string
  fileName: string; // To store the original file name
  publishedAt: Date;
}
