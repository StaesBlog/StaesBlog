'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Post } from '@/lib/types';

export function PostCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
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
    </motion.div>
  );
}

export default PostCard;

