import { notFound, redirect } from 'next/navigation';
import { getPost, updatePost, deletePost, isAuthenticated } from '@/app/actions';
import { PostForm } from '@/components/post-form';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect('/login');
  }
  
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }
  
  const updatePostWithSlug = updatePost.bind(null, slug);

  return (
    <div className="max-w-4xl mx-auto">
      <PostForm 
        action={updatePostWithSlug} 
        deleteAction={deletePost} 
        initialData={post} 
      />
    </div>
  );
}
