import { getPosts } from '@/lib/posts';
import { Hero } from '@/components/hero';
import { PostCard } from '@/components/post-card';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="space-y-12 animate-fade-in">
      <Hero />

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
