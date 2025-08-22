'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPost } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Upload className="mr-2 h-4 w-4" />
      {pending ? 'Uploading...' : 'Upload Post'}
    </Button>
  );
}

export default function NewPostPage() {
  const [state, formAction] = useActionState(createPost, { errors: {} });

  return (
    <div className="max-w-4xl mx-auto">
      <form action={formAction} className="space-y-4" encType="multipart/form-data">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Provide a title and upload a PDF file for your new post.
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
              <Label htmlFor="pdf" className="text-base">PDF File</Label>
              <Input
                id="pdf"
                name="pdf"
                type="file"
                accept="application/pdf"
                required
                aria-invalid={!!state.errors?.pdf}
                aria-describedby="pdf-error"
              />
              {state.errors?.pdf && (
                <p id="pdf-error" className="text-sm font-medium text-destructive">
                  {state.errors.pdf[0]}
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
