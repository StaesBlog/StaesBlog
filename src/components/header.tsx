import Link from 'next/link';
import { BookText } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <BookText className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold font-headline text-foreground group-hover:text-foreground/80 transition-colors sm:text-2xl">
              StaesBlog
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
