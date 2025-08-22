import Link from 'next/link';
import { BookText, LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { isAuthenticated, logout } from '@/app/actions';
import { unstable_noStore as noStore } from 'next/cache';

async function AuthButton() {
  const authed = await isAuthenticated();

  if (authed) {
    return (
      <form action={logout}>
        <Button variant="outline" type="submit">
          <LogOut className="mr-2" />
          Logout
        </Button>
      </form>
    );
  }

  return (
    <Button asChild>
      <Link href="/login">
        <LogIn className="mr-2" />
        Login
      </Link>
    </Button>
  );
}

export async function Header() {
  noStore();
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
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
