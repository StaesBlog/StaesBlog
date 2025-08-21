import { createPost } from '@/app/actions';
import { PostForm } from '@/components/post-form';

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PostForm action={createPost} />
    </div>
  );
}
