import fs from 'fs';
import path from 'path';
import { Post } from '@/lib/types';

// Directory where markdown files are stored
const postsDir = path.join(process.cwd(), 'src', 'content');

// Using a Map to store posts in memory, simulating a database.
const posts = new Map<string, Post>();

// Seed the store with some initial blog posts for demonstration.
const initialPosts: Omit<Post, 'content'>[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Design',
    publishedAt: new Date('2023-10-01T10:00:00Z'),
    slug: 'the-art-of-minimalist-design',
  },
  {
    id: '2',
    title: 'Navigating the World of Sans-Serif',
    publishedAt: new Date('2023-10-15T14:30:00Z'),
    slug: 'navigating-the-world-of-sans-serif',
  },
  {
    id: '3',
    title: 'Building Interactive UIs with Next.js',
    publishedAt: new Date('2023-11-01T09:00:00Z'),
    slug: 'building-interactive-uis-with-next-js',
  },
];

initialPosts.forEach(post => {
  const filePath = path.join(postsDir, `${post.slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  const fullPost: Post = {
    ...post,
    content,
  };
  posts.set(post.slug, fullPost);
});

export function getPosts(): Post[] {
  return Array.from(posts.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getPost(slug: string): Post | undefined {
  return posts.get(slug);
}
