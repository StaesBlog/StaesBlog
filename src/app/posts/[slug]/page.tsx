import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }
  
  const isPlaceholder = post.fileName === 'placeholder.txt';
  const pdfDataUri = `data:application/pdf;base64,${post.content}`;

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

      <div className="space-y-6">
        {isPlaceholder ? (
            <div className="text-lg text-muted-foreground italic p-8 border-2 border-dashed rounded-lg text-center">
                <p>This is a placeholder post.</p>
                <p>Edit this post to upload a real PDF file.</p>
            </div>
        ) : (
            <>
                <div className="text-center">
                    <Button asChild>
                        <a href={pdfDataUri} download={post.fileName}>
                            <Download className="mr-2" />
                            Download {post.fileName}
                        </a>
                    </Button>
                </div>
                <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden border">
                    <iframe
                        src={pdfDataUri}
                        className="w-full h-full"
                        title={`PDF preview for ${post.title}`}
                    />
                </div>
            </>
        )}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
