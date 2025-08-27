import Link from 'next/link';
import { BookText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-primary to-accent p-2 text-primary-foreground">
            <BookText className="h-5 w-5" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            StaesBlog
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#latest-posts" className="transition-colors hover:text-primary">
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}
