import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/50 bg-background/80 backdrop-blur-xl animate-slide-up-fade">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} StaesBlog. Built with Next.js &amp; Tailwind CSS.
        </p>
        <p className="mt-2">
          <Link href="https://github.com" className="transition-colors hover:text-primary" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
