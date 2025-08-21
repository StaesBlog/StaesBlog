import { createPost, isAuthenticated } from '@/app/actions';
import { PostForm } from '@/components/post-form';
import { redirect } from 'next/navigation';

export default async function NewPostPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PostForm action={createPost} />
    </div>
  );
}
