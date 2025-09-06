'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      alert('Post uploaded');
      router.push('/');
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Upload Markdown Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="file"
          accept=".md,.markdown,text/markdown"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button type="submit" className="w-full">
          Upload
        </Button>
      </form>
    </div>
  );
}
