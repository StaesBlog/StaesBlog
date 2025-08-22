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
const initialPosts: Omit<Post, 'content' | 'fileName'>[] = [
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
    const fullPost: Post = {
        ...post,
        content: `This is placeholder content for the post titled "${post.title}". In the real app, this would be a PDF.`,
        fileName: 'placeholder.txt',
    }
    posts.set(post.slug, fullPost)
});

// Schema for validating post data using Zod.
const postSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }).max(100, { message: 'Title must be 100 characters or less.' }),
  pdf: z.instanceof(File).refine((file) => file.size > 0, 'PDF file is required.').refine((file) => file.type === 'application/pdf', 'Only PDF files are allowed.'),
});

const updatePostSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }).max(100, { message: 'Title must be 100 characters or less.' }),
  pdf: z.instanceof(File).optional(),
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
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  if (validatedFields.data.password !== ADMIN_PASSWORD) {
    return {
      success: false,
      errors: { password: ['Incorrect password.'] },
    };
  }

  cookies().set(SESSION_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
  
  revalidatePath('/');
  redirect('/');
}

export async function logout() {
    cookies().delete(SESSION_COOKIE_NAME);
    revalidatePath('/');
    redirect('/');
}


export async function getPosts(): Promise<Post[]> {
  noStore();
  return Array.from(posts.values()).sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getPost(slug: string): Promise<Post | undefined> {
  noStore();
  return posts.get(slug);
}

// Helper to convert file to base64
async function fileToBase64(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

export async function createPost(prevState: any, formData: FormData) {
  noStore();
  const authed = await isAuthenticated();
  if (!authed) {
    return redirect('/login');
  }

  const validatedFields = postSchema.safeParse({
    title: formData.get('title'),
    pdf: formData.get('pdf'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, pdf } = validatedFields.data;
  const slug = createSlug(title);
  
  if (posts.has(slug)) {
      return {
          errors: { title: ['A post with this title already exists.'] }
      }
  }
  
  const pdfContent = await fileToBase64(pdf);

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content: pdfContent,
    fileName: pdf.name,
    slug,
    publishedAt: new Date(),
  };

  posts.set(slug, newPost);

  revalidatePath('/');
  revalidatePath('/posts');
  redirect(`/posts/${slug}`);
}

export async function updatePost(slug: string, prevState: any, formData: FormData) {
    noStore();
    const authed = await isAuthenticated();
    if (!authed) {
        return redirect('/login');
    }

    const validatedFields = updatePostSchema.safeParse({
        title: formData.get('title'),
        pdf: formData.get('pdf'),
    });
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const { title, pdf } = validatedFields.data;
    const existingPost = posts.get(slug);

    if(!existingPost) {
      return notFound();
    }

    const newSlug = createSlug(title);
    if (slug !== newSlug && posts.has(newSlug)) {
      return {
          errors: { title: ['A post with this title already exists.'] }
      }
    }
    
    let pdfContent = existingPost.content;
    let fileName = existingPost.fileName;

    if (pdf && pdf.size > 0) {
        if (pdf.type !== 'application/pdf') {
            return { errors: { pdf: ['Only PDF files are allowed.'] } };
        }
        pdfContent = await fileToBase64(pdf);
        fileName = pdf.name;
    }


    const updatedPost: Post = {
      ...existingPost,
      title,
      content: pdfContent,
      fileName,
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
    noStore();
    const authed = await isAuthenticated();
    if (!authed) {
        return redirect('/login');
    }
    if (posts.has(slug)) {
        posts.delete(slug);
        revalidatePath('/');
        revalidatePath(`/posts/${slug}`);
    }
    redirect('/');
}
