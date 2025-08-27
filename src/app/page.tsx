import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Post } from '@/lib/types';

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="transition-colors group-hover:text-primary">{post.title}</CardTitle>
          <CardDescription>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            <p className="line-clamp-1">{post.content.split('\n')[0]}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-background py-20 text-center md:py-32 animate-slide-up-fade">
        <h1 className="mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
          Welcome to StaesBlog
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">
          Exploring minimalist thoughts with modern web tech.
        </p>
        <Button asChild size="lg" className="group">
          <Link href="#latest-posts">
            Read Posts
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>

      <div id="latest-posts" className="flex items-center justify-between gap-4">
        <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Latest Posts</h2>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed bg-card/60 px-4 py-20 text-center backdrop-blur-sm">
          <h2 className="text-xl font-medium">No posts yet</h2>
          <p className="mt-2 mb-4 text-muted-foreground">Start by creating your first post.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div key={post.slug} className="animate-slide-up-fade" style={{ animationDelay: `${i * 100}ms` }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
