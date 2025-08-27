import Link from 'next/link';
import { BookText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl animate-slide-down">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground transition-transform group-hover:rotate-6">
            <BookText className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
            StaesBlog
          </span>
        </Link>
        <nav className="hidden gap-8 text-sm sm:flex">
          <Link
            href="/"
            className="relative py-2 text-muted-foreground transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="#latest-posts"
            className="relative py-2 text-muted-foreground transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}
