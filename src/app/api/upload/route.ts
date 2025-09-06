import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { addPost } from '@/lib/posts';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  if (!file.name.endsWith('.md')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const slug = fileName.replace(/\.md$/, '');
  const filePath = path.join(process.cwd(), 'src', 'content', fileName);
  await writeFile(filePath, buffer);

  const content = buffer.toString('utf8');
  const titleLine = content.split('\n')[0] || slug;
  const title = titleLine.replace(/^#\s*/, '') || slug;
  addPost(slug, title, content);

  return NextResponse.json({ success: true });
}
