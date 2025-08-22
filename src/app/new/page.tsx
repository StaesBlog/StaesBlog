'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Save className="mr-2 h-4 w-4" />
      {pending ? 'Publishing...' : 'Publish Post'}
    </Button>
  );
}

export default function NewPostPage() {
  noStore();
  const [state, formAction] = useActionState(createPost, { errors: {} });

  return (
    <div className="max-w-4xl mx-auto">
      <form action={formAction} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Fill in the details to create a new post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">Title</Label>
              <Input
                id="title"
                name="title"
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
                  <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Cancel
                  </Link>
              </Button>
              <div className="flex gap-2">
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
