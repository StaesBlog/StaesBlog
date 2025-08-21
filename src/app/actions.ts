'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Post } from '@/lib/types';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

// Using a Map to store posts in memory, simulating a database.
const posts = new Map<string, Post>();

// Function to create a URL-friendly slug from a title.
const createSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
};

// Seed the store with some initial blog posts for demonstration.
const initialPosts: Post[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Design',
    content: `Minimalism is not a lack of something. It’s simply the perfect amount of something. 

In this post, we explore how to apply minimalist principles to create clean, beautiful, and functional user interfaces. We will cover topics like whitespace, typography, and color theory.`,
    publishedAt: new Date('2023-10-01T10:00:00Z'),
    slug: 'the-art-of-minimalist-design',
  },
  {
    id: '2',
    title: 'Navigating the World of Sans-Serif',
    content: `From Helvetica to Inter, sans-serif fonts have dominated the digital landscape. 
    
This post is a deep dive into the history, characteristics, and best use-cases for popular sans-serif typefaces. Learn how to choose the right font to improve readability and convey the right tone for your brand.`,
    publishedAt: new Date('2023-10-15T14:30:00Z'),
    slug: 'navigating-the-world-of-sans-serif',
  },
  {
    id: '3',
    title: 'Building Interactive UIs with Next.js',
    content: `Next.js has become a powerhouse for building modern web applications. 
    
We will walk through the process of creating dynamic and interactive user interfaces using Server Components, Client Components, and Server Actions. This guide is for developers looking to level up their React skills.`,
    publishedAt: new Date('2023-11-01T09:00:00Z'),
    slug: 'building-interactive-uis-with-next-js',
  },
];

initialPosts.forEach(post => posts.set(post.slug, post));

// Schema for validating post data using Zod.
const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }).max(100, { message: 'Title must be 100 characters or less.' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long.' }),
});

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required.'),
});

const SESSION_COOKIE_NAME = 'session';
// In a real app, this should be an environment variable.
const ADMIN_PASSWORD = 'admin'; 

export async function isAuthenticated() {
    noStore();
    return !!cookies().get(SESSION_COOKIE_NAME)?.value;
}

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  if (validatedFields.data.password !== ADMIN_PASSWORD) {
    return {
      errors: { password: ['Incorrect password.'] },
    };
  }

  cookies().set(SESSION_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  
  redirect('/');
}

export async function logout() {
    cookies().delete(SESSION_COOKIE_NAME);
    redirect('/');
}


export async function getPosts(): Promise<Post[]> {
  return Array.from(posts.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.get(slug);
}

export async function createPost(prevState: any, formData: FormData) {
  if (!await isAuthenticated()) redirect('/login');

  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, content } = validatedFields.data;
  const slug = createSlug(title);
  
  if (posts.has(slug)) {
      return {
          errors: { title: ['A post with this title already exists.'] }
      }
  }

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    slug,
    publishedAt: new Date(),
  };

  posts.set(slug, newPost);

  revalidatePath('/');
  redirect(`/posts/${slug}`);
}

export async function updatePost(slug: string, prevState: any, formData: FormData) {
    if (!await isAuthenticated()) redirect('/login');
    const validatedFields = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const { title, content } = validatedFields.data;
    const existingPost = posts.get(slug);

    if(!existingPost) {
      // This should ideally not happen if called from the UI correctly
      return notFound();
    }

    const newSlug = createSlug(title);
    if (slug !== newSlug && posts.has(newSlug)) {
      return {
          errors: { title: ['A post with this title already exists.'] }
      }
    }

    const updatedPost: Post = {
      ...existingPost,
      title,
      content,
      slug: newSlug,
    };

    posts.delete(slug);
    posts.set(newSlug, updatedPost);

    revalidatePath('/');
    revalidatePath(`/posts/${slug}`);
    if (slug !== newSlug) {
      revalidatePath(`/posts/${newSlug}`);
    }
    redirect(`/posts/${newSlug}`);
}

export async function deletePost(slug: string) {
    if (!await isAuthenticated()) redirect('/login');
    if (posts.has(slug)) {
        posts.delete(slug);
        revalidatePath('/');
        revalidatePath(`/posts/${slug}`);
    }
    redirect('/');
}
