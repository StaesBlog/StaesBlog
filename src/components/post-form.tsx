'use client';

import { useActionState, useFormStatus } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Post } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
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

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-2 h-4 w-4" />
      {pending ? (isEditing ? 'Saving...' : 'Publishing...') : (isEditing ? 'Save Changes' : 'Publish Post')}
    </Button>
  );
}

function DeleteButton({ slug, deleteAction }: { slug: string; deleteAction: (slug: string) => Promise<void> }) {
  // This is a client component, but the form action is a server action.
  // We can't use useFormStatus here directly on the delete form.
  // A simple solution is to just let the page handle the pending state.
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


type PostFormProps = {
  action: (prevState: any, formData: FormData) => Promise<{ errors?: any }>;
  deleteAction?: (slug: string) => Promise<void>;
  initialData?: Post | null;
};

export function PostForm({ action, deleteAction, initialData }: PostFormProps) {
  const [state, formAction] = useActionState(action, { errors: {} });
  const isEditing = !!initialData;

  return (
    <form action={formAction} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</CardTitle>
          <CardDescription>
            {isEditing ? 'Update the details of your post.' : 'Fill in the details to create a new post.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title}
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
              defaultValue={initialData?.content}
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
                <Link href={initialData ? `/posts/${initialData.slug}` : '/'}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cancel
                </Link>
            </Button>
            <div className="flex gap-2">
                {isEditing && deleteAction && initialData && (
                   <DeleteButton slug={initialData.slug} deleteAction={deleteAction} />
                )}
                <SubmitButton isEditing={isEditing} />
            </div>
        </CardFooter>
      </Card>
      {state.errors?._form && (
        <p className="text-sm font-medium text-destructive text-center">{state.errors._form[0]}</p>
      )}
    </form>
  );
}
