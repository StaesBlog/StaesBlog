import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { marked } from 'marked';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
            <Button variant="ghost" size="sm" asChild className="-ml-4">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Posts
                </Link>
            </Button>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-primary">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Published on{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <Separator />

      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
