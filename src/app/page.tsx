import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Post } from '@/lib/types';

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1.5 border-2 border-border hover:border-accent">
        <CardHeader>
          <CardTitle className="group-hover:text-accent transition-colors">{post.title}</CardTitle>
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
                <p className="line-clamp-1">{post.fileName}</p>
            </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">Latest Posts</h1>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 px-4 border-2 border-dashed rounded-lg bg-card">
          <h2 className="text-xl font-medium">No posts yet</h2>
          <p className="text-muted-foreground mt-2 mb-4">Start by creating your first post.</p>
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
