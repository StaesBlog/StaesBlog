import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} StaesBlog. Built with Next.js &amp; Tailwind CSS.</p>
        <Link href="/admin/login" className="underline hover:text-primary">Admin Login</Link>
      </div>
    </footer>
  );
}

export default Footer;

