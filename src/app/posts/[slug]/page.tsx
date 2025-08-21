import { notFound } from 'next/navigation';
import { getPost, isAuthenticated } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Pencil, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { unstable_noStore as noStore } from 'next/cache';

export default async function PostPage({ params }: { params: { slug: string } }) {
  noStore();
  const post = await getPost(params.slug);
  const authed = await isAuthenticated();

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
            { authed && (
              <Button variant="outline" size="sm" asChild>
                  <Link href={`/posts/${post.slug}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                  </Link>
              </Button>
            )}
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

      <div className="text-lg space-y-6 break-words leading-relaxed">
        {post.content.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
