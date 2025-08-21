import { createPost, isAuthenticated } from '@/app/actions';
import { PostForm } from '@/components/post-form';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';


export default async function NewPostPage() {
  noStore();
  const authed = await isAuthenticated();
  if (!authed) {
    return redirect('/login');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PostForm action={createPost} />
    </div>
  );
}
