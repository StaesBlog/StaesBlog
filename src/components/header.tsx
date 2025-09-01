import Link from 'next/link';
import { BookText } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BookText className="h-5 w-5 text-primary" />
          <span className="text-xl font-bold sm:text-2xl">StaesBlog</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium sm:flex">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="#latest-posts" className="hover:text-primary">
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

