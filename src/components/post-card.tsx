import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="block h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
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
  );
}

export default PostCard;

