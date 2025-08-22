'use client';

import { notFound, redirect } from 'next/navigation';
import { getPost, updatePost, deletePost, isAuthenticated } from '@/app/actions';
import { unstable_noStore as noStore } from 'next/cache';
import { useEffect, useState } from 'react';
import { Post } from '@/lib/types';
import { useActionState, useFormStatus } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-2 h-4 w-4" />
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

function DeleteButton({ slug, deleteAction }: { slug: string; deleteAction: (slug: string) => Promise<void> }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            post and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={async () => await deleteAction(slug)} className="w-full sm:w-auto">
            <AlertDialogAction type="submit" className="w-full">
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export default function EditPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      noStore();
      const authed = await isAuthenticated();
      if (!authed) {
        redirect('/login');
      }
      
      const postData = await getPost(slug);
      if (!postData) {
        notFound();
      }
      setPost(postData);
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  const updatePostWithSlug = updatePost.bind(null, slug);
  const [state, formAction] = useActionState(updatePostWithSlug, { errors: {} });

  if (loading || !post) {
    return <div className="max-w-4xl mx-auto">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form action={formAction} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
            <CardDescription>
              Update the details of your post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={post.title}
                placeholder="Your Amazing Post Title"
                required
                aria-invalid={!!state.errors?.title}
                aria-describedby="title-error"
                className="text-lg"
              />
              {state.errors?.title && (
                <p id="title-error" className="text-sm font-medium text-destructive">
                  {state.errors.title[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base">Content</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={post.content}
                placeholder="Write your thoughts here..."
                rows={18}
                required
                aria-invalid={!!state.errors?.content}
                aria-describedby="content-error"
                className="text-base leading-relaxed"
              />
              {state.errors?.content && (
                <p id="content-error" className="text-sm font-medium text-destructive">
                  {state.errors.content[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
              <Button variant="outline" asChild>
                  <Link href={`/posts/${post.slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Cancel
                  </Link>
              </Button>
              <div className="flex gap-2">
                  <DeleteButton slug={post.slug} deleteAction={deletePost} />
                  <SubmitButton />
              </div>
          </CardFooter>
        </Card>
        {state.errors?._form && (
          <p className="text-sm font-medium text-destructive text-center">{state.errors._form[0]}</p>
        )}
      </form>
    </div>
  );
}
