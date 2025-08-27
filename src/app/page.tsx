import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { Post } from '@/lib/types';

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-1 border border-border hover:border-primary">
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
    <div className="space-y-12 animate-fade-in">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-background to-background py-16 text-center md:py-24">
        <h1 className="mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
          Welcome to StaesBlog
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
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
        <div className="text-center py-20 px-4 border-2 border-dashed rounded-lg bg-card/60 backdrop-blur-sm">
          <h2 className="text-xl font-medium">No posts yet</h2>
          <p className="mt-2 mb-4 text-muted-foreground">Start by creating your first post.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
