import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  const snippet = post.content
    .split('\n')
    .find((line) => line.trim() && !line.trim().startsWith('#'))
    ?.trim();

  return (
    <Link href={`/posts/${post.slug}`} className="block h-full">
      <Card className="h-full flex flex-col transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
          <CardDescription>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </CardDescription>
        </CardHeader>
        {snippet && (
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-2">{snippet}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}

export default PostCard;

